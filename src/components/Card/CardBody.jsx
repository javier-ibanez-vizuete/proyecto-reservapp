import classNames from "classnames";

export const CardBody = ({ children, className = "", ...props }) => {
    const bodyClasses = classNames("text-gray-600", className);

    return (
        <div className={bodyClasses} {...props}>
            {children}
        </div>
    );
};
