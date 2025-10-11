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
    onClose,
    type = "button",
    className = "",
    ...props
}) => {
    const handleClick = (event) => {
        if (!disabled) {
            onClick?.(event);
            onClose?.();
        }
    };

    const baseClasses = "lg:focus:outline-none lg:focus:ring-2 lg:focus:ring-offset-2";

    const variantConfig = {
        default: {
            classes: "bg-gray-400  border border-gray-500 shadow-sm hover:bg-gray-500/80 focus:ring-gray-900",
            hasHoverEffects: true,
            hasActiveEffects: true,
            shadowColor: null,
        },
        primary: {
            classes:
                "bg-primary-color border border-primary-color/90 shadow-sm hover:bg-primary-color/90 focus:ring-primary-color",
            hasHoverEffects: true,
            hasActiveEffects: true,
            shadowColor: "hover:shadow-primary-color/25",
        },
        secondary: {
            classes:
                "bg-secondary-color border border-secondary-color/90 shadow-sm hover:bg-secondary-color/90 focus:ring-secondary-color",
            hasHoverEffects: true,
            hasActiveEffects: true,
            shadowColor: "hover:shadow-secondary-color/25",
        },
        outline: {
            classes: `bg-transparent border border-gray-500 hover:bg-gray-300 focus:ring-gray-500`,
            hasHoverEffects: true,
            hasActiveEffects: true,
            shadowColor: null,
        },
        ghost: {
            classes: "bg-transparent border-transparent hover:bg-gray-200/50 focus:ring-gray-500",
            hasHoverEffects: false,
            hasActiveEffects: false,
            shadowColor: null,
        },
        danger: {
            classes:
                "bg-error-600 text-white border border-error-500 shadow-md hover:bg-error-500 focus:ring-error-500",
            hasHoverEffects: true,
            hasActiveEffects: true,
            shadowColor: "hover:shadow-error-600/25",
        },
        none: {
            classes: "",
            hasHoverEffects: false,
            hasActiveEffects: true,
            shadowColor: null,
        },
    };

    const sizeConfig = {
        "2xs": "px-1 py-0.5 text-2xs",
        xs: "px-2 py-1 text-2xs",
        sm: "px-3 py-1.5 text-base",
        md: "px-4 py-2 text-sm",
        lg: "px-6 py-3 text-md",
        xl: "px-8 py-4 text-lg",
    };

    const currentVariant = variantConfig[variant] || variantConfig.default;
    const currentSize = sizeConfig[size] || sizeConfig.md;

    const buttonClasses = classNames(
        baseClasses,
        currentVariant.classes,
        currentSize,
        {
            "opacity-50 cursor-not-allowed pointer-events-none": disabled,
            "hover:shadow-lg": !disabled && currentVariant.hasHoverEffects,
            "active:scale-95 active:shadow-lg": !disabled && currentVariant.hasActiveEffects,
            [currentVariant.shadowColor]: !disabled && currentVariant.shadowColor,
        },
        className
    );

    return (
        <button type={type} disabled={disabled} onClick={handleClick} className={buttonClasses} {...props}>
            {children}
        </button>
    );
};
