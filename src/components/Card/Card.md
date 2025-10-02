# Card Component

Sistema de tarjetas flexibles y reutilizables para agrupar contenido relacionado con múltiples estilos y configuraciones.

## Características

✅ **7 variantes visuales** - Default, Primary, Secondary, Success, Warning, Danger, Glass  
✅ **5 tamaños de padding** - Desde ninguno hasta extra largo  
✅ **7 niveles de sombra** - Control total de elevación  
✅ **8 opciones de border-radius** - Desde cuadrado hasta circular  
✅ **Efectos hover opcionales** - Animaciones sutiles de interacción  
✅ **Componentes anidados** - Header, Body, Title, Footer incluidos  
✅ **Altamente personalizable** - Clases CSS adicionales y props flexibles

## Componentes Incluidos

-   **Card** - Contenedor principal de la tarjeta
-   **CardHeader** - Cabecera con separador visual
-   **CardBody** - Contenido principal de la tarjeta
-   **CardTitle** - Título semántico configurable
-   **CardFooter** - Pie con acciones o información adicional

## Tipos de Efectos Hover

El componente Card ofrece cuatro tipos de efectos hover para mejorar la interactividad:

### `hover="none"`

Sin efectos de hover. Ideal para tarjetas puramente informativas.

### `hover="lift"`

Elevación con sombra expandida. Ideal para elementos interactivos importantes.

```jsx
// Implementado con Tailwind CSS:
"transition-all duration-200 ease-in-out hover:-translate-y-1 hover:shadow-lg";
```

### `hover="scale"` (Por defecto)

Escalado sutil al 105%. Ideal para tarjetas de productos o contenido navegable.

```jsx
// Implementado con Tailwind CSS:
"transition-transform duration-200 ease-in-out hover:scale-105";
```

### `hover="glow"`

Sombra con color primario para efectos de brillo. Excelente para destacar elementos importantes.

```jsx
// Implementado con Tailwind CSS:
"transition-shadow duration-200 ease-in-out hover:shadow-lg hover:shadow-primary/25";
```

## API

### Card Props

| Prop        | Tipo                                                                                     | Default     | Descripción                   |
| ----------- | ---------------------------------------------------------------------------------------- | ----------- | ----------------------------- |
| `children`  | `ReactNode`                                                                              | -           | Contenido de la tarjeta       |
| `variant`   | `'default' \| 'primary' \| 'secondary' \| 'success' \| 'warning' \| 'danger' \| 'glass'` | `'default'` | Variante visual de la tarjeta |
| `padding`   | `'none' \| 'sm' \| 'md' \| 'lg' \| 'xl'`                                                 | `'md'`      | Padding interno de la tarjeta |
| `shadow`    | `'none' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl'`                                        | `'md'`      | Nivel de sombra               |
| `rounded`   | `'none' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl' \| 'full'`                              | `'md'`      | Border radius                 |
| `border`    | `boolean`                                                                                | `false`     | Si muestra borde              |
| `hover`     | `'none' \| 'lift' \| 'scale' \| 'glow'`                                                  | `'scale'`   | Tipo de efecto hover          |
| `className` | `string`                                                                                 | `''`        | Clases CSS adicionales        |

### CardHeader Props

| Prop        | Tipo        | Default | Descripción            |
| ----------- | ----------- | ------- | ---------------------- |
| `children`  | `ReactNode` | -       | Contenido del header   |
| `className` | `string`    | `''`    | Clases CSS adicionales |

### CardBody Props

| Prop        | Tipo        | Default | Descripción            |
| ----------- | ----------- | ------- | ---------------------- |
| `children`  | `ReactNode` | -       | Contenido del body     |
| `className` | `string`    | `''`    | Clases CSS adicionales |

### CardTitle Props

| Prop        | Tipo                                           | Default | Descripción             |
| ----------- | ---------------------------------------------- | ------- | ----------------------- |
| `children`  | `ReactNode`                                    | -       | Contenido del título    |
| `as`        | `'h1' \| 'h2' \| 'h3' \| 'h4' \| 'h5' \| 'h6'` | `'h3'`  | Elemento HTML semántico |
| `className` | `string`                                       | `''`    | Clases CSS adicionales  |

### CardFooter Props

| Prop        | Tipo        | Default | Descripción            |
| ----------- | ----------- | ------- | ---------------------- |
| `children`  | `ReactNode` | -       | Contenido del footer   |
| `className` | `string`    | `''`    | Clases CSS adicionales |

## Ejemplos de Uso

### Uso Básico

```jsx
import { Card, CardHeader, CardBody, CardTitle } from "../components/Card";

function BasicCard() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Título de la Tarjeta</CardTitle>
            </CardHeader>
            <CardBody>Contenido principal de la tarjeta con información relevante.</CardBody>
        </Card>
    );
}
```

### Tarjeta Completa con Footer

```jsx
import { Card, CardHeader, CardBody, CardTitle, CardFooter } from "../components/Card";
import { Button } from "../components/Button";

function CompleteCard() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Producto Premium</CardTitle>
            </CardHeader>
            <CardBody>
                <p>Descripción detallada del producto con todas sus características.</p>
                <p className="text-2xl font-bold text-primary mt-4">$299.99</p>
            </CardBody>
            <CardFooter>
                <Button variant="outline">Favoritos</Button>
                <Button variant="primary">Comprar</Button>
            </CardFooter>
        </Card>
    );
}
```

### Variantes de Color

```jsx
function ColorVariants() {
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <Card variant="default" border>
                <CardBody>Default Card</CardBody>
            </Card>

            <Card variant="primary" border>
                <CardBody>Primary Card</CardBody>
            </Card>

            <Card variant="success" border>
                <CardBody>Success Card</CardBody>
            </Card>

            <Card variant="warning" border>
                <CardBody>Warning Card</CardBody>
            </Card>

            <Card variant="danger" border>
                <CardBody>Danger Card</CardBody>
            </Card>

            <Card variant="glass">
                <CardBody>Glass Effect Card</CardBody>
            </Card>
        </div>
    );
}
```

### Diferentes Tamaños y Sombras

```jsx
function SizesAndShadows() {
    return (
        <div className="space-y-6">
            {/* Diferentes paddings */}
            <div className="grid grid-cols-3 gap-4">
                <Card padding="sm" shadow="sm">
                    <CardBody>Small Padding</CardBody>
                </Card>
                <Card padding="md" shadow="md">
                    <CardBody>Medium Padding</CardBody>
                </Card>
                <Card padding="lg" shadow="lg">
                    <CardBody>Large Padding</CardBody>
                </Card>
            </div>

            {/* Diferentes sombras */}
            <div className="grid grid-cols-3 gap-4">
                <Card shadow="sm">
                    <CardBody>Sombra Pequeña</CardBody>
                </Card>
                <Card shadow="lg">
                    <CardBody>Sombra Grande</CardBody>
                </Card>
                <Card shadow="2xl">
                    <CardBody>Sombra Extra Grande</CardBody>
                </Card>
            </div>
        </div>
    );
}
```

### Border Radius Personalizado

```jsx
function BorderRadiusExamples() {
    return (
        <div className="grid grid-cols-4 gap-4">
            <Card rounded="none" border>
                <CardBody>Sin Redondeo</CardBody>
            </Card>
            <Card rounded="md" border>
                <CardBody>Redondeo Medio</CardBody>
            </Card>
            <Card rounded="xl" border>
                <CardBody>Redondeo Grande</CardBody>
            </Card>
            <Card rounded="full" border className="aspect-square flex items-center">
                <CardBody className="text-center">Circular</CardBody>
            </Card>
        </div>
    );
}
```

### Efectos Hover Interactivos

```jsx
function HoverEffects() {
    return (
        <div className="grid grid-cols-4 gap-4">
            <Card hover="none" border>
                <CardHeader>
                    <CardTitle>Sin Hover</CardTitle>
                </CardHeader>
                <CardBody>Sin efectos de interacción.</CardBody>
            </Card>

            <Card hover="lift" border>
                <CardHeader>
                    <CardTitle>Lift Effect</CardTitle>
                </CardHeader>
                <CardBody>Elevación hacia arriba con sombra.</CardBody>
            </Card>

            <Card hover="scale" border>
                <CardHeader>
                    <CardTitle>Scale Effect</CardTitle>
                </CardHeader>
                <CardBody>Escalado con zoom (por defecto).</CardBody>
            </Card>

            <Card hover="glow" border>
                <CardHeader>
                    <CardTitle>Glow Effect</CardTitle>
                </CardHeader>
                <CardBody>Brillo con sombra de color primario.</CardBody>
            </Card>
        </div>
    );
}
```

## Casos de Uso Comunes

### Tarjetas de Producto

```jsx
function ProductCard({ product }) {
    return (
        <Card hover="scale" border className="max-w-sm">
            <div className="aspect-w-16 aspect-h-9">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-t-md"
                />
            </div>
            <CardHeader>
                <CardTitle>{product.name}</CardTitle>
            </CardHeader>
            <CardBody>
                <p className="text-gray-600 mb-4">{product.description}</p>
                <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-primary">${product.price}</span>
                    <div className="flex items-center">
                        <span className="text-yellow-400">★</span>
                        <span className="ml-1">{product.rating}</span>
                    </div>
                </div>
            </CardBody>
            <CardFooter>
                <Button variant="outline" className="flex-1">
                    Favoritos
                </Button>
                <Button variant="primary" className="flex-1 ml-2">
                    Añadir al Carrito
                </Button>
            </CardFooter>
        </Card>
    );
}
```

### Tarjetas de Usuario/Perfil

```jsx
function UserCard({ user }) {
    return (
        <Card variant="glass" className="text-center">
            <CardHeader>
                <div className="w-20 h-20 mx-auto mb-4">
                    <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-full h-full rounded-full object-cover"
                    />
                </div>
                <CardTitle as="h2">{user.name}</CardTitle>
                <p className="text-gray-500">{user.role}</p>
            </CardHeader>
            <CardBody>
                <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                        <p className="text-2xl font-bold text-primary">{user.posts}</p>
                        <p className="text-sm text-gray-500">Posts</p>
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-primary">{user.followers}</p>
                        <p className="text-sm text-gray-500">Seguidores</p>
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-primary">{user.following}</p>
                        <p className="text-sm text-gray-500">Siguiendo</p>
                    </div>
                </div>
            </CardBody>
            <CardFooter className="justify-center">
                <Button variant="primary">Seguir</Button>
            </CardFooter>
        </Card>
    );
}
```

### Dashboard/Estadísticas

```jsx
function StatsCard({ title, value, change, trend }) {
    const trendColor = trend === "up" ? "text-success-600" : "text-error-600";
    const trendIcon = trend === "up" ? "↗" : "↘";

    return (
        <Card>
            <CardBody>
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-500">{title}</p>
                        <p className="text-3xl font-bold text-gray-900">{value}</p>
                    </div>
                    <div className={`text-sm ${trendColor} flex items-center`}>
                        <span className="mr-1">{trendIcon}</span>
                        {change}%
                    </div>
                </div>
            </CardBody>
        </Card>
    );
}

function Dashboard() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatsCard title="Ventas Totales" value="$54,239" change={12.5} trend="up" />
            <StatsCard title="Usuarios Activos" value="2,431" change={-2.1} trend="down" />
            <StatsCard title="Conversiones" value="28.5%" change={5.4} trend="up" />
            <StatsCard title="Bounce Rate" value="42.3%" change={-1.2} trend="down" />
        </div>
    );
}
```

### Formularios en Tarjetas

```jsx
function FormCard() {
    return (
        <Card className="max-w-md mx-auto">
            <CardHeader>
                <CardTitle>Iniciar Sesión</CardTitle>
                <p className="text-gray-500">Ingresa a tu cuenta</p>
            </CardHeader>
            <CardBody>
                <form className="space-y-4">
                    <div>
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="tu@email.com" required />
                    </div>
                    <div>
                        <Label htmlFor="password">Contraseña</Label>
                        <Input id="password" type="password" placeholder="••••••••" required />
                    </div>
                    <div className="flex items-center">
                        <Checkbox id="remember" />
                        <Label htmlFor="remember" className="ml-2">
                            Recordarme
                        </Label>
                    </div>
                </form>
            </CardBody>
            <CardFooter className="flex-col space-y-3">
                <Button variant="primary" className="w-full">
                    Iniciar Sesión
                </Button>
                <Button variant="ghost" className="w-full">
                    ¿Olvidaste tu contraseña?
                </Button>
            </CardFooter>
        </Card>
    );
}
```

### Notificaciones/Alertas

```jsx
function NotificationCard({ type, title, message, time }) {
    const variants = {
        success: "success",
        warning: "warning",
        error: "danger",
        info: "primary",
    };

    return (
        <Card variant={variants[type]} border className="mb-4">
            <CardBody>
                <div className="flex items-start">
                    <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{title}</h4>
                        <p className="text-gray-600 mt-1">{message}</p>
                        <p className="text-xs text-gray-400 mt-2">{time}</p>
                    </div>
                    <Button variant="ghost" size="sm">
                        ×
                    </Button>
                </div>
            </CardBody>
        </Card>
    );
}
```

## Buenas Prácticas

### ✅ Recomendado

-   **Estructura semántica**: Usa CardHeader, CardBody, CardFooter apropiadamente
-   **Consistencia visual**: Mantén el mismo estilo de cards en secciones relacionadas
-   **Contenido relevante**: Agrupa información lógicamente relacionada
-   **Accesibilidad**: Usa CardTitle con elementos h1-h6 apropiados
-   **Responsive design**: Considera cómo se comportan las cards en diferentes pantallas

```jsx
// ✅ Bueno - Estructura clara y semántica
<Card>
    <CardHeader>
        <CardTitle as="h2">Título del Artículo</CardTitle>
        <p>Fecha de publicación</p>
    </CardHeader>
    <CardBody>
        <p>Contenido principal del artículo...</p>
    </CardBody>
    <CardFooter>
        <Button variant="primary">Leer más</Button>
    </CardFooter>
</Card>

// ✅ Bueno - Grid responsive para múltiples cards
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {products.map(product => (
        <ProductCard key={product.id} product={product} />
    ))}
</div>

// ✅ Bueno - Hover effects para interactividad
<Card hover="scale" border>
    <CardBody>Contenido interactivo con escalado</CardBody>
</Card>

<Card hover="lift" border>
    <CardBody>Contenido con efecto de elevación</CardBody>
</Card>

<Card hover="glow" border>
    <CardBody>Contenido con efecto de brillo</CardBody>
</Card>
```

### ❌ Evitar

-   **Anidación excesiva** de cards dentro de cards
-   **Contenido desbordante** que rompa el diseño
-   **Colores inconsistentes** mezclando variantes sin criterio
-   **Falta de padding** cuando el contenido lo necesita
-   **Cards vacías** sin contenido significativo

```jsx
// ❌ Malo - Anidación innecesaria
<Card>
    <Card>
        <Card>Demasiado anidado</Card>
    </Card>
</Card>

// ❌ Malo - Mezcla de variantes sin criterio
<div>
    <Card variant="success">Elemento 1</Card>
    <Card variant="danger">Elemento 2</Card>
    <Card variant="warning">Elemento 3</Card>
    <!-- Sin relación lógica entre variantes -->
</div>

// ❌ Malo - Sin padding cuando se necesita
<Card padding="none">
    <p>Texto pegado a los bordes</p> <!-- Difícil de leer -->
</Card>
```

## Accesibilidad

### Características Incluidas

-   **Estructura semántica** - CardTitle usa elementos h1-h6 apropiados
-   **Contraste adecuado** - Colores que cumplen estándares WCAG
-   **Navegación por teclado** - Compatible con lectores de pantalla
-   **ARIA labels** - Cuando es necesario para contexto adicional

### Mejores Prácticas

```jsx
// Uso de headings semánticamente correctos
<Card>
    <CardHeader>
        <CardTitle as="h2">Título Principal</CardTitle>
        <CardTitle as="h3">Subtítulo</CardTitle>
    </CardHeader>
    <CardBody>
        <p>Contenido accesible...</p>
    </CardBody>
</Card>

// Añadir ARIA labels cuando sea necesario
<Card aria-label="Información del producto">
    <CardBody>
        Información importante del producto
    </CardBody>
</Card>

// Asegurar contraste suficiente en contenido personalizado
<Card>
    <CardBody>
        <p className="text-gray-900">Texto con buen contraste</p>
    </CardBody>
</Card>
```

## Personalización CSS

### Variables CSS Disponibles

```css
:root {
    /* Colores de variantes */
    --color-primary: #3b82f6;
    --color-secondary: #6b7280;
    --color-success-500: #10b981;
    --color-warning-500: #f59e0b;
    --color-error-500: #ef4444;

    /* Sombras */
    --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
    --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
    --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);

    /* Border radius */
    --rounded-md: 0.375rem;
    --rounded-lg: 0.5rem;
    --rounded-xl: 0.75rem;
}
```

### Clases Personalizadas

```css
/* Efectos hover personalizados */
.card-hover-custom {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.card-hover-custom:hover {
    transform: translateY(-4px) scale(1.02);
    box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1);
}

/* Gradientes personalizados */
.card-gradient {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
}

/* Animaciones de entrada */
.card-fade-in {
    animation: fadeInUp 0.6s ease-out;
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
```

### Ejemplo de Personalización Avanzada

```jsx
function CustomCard() {
    return (
        <Card className="card-gradient card-fade-in relative overflow-hidden" hover="glow">
            {/* Patrón decorativo de fondo */}
            <div className="absolute inset-0 opacity-10">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                    <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                        <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="1" />
                    </pattern>
                    <rect width="100" height="100" fill="url(#grid)" />
                </svg>
            </div>

            <CardHeader className="relative z-10">
                <CardTitle className="text-white">Tarjeta Personalizada</CardTitle>
            </CardHeader>
            <CardBody className="relative z-10">
                <p className="text-white/90">Contenido con diseño personalizado y efectos visuales.</p>
            </CardBody>
        </Card>
    );
}
```

## Guía de Uso por Contexto

### Cuándo usar cada tipo de hover:

| Tipo de Hover | Casos de Uso Ideales                           | Ejemplos                                                       |
| ------------- | ---------------------------------------------- | -------------------------------------------------------------- |
| **`none`**    | Contenido estático, información no interactiva | Estadísticas, métricas, contenido de solo lectura              |
| **`lift`**    | Elementos clickeables, acciones importantes    | Botones de acción, enlaces principales, CTAs                   |
| **`scale`**   | Navegación, productos, contenido explorable    | Tarjetas de producto, artículos, galerías                      |
| **`glow`**    | Elementos destacados, contenido premium        | Planes de precio, características premium, alertas importantes |

### Ejemplos por Contexto:

```jsx
// Dashboard - Sin hover para métricas
<Card hover="none">
    <CardBody>
        <h3>Ventas del Mes</h3>
        <p className="text-3xl font-bold">$12,450</p>
    </CardBody>
</Card>

// E-commerce - Scale para productos
<Card hover="scale" border>
    <img src="product.jpg" alt="Producto" />
    <CardBody>
        <h3>MacBook Pro</h3>
        <p>$2,499</p>
    </CardBody>
</Card>

// Call-to-action - Lift para acciones
<Card hover="lift" variant="primary" border>
    <CardBody className="text-center">
        <h3>¡Únete Ahora!</h3>
        <Button>Registrarse</Button>
    </CardBody>
</Card>

// Premium content - Glow para destacar
<Card hover="glow" variant="warning" border>
    <CardHeader>
        <CardTitle>Plan Premium ✨</CardTitle>
    </CardHeader>
    <CardBody>
        <p>Acceso completo a todas las funcionalidades</p>
    </CardBody>
</Card>
```
