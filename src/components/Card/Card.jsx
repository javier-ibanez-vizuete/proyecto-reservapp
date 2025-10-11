import classNames from "classnames";
import { useContext, useMemo } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import { useDevice } from "../../hooks/useDevice";

export const Card = ({
    children,
    variant = "default",
    padding,
    shadow = "md",
    rounded,
    border = false,
    hover = "none",
    className = "",
    ...props
}) => {
    const { theme } = useContext(ThemeContext);
    const { isMobile2Xs, isMobileXs, isMobileSm, isTablet, isDesktop } = useDevice();

    const baseClasses = "transition-all duration-200";

    const variantClasses = {
        default: "bg-white border-gray-200",
        background: `${
            theme === "light"
                ? "bg-background border-background/50"
                : " bg-background-dark border-background-dark/50"
        }`,
        accent: `${
            theme === "light"
                ? "bg-accent-background border-accent-background/50"
                : "bg-accent-background-dark border-accent-background-dark/50"
        }`,
        primary: "bg-white border-primary-color",
        secondary: "bg-white border-secondary-color",
        success: "bg-white border-success-color",
        warning: "bg-white border-info-color",
        danger: "bg-white border-error-color",
        glass: "backdrop-blur-md bg-white/50 border-white/20",
    };

    const stylesConfigByDevice = useMemo(
        () => ({
            padding: classNames({
                "p-sm": isMobile2Xs || isMobileXs || isMobileSm || isTablet,
                "p-md": isDesktop,
            }),
            rounded: classNames({
                "rounded-md": isMobile2Xs || isMobileXs,
                "rounded-lg": isMobileSm || isTablet,
                "rounded-xl": isDesktop,
            }),
        }),
        [isMobile2Xs, isMobileXs, isMobileSm, isTablet, isDesktop]
    );

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
        paddingClasses[padding] || stylesConfigByDevice.padding,
        shadowClasses[shadow],
        roundedClasses[rounded] || stylesConfigByDevice.rounded,
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
