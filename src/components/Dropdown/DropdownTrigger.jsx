import classnames from "classnames";
import React from "react";

export const DropdownTrigger = React.forwardRef(
    (
        { children, onClick, isOpen, disabled, className = "", btnStyle = true, hasIcon = true, ...props },
        ref
    ) => {
        const triggerClasses = classnames(
            "inline-flex items-center justify-center cursor-pointer text-sm font-medium transition-all duration-200",
            {
                "px-4 py-2.5 bg-white text-gray-700 border border-gray-300 rounded-lg hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ring-primary-color focus:border-primary-color":
                    btnStyle,
                "opacity-50 cursor-not-allowed": disabled,
                "bg-brand-50 border-brand-300 text-brand-700": isOpen,
            },
            className
        );

        return (
            <div
                ref={ref}
                role="button"
                className={triggerClasses}
                onClick={onClick}
                disabled={disabled}
                aria-expanded={isOpen}
                aria-haspopup="true"
                {...props}
            >
                {children}
                {hasIcon && (
                    <svg
                        className={classnames("ml-2 -mr-1 h-5 w-5 transition-transform duration-200", {
                            "rotate-180 text-brand-600": isOpen,
                            "text-gray-400": !isOpen,
                        })}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                        />
                    </svg>
                )}
            </div>
        );
    }
);
