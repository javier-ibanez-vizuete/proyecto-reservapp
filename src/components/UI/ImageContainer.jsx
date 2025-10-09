export const ImageContainer = ({ children, className = "", size = "w-6", loading = "lazy", onClick }) => {
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
