import classNames from "classnames";
import { useContext, useMemo } from "react";
import { ThemeContext } from "../../../contexts/ThemeContext";
import { useDevice } from "../../../hooks/useDevice";

/**
 * AdminDropdownItem - Individual item in the dropdown menu
 *
 * Represents a single selectable option within the dropdown menu.
 * Supports click handlers, disabled state, and different visual variants.
 *
 * @component
 * @example
 * // Basic usage
 * <AdminDropdownItem onClick={() => console.log('clicked')}>
 *   My Option
 * </AdminDropdownItem>
 *
 * @example
 * // Destructive variant (for dangerous actions)
 * <AdminDropdownItem
 *   onClick={handleDelete}
 *   variant="destructive"
 * >
 *   Delete Item
 * </AdminDropdownItem>
 *
 * @example
 * // Disabled state
 * <AdminDropdownItem disabled>
 *   Coming Soon
 * </AdminDropdownItem>
 *
 * @example
 * // Complex content
 * <AdminDropdownItem>
 *   <div className="flex items-center gap-2">
 *     <Icon />
 *     <div>
 *       <p className="font-semibold">Title</p>
 *       <p className="text-xs">Description</p>
 *     </div>
 *   </div>
 * </AdminDropdownItem>
 */
export const AdminDropdownItem = ({
    children,

    onClick,

    onClose,

    padding,

    disabled = false,

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

    /**
     * Handle item click
     * Executes onClick handler and closes dropdown if not disabled
     */
    const handleClick = (event) => {
        if (disabled) return;
        onClick?.(event);
        onClose?.();
    };

    /**
     * Combined classes for the item
     */
    const baseItemClasses = classNames(
        "cursor-pointer whitespace-nowrap transition-all duration-500 ease-in-out lg:hover:-translate-y-[2px]",
        {
            "opacity-50 cursor-not-allowed": disabled,
        }
    );

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

    const currentItemClasses = classNames(
        baseItemClasses,
        variantsPadding[padding] || autoConfig?.padding || variantsPadding.default,
        className
    );

    return (
        <div
            className={currentItemClasses}
            onClick={handleClick}
            role="menuitem"
            tabIndex={disabled ? -1 : 0}
            aria-disabled={disabled}
            {...props}
        >
            {typeof children === "string" && <p>{children}</p>}
            {typeof children !== "string" && children}
        </div>
    );
};
