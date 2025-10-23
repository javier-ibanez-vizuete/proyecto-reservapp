import classNames from "classnames";
import React, { useContext, useMemo } from "react";
import { ThemeContext } from "../../../contexts/ThemeContext";
import { useDevice } from "../../../hooks/useDevice";

/**
 * AdminDropdownTrigger - Trigger element for the dropdown
 *
 * This component acts as the clickable/hoverable element that opens the dropdown menu.
 * It can wrap any content (buttons, text, icons, etc.).
 *
 * @component
 * @example
 * <AdminDropdownTrigger>
 *   <AdminButton>Open Menu</AdminButton>
 * </AdminDropdownTrigger>
 *
 * @example
 * <AdminDropdownTrigger>
 *   <div className="flex items-center gap-2">
 *     <Avatar />
 *     <span>User Name</span>
 *     <ChevronDown />
 *   </div>
 * </AdminDropdownTrigger>
 */
export const AdminDropdownTrigger = React.forwardRef(
    (
        {
            children,
            variant,
            padding,
            rounded,
            onClick,
            isOpen,
            disabled,
            shadow = true,
            className = "",
            ...props
        },
        ref
    ) => {
        const { isMobile2Xs, isMobileXs, isMobileSm, isTablet, isDesktop } = useDevice();
        const { theme } = useContext(ThemeContext);

        /**
         * Trigger classes with responsive behavior
         */
        const baseTriggerClasses = classNames(
            "cursor-pointer transition-all duration-500 ease-in-out lg:focus:outline-none lg:focus:ring-1 lg:focus:ring-offset-2",
            {
                "cursor-not-allowed": disabled,
                "shadow-sm": shadow,
            }
        );

        const variantsConfig = {
            default: {
                classes:
                    "bg-gray-400  border border-gray-500 shadow-sm hover:bg-gray-500/80 focus:ring-gray-900",
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
            accent: {
                classes: classNames("border", {
                    "bg-admin-accent-background border-admin-accent-background/90 lg:hover:bg-admin-accent-background/90 lg:focus:ring-admin-accent-background-dark":
                        theme === "light",
                    "bg-admin-accent-background-dark border-admin-accent-background-dark/90 lg:hover:bg-admin-accent-background-dark/90 lg:focus:ring-admin-accent-background":
                        theme !== "light",
                }),
                hasHoverEffects: true,
                hasActiveEffects: true,
                shadowColor: null,
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
            sm: "px-3 py-1",
            md: "px-4 py-2",
            lg: "px-6 py-3",
            xl: "px-8 py-4",
        };

        const variantsRounded = {
            default: "rounded-default",
            none: " ",
            xs: "rounded-xs",
            sm: "rounded-sm",
            md: "rounded-md",
            lg: "rounded-lg",
            xl: "rounded-xl",
        };

        const autoConfig = useMemo(
            () => ({
                padding: classNames({
                    "px-3 py-1.5": isMobile2Xs || isMobileXs || isMobileSm,
                    "px-4 py-2": isTablet || isDesktop,
                }),
                variant: classNames("border active:scale-95 active:shadow-md", {
                    "bg-admin-accent-background border-admin-accent-background/90 lg:hover:bg-admin-accent-background/90 lg:focus:ring-admin-accent-background-dark":
                        theme === "light",
                    "bg-admin-accent-background-dark border-admin-accent-background-dark/90 lg:hover:bg-admin-accent-background-dark/90 lg:focus:ring-admin-accent-background":
                        theme !== "light",
                }),
                rounded: classNames({
                    "rounded-xs": isMobile2Xs || isMobileXs,
                    "rounded-default": isMobileSm || isTablet || isDesktop,
                }),
            }),
            [isMobile2Xs, isMobileXs, isMobileSm, isTablet, isDesktop, theme]
        );

        const currentClasses = classNames(
            baseTriggerClasses,
            variantsConfig[variant]?.classes || autoConfig.variant || variantsConfig.default.classes,
            variantsPadding[padding] || autoConfig.padding || variantsPadding.default,
            variantsRounded[rounded] || autoConfig.rounded || variantsRounded.default,
            {
                "opacity-50 cursor-not-allowed pointer-events-none": disabled,
                "lg:hover:shadow-xl": !disabled && shadow && variantsConfig[variant]?.hasHoverEffects,
                "active:scale-95 active:shadow-lg": !disabled && variantsConfig[variant]?.hasActiveEffects,
            },
            className
        );

        return (
            <div
                ref={ref}
                onClick={onClick}
                className={currentClasses}
                role="button"
                tabIndex={disabled ? -1 : 0}
                aria-disabled={disabled}
                data-state={isOpen ? "open" : "closed"}
                {...props}
            >
                {typeof children === "string" && <p>{children}</p>}
                {typeof children !== "string" && children}
            </div>
        );
    }
);

AdminDropdownTrigger.displayName = "AdminDropdownTrigger";
