import { useState } from "react";
import { Button } from "../Button";
import { Dropdown } from "./Dropdown";
import { DropdownDivider } from "./DropdownDivider";
import { DropdownItem } from "./DropdownItem";
import { DropdownMenu } from "./DropdownMenu";
import { DropdownTrigger } from "./DropdownTrigger";

/**
 * Componente de preview para mostrar todas las funcionalidades del Dropdown
 */
export const DropdownPreview = () => {
    const [notification, setNotification] = useState("");

    const showNotification = (message) => {
        setNotification(message);
        setTimeout(() => setNotification(""), 3000);
    };

    const userMenuItems = [
        { icon: "👤", label: "Perfil", action: () => showNotification("Navegando a Perfil") },
        { icon: "⚙️", label: "Configuración", action: () => showNotification("Abriendo Configuración") },
        { icon: "📊", label: "Estadísticas", action: () => showNotification("Mostrando Estadísticas") },
        { divider: true },
        {
            icon: "🚪",
            label: "Cerrar Sesión",
            action: () => showNotification("Cerrando sesión..."),
            variant: "destructive",
        },
    ];

    const actionMenuItems = [
        { icon: "📝", label: "Editar", action: () => showNotification("Modo edición activado") },
        { icon: "📋", label: "Duplicar", action: () => showNotification("Elemento duplicado") },
        { icon: "📤", label: "Exportar", action: () => showNotification("Exportando datos...") },
        { divider: true },
        {
            icon: "🗑️",
            label: "Eliminar",
            action: () => showNotification("Elemento eliminado"),
            variant: "destructive",
        },
    ];

    const createMenuItems = [
        {
            icon: "📄",
            label: "Documento",
            description: "Crear nuevo documento",
            action: () => showNotification("Creando documento..."),
        },
        {
            icon: "📁",
            label: "Carpeta",
            description: "Organizar archivos",
            action: () => showNotification("Nueva carpeta creada"),
        },
        {
            icon: "🖼️",
            label: "Imagen",
            description: "Subir imagen",
            action: () => showNotification("Subiendo imagen..."),
        },
        { divider: true },
        {
            icon: "📊",
            label: "Presentación",
            description: "Crear presentación",
            action: () => showNotification("Nueva presentación"),
        },
    ];

    const sortOptions = [
        { label: "Nombre (A-Z)", value: "name-asc" },
        { label: "Nombre (Z-A)", value: "name-desc" },
        { label: "Fecha (Reciente)", value: "date-desc" },
        { label: "Fecha (Antigua)", value: "date-asc" },
        { label: "Tamaño (Mayor)", value: "size-desc" },
        { label: "Tamaño (Menor)", value: "size-asc" },
    ];

    const [selectedSort, setSelectedSort] = useState("name-asc");

    const handleSortChange = (value) => {
        setSelectedSort(value);
        const option = sortOptions.find((opt) => opt.value === value);
        showNotification(`Ordenando por: ${option.label}`);
    };

    return (
        <div className="space-y-8 p-6 bg-gray-50 rounded-lg">
            {/* Notificación */}
            {notification && (
                <div className="fixed top-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-bounce">
                    {notification}
                </div>
            )}

            <h2 className="text-2xl font-bold text-gray-900 mb-6">Dropdown - Ejemplos Interactivos</h2>

            {/* Básico - Menú de Usuario */}
            <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="text-lg font-semibold mb-4 text-gray-800">Menú de Usuario Básico</h3>
                <div className="flex items-center gap-4">
                    <Dropdown placement="bottom-start">
                        <DropdownTrigger>
                            <Button variant="outline" className="flex items-center gap-2">
                                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs">
                                    JD
                                </div>
                                <span>Juan Pérez</span>
                                <span className="text-xs">▼</span>
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu>
                            {userMenuItems.map((item, index) =>
                                item.divider ? (
                                    <DropdownDivider key={index} />
                                ) : (
                                    <DropdownItem key={index} onClick={item.action} variant={item.variant}>
                                        <span className="mr-2">{item.icon}</span>
                                        {item.label}
                                    </DropdownItem>
                                )
                            )}
                        </DropdownMenu>
                    </Dropdown>

                    <p className="text-sm text-gray-600">Click para abrir menú de usuario</p>
                </div>
            </div>

            {/* Posicionamiento */}
            <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="text-lg font-semibold mb-4 text-gray-800">Diferentes Posiciones</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {/* Top Start */}
                    <div className="mt-16">
                        <Dropdown placement="top-start">
                            <DropdownTrigger>
                                <Button variant="outline" size="small">
                                    Top Start
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu>
                                {actionMenuItems.slice(0, 3).map((item, index) => (
                                    <DropdownItem key={index} onClick={item.action}>
                                        <span className="mr-2">{item.icon}</span>
                                        {item.label}
                                    </DropdownItem>
                                ))}
                            </DropdownMenu>
                        </Dropdown>
                    </div>

                    {/* Top End */}
                    <div className="mt-16">
                        <Dropdown placement="top-end">
                            <DropdownTrigger>
                                <Button variant="outline" size="small">
                                    Top End
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu>
                                {actionMenuItems.slice(0, 3).map((item, index) => (
                                    <DropdownItem key={index} onClick={item.action}>
                                        <span className="mr-2">{item.icon}</span>
                                        {item.label}
                                    </DropdownItem>
                                ))}
                            </DropdownMenu>
                        </Dropdown>
                    </div>

                    {/* Bottom Start */}
                    <div>
                        <Dropdown placement="bottom-start">
                            <DropdownTrigger>
                                <Button variant="outline" size="small">
                                    Bottom Start
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu>
                                {actionMenuItems.slice(0, 3).map((item, index) => (
                                    <DropdownItem key={index} onClick={item.action}>
                                        <span className="mr-2">{item.icon}</span>
                                        {item.label}
                                    </DropdownItem>
                                ))}
                            </DropdownMenu>
                        </Dropdown>
                    </div>

                    {/* Bottom End */}
                    <div>
                        <Dropdown placement="bottom-end">
                            <DropdownTrigger>
                                <Button variant="outline" size="small">
                                    Bottom End
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu>
                                {actionMenuItems.slice(0, 3).map((item, index) => (
                                    <DropdownItem key={index} onClick={item.action}>
                                        <span className="mr-2">{item.icon}</span>
                                        {item.label}
                                    </DropdownItem>
                                ))}
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                </div>
            </div>

            {/* Trigger Hover */}
            <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="text-lg font-semibold mb-4 text-gray-800">Trigger por Hover</h3>
                <div className="flex items-center gap-4">
                    <Dropdown trigger="hover" placement="bottom-start">
                        <DropdownTrigger>
                            <Button variant="ghost" className="flex items-center gap-2">
                                <span>🔗</span>
                                <span>Hover para abrir</span>
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu>
                            <DropdownItem onClick={() => showNotification("Enlace copiado")}>
                                <span className="mr-2">📋</span>
                                Copiar enlace
                            </DropdownItem>
                            <DropdownItem onClick={() => showNotification("Compartiendo...")}>
                                <span className="mr-2">🔗</span>
                                Compartir
                            </DropdownItem>
                            <DropdownItem onClick={() => showNotification("Enviando por email...")}>
                                <span className="mr-2">📧</span>
                                Enviar por email
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>

                    <p className="text-sm text-gray-600">Pasa el mouse por encima para abrir</p>
                </div>
            </div>

            {/* Contenido Complejo */}
            <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="text-lg font-semibold mb-4 text-gray-800">Contenido Rico y Complejo</h3>
                <div className="flex items-center gap-4">
                    <Dropdown placement="bottom-start">
                        <DropdownTrigger>
                            <Button variant="primary" className="flex items-center gap-2">
                                <span>➕</span>
                                <span>Crear Nuevo</span>
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu>
                            {createMenuItems.map((item, index) =>
                                item.divider ? (
                                    <DropdownDivider key={index} />
                                ) : (
                                    <DropdownItem key={index} onClick={item.action}>
                                        <div className="flex items-center space-x-3">
                                            <span className="text-lg">{item.icon}</span>
                                            <div>
                                                <p className="font-medium text-sm">{item.label}</p>
                                                {item.description && (
                                                    <p className="text-xs text-gray-500">
                                                        {item.description}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </DropdownItem>
                                )
                            )}
                        </DropdownMenu>
                    </Dropdown>

                    <p className="text-sm text-gray-600">Contenido con iconos y descripciones</p>
                </div>
            </div>

            {/* Estado Seleccionado */}
            <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="text-lg font-semibold mb-4 text-gray-800">Selector con Estado</h3>
                <div className="flex items-center gap-4">
                    <Dropdown placement="bottom-start">
                        <DropdownTrigger>
                            <Button
                                variant="outline"
                                className="flex items-center gap-2 min-w-[200px] justify-between"
                            >
                                <span>
                                    {sortOptions.find((opt) => opt.value === selectedSort)?.label ||
                                        "Seleccionar..."}
                                </span>
                                <span className="text-xs">▼</span>
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu>
                            {sortOptions.map((option) => (
                                <DropdownItem
                                    key={option.value}
                                    onClick={() => handleSortChange(option.value)}
                                    className={
                                        selectedSort === option.value ? "bg-blue-50 text-blue-700" : ""
                                    }
                                >
                                    <div className="flex items-center justify-between w-full">
                                        <span>{option.label}</span>
                                        {selectedSort === option.value && (
                                            <span className="text-blue-600">✓</span>
                                        )}
                                    </div>
                                </DropdownItem>
                            ))}
                        </DropdownMenu>
                    </Dropdown>

                    <p className="text-sm text-gray-600">
                        Actual:{" "}
                        <strong>{sortOptions.find((opt) => opt.value === selectedSort)?.label}</strong>
                    </p>
                </div>
            </div>

            {/* Estados Especiales */}
            <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="text-lg font-semibold mb-4 text-gray-800">Estados Especiales</h3>
                <div className="flex items-center gap-4 flex-wrap">
                    {/* Deshabilitado */}
                    <Dropdown disabled>
                        <DropdownTrigger>
                            <Button variant="outline" disabled>
                                Deshabilitado
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu>
                            <DropdownItem>Opción 1</DropdownItem>
                            <DropdownItem>Opción 2</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>

                    {/* Con acciones destructivas */}
                    <Dropdown placement="bottom-start">
                        <DropdownTrigger>
                            <Button variant="ghost" className="text-red-600 hover:bg-red-50">
                                <span className="mr-2">⚠️</span>
                                Acciones Peligrosas
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu>
                            <DropdownItem onClick={() => showNotification("Elemento archivado")}>
                                <span className="mr-2">📦</span>
                                Archivar
                            </DropdownItem>
                            <DropdownDivider />
                            <DropdownItem
                                onClick={() => showNotification("¡Elemento eliminado!")}
                                variant="destructive"
                            >
                                <span className="mr-2">🗑️</span>
                                Eliminar permanentemente
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>

                    <p className="text-sm text-gray-600 w-full mt-2">
                        Diferentes estados: deshabilitado y con acciones destructivas
                    </p>
                </div>
            </div>

            {/* Casos de Uso Reales */}
            <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="text-lg font-semibold mb-4 text-gray-800">Casos de Uso Comunes</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Menú de tabla */}
                    <div className="border rounded p-4">
                        <h4 className="font-medium mb-2">Menú de Tabla</h4>
                        <div className="flex justify-between items-center">
                            <span className="text-sm">Elemento #1</span>
                            <Dropdown placement="bottom-end">
                                <DropdownTrigger>
                                    <Button variant="ghost" size="small">
                                        ⋮
                                    </Button>
                                </DropdownTrigger>
                                <DropdownMenu>
                                    <DropdownItem onClick={() => showNotification("Viendo detalles")}>
                                        <span className="mr-2">👁️</span>Ver
                                    </DropdownItem>
                                    <DropdownItem onClick={() => showNotification("Editando elemento")}>
                                        <span className="mr-2">✏️</span>Editar
                                    </DropdownItem>
                                    <DropdownDivider />
                                    <DropdownItem
                                        onClick={() => showNotification("Eliminando elemento")}
                                        variant="destructive"
                                    >
                                        <span className="mr-2">🗑️</span>Eliminar
                                    </DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </div>
                    </div>

                    {/* Filtros */}
                    <div className="border rounded p-4">
                        <h4 className="font-medium mb-2">Filtros</h4>
                        <Dropdown placement="bottom-start">
                            <DropdownTrigger>
                                <Button variant="outline" size="small" className="flex items-center gap-2">
                                    <span>🔍</span>
                                    <span>Filtrar</span>
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu>
                                <DropdownItem onClick={() => showNotification("Mostrando todos")}>
                                    Todos los elementos
                                </DropdownItem>
                                <DropdownItem onClick={() => showNotification("Filtrando activos")}>
                                    Solo activos
                                </DropdownItem>
                                <DropdownItem onClick={() => showNotification("Filtrando inactivos")}>
                                    Solo inactivos
                                </DropdownItem>
                                <DropdownDivider />
                                <DropdownItem onClick={() => showNotification("Limpiando filtros")}>
                                    Limpiar filtros
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>

                    {/* Configuración */}
                    <div className="border rounded p-4">
                        <h4 className="font-medium mb-2">Configuración</h4>
                        <Dropdown placement="bottom-end">
                            <DropdownTrigger>
                                <Button variant="ghost" size="small" className="flex items-center gap-2">
                                    <span>⚙️</span>
                                    <span>Opciones</span>
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu>
                                <DropdownItem onClick={() => showNotification("Abriendo preferencias")}>
                                    <span className="mr-2">🎛️</span>Preferencias
                                </DropdownItem>
                                <DropdownItem onClick={() => showNotification("Cambiando tema")}>
                                    <span className="mr-2">🎨</span>Cambiar tema
                                </DropdownItem>
                                <DropdownItem onClick={() => showNotification("Configurando notificaciones")}>
                                    <span className="mr-2">🔔</span>Notificaciones
                                </DropdownItem>
                                <DropdownDivider />
                                <DropdownItem onClick={() => showNotification("Abriendo ayuda")}>
                                    <span className="mr-2">❓</span>Ayuda
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                </div>
            </div>

            {/* Nota de uso */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-900 mb-2">💡 Características del Dropdown</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                    <li>
                        • <strong>8 posiciones:</strong> top/bottom + start/end, left/right + start/end
                    </li>
                    <li>
                        • <strong>2 tipos de trigger:</strong> click (predeterminado) y hover
                    </li>
                    <li>
                        • <strong>Contenido rico:</strong> Soporte para iconos, descripciones y elementos
                        complejos
                    </li>
                    <li>
                        • <strong>Accesibilidad:</strong> Navegación por teclado y soporte para lectores de
                        pantalla
                    </li>
                    <li>
                        • <strong>Click fuera:</strong> Cierra automáticamente al hacer click fuera del
                        dropdown
                    </li>
                    <li>
                        • <strong>Escape:</strong> Cierra con la tecla Escape
                    </li>
                    <li>
                        • <strong>Estados:</strong> Soporte para elementos deshabilitados y variantes
                        destructivas
                    </li>
                    <li>
                        • <strong>Responsive:</strong> Se cierra automáticamente en scroll en dispositivos
                        móviles
                    </li>
                </ul>
            </div>
        </div>
    );
};
