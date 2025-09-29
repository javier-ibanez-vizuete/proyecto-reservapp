export const CustomInput = ({ children, inputName = "", labelName = "" }) => {
    return (
        <div className="flex flex-col gap-1">
            {inputName && labelName && (
                <label htmlFor={inputName} className="text-sm">
                    {labelName}
                </label>
            )}
            {children}
        </div>
    );
};
