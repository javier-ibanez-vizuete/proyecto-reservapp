import classNames from "classnames";
import { useContext, useMemo } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import { useDevice } from "../../hooks/useDevice";

export const AdminBookingsContainer = ({ children, title = "", padding, gap, columns }) => {
    const { isMobile2Xs, isMobileXs, isMobileSm, isTablet, isDesktop } = useDevice();
    const { theme } = useContext(ThemeContext);

    const baseContainerClasses = "flex flex-col";
    const baseGridContainerClasses = "grid grid-flow-dense auto-rows-fr";

    const variantsPadding = {
        default: "py-sm",
        none: " ",
        xs: "py-xs",
        sm: "py-sm",
        md: "py-md",
        lg: "py-lg",
        xl: "py-xl",
    };

    const variantsGap = {
        default: "gap-sm",
        none: " ",
        xs: "gap-xs",
        sm: "gap-sm",
        md: "gap-md",
        lg: "gap-lg",
        xl: "gap-xl",
    };

    const variantsColumns = {
        default: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
        1: "grid-cols-1",
        2: "grid-cols-2",
        3: "grid-cols-3",
        4: "grid-cols-4",
    };

    const autoConfig = useMemo(
        () => ({
            padding: classNames({
                "py-md": isMobile2Xs || isMobileXs || isMobileSm,
                "py-lg": isTablet,
                "px-md py-lg": isDesktop,
            }),
            gap: classNames({
                "gap-sm": isMobile2Xs || isMobileXs || isMobileSm,
                "gap-md": isTablet || isDesktop,
            }),
            filtersGap: classNames({
                "gap-xs": isMobile2Xs || isMobileXs,
                "gap-sm": isMobileSm || isTablet || isDesktop,
            }),
            columns: classNames({
                "grid-cols-1": isMobile2Xs || isMobileXs,
                "grid-cols-2": isMobileSm,
                "grid-cols-3": isTablet || isDesktop,
            }),
        }),
        [isMobile2Xs, isMobileXs, isMobileSm, isTablet, isDesktop]
    );

    const currentContainerClasses = classNames(
        baseContainerClasses,
        variantsPadding[padding] || autoConfig?.padding || variantsPadding.default,
        variantsGap[gap] || autoConfig?.gap || variantsGap.default
    );

    const currentGridContainerClasses = classNames(
        baseGridContainerClasses,
        variantsGap[gap] || autoConfig?.gap || variantsGap.default,
        variantsColumns[columns] || autoConfig?.columns || variantsColumns.default
    );

    return (
        <div className={currentContainerClasses}>
            <h6>{title}</h6>
            <div className={currentGridContainerClasses}>{children}</div>
        </div>
    );
};
