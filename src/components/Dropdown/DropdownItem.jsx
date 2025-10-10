import classnames from "classnames";
import { Button } from "../UI/Button";

export const DropdownItem = ({
    children,
    onClick,
    onClose,
    disabled = false,
    danger = false,
    variant = "none",
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
        {
            "hover:bg-brand-50 hover:text-brand-800 focus:bg-brand-50 focus:text-brand-800":
                !disabled && !danger,
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
            variant={variant}
            disabled={disabled}
            role="menuitem"
            {...props}
        >
            {children}
        </Button>
    );
};
