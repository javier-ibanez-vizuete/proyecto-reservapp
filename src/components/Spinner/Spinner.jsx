import classNames from "classnames";

/**
 * Spinner Component - Indicador de carga visual del sistema de diseño Eleven Code
 *
 * @param {Object} props - Propiedades del componente
 * @param {'sm' | 'md' | 'lg' | 'xl'} [props.size='md'] - Tamaño del spinner
 * @param {'primary' | 'secondary' | 'white' | 'gray' | 'success' | 'warning' | 'error'} [props.color='primary'] - Color del spinner
 * @param {string} [props.className=''] - Clases CSS adicionales para personalización
 * @param {Object} [props...rest] - Resto de props HTML del elemento SVG
 *
 * Valores aceptados:
 * - size: 'sm' (16x16px), 'md' (24x24px), 'lg' (32x32px), 'xl' (48x48px)
 * - color: 'primary', 'secondary', 'white', 'gray', 'success', 'warning', 'error'
 *
 * @component
 * @example
 * <Spinner />
 *
 * @example
 * <Spinner size="lg" color="success" />
 *
 * @example
 * <div className="flex items-center gap-2">
 *   <Spinner size="sm" color="primary" />
 *   <span>Cargando datos...</span>
 * </div>
 */
export const Spinner = ({ size = "md", color = "primary", className = "", ...props }) => {
    const sizeClasses = {
        sm: "w-4 h-4",
        md: "w-6 h-6",
        lg: "w-8 h-8",
        xl: "w-12 h-12",
        xxl: "w-18 h-18",
        xxxl: "w-24 h-24",
    };

    const colorClasses = {
        primary: "text-primary-color",
        secondary: "text-secondary-color",
        white: "text-white",
        gray: "text-gray-500",
        success: "text-green-500",
        warning: "text-amber-500",
        error: "text-red-500",
    };

    const spinnerClasses = classNames("animate-spin", sizeClasses[size], colorClasses[color], className);

    return (
        <svg
            className={spinnerClasses}
            fill="none"
            viewBox="0 0 24 24"
            role="status"
            aria-label="Cargando"
            {...props}
        >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
        </svg>
    );
};
