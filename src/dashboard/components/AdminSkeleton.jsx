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
 * @param {string} props.padding - Padding size ('none'|'xs'|'sm'|'md'|'lg'|'xl')
 * @param {string} props.className - Additional CSS classes
 */
export const AdminSkeleton = ({
    children,
    variant = "card",
    lines = 3,
    bgCard,
    padding,
    borderColor,
    width,
    height,
    rounded,
    className = "",
    ...rest
}) => {
    const { theme } = useContext(ThemeContext);
    const { isMobile2Xs, isMobileXs, isMobileSm, isTablet, isDesktop } = useDevice();

    const baseClasses = "flex flex-col justify-center animate-pulse overflow-hidden";

    const variantsBackgroundCard = {
        none: " ",
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
        none: " ",
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
        none: " ",
        xs: "p-xs",
        sm: "p-sm",
        default: "p-sm",
        md: "p-md",
        lg: "p-lg",
        xl: "p-xl",
    };

    const variantsRounded = {
        none: " ",
        xs: "rounded-xs",
        sm: "rounded-sm",
        default: "rounded-md",
        md: "rounded-md",
        lg: "rounded-lg",
        xl: "rounded-xl",
    };

    const variantsWidth = {
        default: "w-10",
        none: " ",
        "2xs": "w-4",
        xs: "w-8",
        sm: "w-10",
        md: "w-14",
        lg: "w-18",
        xl: "w-32",
        "2xl": "w-40",
        "4xl": "w-52",
        "6xl": "w-72",
        full: "w-full",
    };

    const variantsHeight = {
        default: "h-10",
        none: " ",
        "2xs": "h-4",
        xs: "h-8",
        sm: "h-10",
        md: "h-14",
        lg: "h-18",
        xl: "h-32",
        "2xl": "h-40",
        "4xl": "h-52",
        "6xl": "h-72",
        full: "h-full",
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
            width: classNames({
                "w-14": isMobile2Xs,
                "w-18": isMobileXs || isMobileSm,
                "w-24": isTablet || isDesktop,
            }),
            height: classNames({
                "h-14": isMobile2Xs,
                "h-18": isMobileXs || isMobileSm,
                "h-24": isTablet || isDesktop,
            }),
            buttonSize: classNames({
                "w-3xl h-lg": isMobile2Xs || isMobileXs || isMobileSm,
                "w-[120px] h-lg": isTablet || isDesktop,
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
                    <div className="flex flex-col w-full gap-xs">
                        {Array.from({ length: lines }).map((_, i) => (
                            <div
                                key={i}
                                className={classNames(
                                    elementClasses,
                                    variantsHeight[height] ||
                                        autoSkeletonConfig?.height ||
                                        variantsHeight.default,
                                    variantsWidth[width] || autoSkeletonConfig?.width || "w-full"
                                )}
                            />
                        ))}
                    </div>
                );

            case "circle":
                return (
                    <div
                        className={classNames(
                            elementClasses,
                            "rounded-full mx-auto",
                            variantsWidth[width] || autoSkeletonConfig?.width || variantsWidth.default,
                            variantsHeight[height] || autoSkeletonConfig?.height || variantsHeight.default
                        )}
                    />
                );

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
                return (
                    <div
                        className={classNames(
                            elementClasses,
                            (variantsWidth[width] && variantsHeight[height]) ||
                                autoSkeletonConfig?.buttonSize ||
                                (variantsWidth.default && variantsHeight.default)
                        )}
                    />
                );

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

    if (children)
        return (
            <div className={currentSkeletonClasses} {...rest}>
                {children}
            </div>
        );

    return (
        <div className={currentSkeletonClasses} {...rest}>
            {renderContent()}
        </div>
    );
};
