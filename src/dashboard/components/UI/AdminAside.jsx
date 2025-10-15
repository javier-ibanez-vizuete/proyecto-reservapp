import classNames from "classnames";
import { useContext, useEffect, useMemo, useRef } from "react";
import { ThemeContext } from "../../../contexts/ThemeContext";
import { useDevice } from "../../../hooks/useDevice";
import { useWindowWidth } from "../../../hooks/useWindowWidth";

export const AdminAside = ({ isAsideOpen, marginTop, bgColor, className = "" }) => {
    const { isMobile2Xs, isMobileXs, isMobileSm, isTablet, isDesktop } = useDevice();
    const width = useWindowWidth();

    const { theme } = useContext(ThemeContext);

    const asideref = useRef(null);

    useEffect(() => {
        if (!asideref?.current) return;

        const asideContainer = asideref.current;

        if (isAsideOpen) asideContainer.style.width = `${asideContainer.scrollWidth}px`;
        if (!isAsideOpen) {
            asideContainer.style.width = 0;
            // asideContainer.style.padding = 0;
        }
    }, [asideref, isAsideOpen, width]);

    const baseClasses =
        "absolute w-0 flex flex-col top-0 left-0 bottom-0 z-10 overflow-hidden transition-all duration-500 ease-in-out lg:flex-1 lg:relative lg:top-auto lg:bottom-auto lg:left-auto";

    const autoAsideConfig = useMemo(
        () => ({
            padding: classNames({
                "p-xs": isMobile2Xs && isAsideOpen,
                "p-sm": isMobileXs && isAsideOpen,
                "p-md": isMobileSm && isAsideOpen,
                "p-lg": isTablet && isAsideOpen,
                "p-xl": isDesktop && isAsideOpen,
                "p-0": !isAsideOpen,
            }),
            margin: classNames({
                "mt-14": isMobile2Xs,
                "mt-15": isMobileXs,
                "mt-16": isMobileSm,
                "mt-17": isTablet,
                "mt-18": isDesktop,
            }),
            bg: classNames({
                "bg-admin-accent-background": theme === "light",
                "": theme !== "light",
            }),
            borderLine: classNames({
                "border-r-admin-text-color": theme === "light",
                "border-r-admin-text-color-dark": theme !== "light",
                "border-r": isAsideOpen,
                "border-r-0": !isAsideOpen,
            }),
        }),
        [width, isMobile2Xs, isMobileXs, isMobileSm, isTablet, isDesktop, theme, isAsideOpen]
    );

    const variantsMarginTop = {
        xs: "mt-13",
        sm: "mt-14",
        default: "mt-15",
        md: "mt-16",
        lg: "mt-17",
    };

    const currentAsideClasses = classNames(
        baseClasses,
        autoAsideConfig.borderLine,
        bgColor || autoAsideConfig.bg,
        variantsMarginTop[marginTop] || autoAsideConfig.margin || variantsMarginTop?.default,
        autoAsideConfig.padding || "p-8 pl-8",
        className
    );

    return (
        <aside ref={asideref} className={currentAsideClasses}>
            <div className="flex flex-1 flex-col bg-red-800">
                <h1>LA RUTA DE LA CRUZ DEL CAMPO</h1>
            </div>
        </aside>
    );
};
