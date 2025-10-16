import classNames from "classnames";
import { useMemo } from "react";
import { useDevice } from "../../hooks/useDevice";

export const AdminBentoGrid = ({ children, columns, gap, padding, className = "", ...rest }) => {
    const { isMobile2Xs, isMobileXs, isMobileSm, isTablet, isDesktop } = useDevice();

    const baseClasses = "grid grid-flow-dense lg:grid-flow-col auto-rows-fr";

    const variantsColumns = {
        1: "grid-cols-1",
        2: "grid-cols-2",
        default: "grid-cols-1 md:grid-cols-2",
        3: "grid-cols-3",
        4: "grid-cols-4",
    };

    const variantsGap = {
        xs: "gap-xs",
        sm: "gap-sm",
        default: "gap-sm",
        md: "gap-md",
        lg: "gap-lg",
        xl: "gap-xl",
    };

    const variantsPadding = {
        xs: "lg:p-xs",
        sm: "lg:p-sm",
        default: "lg:p-sm",
        md: "lg:p-md",
        lg: "lg:p-lg",
        xl: "lg:p-xl",
    };

    const autoBentoGridConfig = useMemo(
        () => ({
            columns: classNames({
                "grid-cols-1": isMobile2Xs || isMobileXs,
                "grid-cols-2": isMobileSm,
                "grid-cols-3": isTablet,
                "grid-cols-4": isDesktop,
            }),
            gap: classNames({
                "gap-sm": isMobile2Xs || isMobileXs || isMobileSm,
                "gap-md": isTablet || isDesktop,
            }),
            padding: classNames({
                "py-sm": isMobile2Xs || isMobileXs || isMobileSm || isTablet,
                "p-sm": isDesktop,
            }),
        }),
        [isMobile2Xs, isMobileXs, isMobileSm, isTablet, isDesktop]
    );

    const currentBentoGridClasses = classNames(
        baseClasses,
        variantsColumns[columns] || autoBentoGridConfig.columns || variantsColumns.default,
        variantsGap[gap] || autoBentoGridConfig.gap || variantsGap.default,
        variantsPadding[padding] || autoBentoGridConfig.padding || variantsPadding.default,
        className
    );

    return (
        <section className={currentBentoGridClasses} {...rest}>
            {children}
        </section>
    );
};
