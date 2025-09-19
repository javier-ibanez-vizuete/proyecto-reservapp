import classNames from "classnames";
import { Spinner } from "./Spinner.jsx";

/**
 * LoadingButton Component - Botón con estado de carga integrado del sistema de diseño Eleven Code
 *
 * @param {Object} props - Propiedades del componente
 * @param {React.ReactNode} props.children - Contenido del botón (texto, iconos, etc.)
 * @param {boolean} [props.loading=false] - Estado de carga del botón
 * @param {boolean} [props.disabled=false] - Si el botón está deshabilitado
 * @param {'default' | 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'} [props.variant='primary'] - Estilo visual del botón
 * @param {'sm' | 'md' | 'lg' | 'xl'} [props.size='md'] - Tamaño del botón
 * @param {string} [props.loadingText='Cargando...'] - Texto a mostrar durante el estado de carga
 * @param {string} [props.className=''] - Clases CSS adicionales para personalización
 * @param {Function} [props.onClick] - Función que se ejecuta al hacer click
 * @param {Object} [props...rest] - Resto de props HTML del elemento button
 *
 * Valores aceptados:
 * - variant: 'default', 'primary', 'secondary', 'outline', 'ghost', 'danger'
 * - size: 'sm', 'md', 'lg', 'xl'
 * - loading: true, false
 * - disabled: true, false
 *
 * @component
 * @example
 * const [loading, setLoading] = useState(false);
 *
 * <LoadingButton
 *   loading={loading}
 *   onClick={handleSubmit}
 * >
 *   Enviar
 * </LoadingButton>
 *
 * @example
 * <LoadingButton
 *   loading={isUploading}
 *   loadingText="Subiendo archivo..."
 *   variant="primary"
 *   size="lg"
 * >
 *   Subir Archivo
 * </LoadingButton>
 */
export const LoadingButton = ({
    children,
    loading = false,
    disabled = false,
    variant = "default",
    size = "md",
    loadingText = "Cargando...",
    className = "",
    onClick,
    type = "button",
    ...props
}) => {
    const baseClasses =
        "inline-flex items-center justify-center font-medium rounded-md transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 cursor-pointer relative";

    const variantClasses = {
        default: "bg-gray-50 text-text-color border border-gray-500 hover:bg-gray-500/80 focus:ring-gray-900",
        primary:
            "bg-primary-color text-text-color border border-primary-color hover:bg-primary-color/80 focus:ring-primary-color shadow-sm",
        secondary:
            "bg-secondary-color text-text-color border border-secondary-color hover:bg-secondary-color/80 focus:ring-secondary-color shadow-sm",
        outline: "bg-transparent text-text-color border border-gray-300 hover:bg-gray-50 focus:ring-gray-500",
        ghost: "bg-transparent text-text-color border-transparent hover:bg-gray-100 focus:ring-gray-500",
        danger: "bg-error-500 text-white border border-error-600 hover:bg-error-600 focus:ring-error-500 shadow-sm",
    };

    const sizeClasses = {
        sm: "px-3 py-1.5 text-base",
        md: "px-4 py-2 text-md",
        lg: "px-6 py-3 text-md",
        xl: "px-8 py-4 text-lg",
    };

    const spinnerSizeMap = {
        sm: "sm",
        md: "sm",
        lg: "md",
        xl: "md",
    };

    const isDisabled = disabled || loading;

    const buttonClasses = classNames(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        {
            "opacity-50 cursor-not-allowed pointer-events-none": isDisabled,
            "hover:scale-105 hover:shadow-lg transform": !isDisabled && variant !== "ghost",
            "hover:shadow-brand-400/25": !isDisabled && variant === "primary",
            "hover:shadow-blue-400/25": !isDisabled && variant === "secondary",
        },
        className
    );

    const handleClick = (event) => {
        if (!isDisabled && onClick) {
            onClick(event);
        }
    };

    const getSpinnerColor = () => {
        if (variant === "primary" || variant === "danger") return "white";
        return "primary";
    };

    return (
        <button
            type={type}
            disabled={isDisabled}
            onClick={handleClick}
            className={buttonClasses}
            aria-busy={loading}
            {...props}
        >
            {loading && <Spinner size={spinnerSizeMap[size]} color={getSpinnerColor()} className="mr-2" />}
            <span className={loading ? "opacity-75" : ""}>{loading ? loadingText : children}</span>
        </button>
    );
};
