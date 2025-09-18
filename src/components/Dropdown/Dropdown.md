# Dropdown

El componente `Dropdown` proporciona una solución completa para crear menús desplegables interactivos con posicionamiento inteligente y accesibilidad completa. Construido con el patrón de componentes compuestos para máxima flexibilidad.

## Características Principales

-   ✅ **8 posiciones diferentes** (top, bottom, left, right con variantes start/end)
-   ✅ **2 tipos de trigger** (click y hover)
-   ✅ **Contenido rico** con soporte para iconos, descripciones y elementos complejos
-   ✅ **Accesibilidad completa** con navegación por teclado y ARIA
-   ✅ **Click fuera** para cerrar automáticamente
-   ✅ **Tecla Escape** para cerrar
-   ✅ **Estados especiales** (deshabilitado, destructivo)
-   ✅ **Responsive** con comportamiento inteligente en móviles

## Importación

```jsx
import { Dropdown } from "@/components/Dropdown/Dropdown";
import { DropdownTrigger } from "@/components/Dropdown/DropdownTrigger";
import { DropdownMenu } from "@/components/Dropdown/DropdownMenu";
import { DropdownItem } from "@/components/Dropdown/DropdownItem";
import { DropdownDivider } from "@/components/Dropdown/DropdownDivider";
```

## Uso Básico

### Dropdown Simple

```jsx
<Dropdown>
    <DropdownTrigger>
        <Button variant="outline">Abrir Menú</Button>
    </DropdownTrigger>
    <DropdownMenu>
        <DropdownItem onClick={() => console.log("Opción 1")}>Opción 1</DropdownItem>
        <DropdownItem onClick={() => console.log("Opción 2")}>Opción 2</DropdownItem>
        <DropdownItem onClick={() => console.log("Opción 3")}>Opción 3</DropdownItem>
    </DropdownMenu>
</Dropdown>
```

### Menú de Usuario

```jsx
<Dropdown placement="bottom-start">
    <DropdownTrigger>
        <Button variant="outline" className="flex items-center gap-2">
            <Avatar size="small" name="Usuario" />
            <span>Mi Cuenta</span>
            <ChevronDown />
        </Button>
    </DropdownTrigger>
    <DropdownMenu>
        <DropdownItem onClick={() => navigate("/profile")}>
            <UserIcon className="mr-2 w-4 h-4" />
            Perfil
        </DropdownItem>
        <DropdownItem onClick={() => navigate("/settings")}>
            <SettingsIcon className="mr-2 w-4 h-4" />
            Configuración
        </DropdownItem>
        <DropdownDivider />
        <DropdownItem onClick={handleLogout} variant="destructive">
            <LogoutIcon className="mr-2 w-4 h-4" />
            Cerrar Sesión
        </DropdownItem>
    </DropdownMenu>
</Dropdown>
```

## API Reference

### Props del Dropdown

| Prop        | Tipo                 | Predeterminado   | Descripción                                        |
| ----------- | -------------------- | ---------------- | -------------------------------------------------- |
| `children`  | `ReactNode`          | -                | Componentes hijos (DropdownTrigger y DropdownMenu) |
| `trigger`   | `'click' \| 'hover'` | `'click'`        | Evento que activa el dropdown                      |
| `placement` | `DropdownPlacement`  | `'bottom-start'` | Posición del menú relativo al trigger              |
| `offset`    | `number`             | `8`              | Distancia en píxeles entre trigger y menú          |
| `disabled`  | `boolean`            | `false`          | Si el dropdown está deshabilitado                  |
| `className` | `string`             | `''`             | Clases CSS adicionales                             |

### Tipos de Placement

```typescript
type DropdownPlacement =
    | "top-start"
    | "top-end"
    | "bottom-start"
    | "bottom-end"
    | "left-start"
    | "left-end"
    | "right-start"
    | "right-end";
```

### Props del DropdownItem

| Prop        | Tipo                         | Predeterminado | Descripción                       |
| ----------- | ---------------------------- | -------------- | --------------------------------- |
| `children`  | `ReactNode`                  | -              | Contenido del elemento            |
| `onClick`   | `() => void`                 | -              | Función ejecutada al hacer click  |
| `variant`   | `'default' \| 'destructive'` | `'default'`    | Variante visual del elemento      |
| `disabled`  | `boolean`                    | `false`        | Si el elemento está deshabilitado |
| `className` | `string`                     | `''`           | Clases CSS adicionales            |

## Ejemplos Avanzados

### Dropdown con Trigger Hover

```jsx
<Dropdown trigger="hover" placement="bottom-start">
    <DropdownTrigger>
        <Button variant="ghost">Hover para abrir</Button>
    </DropdownTrigger>
    <DropdownMenu>
        <DropdownItem>Opción rápida 1</DropdownItem>
        <DropdownItem>Opción rápida 2</DropdownItem>
        <DropdownItem>Opción rápida 3</DropdownItem>
    </DropdownMenu>
</Dropdown>
```

### Contenido Rico y Complejo

```jsx
<Dropdown placement="bottom-start">
    <DropdownTrigger>
        <Button variant="primary">
            <PlusIcon className="mr-2 w-4 h-4" />
            Crear Nuevo
        </Button>
    </DropdownTrigger>
    <DropdownMenu>
        <DropdownItem onClick={() => createDocument()}>
            <div className="flex items-center space-x-3">
                <DocumentIcon className="w-5 h-5 text-blue-500" />
                <div>
                    <p className="font-medium">Documento</p>
                    <p className="text-xs text-gray-500">Crear nuevo documento</p>
                </div>
            </div>
        </DropdownItem>
        <DropdownItem onClick={() => createFolder()}>
            <div className="flex items-center space-x-3">
                <FolderIcon className="w-5 h-5 text-yellow-500" />
                <div>
                    <p className="font-medium">Carpeta</p>
                    <p className="text-xs text-gray-500">Organizar archivos</p>
                </div>
            </div>
        </DropdownItem>
        <DropdownDivider />
        <DropdownItem onClick={() => createPresentation()}>
            <div className="flex items-center space-x-3">
                <PresentationIcon className="w-5 h-5 text-green-500" />
                <div>
                    <p className="font-medium">Presentación</p>
                    <p className="text-xs text-gray-500">Crear presentación</p>
                </div>
            </div>
        </DropdownItem>
    </DropdownMenu>
</Dropdown>
```

### Dropdown con Estado Seleccionado

```jsx
const [selectedOption, setSelectedOption] = useState("option1");

const options = [
    { value: "option1", label: "Opción 1" },
    { value: "option2", label: "Opción 2" },
    { value: "option3", label: "Opción 3" },
];

<Dropdown placement="bottom-start">
    <DropdownTrigger>
        <Button variant="outline" className="justify-between min-w-[200px]">
            {options.find((opt) => opt.value === selectedOption)?.label}
            <ChevronDownIcon className="w-4 h-4" />
        </Button>
    </DropdownTrigger>
    <DropdownMenu>
        {options.map((option) => (
            <DropdownItem
                key={option.value}
                onClick={() => setSelectedOption(option.value)}
                className={selectedOption === option.value ? "bg-blue-50 text-blue-700" : ""}
            >
                <div className="flex items-center justify-between w-full">
                    <span>{option.label}</span>
                    {selectedOption === option.value && <CheckIcon className="w-4 h-4 text-blue-600" />}
                </div>
            </DropdownItem>
        ))}
    </DropdownMenu>
</Dropdown>;
```

### Diferentes Posiciones

```jsx
// Top Start
<Dropdown placement="top-start">
  <DropdownTrigger>
    <Button>Top Start</Button>
  </DropdownTrigger>
  <DropdownMenu>
    <DropdownItem>Opción 1</DropdownItem>
    <DropdownItem>Opción 2</DropdownItem>
  </DropdownMenu>
</Dropdown>

// Bottom End
<Dropdown placement="bottom-end">
  <DropdownTrigger>
    <Button>Bottom End</Button>
  </DropdownTrigger>
  <DropdownMenu>
    <DropdownItem>Opción 1</DropdownItem>
    <DropdownItem>Opción 2</DropdownItem>
  </DropdownMenu>
</Dropdown>

// Right Start
<Dropdown placement="right-start">
  <DropdownTrigger>
    <Button>Right Start</Button>
  </DropdownTrigger>
  <DropdownMenu>
    <DropdownItem>Opción 1</DropdownItem>
    <DropdownItem>Opción 2</DropdownItem>
  </DropdownMenu>
</Dropdown>
```

## Casos de Uso Comunes

### Menú de Acciones en Tabla

```jsx
<Dropdown placement="bottom-end">
    <DropdownTrigger>
        <Button variant="ghost" size="small">
            <MoreVerticalIcon className="w-4 h-4" />
        </Button>
    </DropdownTrigger>
    <DropdownMenu>
        <DropdownItem onClick={() => viewItem(item.id)}>
            <EyeIcon className="mr-2 w-4 h-4" />
            Ver detalles
        </DropdownItem>
        <DropdownItem onClick={() => editItem(item.id)}>
            <EditIcon className="mr-2 w-4 h-4" />
            Editar
        </DropdownItem>
        <DropdownItem onClick={() => duplicateItem(item.id)}>
            <CopyIcon className="mr-2 w-4 h-4" />
            Duplicar
        </DropdownItem>
        <DropdownDivider />
        <DropdownItem onClick={() => deleteItem(item.id)} variant="destructive">
            <TrashIcon className="mr-2 w-4 h-4" />
            Eliminar
        </DropdownItem>
    </DropdownMenu>
</Dropdown>
```

### Selector de Filtros

```jsx
<Dropdown placement="bottom-start">
    <DropdownTrigger>
        <Button variant="outline">
            <FilterIcon className="mr-2 w-4 h-4" />
            Filtros
        </Button>
    </DropdownTrigger>
    <DropdownMenu>
        <DropdownItem onClick={() => setFilter("all")}>Todos los elementos</DropdownItem>
        <DropdownItem onClick={() => setFilter("active")}>Solo activos</DropdownItem>
        <DropdownItem onClick={() => setFilter("inactive")}>Solo inactivos</DropdownItem>
        <DropdownDivider />
        <DropdownItem onClick={() => clearFilters()}>Limpiar filtros</DropdownItem>
    </DropdownMenu>
</Dropdown>
```

### Menú de Configuración

```jsx
<Dropdown placement="bottom-end">
    <DropdownTrigger>
        <Button variant="ghost">
            <SettingsIcon className="w-4 h-4" />
        </Button>
    </DropdownTrigger>
    <DropdownMenu>
        <DropdownItem onClick={() => openPreferences()}>
            <SlidersIcon className="mr-2 w-4 h-4" />
            Preferencias
        </DropdownItem>
        <DropdownItem onClick={() => toggleTheme()}>
            <PaletteIcon className="mr-2 w-4 h-4" />
            Cambiar tema
        </DropdownItem>
        <DropdownItem onClick={() => openNotifications()}>
            <BellIcon className="mr-2 w-4 h-4" />
            Notificaciones
        </DropdownItem>
        <DropdownDivider />
        <DropdownItem onClick={() => openHelp()}>
            <HelpCircleIcon className="mr-2 w-4 h-4" />
            Ayuda
        </DropdownItem>
    </DropdownMenu>
</Dropdown>
```

## Accesibilidad

El componente Dropdown incluye soporte completo para accesibilidad:

### Atributos ARIA

-   `role="menu"` en el contenedor del dropdown
-   `aria-haspopup="true"` en el trigger
-   `aria-expanded` indica si el menú está abierto
-   `role="menuitem"` en cada elemento del menú

### Navegación por Teclado

-   **Enter/Space**: Abre/cierra el dropdown desde el trigger
-   **Escape**: Cierra el dropdown
-   **Tab**: Navega fuera del dropdown
-   **Flechas**: Navega entre elementos del menú (si están implementadas)

### Ejemplo con Accesibilidad Completa

```jsx
<Dropdown placement="bottom-start">
    <DropdownTrigger aria-label="Abrir menú de usuario">
        <Button variant="outline" aria-describedby="user-menu-description">
            Menú de Usuario
        </Button>
    </DropdownTrigger>
    <DropdownMenu>
        <div id="user-menu-description" className="sr-only">
            Menú con opciones de perfil y configuración
        </div>
        <DropdownItem onClick={() => navigate("/profile")} aria-label="Ir a perfil de usuario">
            Perfil
        </DropdownItem>
        <DropdownItem onClick={() => navigate("/settings")} aria-label="Ir a configuración">
            Configuración
        </DropdownItem>
    </DropdownMenu>
</Dropdown>
```

## Personalización

### Clases CSS Personalizadas

```jsx
<Dropdown className="custom-dropdown" placement="bottom-start">
    <DropdownTrigger>
        <Button className="custom-trigger">Personalizado</Button>
    </DropdownTrigger>
    <DropdownMenu className="custom-menu">
        <DropdownItem className="custom-item">Elemento personalizado</DropdownItem>
    </DropdownMenu>
</Dropdown>
```

### Estilos CSS

```css
.custom-dropdown {
    /* Personalizar contenedor */
}

.custom-trigger {
    /* Personalizar trigger */
}

.custom-menu {
    /* Personalizar menú */
    backdrop-filter: blur(8px);
    background: rgba(255, 255, 255, 0.95);
}

.custom-item {
    /* Personalizar elementos */
    transition: all 0.2s ease;
}

.custom-item:hover {
    transform: translateX(4px);
}
```

## Optimización de Rendimiento

### Lazy Loading de Menús

```jsx
const [isMenuLoaded, setIsMenuLoaded] = useState(false);

<Dropdown
    onOpen={() => {
        if (!isMenuLoaded) {
            loadMenuData();
            setIsMenuLoaded(true);
        }
    }}
>
    <DropdownTrigger>
        <Button>Cargar Menú</Button>
    </DropdownTrigger>
    <DropdownMenu>
        {isMenuLoaded ? (
            menuItems.map((item) => <DropdownItem key={item.id}>{item.label}</DropdownItem>)
        ) : (
            <DropdownItem disabled>Cargando...</DropdownItem>
        )}
    </DropdownMenu>
</Dropdown>;
```

### Memoización de Elementos

```jsx
const MemoizedDropdownItem = memo(({ item, onClick }) => (
    <DropdownItem onClick={() => onClick(item.id)}>
        <item.icon className="mr-2 w-4 h-4" />
        {item.label}
    </DropdownItem>
));

const MenuItems = memo(({ items, onItemClick }) => (
    <>
        {items.map((item) => (
            <MemoizedDropdownItem key={item.id} item={item} onClick={onItemClick} />
        ))}
    </>
));
```

## Troubleshooting

### Problemas Comunes

**El dropdown no se posiciona correctamente**

-   Verifica que el contenedor padre no tenga `overflow: hidden`
-   Asegúrate de que hay suficiente espacio para el menú
-   Considera usar `placement` diferente

**El menú no se cierra al hacer click fuera**

-   Verifica que el evento `onClickOutside` no esté siendo bloqueado
-   Revisa si hay otros event listeners interfiriendo

**Los elementos del menú no son clickeables**

-   Asegúrate de que no hay elementos con `pointer-events: none`
-   Verifica que las funciones `onClick` están definidas correctamente

**Problemas de accesibilidad**

-   Asegúrate de incluir `aria-label` en triggers sin texto
-   Verifica que los roles ARIA están configurados correctamente
-   Testea la navegación por teclado

### Debugging

```jsx
<Dropdown
    onOpen={() => console.log("Dropdown abierto")}
    onClose={() => console.log("Dropdown cerrado")}
    className="debug-dropdown"
>
    {/* ... */}
</Dropdown>
```

## Compatibilidad

-   ✅ React 16.8+
-   ✅ Navegadores modernos (Chrome, Firefox, Safari, Edge)
-   ✅ Dispositivos móviles (iOS Safari, Chrome Mobile)
-   ✅ Lectores de pantalla (NVDA, JAWS, VoiceOver)
-   ✅ Navegación por teclado completa
