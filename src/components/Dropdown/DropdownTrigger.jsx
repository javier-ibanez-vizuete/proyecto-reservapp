import classnames from "classnames";
import { forwardRef, memo, useMemo } from "react";
import { useDevice } from "../../hooks/useDevice";

export const DropdownTrigger = memo(
    forwardRef(
        (
            {
                children,
                onClick,
                isOpen,
                disabled,
                className = "",
                padding,
                btnStyle = true,
                hasIcon = true,
                ...props
            },
            ref
        ) => {
            const { isMobile2Xs, isMobileXs, isMobileSm, isTablet, isDesktop } = useDevice();

            const baseClasses =
                "inline-flex items-center justify-center cursor-pointer text-sm font-medium transition-all duration-200";

            const variantsPadding = {
                default: "px-3 py-1.5",
                none: "p-0",
                "2xs": "px-1 py-0.5",
                xs: "px-2 py-1",
                sm: "px-3 py-1",
                md: "px-4 py-2",
                lg: "px-6 py-3",
                xl: "px-8 py-4",
            };

            const triggerClasses = useMemo(
                () =>
                    classnames(
                        {
                            "px-4 py-2.5 bg-white text-gray-700 border border-gray-300 rounded-lg hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ring-primary-color focus:border-primary-color":
                                btnStyle,
                            "opacity-50 cursor-not-allowed": disabled,
                            "bg-brand-50 border-brand-300 text-brand-700": isOpen,
                        },
                        className
                    ),
                [btnStyle, disabled, className, isOpen]
            );

            const autoConfig = useMemo(
                () => ({
                    padding: classnames({
                        "p-xs": isMobile2Xs || isMobileXs || isMobileSm || isTablet || isDesktop,
                    }),
                }),
                [isMobile2Xs || isMobileXs || isMobileSm || isTablet || isDesktop]
            );

            const currentClasses = useMemo(
                () =>
                    classnames(
                        baseClasses,
                        triggerClasses,
                        variantsPadding[padding] || autoConfig.padding || variantsPadding.default
                    ),
                [padding]
            );

            return (
                <div
                    ref={ref}
                    role="button"
                    className={currentClasses}
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
    )
);
