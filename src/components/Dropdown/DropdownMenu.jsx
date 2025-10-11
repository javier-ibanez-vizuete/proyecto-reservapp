import classNames from "classnames";
import React, { useContext, useEffect, useMemo, useRef } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import { useDevice } from "../../hooks/useDevice";
import { useWindowWidth } from "../../hooks/useWindowWidth";
import { Button } from "../UI/Button";
import { DropdownItem } from "./DropdownItem";

export const DropdownMenu = ({
    children,
    isOpen,
    onClose,
    placement = "top-full",
    className = "",
    gap = "gap-0.5",
    classNameMenuContainer = "",
    ...props
}) => {
    const { theme } = useContext(ThemeContext);
    const containerRef = useRef(null);
    const width = useWindowWidth();
    const { isMobile2Xs, isMobileXs, isMobileSm, isTablet, isDesktop } = useDevice();

    const containerHeightConfig = useMemo(
        () =>
            classNames({
                "max-h-[60vh]": isMobile2Xs || isMobileXs || isMobileSm,
                "max-h-[50vh]": isTablet,
                "max-h-[40vh]": isDesktop,
            }),
        [isMobile2Xs, isMobileXs, isMobileSm, isTablet, isDesktop]
    );

    useEffect(() => {
        if (!containerRef?.current) return;

        const container = containerRef.current;

        if (isOpen) {
            // Mostrar el elemento primero
            container.style.display = "flex";

            // Pequeño delay para que la transición funcione
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    container.style.visibility = "visible";
                    container.style.opacity = "1";
                    container.style.height = `auto`;
                });
            });
        }
        if (!isOpen) {
            // Iniciar animación de cierre
            container.style.opacity = "0";
            container.style.height = 0;
            // container.style.transform = "scale(0.95)";

            // Ocultar después de la animación (300ms)
            const timeOut = setTimeout(() => {
                if (container) {
                    container.style.visibility = "hidden";
                    container.style.display = "none";
                }
            }, 500);
            return () => clearTimeout(timeOut);
        }
    }, [isOpen, width]);

    // Clases para el contenedor del menú (el que tiene position absolute)
    const menuClasses = classNames(
        "absolute flex flex-col z-50 ",
        "transition-all duration-500 ease-in-out",
        "max-w-[325px] xs:max-w-[375px] sm:max-w-[425px] md:max-w-[768px] lg:max-w-[1024px] xl:max-w-[1280px]",
        placement,
        className
    );

    // Clases para el contenido interno (el que tiene el borde y fondo)
    const baseContainerClasses = classNames(
        "flex flex-1 min-h-0 overflow-y-auto overflow-x-hidden scrollbar-hide border border-gray-200 rounded-lg shadow-md ring-1 ring-black/5 focus:outline-none",
        "px-2 py-2 xs:px-4 sm:px-6 sm:py-4 lg:px-8",
        containerHeightConfig,
        {
            "border-text-color/50 bg-accent-background": theme === "light",
            "border-text-color-dark/50 bg-accent-background-dark": theme !== "light",
            "p-0! border-none overflow-hidden": !isOpen,
        },
        gap,
        classNameMenuContainer
    );

    return (
        <div
            ref={containerRef}
            className={menuClasses}
            role="menu"
            style={{
                display: "none",
                visibility: "hidden",
                opacity: 0,
                transformOrigin: "top-right",
            }}
            {...props}
        >
            <div className={baseContainerClasses}>
                {React.Children.map(children, (child) => {
                    if (child.type === DropdownItem || child.type === Button) {
                        return React.cloneElement(child, { onClose });
                    }
                    return child;
                })}
            </div>
        </div>
    );
};
