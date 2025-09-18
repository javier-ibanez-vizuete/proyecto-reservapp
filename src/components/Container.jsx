export const Container = ({ children, className = "" }) => {
    return (
        <div className={`flex flex-col px-md max-w-[1490px] xl:w-[1290px] xl:mx-auto ${className}`}>
            {children}
        </div>
    );
};
