import classnames from "classnames";
import React, { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import { Button } from "../UI/Button";
import { DropdownItem } from "./DropdownItem";

export const DropdownMenu = ({
    children,
    isOpen,
    onClose,
    placement,
    direction = "flex-col",
    className = "",
    gap = "gap-0.5",
    ...props
}) => {
    const { theme } = useContext(ThemeContext);

    if (!isOpen) return null;

    const menuClasses = classnames(
        `absolute z-50 w-auto min-w-40 py-2 ${
            theme === "light" ? "bg-accent-background" : "bg-accent-background-dark"
        } border border-gray-200 rounded-lg shadow-lg ring-1 ring-black/5 focus:outline-none animate-in fade-in-0 zoom-in-95 duration-200`,
        placement,
        className
    );

    return (
        <div className={menuClasses} role="menu" {...props}>
            <div className={`flex ${direction} ${gap}`}>
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
