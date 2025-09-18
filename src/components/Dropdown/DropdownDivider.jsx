import classnames from "classnames";

export const DropdownDivider = ({ className = "" }) => {
    return <div className={classnames("border-t border-gray-100 my-2 mx-2", className)} />;
};
