import classnames from "classnames";
import React from "react";
import { DropdownItem } from "./DropdownItem";

export const DropdownMenu = ({ children, isOpen, onClose, placement, className = "", ...props }) => {
    if (!isOpen) return null;

    const menuClasses = classnames(
        "absolute z-50 w-56 bg-white border border-gray-200 rounded-lg shadow-lg ring-1 ring-black/5 focus:outline-none animate-in fade-in-0 zoom-in-95 duration-200",
        placement,
        className
    );

    return (
        <div className={menuClasses} role="menu" {...props}>
            <div className="py-2">
                {React.Children.map(children, (child) => {
                    if (child.type === DropdownItem) {
                        return React.cloneElement(child, { onClose });
                    }
                    return child;
                })}
            </div>
        </div>
    );
};
