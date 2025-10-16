import classNames from "classnames";
import { useContext, useMemo } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import { useDevice } from "../../hooks/useDevice";

/**
 * AdminSkeleton Component - Customizable skeleton loader
 *
 * @param {Object} props - Component properties
 * @param {string} props.variant - Shape variant ('card'|'text'|'circle'|'avatar'|'button') (default: 'card')
 * @param {number} props.lines - Number of text lines (default: 3)
 * @param {string} props.colSpan - Grid columns to span (1|2|3|4)
 * @param {string} props.rowSpan - Grid rows to span (1|2|3|4)
 * @param {string} props.padding - Padding size ('none'|'xs'|'sm'|'md'|'lg'|'xl')
 * @param {string} props.className - Additional CSS classes
 */
export const AdminSkeleton = ({
    variant = "card",
    lines = 3,
    bgCard,
    padding,
    borderColor,
    rounded,
    className = "",
    ...rest
}) => {
    const { theme } = useContext(ThemeContext);
    const { isMobile2Xs, isMobileXs, isMobileSm, isTablet, isDesktop } = useDevice();

    const baseClasses = "flex flex-col justify-center animate-pulse overflow-hidden";

    const variantsBackgroundCard = {
        default: classNames({
            "bg-gray-200": theme === "light",
            "bg-gray-700": theme !== "light",
        }),
        background: classNames({
            "bg-admin-background": theme === "light",
            "bg-admin-background-dark": theme !== "light",
        }),
        accent: classNames({
            "bg-admin-accent-background": theme === "light",
            "bg-admin-accent-background-dark": theme !== "light",
        }),
    };

    const variantsBorder = {
        default: classNames("border", {
            "border-gray-300/50": theme === "light",
            "border-gray-600/50": theme !== "light",
        }),
        background: classNames("border", {
            "border-admin-background": theme === "light",
            "border-admin-background-dark": theme !== "light",
        }),
        accent: classNames("border", {
            "border-admin-accent-background": theme === "light",
            "border-admin-accent-background-dark": theme !== "light",
        }),
    };

    const variantsPadding = {
        none: "p-0",
        xs: "p-xs",
        sm: "p-sm",
        default: "p-sm",
        md: "p-md",
        lg: "p-lg",
        xl: "p-xl",
    };

    const variantsRounded = {
        none: "rounded-0",
        xs: "rounded-xs",
        sm: "rounded-sm",
        default: "rounded-md",
        md: "rounded-md",
        lg: "rounded-lg",
        xl: "rounded-xl",
    };

    const autoSkeletonConfig = useMemo(
        () => ({
            background: classNames({
                "bg-gray-200": theme === "light",
                "bg-gray-700": theme !== "light",
            }),
            padding: classNames({
                "p-md": isMobile2Xs || isMobileXs,
                "p-sm": isMobileSm || isTablet || isDesktop,
            }),
            border: classNames("border", {
                "border-gray-300/50": theme === "light",
                "border-gray-600/50": theme !== "light",
            }),
            rounded: classNames({
                "rounded-sm": isMobile2Xs || isMobileXs,
                "rounded-md": isMobileSm || isTablet || isDesktop,
            }),
        }),
        [isMobile2Xs, isMobileXs, isMobileSm, isTablet, isDesktop, theme]
    );

    const elementClasses = classNames("rounded", {
        "bg-gray-300": theme === "light",
        "bg-gray-600": theme !== "light",
    });

    const currentSkeletonClasses = classNames(
        baseClasses,
        variantsBackgroundCard[bgCard] || autoSkeletonConfig.background || variantsBackgroundCard.accent,
        variantsBorder[borderColor] || variantsBorder.default,
        variantsPadding[padding] || autoSkeletonConfig.padding || variantsPadding.default,
        variantsRounded[rounded] || autoSkeletonConfig.rounded || variantsRounded.default,
        className
    );

    const renderContent = () => {
        switch (variant) {
            case "text":
                return (
                    <div className="flex flex-col w-10 gap-xs">
                        {Array.from({ length: lines }).map((_, i) => (
                            <div
                                key={i}
                                className={classNames(elementClasses, "h-3", {
                                    "w-full": i < lines - 1,
                                    "w-full": i === lines - 1,
                                })}
                            />
                        ))}
                    </div>
                );

            case "circle":
                return <div className={classNames(elementClasses, "w-10 h-10 rounded-full mx-auto")} />;

            case "avatar":
                return (
                    <div className="flex flex-1 flex-col items-center gap-xs">
                        <div className={classNames(elementClasses, "w-10 h-10 rounded-full")} />
                        <div className="flex flex-1 self-stretch flex-col gap-xs">
                            <div className={classNames(elementClasses, "h-3")} />
                            <div className={classNames(elementClasses, "h-2")} />
                        </div>
                    </div>
                );

            case "button":
                return <div className={classNames(elementClasses, "h-md w-2xl")} />;

            case "card":
            default:
                return (
                    <div className="flex flex-col gap-sm">
                        <div className="flex items-center justify-between">
                            <div className={classNames(elementClasses, "w-16 h-16 rounded-md")} />
                        </div>
                        <div className="flex flex-col gap-xs">
                            <div className={classNames(elementClasses, "h-6 w-full")} />
                            <div className={classNames(elementClasses, "h-4 w-full")} />
                            <div className="flex justify-between items-center gap-xs">
                                <div className={classNames(elementClasses, "h-4 w-1/2")} />
                                <div className={classNames(elementClasses, "h-4 w-1/2")} />
                            </div>
                        </div>
                    </div>
                );
        }
    };

    return (
        <div className={currentSkeletonClasses} {...rest}>
            {renderContent()}
        </div>
    );
};
