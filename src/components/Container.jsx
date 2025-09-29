export const Container = ({ children, className = "" }) => {
    return (
        <div
            className={`flex flex-col px-md max-w-[1280px] lg:min-w-[1024px] lg:mx-auto xl:w-[1280px] xl:mx-auto ${className}`}
        >
            {children}
        </div>
    );
};
