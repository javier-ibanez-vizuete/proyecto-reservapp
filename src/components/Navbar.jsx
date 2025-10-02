import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Image } from "./UI/Image";
import { ImageContainer } from "./UI/ImageContainer";

import logoReservappAvif from "../assets/logos/reservapp-logo/logo-reservapp.avif";
import logoReservappPng from "../assets/logos/reservapp-logo/logo-reservapp.png";
import logoReservappWebp from "../assets/logos/reservapp-logo/logo-reservapp.webp";
import { CartsContext } from "../contexts/CartsContext";
import { LanguageContext } from "../contexts/LanguageContext";
import { ThemeContext } from "../contexts/ThemeContext";
import { useDevice } from "../hooks/useDevice";
import { BurgerButton } from "./BurgerButton";
import { Container } from "./Container";
import { LanguagesSelector } from "./LanguagesSelector";
import { NavbarLinks } from "./NavbarLinks";
import { ProfileButton } from "./ProfileButton";
import { TrollyButton } from "./TrollyButton";
import { Button } from "./UI/Button";
import { ThemeButton } from "./UI/ThemeButton";

const LOGO_IMAGES = {
    url: logoReservappPng,
    webp: logoReservappWebp,
    avif: logoReservappAvif,
};
export const Navbar = ({ isLoggedIn = false, user = null }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const { isMobile, isTablet } = useDevice();

    const Navigate = useNavigate();
    const { pathname } = useLocation();

    const { cart } = useContext(CartsContext);
    const { theme } = useContext(ThemeContext);
    const { getText } = useContext(LanguageContext);

    useEffect(() => setIsMobileMenuOpen(false), [pathname]);

    // FUNCIONES UTILITARIAS
    const getUserInitial = () => {
        return user?.name ? user.name.charAt(0).toUpperCase() : "U";
    };

    const getUserDisplayName = () => {
        return user?.name || getText("userReplaceName");
    };

    const handleCloseMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    // HANDLER EVENTS

    const handleLogin = () => {
        Navigate("/login");
        handleCloseMobileMenu();
        //AQUI PONER NAVIGATE TO PAGINA LOGIN
    };

    const handleRegister = () => {
        Navigate("register");
        //AQUI PONER NAVIGATE TO PAGINA REGISTER
    };

    const handleLinkClick = (linkName) => {
        handleCloseMobileMenu();
        return linkName;
    };

    return (
        <nav
            className={`navbar transition-all duration-1000 ease-in-out fixed top-0 w-full z-10 shadow-xl ${
                theme === "light" ? "bg-accent-background" : "bg-accent-background-dark"
            }`}
        >
            <Container className="navbar-content">
                <div className="navbar-inner">
                    <Link className="navbar-logo" to={isLoading ? null : "/"}>
                        <ImageContainer className="flex-1 logo-icon">
                            <Image imageData={LOGO_IMAGES} alt="Logo ReservApp" />
                        </ImageContainer>
                        {isLoggedIn && !isMobile && <h2 className="logo-text">ReservApp</h2>}
                    </Link>
                    <div className="navbar-menu-container">
                        <NavbarLinks handleLinkClick={handleLinkClick} />
                    </div>
                    <div className="navbar-actions">
                        {isLoggedIn && (
                            <div className="navbar-user-profile">
                                <ThemeButton />
                                <LanguagesSelector placement="bottom-end" />
                                <ProfileButton onClick={handleCloseMobileMenu} />
                                {cart &&
                                    cart?.items &&
                                    cart.items?.length > 0 &&
                                    !pathname.includes("/cart") && <TrollyButton />}
                            </div>
                        )}
                        {!isLoggedIn && (
                            <div className="perfect-center gap-2">
                                <Button onClick={handleLogin} size={isMobile ? "sm" : "md"} variant="primary">
                                    {getText("loginButton")}
                                </Button>
                                <Button
                                    onClick={handleRegister}
                                    size={isMobile ? "sm" : "md"}
                                    variant="secondary"
                                >
                                    {getText("registerButton")}
                                </Button>
                            </div>
                        )}
                        <div className="flex lg:hidden justify-center h-10 w-10">
                            <BurgerButton
                                isMobileMenuOpen={isMobileMenuOpen}
                                toggleMobileMenu={toggleMobileMenu}
                            />
                        </div>
                    </div>
                </div>
                {isMobileMenuOpen && (
                    <div className={`${isMobile || isTablet ? "" : "hidden"} mobile-menu`}>
                        <Container
                            className={`${
                                theme === "light" ? "bg-accent-background" : "bg-accent-background-dark"
                            } py-3 gap-2`}
                        >
                            <NavbarLinks handleLinkClick={handleLinkClick} />
                        </Container>
                    </div>
                )}
            </Container>
        </nav>
    );
};
