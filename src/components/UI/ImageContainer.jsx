export const ImageContainer = ({ children, className = "", loading = "lazy", onClick }) => {
    return (
        <picture
            onClick={onClick}
            className={`flex justify-center items-center ${className}`}
            loading={loading}
        >
            {children}
        </picture>
    );
};
