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
    /**
     * Content to display inside the item
     */
    children,

    /**
     * Click handler for the item
     */
    onClick,

    /**
     * Close callback (automatically injected by parent AdminDropdownMenu)
     */
    onClose,

    /**
     * Whether item is disabled
     */
    disabled = false,

    /**
     * Visual variant of the item
     * @type {'default' | 'destructive'}
     */
    variant = "default",

    /**
     * Additional CSS classes
     */
    className = "",

    /**
     * Additional props
     */
    ...props
}) => {
    const { theme } = useContext(ThemeContext);

    /**
     * Handle item click
     * Executes onClick handler and closes dropdown if not disabled
     */
    const handleClick = (e) => {
        if (disabled) return;
        onClick?.(e);
        onClose?.();
    };

    /**
     * Item variant classes based on variant and theme
     */
    const itemVariants = {
        default: classNames("transition-colors duration-200", {
            "hover:bg-admin-text-color/10 active:bg-admin-text-color/20": theme === "light",
            "hover:bg-admin-text-color-dark/10 active:bg-admin-text-color-dark/20": theme !== "light",
        }),
        destructive:
            "text-red-600 hover:bg-red-50 active:bg-red-100 dark:hover:bg-red-900/20 dark:text-red-400",
    };

    /**
     * Combined classes for the item
     */
    const itemClasses = classNames(
        "px-md py-sm cursor-pointer rounded-sm",
        "text-sm whitespace-nowrap",
        "transition-all duration-200",
        {
            "opacity-50 cursor-not-allowed": disabled,
        },
        itemVariants[variant] || itemVariants.default,
        className
    );

    return (
        <div
            className={itemClasses}
            onClick={handleClick}
            role="menuitem"
            tabIndex={disabled ? -1 : 0}
            aria-disabled={disabled}
            {...props}
        >
            {children}
        </div>
    );
};
