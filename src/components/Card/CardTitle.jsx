import classNames from "classnames";

export const CardTitle = ({ children, className = "", as: Component = "h3", ...props }) => {
    const titleClasses = classNames("text-lg font-semibold text-gray-900", className);

    return (
        <Component className={titleClasses} {...props}>
            {children}
        </Component>
    );
};
