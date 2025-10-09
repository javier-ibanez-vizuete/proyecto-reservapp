import classnames from "classnames";
import { Button } from "../UI/Button";

export const DropdownItem = ({
    children,
    onClick,
    onClose,
    defaultStyles = true,
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
        "text-left transition-all cursor-pointer duration-500 rounded-md",
        {
            "hover:bg-brand-50 hover:text-brand-800 focus:bg-brand-50 focus:text-brand-800":
                !disabled && !danger,
            "block w-full px-4 py-2.5 rounded-md mx-2": defaultStyles,
            "flex-1": !defaultStyles,
            "hover:bg-error-50 hover:text-error-800 focus:bg-error-50 focus:text-error-800":
                !disabled && danger,
            "cursor-not-allowed opacity-50": disabled,
        },
        className
    );

    return (
        <Button
            className={itemClasses}
            onClick={handleClick}
            variant="none"
            disabled={disabled}
            role="menuitem"
            {...props}
        >
            {children}
        </Button>
    );
};
