export const Container = ({ children, className = "" }) => {
    return (
        <div className={`flex flex-col px-md md:max-w-[1290px] md:mx-auto md:px-xl ${className}`}>
            {children}
        </div>
    );
};
