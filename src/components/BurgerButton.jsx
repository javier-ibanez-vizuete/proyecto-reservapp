export const BurgerButton = ({ isMobileMenuOpen, toggleMobileMenu }) => {
    return (
        <button
            type="button"
            className="relative flex-1 lg:hidden block cursor-pointer burger-button"
            onClick={toggleMobileMenu}
            aria-label="Open Menu"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-nav"
        >
            <span
                className="absolute left-0 w-full h-1/5 top-0  rounded-full transition-all duration-400 ease-in-out"
                style={{
                    transform: isMobileMenuOpen ? "rotate(45deg)" : "rotate(0deg)",
                    transformOrigin: "top left",
                    width: isMobileMenuOpen ? "120%" : "100%",
                    left: isMobileMenuOpen ? "6px" : "0px",
                }}
            />
            <span
                className="absolute right-0 w-1/2 h-1/5 top-1/2 -translate-y-1/2  rounded-full transition-all duration-500 ease-in-out"
                style={{
                    transform: isMobileMenuOpen ? "translateX(-30px)" : "translateX(0px)",
                    opacity: isMobileMenuOpen ? 0 : 1,
                }}
            />
            <span
                className="absolute left-0 w-full h-1/5 bottom-0  rounded-full transition-all duration-400 ease-in-out"
                style={{
                    transform: isMobileMenuOpen ? "rotate(-45deg)" : "rotate(0deg)",
                    transformOrigin: "bottom left",
                    width: isMobileMenuOpen ? "120%" : "100%",
                    boxShadow: isMobileMenuOpen ? "0 0 6px -1px #000000" : "none",
                    left: isMobileMenuOpen ? "6px" : "0px",
                }}
            />
        </button>
    );
};
