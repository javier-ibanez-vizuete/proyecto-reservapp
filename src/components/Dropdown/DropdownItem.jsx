import classnames from "classnames";

export const DropdownItem = ({
    children,
    onClick,
    onClose,
    disabled = false,
    danger = false,
    className = "",
    ...props
}) => {
    const handleClick = (event) => {
        if (!disabled) {
            onClick?.(event);
            onClose?.();
        }
    };

    const itemClasses = classnames(
        "block w-full px-4 py-2.5 text-sm text-left transition-colors duration-150 rounded-md mx-2",
        {
            "text-gray-700 hover:bg-brand-50 hover:text-brand-800 focus:bg-brand-50 focus:text-brand-800":
                !disabled && !danger,
            "text-error-700 hover:bg-error-50 hover:text-error-800 focus:bg-error-50 focus:text-error-800":
                !disabled && danger,
            "text-gray-400 cursor-not-allowed": disabled,
        },
        className
    );

    return (
        <button
            type="button"
            className={itemClasses}
            onClick={handleClick}
            disabled={disabled}
            role="menuitem"
            {...props}
        >
            {children}
        </button>
    );
};
