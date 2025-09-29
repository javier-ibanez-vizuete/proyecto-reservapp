import classnames from "classnames";

export const ModalFooter = ({ children, className = "", ...props }) => {
    const footerClasses = classnames("p-lg border-t border-gray-200 flex justify-center gap-md", className);

    return (
        <div className={footerClasses} {...props}>
            {children}
        </div>
    );
};
