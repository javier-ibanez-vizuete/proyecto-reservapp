import classnames from "classnames";

export const ModalHeader = ({ children, className = "", ...props }) => {
    const headerClasses = classnames("p-lg border-b border-gray-200", className);

    return (
        <div className={headerClasses} {...props}>
            <h3 className="text-lg font-medium">{children}</h3>
        </div>
    );
};
