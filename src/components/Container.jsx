export const Container = ({ children, className = "" }) => {
    return (
        <div
            className={`flex flex-col px-xs xs:px-sm sm:px-md lg:px-xl xl:w-[1280px] xl:mx-auto ${className}`}
        >
            {children}
        </div>
    );
};
