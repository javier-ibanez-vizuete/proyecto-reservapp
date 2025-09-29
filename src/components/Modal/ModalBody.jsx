import classnames from "classnames";

export const ModalBody = ({ children, className = "", ...props }) => {
    const bodyClasses = classnames("p-lg", className);

    return (
        <div className={bodyClasses} {...props}>
            {children}
        </div>
    );
};
