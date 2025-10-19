import classNames from "classnames";
import { useContext, useMemo } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../contexts/ThemeContext";
import { useDevice } from "../../hooks/useDevice";

export const AdminBentoGridItem = ({
    children,
    to = "#",
    colSpan,
    rowSpan,
    title = 0,
    description,
    icon,
    gradient,
    borderVariant,
    padding,
    ...rest
}) => {
    const hasTitle = (typeof title === "number" && title >= 0) || title.length;

    const { isMobile2Xs, isMobileXs, isMobileSm, isTablet, isDesktop } = useDevice();
    const { theme } = useContext(ThemeContext);

    const baseClasses =
        "group flex flex-col relative overflow-hidden shadow-md transition-all duration-500 ease-in-out";
    const hoverClasses = "hover:scale-101 hover:shadow-xl cursor-pointer";
    const overlayClasses = classNames(
        "absolute inset-0 bg-gradient-to-br transition-all duration-500 ease-in-out",
        {
            "from-white/0 to-white/0 group-hover:from-white/10 group-hover:to-white/15": theme === "light",
            "from-black/ to-black/0 group-hover:from-black/10 group-hover:to-black/15": theme !== "light",
        }
    );

    const variantsGradient = {
        default: classNames("bg-gradient-to-br hover:bg-gradient-to-tr", {
            "from-admin-background to-admin-accent-background": theme === "light",
            "from-admin-background-dark to-admin-accent-background-dark": theme !== "light",
        }),
        accent: classNames("bg-gradient-to-tr hover:bg-gradient-to-br", {
            "from-admin-accent-background via-[#9cd4ec] to-admin-background": theme === "light",
            "from-admin-accent-background-dark via-[#103247] to-admin-background-dark": theme !== "light",
        }),
        primary: classNames(
            "bg-gradient-to-tr from-admin-primary-color to-admin-primary-hover",
            "hover:bg-gradient-to-r hover:from-admin-primary-hover hover:to-admin-primary-color"
        ),
        secondary: classNames(
            "bg-gradient-to-r from-admin-secondary-color to-admin-secondary-hover",
            "hover:bg-gradient-to-r hover:from-admin-secondary-hover hover:to-admin-secondary-color"
        ),
        success: classNames(
            "bg-gradient-to-br from-success-400 to-success-500",
            "hover:bg-gradient-to-lt hover:from-success-500 hover:to-success-400"
        ),
        warning: classNames(
            "bg-gradient-to-br from-warning-400 to-warning-500",
            "hover:bg-gradient-to-lt hover:from-warning-500 hover:to-warning-400"
        ),
        error: classNames(
            "bg-gradient-to-br from-error-400 to-error-500",
            "hover:bg-gradient-to-lt hover:from-error-500 hover:to-error-400"
        ),
    };

    const variantsBorder = {
        default: classNames("border", {
            "border-gray-700/50": theme === "light",
            "border-gray-200/50": theme !== "light",
        }),
        accent: classNames("border", {
            "border-admin-accent-background/40": theme === "light",
            "border-admin-accent-background-dark/40": theme !== "light",
        }),
        primary: classNames("border", {
            "border-admin-primary-color/40": theme === "light",
            "border-admin-primary-color/20": theme !== "light",
        }),
        secondary: classNames("border", {
            "border-admin-secondary-color/40": theme === "light",
            "border-admin-secondary-color/20": theme !== "light",
        }),
        success: classNames("border", {
            "border-success-700/40": theme === "light",
            "border-success-200/20": theme !== "light",
        }),
        warning: classNames("border", {
            "border-warning-700/40": theme === "light",
            "border-warning-200/20": theme !== "light",
        }),
        error: classNames("border", {
            "border-error-700/40": theme === "light",
            "border-error-200/20": theme !== "light",
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

    const variantsColSpan = {
        default: "col-span-1",
        1: "col-span-1",
        2: "col-span-1 sm:col-span-2",
        3: "col-span-1 sm:col-span-2 md:col-span-3",
        4: "col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4",
    };

    const variantsRowSpan = {
        default: "row-span-1",
        1: "row-span-1",
        2: "row-span-1 sm:row-span-2",
        3: "row-span-1 sm:row-span-2 md:row-span-3",
        4: "row-span-1 sm:row-span-2 md:row-span-3 lg:row-span-4",
    };

    const autoBentoGridItemConfig = useMemo(
        () => ({
            gradient: classNames("bg-gradient-to-bl hover:bg-gradient-to-tr", {
                "from-admin-accent-background via-[#9cd4ec] to-admin-background": theme === "light",
                "from-admin-accent-background-dark via-[#103247] to-admin-background-dark": theme !== "light",
            }),
            border: classNames("border", {
                "border-admin-text-color/40": theme === "light",
                "border-admin-text-color-dark/40": theme !== "light",
            }),
            padding: classNames({
                "p-md": isMobile2Xs || isMobileXs,
                "p-sm": isMobileSm || isTablet || isDesktop,
            }),
        }),
        [theme, isMobile2Xs, isMobileXs, isMobileSm, isTablet, isDesktop]
    );

    const currentBentoGridItemClasses = classNames(
        baseClasses,
        hoverClasses,
        variantsGradient[gradient] || autoBentoGridItemConfig.gradient || variantsGradient.default,
        variantsBorder[borderVariant] || autoBentoGridItemConfig.border || variantsBorder.default,
        variantsPadding[padding] || autoBentoGridItemConfig.padding || variantsPadding.default,
        variantsColSpan[colSpan] || variantsColSpan.default,
        variantsRowSpan[rowSpan] || variantsRowSpan.default
    );

    return (
        <Link to={to} className={currentBentoGridItemClasses} {...rest}>
            <div className={overlayClasses} />
            <div className="relative z-10 flex flex-col flex-1 justify-between">
                {icon && <div>ICONO</div>}
                {children && children}
                {!children && (
                    <article className="flex flex-1 flex-col justify-center items-center">
                        {hasTitle && <h6>{title}</h6>}
                        {description && <p>{description}</p>}
                    </article>
                )}
            </div>
        </Link>
    );
};
