import React, { useContext, useEffect, useRef } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import { useWindowWidth } from "../../hooks/useWindowWidth";
import { Button } from "../UI/Button";
import { DropdownItem } from "./DropdownItem";

export const DropdownMenu = ({
    children,
    isOpen,
    onClose,
    placement = "top-full mt-2",
    className = "",
    gap = "gap-0.5",
    classNameMenuContainer = "",
    ...props
}) => {
    const { theme } = useContext(ThemeContext);
    const containerRef = useRef(null);
    const width = useWindowWidth();

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
                    container.style.transform = "scale(1)";
                });
            });
        }
        if (!isOpen) {
            // Iniciar animación de cierre
            container.style.opacity = "0";
            container.style.transform = "scale(1)";

            // Ocultar después de la animación (300ms)
            const timeOut = setTimeout(() => {
                if (container) {
                    container.style.visibility = "hidden";
                    container.style.display = "none";
                }
            }, 800);
            return () => clearTimeout(timeOut);
        }
    }, [isOpen, width]);

    // Clases para el contenedor del menú (el que tiene position absolute)
    const menuClasses = [
        "absolute flex flex-col z-50",
        "transition-all duration-600 ease-in-out",
        "max-w-[325px] xs:max-w-[375px] sm:max-w-[425px] md:max-w-[768px] lg:max-w-[1024px] xl:max-w-[1280px]",
        placement,
        className,
    ]
        .filter(Boolean)
        .join(" ");

    // Clases para el contenido interno (el que tiene el borde y fondo)
    const baseContainerClasses = [
        "flex flex-1 min-h-0 overflow-hidden",
        "border border-gray-200 rounded-lg shadow-lg ring-1 ring-black/5 focus:outline-none",
        theme === "light" ? "bg-white" : "bg-gray-800",
        isOpen ? "px-2 py-2 xs:px-4 sm:px-6 sm:py-4 lg:px-8" : "p-0",
        gap,
        classNameMenuContainer,
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <div
            ref={containerRef}
            className={menuClasses}
            role="menu"
            style={{
                display: "none",
                visibility: "hidden",
                opacity: 0,
                transform: "scale(0.95)",
                transformOrigin: "top left",
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
