import classNames from "classnames";

export const CardHeader = ({ children, className = "", ...props }) => {
    const headerClasses = classNames("border-b border-gray-200 pb-3 mb-4", className);

    return (
        <div className={headerClasses} {...props}>
            {children}
        </div>
    );
};
