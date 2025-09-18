import classnames from "classnames";

export const DropdownHeader = ({ children, className = "" }) => {
    const headerClasses = classnames(
        "px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider bg-gray-50 border-b border-gray-100",
        className
    );

    return <div className={headerClasses}>{children}</div>;
};
