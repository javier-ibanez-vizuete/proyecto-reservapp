# Modal Component

Un componente modal (dialog) completamente personalizable con funcionalidades avanzadas de accesibilidad, múltiples tamaños y configuraciones flexibles de comportamiento.

## Características

-   ✅ **10 tamaños diferentes** - Desde alertas simples hasta aplicaciones completas
-   ✅ **Accesibilidad completa** - ARIA labels, focus management, navegación por teclado
-   ✅ **Configuración flexible** - Control total sobre comportamiento de cierre
-   ✅ **Animaciones fluidas** - Transiciones suaves de entrada y salida
-   ✅ **Gestión de scroll** - Bloqueo automático del scroll del body
-   ✅ **Casos de uso múltiples** - Confirmaciones, formularios, galerías, configuraciones
-   ✅ **Personalización completa** - Clases CSS personalizables para modal y overlay
-   ✅ **Focus management** - Manejo automático del foco para accesibilidad

## Uso Básico

```jsx
import { Modal } from "./components/Modal/Modal";

function MyComponent() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <button onClick={() => setIsOpen(true)}>Abrir Modal</button>

            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
                <div className="p-6">
                    <h2>Título del Modal</h2>
                    <p>Contenido del modal aquí.</p>
                    <button onClick={() => setIsOpen(false)}>Cerrar</button>
                </div>
            </Modal>
        </>
    );
}
```

## API

### Props

| Prop                  | Tipo        | Default                    | Descripción                                                     |
| --------------------- | ----------- | -------------------------- | --------------------------------------------------------------- |
| `isOpen`              | `boolean`   | `false`                    | Si el modal está abierto o cerrado                              |
| `onClose`             | `function`  | `undefined`                | Función callback para cerrar el modal                           |
| `children`            | `ReactNode` | `undefined`                | Contenido del modal                                             |
| `size`                | `string`    | `"md"`                     | Tamaño del modal (xs, sm, md, lg, xl, 2xl, 3xl, 4xl, 5xl, full) |
| `closeOnOverlayClick` | `boolean`   | `true`                     | Si se cierra al hacer clic en el overlay                        |
| `closeOnEscape`       | `boolean`   | `true`                     | Si se cierra al presionar Escape                                |
| `showCloseButton`     | `boolean`   | `true`                     | Si muestra el botón de cerrar (X)                               |
| `blurBackground`      | `boolean`   | `true`                     | Si aplica efecto blur al fondo                                  |
| `overlayColor`        | `string`    | `"bg-black bg-opacity-50"` | Clases CSS para el color del overlay de fondo                   |
| `className`           | `string`    | `""`                       | Clases CSS adicionales para el modal                            |
| `overlayClassName`    | `string`    | `""`                       | Clases CSS adicionales para el overlay                          |

### Tamaños Disponibles

| Tamaño | Ancho máximo   | Uso recomendado                     |
| ------ | -------------- | ----------------------------------- |
| `xs`   | 320px          | Notificaciones, alertas simples     |
| `sm`   | 384px          | Confirmaciones, formularios básicos |
| `md`   | 448px          | Formularios estándar (default)      |
| `lg`   | 512px          | Contenido detallado                 |
| `xl`   | 576px          | Formularios complejos               |
| `2xl`  | 672px          | Paneles de configuración            |
| `3xl`  | 768px          | Dashboards, galerías                |
| `4xl`  | 896px          | Contenido extenso                   |
| `5xl`  | 1152px         | Aplicaciones embebidas              |
| `full` | Ancho completo | Aplicaciones de pantalla completa   |

## Ejemplos

### Modal de Confirmación

```jsx
<Modal isOpen={showConfirmation} onClose={() => setShowConfirmation(false)} size="sm">
    <div className="p-6">
        <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">⚠️</div>
            <h3>Confirmar eliminación</h3>
        </div>
        <p className="mb-6">
            ¿Estás seguro de que deseas eliminar este elemento? Esta acción no se puede deshacer.
        </p>
        <div className="flex gap-3 justify-end">
            <button onClick={() => setShowConfirmation(false)}>Cancelar</button>
            <button onClick={handleDelete} className="bg-red-600 text-white">
                Eliminar
            </button>
        </div>
    </div>
</Modal>
```

### Modal con Formulario

```jsx
<Modal isOpen={showForm} onClose={() => setShowForm(false)} size="lg">
    <form onSubmit={handleSubmit} className="p-6">
        <h2 className="mb-6">Formulario de contacto</h2>

        <div className="space-y-4 mb-6">
            <div>
                <label className="block text-sm font-medium mb-2">Nombre</label>
                <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                    className="w-full px-3 py-2 border rounded-md"
                    required
                />
            </div>
            <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                    className="w-full px-3 py-2 border rounded-md"
                    required
                />
            </div>
        </div>

        <div className="flex gap-3 justify-end">
            <button type="button" onClick={() => setShowForm(false)}>
                Cancelar
            </button>
            <button type="submit" className="bg-blue-600 text-white">
                Enviar
            </button>
        </div>
    </form>
</Modal>
```

### Modal de Éxito/Notificación

```jsx
<Modal isOpen={showSuccess} onClose={() => setShowSuccess(false)} size="sm">
    <div className="p-6 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            ✅
        </div>
        <h3 className="mb-3">¡Operación exitosa!</h3>
        <p className="mb-6">La acción se ha completado correctamente.</p>
        <button onClick={() => setShowSuccess(false)} className="w-full bg-green-600 text-white">
            Continuar
        </button>
    </div>
</Modal>
```

### Configuraciones Avanzadas

```jsx
// Modal que no se cierra con clic fuera
<Modal
    isOpen={isOpen}
    onClose={onClose}
    closeOnOverlayClick={false}
>
    <ModalContent />
</Modal>

// Modal sin botón de cerrar
<Modal
    isOpen={isOpen}
    onClose={onClose}
    showCloseButton={false}
>
    <ModalContent />
</Modal>

// Modal que no se cierra con Escape
<Modal
    isOpen={isOpen}
    onClose={onClose}
    closeOnEscape={false}
>
    <ModalContent />
</Modal>

// Modal completamente personalizado
<Modal
    isOpen={isOpen}
    onClose={onClose}
    size="2xl"
    className="border-2 border-blue-500 shadow-2xl"
    overlayClassName="bg-black bg-opacity-75 backdrop-blur-sm"
>
    <div className="p-8 bg-gradient-to-br from-blue-50 to-purple-50">
        <ModalContent />
    </div>
</Modal>
```

### Personalización del Overlay

El modal incluye opciones avanzadas para personalizar la apariencia del fondo:

```jsx
// Overlay con color personalizado (azul semi-transparente)
<Modal
    isOpen={isOpen}
    onClose={onClose}
    overlayColor="bg-blue-600 bg-opacity-40"
>
    <ModalContent />
</Modal>

// Overlay sin blur
<Modal
    isOpen={isOpen}
    onClose={onClose}
    blurBackground={false}
>
    <ModalContent />
</Modal>

// Overlay completamente personalizado
<Modal
    isOpen={isOpen}
    onClose={onClose}
    overlayColor="bg-gradient-to-br from-purple-900 to-blue-900 bg-opacity-80"
    blurBackground={true}
>
    <ModalContent />
</Modal>

// Overlay con múltiples efectos
<Modal
    isOpen={isOpen}
    onClose={onClose}
    overlayColor="bg-black bg-opacity-60"
    overlayClassName="backdrop-saturate-150 backdrop-brightness-75"
    blurBackground={true}
>
    <ModalContent />
</Modal>
```

## Gestión de Estado Múltiple

Para manejar múltiples modales en una aplicación:

```jsx
const [modals, setModals] = useState({
    confirmation: false,
    success: false,
    error: false,
    settings: false,
});

const openModal = (modalName) => {
    setModals(prev => ({ ...prev, [modalName]: true }));
};

const closeModal = (modalName) => {
    setModals(prev => ({ ...prev, [modalName]: false }));
};

const closeAllModals = () => {
    setModals(Object.fromEntries(Object.keys(modals).map(key => [key, false])));
};

// Uso
<Modal isOpen={modals.confirmation} onClose={() => closeModal('confirmation')}>
    <ConfirmationContent />
</Modal>

<Modal isOpen={modals.success} onClose={() => closeModal('success')}>
    <SuccessContent />
</Modal>
```

## Accesibilidad

El componente incluye soporte completo para accesibilidad:

### ARIA Labels y Roles

-   `role="dialog"` - Identifica el elemento como un diálogo
-   `aria-modal="true"` - Indica que es modal
-   `aria-labelledby` - Referencia al título del modal
-   `aria-hidden="true"` - Para el ícono de cerrar

### Gestión del Foco

-   **Foco automático**: El modal recibe foco al abrirse
-   **Trap de foco**: El foco se mantiene dentro del modal
-   **Restauración**: El foco vuelve al elemento que abrió el modal

### Navegación por Teclado

-   **Escape**: Cierra el modal (configurable)
-   **Tab**: Navega entre elementos focalizables
-   **Enter/Space**: Activa botones y controles

### Scroll Management

-   **Bloqueo automático**: El scroll del body se bloquea cuando el modal está abierto
-   **Restauración**: El scroll se restaura al cerrar el modal

## Casos de Uso

### 1. Confirmaciones

-   Eliminar elementos
-   Confirmar acciones destructivas
-   Verificar cambios importantes

### 2. Formularios

-   Formularios de contacto
-   Edición de perfiles
-   Creación de contenido

### 3. Notificaciones

-   Mensajes de éxito
-   Alertas de error
-   Información importante

### 4. Galerías y Media

-   Visualización de imágenes
-   Reproductores de video
-   Carruseles de contenido

### 5. Configuraciones

-   Paneles de configuración
-   Ajustes de usuario
-   Preferencias de aplicación

### 6. Dashboards Embebidos

-   Reportes detallados
-   Gráficos interactivos
-   Herramientas de análisis

## Notas Técnicas

### Rendimiento

-   **Lazy rendering**: El modal solo se renderiza cuando `isOpen` es `true`
-   **Cleanup automático**: Los event listeners se limpian automáticamente
-   **Optimización de re-renders**: Uso eficiente de useEffect y useRef

### Z-index y Apilamiento

-   **Z-index alto**: Usa `z-50` para aparecer sobre otros elementos
-   **Múltiples modales**: Soporte para modales apilados
-   **Portal rendering**: Se recomienda usar con React Portal para mejor control

### Responsive Design

-   **Breakpoints**: Los tamaños se adaptan a diferentes pantallas
-   **Margen automático**: Espacio automático en pantallas pequeñas
-   **Scroll vertical**: Soporte para contenido que excede la altura de pantalla

## ❌ Patrones a Evitar

### No hagas esto:

```jsx
// ❌ MALO: Modal sin función de cierre
<Modal isOpen={true}>
    <div>Contenido sin forma de cerrar</div>
</Modal>

// ❌ MALO: Múltiples modales sin gestión de estado
const [modal1, setModal1] = useState(false);
const [modal2, setModal2] = useState(false);
const [modal3, setModal3] = useState(false);
// ... se vuelve inmanejable

// ❌ MALO: Contenido del modal demasiado complejo
<Modal isOpen={isOpen} onClose={onClose}>
    <div className="p-6">
        <CompleteApplication />
        <FullDashboard />
        <EntireForm />
    </div>
</Modal>

// ❌ MALO: Modales anidados
<Modal isOpen={modal1} onClose={() => setModal1(false)}>
    <div>
        <button onClick={() => setModal2(true)}>Abrir otro modal</button>
        <Modal isOpen={modal2} onClose={() => setModal2(false)}>
            <div>Modal dentro de modal</div>
        </Modal>
    </div>
</Modal>

// ❌ MALO: No manejar estados de carga
<Modal isOpen={isOpen} onClose={onClose}>
    <form onSubmit={handleSubmit}>
        <input />
        <button type="submit">Enviar</button>
        {/* Sin feedback de loading o error */}
    </form>
</Modal>

// ❌ MALO: Tamaños inconsistentes para el contenido
<Modal isOpen={isOpen} onClose={onClose} size="xs">
    <div className="p-6">
        <h1>Formulario Muy Largo</h1>
        <input placeholder="Campo 1" />
        <input placeholder="Campo 2" />
        <textarea placeholder="Descripción larga..."></textarea>
        {/* Demasiado contenido para tamaño xs */}
    </div>
</Modal>
```

### Haz esto en su lugar:

```jsx
// ✅ BUENO: Gestión centralizada de modales
const useModals = () => {
    const [modals, setModals] = useState({});

    const openModal = (name) => setModals(prev => ({ ...prev, [name]: true }));
    const closeModal = (name) => setModals(prev => ({ ...prev, [name]: false }));

    return { modals, openModal, closeModal };
};

// ✅ BUENO: Contenido apropiado para el tamaño
<Modal isOpen={isOpen} onClose={onClose} size="sm">
    <div className="p-6">
        <h3>Confirmar acción</h3>
        <p>¿Estás seguro?</p>
        <div className="flex gap-3 mt-4">
            <Button onClick={onClose}>Cancelar</Button>
            <Button onClick={handleConfirm}>Confirmar</Button>
        </div>
    </div>
</Modal>

// ✅ BUENO: Manejo de estados de carga
const [isLoading, setIsLoading] = useState(false);

<Modal isOpen={isOpen} onClose={!isLoading ? onClose : undefined}>
    <form onSubmit={handleSubmit}>
        <div className="p-6">
            <input disabled={isLoading} />
            <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Enviando...' : 'Enviar'}
            </Button>
        </div>
    </form>
</Modal>

// ✅ BUENO: Usar overlay personalizado con propósito
<Modal
    isOpen={isOpen}
    onClose={onClose}
    overlayColor="bg-red-900 bg-opacity-30"
    blurBackground={true}
>
    <ErrorModal />
</Modal>
```

## Mejores Prácticas

1. **Títulos descriptivos**: Siempre incluye un título claro
2. **Acciones claras**: Botones con labels descriptivos
3. **Escape hatch**: Siempre proporciona una forma de cerrar
4. **Contenido conciso**: Mantén el contenido relevante y enfocado
5. **Responsive**: Considera el comportamiento en móviles
6. **Loading states**: Maneja estados de carga en formularios
7. **Error handling**: Incluye manejo de errores apropiado

## Próximas Mejoras

-   [ ] Soporte para React Portal automático
-   [ ] Animaciones de entrada/salida personalizables
-   [ ] Drag and drop para reposicionar
-   [ ] Resize handles para modales redimensionables
-   [ ] Templates predefinidos para casos comunes
