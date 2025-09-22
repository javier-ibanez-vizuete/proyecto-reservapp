export const ProductsContainer = ({ children, className = "" }) => {
    return <ul className={`flex ${className}`}>{children}</ul>;
};
