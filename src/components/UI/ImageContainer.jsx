export const ImageContainer = ({ children, className = "", loading = "lazy" }) => {
    return <picture className={`flex justify-center items-center ${className}`} loading={loading} >{children}</picture>;
};
