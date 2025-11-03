export const ImageContainer = ({ children, className = "", size, loading = "lazy", onClick, title }) => {
    return (
        <picture
            title={title}
            onClick={onClick}
            className={`flex justify-center items-center ${className} ${size}`}
            loading={loading}
        >
            {children}
        </picture>
    );
};
