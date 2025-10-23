import classNames from "classnames";
import React, { useMemo } from "react";
import { useDevice } from "../../../hooks/useDevice";

/**
 * AdminDropdownMenu - Menu container for dropdown items
 *
 * Container that holds dropdown items and manages their styling.
 * Automatically positioned relative to trigger and supports multiple variants.
 *
 * @component
 * @example
 * <AdminDropdownMenu>
 *   <AdminDropdownItem>Option 1</AdminDropdownItem>
 *   <AdminDropdownItem>Option 2</AdminDropdownItem>
 *   <AdminDropdownDivider />
 *   <AdminDropdownItem>Option 3</AdminDropdownItem>
 * </AdminDropdownMenu>
 */
export const AdminDropdownMenu = ({
    /**
     * Child elements (usually AdminDropdownItem components)
     */
    children,

    /**
     * Whether menu is currently open (injected by parent)
     */
    isOpen,

    /**
     * Callback to close menu (injected by parent)
     */
    onClose,

    /**
     * Placement classes (injected by parent)
     */
    placement,

    /**
     * Color variant (injected by parent)
     */
    variant,

    /**
     * Padding size (injected by parent)
     */
    padding,

    /**
     * Gap between items (injected by parent)
     */
    gap,

    /**
     * Border radius (injected by parent)
     */
    rounded,

    /**
     * Current theme (injected by parent)
     */
    theme,

    /**
     * Additional CSS classes
     */
    className = "",

    /**
     * Additional props
     */
    ...props
}) => {
    const { isMobile2Xs, isMobileXs, isMobileSm, isTablet, isDesktop } = useDevice();

    /**
     * Color variants for menu
     */
    const variantsColor = {
        default: classNames("shadow-lg border", {
            "bg-white border-admin-text-color/20": theme === "light",
            "bg-admin-background-dark border-admin-text-color-dark/20": theme !== "light",
        }),
        primary: "shadow-lg border bg-admin-primary-color border-admin-primary-color/90",
        secondary: "shadow-lg border bg-admin-secondary-color border-admin-secondary-color/90",
        outline: classNames("shadow-lg border bg-transparent", {
            "border-admin-text-color": theme === "light",
            "border-admin-text-color-dark": theme !== "light",
        }),
        ghost: "shadow-lg bg-transparent border-transparent backdrop-blur-sm",
        background: classNames("shadow-lg border", {
            "bg-admin-background border-admin-background/90": theme === "light",
            "bg-admin-background-dark border-admin-background-dark/90": theme !== "light",
        }),
        accent: classNames("shadow-lg border", {
            "bg-admin-accent-background border-admin-accent-background/90": theme === "light",
            "bg-admin-accent-background-dark border-admin-accent-background-dark/90": theme !== "light",
        }),
    };

    /**
     * Padding variants
     */
    const variantsPadding = {
        default: "p-sm",
        none: "p-0",
        xs: "p-xs",
        sm: "p-sm",
        md: "p-md",
        lg: "p-lg",
        xl: "p-xl",
    };

    /**
     * Gap variants
     */
    const variantsGap = {
        default: "gap-sm",
        none: "gap-0",
        xs: "gap-xs",
        sm: "gap-sm",
        md: "gap-md",
        lg: "gap-lg",
        xl: "gap-xl",
    };

    /**
     * Rounded variants
     */
    const variantsRounded = {
        default: "rounded-default",
        none: "rounded-0",
        xs: "rounded-xs",
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        xl: "rounded-xl",
    };

    /**
     * Auto-configuration based on screen size and theme
     */
    const autoConfig = useMemo(
        () => ({
            padding: classNames({
                "px-xs py-2xs": isMobile2Xs || isMobileXs,
                "px-sm py-xs": isMobileSm,
                "px-md py-sm": isTablet || isDesktop,
            }),
            gap: classNames({
                "gap-xs": isMobile2Xs || isMobileXs,
                "gap-sm": isMobileSm || isTablet,
                "gap-md": isDesktop,
            }),
            rounded: classNames({
                "rounded-sm": isMobile2Xs || isMobileXs,
                "rounded-default": isMobileSm || isTablet,
                "rounded-md": isDesktop,
            }),
            color: classNames("bg-transparent border shadow-sm lg:hover:shadow-md", {
                "border-admin-text-color/90 lg:hover:bg-admin-text-color/10": theme === "light",
                "border-admin-text-color-dark/90 lg:hover:bg-admin-text-color-dark/10": theme !== "light",
            }),
        }),
        [isMobile2Xs, isMobileXs, isMobileSm, isTablet, isDesktop, theme]
    );

    /**
     * Menu classes with animations and variants
     */
    const menuClasses = classNames(
        "absolute z-50 min-w-max flex flex-col",
        "transition-all duration-200 ease-in-out",
        "overflow-hidden",
        {
            "opacity-0 invisible scale-95 pointer-events-none": !isOpen,
            "opacity-100 visible scale-100": isOpen,
        },
        placement,
        variantsColor[variant] || autoConfig?.color || variantsColor.default,
        variantsPadding[padding] || autoConfig?.padding || variantsPadding.default,
        variantsGap[gap] || autoConfig?.gap || variantsGap.default,
        variantsRounded[rounded] || autoConfig?.rounded || variantsRounded.default,
        className
    );

    if (!isOpen) return null;

    return (
        <div className={menuClasses} role="menu" {...props}>
            {React.Children.map(children, (child) => {
                if (React.isValidElement(child)) {
                    return React.cloneElement(child, { onClose });
                }
                return child;
            })}
        </div>
    );
};
