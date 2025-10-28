import classNames from "classnames";
import React, { useContext, useEffect, useMemo, useRef } from "react";
import { ThemeContext } from "../../../contexts/ThemeContext";
import { useDevice } from "../../../hooks/useDevice";
import { useWindowWidth } from "../../../hooks/useWindowWidth";

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
     * Color variant
     */
    variant,

    /**
     * Padding size
     */
    padding,

    /**
     * Gap between items
     */
    gap,

    /**
     * Border radius
     */
    rounded,

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
    const { theme } = useContext(ThemeContext);
    const width = useWindowWidth();

    const containerRef = useRef(null);

    const containerItemHeightConfig = useMemo(
        () =>
            classNames({
                "max-h-[60vh]": isMobile2Xs || isMobileXs || isMobileSm,
                "max-h-[50vh]": isTablet,
                "max-h-[40vh]": isDesktop,
            }),
        [isMobile2Xs, isMobileXs, isMobileSm, isTablet, isDesktop]
    );

    useEffect(() => {
        if (!containerRef?.current) return;

        const container = containerRef.current;

        if (isOpen) {
            container.style.display = "flex";

            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    container.style.visibility = "visible";
                    container.style.opacity = "1";
                    container.style.height = `auto`;
                });
            });
        }
        if (!isOpen) {
            container.style.opacity = 0;
            container.style.height = 0;

            const timeOut = setTimeout(() => {
                if (container) {
                    container.style.visibility = "hidden";
                    container.style.display = "none";
                }
            }, 500);
            return () => clearTimeout(timeOut);
        }
    }, [isOpen, width]);

    const baseMenuClasses =
        "absolute z-50 flex flex-col transition-all duration-500 ease-in-out overflow-hidden max-w-[325px] xs:max-w-[375px] sm:max-w-[425px] md:max-w-[768px] lg:max-w-[1024px] xl:max-w-[1280px]";

    const baseContainerItemsClasses =
        "flex flex-col flex-1 min-h-0 overflow-y-auto overflow-x-hidden scrollbar-hide";

    /**
     * Color variants for menu
     */
    const variantConfig = {
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
        none: " ",
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
        none: " ",
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
        none: " ",
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
    const currentMenuClasses = classNames(
        baseMenuClasses,
        variantConfig[variant] || autoConfig?.color || variantConfig.default,
        variantsPadding[padding] || autoConfig?.padding || variantsPadding.default,
        variantsRounded[rounded] || autoConfig?.rounded || variantsRounded.default,
        placement,
        className
    );

    const currentContainerItemClasses = classNames(
        baseContainerItemsClasses,
        containerItemHeightConfig,
        variantsGap[gap] || autoConfig?.gap || variantsGap.default,
        {
            "overflow-hidden": !isOpen,
        }
    );

    if (!isOpen) return null;

    return (
        <div
            ref={containerRef}
            className={currentMenuClasses}
            role="menu"
            style={{
                display: "none",
                visibility: "hidden",
                opacity: 0,
                transformOrigin: "top-right",
            }}
            {...props}
        >
            <div className={currentContainerItemClasses}>
                {React.Children.map(children, (child) => {
                    if (React.isValidElement(child)) {
                        return React.cloneElement(child, { onClose });
                    }
                    return child;
                })}
            </div>
        </div>
    );
};
