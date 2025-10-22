import classNames from "classnames";
import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { ThemeContext } from "../../../contexts/ThemeContext";
import { useDevice } from "../../../hooks/useDevice";
import { AdminDropdownMenu } from "./AdminDropdownMenu";
import { AdminDropdownTrigger } from "./AdminDropdownTrigger";

/**
 * AdminDropdown Component - Dropdown menu with responsive auto-configuration
 *
 * A highly customizable dropdown component that follows the admin design system.
 * Auto-configures styling based on screen size when props are not provided.
 * Supports theming, multiple variants, and flexible positioning.
 *
 * @component
 * @example
 * // Basic usage with auto-configuration
 * <AdminDropdown>
 *   <AdminDropdownTrigger>
 *     <AdminButton>Menu</AdminButton>
 *   </AdminDropdownTrigger>
 *   <AdminDropdownMenu>
 *     <AdminDropdownItem onClick={() => console.log('clicked')}>
 *       Option 1
 *     </AdminDropdownItem>
 *     <AdminDropdownItem>Option 2</AdminDropdownItem>
 *   </AdminDropdownMenu>
 * </AdminDropdown>
 *
 * @example
 * // Custom configuration
 * <AdminDropdown
 *   variant="primary"
 *   placement="bottom-end"
 *   padding="lg"
 *   rounded="lg"
 * >
 *   <AdminDropdownTrigger>Custom Trigger</AdminDropdownTrigger>
 *   <AdminDropdownMenu>Content</AdminDropdownMenu>
 * </AdminDropdown>
 */
export const AdminDropdown = ({
    /**
     * Child components (Trigger and Menu)
     */
    children,

    /**
     * Trigger event type
     * @type {'click' | 'hover'}
     */
    trigger = "click",

    /**
     * Menu placement relative to trigger
     * @type {'top-start' | 'top-end' | 'bottom-start' | 'bottom-end' | 'bottom-center' | 'bottom-full' | 'left-start' | 'left-end' | 'right-start' | 'right-end' | 'left-center' | 'right-center'}
     */
    placement = "bottom-start",

    /**
     * Color variant
     * @type {'default' | 'primary' | 'secondary' | 'outline' | 'ghost' | 'background' | 'accent'}
     */
    variant,

    /**
     * Padding size
     * @type {'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'default'}
     */
    padding,

    /**
     * Gap between elements
     * @type {'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'default'}
     */
    gap,

    /**
     * Border radius
     * @type {'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'default'}
     */
    rounded,

    /**
     * Disabled state
     */
    disabled = false,

    /**
     * Additional CSS classes for container
     */
    className = "",

    /**
     * Additional props
     */
    ...props
}) => {
    const { theme } = useContext(ThemeContext);
    const { isMobile2Xs, isMobileXs, isMobileSm, isTablet, isDesktop } = useDevice();
    const { pathname } = useLocation();

    // State and refs
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const triggerRef = useRef(null);

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
     * Close dropdown on route change
     */
    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    /**
     * Handle click outside and keyboard events
     */
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        const handleEscape = (event) => {
            if (event.key === "Escape") {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
            document.addEventListener("keydown", handleEscape);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleEscape);
        };
    }, [isOpen]);

    /**
     * Toggle dropdown visibility
     */
    const toggleDropdown = () => {
        if (!disabled) {
            setIsOpen(!isOpen);
        }
    };

    /**
     * Close dropdown
     */
    const closeDropdown = () => setIsOpen(false);

    /**
     * Handle mouse enter for hover trigger
     */
    const handleMouseEnter = () => {
        if (trigger === "hover" && !disabled) {
            setIsOpen(true);
        }
    };

    /**
     * Handle mouse leave for hover trigger
     */
    const handleMouseLeave = () => {
        if (trigger === "hover") {
            setIsOpen(false);
        }
    };

    /**
     * Placement classes mapping
     */
    const placementClasses = {
        "right-center": "left-full ml-2 -translate-y-1/2",
        "left-center": "right-full mr-2 -translate-y-1/2",
        "top-start": "bottom-full left-0 mb-2",
        "top-end": "bottom-full right-0 mb-2",
        "bottom-start": "top-full left-0 mt-2",
        "bottom-center": "top-full left-1/2 -translate-x-1/2 mt-2",
        "bottom-full": "top-full right-0 left-0 mt-2",
        "bottom-end": "top-full right-0 mt-2",
        "left-start": "right-full top-0 mr-2",
        "left-end": "right-full bottom-0 mr-2",
        "right-start": "left-full top-0 ml-2",
        "right-end": "left-full bottom-0 ml-2",
    };

    /**
     * Container classes
     */
    const dropdownClasses = classNames(
        "relative inline-flex text-left",
        {
            "opacity-50 cursor-not-allowed": disabled,
        },
        className
    );

    return (
        <div
            {...props}
            ref={dropdownRef}
            className={dropdownClasses}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            role="menu"
            aria-haspopup="true"
            aria-expanded={isOpen}
            data-dropdown="true"
            data-open={isOpen}
            data-placement={placement}
            data-trigger={trigger}
        >
            {React.Children.map(children, (child) => {
                if (child.type === AdminDropdownTrigger) {
                    return React.cloneElement(child, {
                        onClick: toggleDropdown,
                        isOpen,
                        disabled,
                        ref: triggerRef,
                    });
                }
                if (child.type === AdminDropdownMenu) {
                    return React.cloneElement(child, {
                        isOpen,
                        onClose: closeDropdown,
                        placement: placementClasses[placement],
                        variant,
                        padding,
                        gap,
                        rounded,
                        autoConfig,
                        theme,
                    });
                }
                return child;
            })}
        </div>
    );
};

// Static properties for easier imports
AdminDropdown.Trigger = AdminDropdownTrigger;
AdminDropdown.Menu = AdminDropdownMenu;
