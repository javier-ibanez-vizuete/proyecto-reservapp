export const ImageContainer = ({ children, className = "", size, loading = "lazy", onClick }) => {
    return (
        <picture
            onClick={onClick}
            className={`flex justify-center items-center ${className} ${size}`}
            loading={loading}
        >
            {children}
        </picture>
    );
};
