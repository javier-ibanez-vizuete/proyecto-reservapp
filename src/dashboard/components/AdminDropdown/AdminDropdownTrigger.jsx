import classNames from "classnames";
import React from "react";

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

            onClick,

            isOpen,

            disabled,

            className = "",

            ...props
        },
        ref
    ) => {
        /**
         * Trigger classes with responsive behavior
         */
        const triggerClasses = classNames(
            "cursor-pointer transition-all duration-200",
            {
                "cursor-not-allowed": disabled,
            },
            className
        );

        return (
            <div
                ref={ref}
                onClick={onClick}
                className={triggerClasses}
                role="button"
                tabIndex={disabled ? -1 : 0}
                aria-disabled={disabled}
                data-state={isOpen ? "open" : "closed"}
                {...props}
            >
                {children}
            </div>
        );
    }
);

AdminDropdownTrigger.displayName = "AdminDropdownTrigger";
