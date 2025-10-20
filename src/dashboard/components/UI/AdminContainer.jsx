import classNames from "classnames";
import { useMemo } from "react";
import { useDevice } from "../../../hooks/useDevice";

export const AdminContainer = ({ children, direction, padding, width, className = "" }) => {
    const { isMobile2Xs, isMobileXs, isMobileSm, isTablet, isDesktop } = useDevice();

    const baseClasses = "flex flex-1 xl:mx-auto";

    const variantsDirection = {
        col: "flex-col",
        row: "flex-row",
    };

    const variantsPadding = {
        xs: "px-xs",
        sm: "px-sm",
        md: "px-md",
        lg: "px-lg",
        xl: "px-xl",
    };

    const variantsWidth = {
        xs: "xl:w-[1080px]",
        sm: "xl:w-[1180px]",
        default: "xl:w-[1280px]",
        md: "xl:w-[1320px]",
        lg: "xl:w-[1360px]",
        xl: "xl:w-[1400px]",
    };

    const autoPadding = useMemo(
        () =>
            classNames({
                "px-xs": isMobile2Xs,
                "px-sm": isMobileXs,
                "px-md": isMobileSm,
                "px-lg": isTablet,
                "px-xl": isDesktop,
            }),
        [isMobile2Xs, isMobileXs, isMobileSm, isTablet, isDesktop]
    );

    const containerClasses = classNames(
        baseClasses,
        variantsDirection[direction] || variantsDirection?.row,
        variantsPadding[padding] || autoPadding || variantsPadding.sm,
        variantsWidth[width] || variantsWidth?.default,
        className
    );

    return <div className={containerClasses}>{children}</div>;
};
