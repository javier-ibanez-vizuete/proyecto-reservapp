import classNames from "classnames";

export const Card = ({
    children,
    variant = "default",
    padding = "md",
    shadow = "md",
    rounded = "md",
    border = false,
    hover = "none",
    className = "",
    ...props
}) => {
    const baseClasses = "bg-white transition-all duration-200";

    const variantClasses = {
        default: "border-gray-200",
        primary: "border-primary",
        secondary: "border-secondary",
        success: "border-success-500",
        warning: "border-warning-500",
        danger: "border-error-500",
        glass: "backdrop-blur-md bg-white/70 border-white/20",
    };

    const paddingClasses = {
        none: "p-0",
        sm: "p-3",
        md: "p-4",
        lg: "p-6",
        xl: "p-8",
    };

    const shadowClasses = {
        none: "shadow-none",
        sm: "shadow-sm",
        md: "shadow-md",
        lg: "shadow-lg",
        xl: "shadow-xl",
        "2xl": "shadow-2xl",
    };

    const roundedClasses = {
        none: "rounded-none",
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        xl: "rounded-xl",
        "2xl": "rounded-2xl",
        full: "rounded-full",
    };

    const hoverClasses = {
        none: "",
        lift: "transition-all duration-200 ease-in-out hover:-translate-y-1 hover:shadow-lg",
        scale: "transition-transform duration-200 ease-in-out hover:scale-105",
        glow: "transition-shadow duration-200 ease-in-out hover:shadow-lg hover:shadow-primary/25",
    };

    const cardClasses = classNames(
        baseClasses,
        paddingClasses[padding],
        shadowClasses[shadow],
        roundedClasses[rounded],
        {
            [`border ${variantClasses[variant]}`]: border || variant !== "default",
            border: border,
        },
        hover && hover !== "none" ? hoverClasses[hover] : "",
        className
    );

    return (
        <div className={cardClasses} {...props}>
            {children}
        </div>
    );
};
