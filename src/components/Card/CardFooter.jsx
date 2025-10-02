import classNames from "classnames";

export const CardFooter = ({ children, className = "", ...props }) => {
    const footerClasses = classNames(
        "border-t border-gray-200 pt-3 mt-4 flex justify-end space-x-2",
        className
    );

    return (
        <div className={footerClasses} {...props}>
            {children}
        </div>
    );
};
