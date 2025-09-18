import classNames from "classnames";

/**
 * Button Component - Botón versátil del sistema de diseño Eleven Code
 *
 * @param {Object} props - Propiedades del componente
 * @param {React.ReactNode} props.children - Contenido del botón (texto, iconos, etc.)
 * @param {'default' | 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'} [props.variant='default'] - Estilo visual del botón
 * @param {'sm' | 'md' | 'lg' | 'xl'} [props.size='md'] - Tamaño del botón
 * @param {boolean} [props.disabled=false] - Si el botón está deshabilitado
 * @param {Function} [props.onClick] - Función que se ejecuta al hacer click
 * @param {'button' | 'submit' | 'reset'} [props.type='button'] - Tipo de botón HTML
 * @param {string} [props.className=''] - Clases CSS adicionales para personalización
 * @param {Object} [props...rest] - Resto de props HTML del elemento button
 *
 * Valores aceptados:
 * - variant: 'default', 'primary', 'secondary', 'outline', 'ghost', 'danger'
 * - size: 'sm', 'md', 'lg', 'xl'
 * - type: 'button', 'submit', 'reset'
 * - disabled: true, false
 */
export const Button = ({
    children,
    variant = "default",
    size = "md",
    disabled = false,
    onClick,
    type = "button",
    className = "",
    ...props
}) => {
    const baseClasses =
        "inline-flex items-center justify-center font-medium rounded-md transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 cursor-pointer";

    const variantConfig = {
        default: {
            classes:
                "bg-primary-color text-text-color border border-primary-color hover:bg-primary-color/80 focus:ring-gray-900",
            hasHoverEffects: true,
            shadowColor: null,
        },
        primary: {
            classes:
                "bg-primary-color text-text-color border border-primary-color hover:bg-primary-color/80 focus:ring-primary-color shadow-sm",
            hasHoverEffects: true,
            shadowColor: "hover:shadow-primary-color/25",
        },
        secondary: {
            classes:
                "bg-secondary-color text-text-color border border-secondary-color hover:bg-secondary-color/80 focus:ring-secondary-color shadow-sm",
            hasHoverEffects: true,
            shadowColor: "hover:shadow-secondary-color/25",
        },
        outline: {
            classes:
                "bg-transparent text-text-color border border-gray-700 hover:bg-gray-200/50 focus:ring-gray-500",
            hasHoverEffects: true,
            shadowColor: null,
        },
        ghost: {
            classes:
                "bg-transparent text-text-color border-transparent hover:bg-gray-100 focus:ring-gray-500",
            hasHoverEffects: false,
            shadowColor: null,
        },
        danger: {
            classes:
                "bg-error-500 text-white border border-error-600 hover:bg-error-600 focus:ring-error-500 shadow-sm",
            hasHoverEffects: true,
            shadowColor: "hover:shadow-error-500/25",
        },
    };

    const sizeConfig = {
        sm: "px-3 py-1.5 text-base",
        md: "px-4 py-2 text-base",
        lg: "px-6 py-3 text-sm",
        xl: "px-8 py-4 text-md",
    };

    const currentVariant = variantConfig[variant] || variantConfig.default;
    const currentSize = sizeConfig[size] || sizeConfig.md;

    const buttonClasses = classNames(
        baseClasses,
        currentVariant.classes,
        currentSize,
        {
            "opacity-50 cursor-not-allowed pointer-events-none": disabled,
            "hover:scale-105 hover:shadow-lg transform": !disabled && currentVariant.hasHoverEffects,
            [currentVariant.shadowColor]: !disabled && currentVariant.shadowColor,
        },
        className
    );

    return (
        <button type={type} disabled={disabled} onClick={onClick} className={buttonClasses} {...props}>
            {children}
        </button>
    );
};

// import classNames from "classnames";

// export const Button = ({ className = "", children, onClick, variant = "normal", ...props }) => {
//     const baseClasses =
//         "inline-flex lg:py-landing-sm py-landing-xs lg:px-6 px-4 rounded cursor-pointer elevation transition-colors duration-200";

//     const normal = "bg-primary text-white border border-primary";

//     const outline = "bg-transparent text-primary border border-primary";

//     const variantClasses = variant === "outline" ? outline : normal;
//     return (
//         <button className={classNames(baseClasses, variantClasses, className)} onClick={onClick} {...props}>
//             {children}
//         </button>
//     );
// };
