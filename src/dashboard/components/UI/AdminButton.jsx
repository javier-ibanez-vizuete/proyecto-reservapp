import classNames from "classnames";
import { useContext, useMemo } from "react";
import { ThemeContext } from "../../../contexts/ThemeContext";
import { useDevice } from "../../../hooks/useDevice";

export const AdminButton = ({ children, variant, padding, onClick, className = "", disabled, ...props }) => {
    const { isMobile2Xs, isMobileXs, isMobileSm, isTablet, isDesktop } = useDevice();
    const { theme } = useContext(ThemeContext);

    const handleClick = (event) => {
        if (!disabled) onClick?.(event);
    };

    const baseClasses =
        "lg:focus:outline-none lg:focus:ring-2 lg:focus:ring-offset-2 cursor-pointer transition-all duration-500 ease-in-out";

    const variantsConfig = {
        default: {
            classes: "bg-gray-400  border border-gray-500 shadow-sm hover:bg-gray-500/80 focus:ring-gray-900",
            hasHoverEffects: true,
            hasActiveEffects: true,
            shadowColor: null,
        },
        active: {
            classes: classNames("bg-gradient-to-tr hover:opacity-70", {
                "from-admin-primary-color via-[#0BABB0] to-admin-primary-hover": theme === "light",
                "from-admin-primary-color via-[#0A5A6E] to-admin-primary-hover": theme !== "light",
            }),
            hasHoverEffects: true,
            hasActiveEffects: true,
            shadowColor: null,
        },
        inactive: {
            classes: classNames("bg-gradient-to-tr opacity-70 hover:opacity-100", {
                "from-admin-secondary-color via-[#5ec1e8] to-admin-secondary-hover": theme === "light",
                "from-admin-secondary-color via-[#4cb0e8] to-admin-secondary-hover": theme !== "light",
            }),
            hasHoverEffects: true,
            hasActiveEffects: true,
            shadowColor: null,
        },
        primary: {
            classes:
                "bg-admin-primary-color border border-admin-primary-color/90 shadow-sm hover:bg-admin-primary-color/90 focus:ring-admin-primary-color",
            hasHoverEffects: true,
            hasActiveEffects: true,
            shadowColor: "hover:shadow-admin-primary-color/25",
        },
        secondary: {
            classes:
                "bg-admin-secondary-color border border-admin-secondary-color/90 shadow-sm hover:bg-admin-secondary-color/90 focus:ring-admin-secondary-color",
            hasHoverEffects: true,
            hasActiveEffects: true,
            shadowColor: "hover:shadow-admin-secondary-color/25",
        },
        outline: {
            classes: `bg-transparent border border-gray-500 shadow-sm hover:bg-gray-300 focus:ring-gray-500`,
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

    const variantsPadding = {
        default: "px-3 py-1.5",
        none: " ",
        "2xs": "px-1 py-0.5",
        xs: "px-2 py-1",
        sm: "px-3 py-1.5",
        md: "px-4 py-2",
        lg: "px-6 py-3",
        xl: "px-8 py-4",
    };

    const autoConfig = useMemo(
        () => ({
            padding: classNames({
                "px-3 py-1.5": isMobile2Xs || isMobileXs || isMobileSm,
                "px-4 py-2": isTablet || isDesktop,
            }),
        }),
        [isMobile2Xs, isMobileXs, isMobileSm, isTablet, isDesktop]
    );

    const currentVariant = variantsConfig[variant] || variantsConfig.default;

    const currentClasses = classNames(
        baseClasses,
        currentVariant.classes,
        variantsPadding[padding] || autoConfig.padding || variantsPadding.default,
        {
            "opacity-50 cursor-not-allowed pointer-events-none": disabled,
            "hover:shadow-lg": !disabled && currentVariant.hasHoverEffects,
            "active:scale-95 active:shadow-lg": !disabled && currentVariant.hasActiveEffects,
            [currentVariant.shadowColor]: !disabled && currentVariant.shadowColor,
        },
        className
    );

    return (
        <button type="button" disabled={disabled} onClick={handleClick} className={currentClasses} {...props}>
            {children}
        </button>
    );
};
