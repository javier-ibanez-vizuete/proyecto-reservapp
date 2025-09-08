export const Button = ({ children, onClick, className = "" }) => {
    const handleKeyDown = (event) => {
        const enterKey = event.key === "Enter";
        if (!enterKey) return;

        onClick();
    };

    return (
        <button className={`btn ${className}`} onClick={onClick} onKeyDown={handleKeyDown}>
            {children}
        </button>
    );
};
