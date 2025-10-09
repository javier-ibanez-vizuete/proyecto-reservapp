import { useContext, useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Image } from "./UI/Image";
import { ImageContainer } from "./UI/ImageContainer";

import logoReservappLightAvif480 from "../assets/logos/reservapp-logo/logo-reservapp-light-480w.avif";
import logoReservappLightPng480 from "../assets/logos/reservapp-logo/logo-reservapp-light-480w.png";
import logoReservappLightWebp480 from "../assets/logos/reservapp-logo/logo-reservapp-light-480w.webp";
import logoReservappLight from "../assets/logos/reservapp-logo/logo-reservapp-light.png";

import logoReservappDarkAvif480 from "../assets/logos/reservapp-logo/logo-reservapp-dark-480w.avif";
import logoReservappDarkPng480 from "../assets/logos/reservapp-logo/logo-reservapp-dark-480w.png";
import logoReservappDarkWebp480 from "../assets/logos/reservapp-logo/logo-reservapp-dark-480w.webp";
import logoReservappDark from "../assets/logos/reservapp-logo/logo-reservapp-dark.png";

import classNames from "classnames";
import { CartsContext } from "../contexts/CartsContext";
import { LanguageContext } from "../contexts/LanguageContext";
import { ThemeContext } from "../contexts/ThemeContext";
import { useDevice } from "../hooks/useDevice";
import { useWindowWidth } from "../hooks/useWindowWidth";
import { BurgerButton } from "./BurgerButton";
import { Container } from "./Container";
import { LanguagesSelector } from "./LanguagesSelector";
import { NavbarLinks } from "./NavbarLinks";
import { ProfileButton } from "./ProfileButton";
import { TrollyButton } from "./TrollyButton";
import { Button } from "./UI/Button";
import { ThemeButton } from "./UI/ThemeButton";

const LOGO_LIGHT = {
    url: logoReservappLight,
    png480: logoReservappLightPng480,
    webp480: logoReservappLightWebp480,
    avif480: logoReservappLightAvif480,
};

const LOGO_DARK = {
    url: logoReservappDark,
    png480: logoReservappDarkPng480,
    webp480: logoReservappDarkWebp480,
    avif480: logoReservappDarkAvif480,
};

export const Navbar = ({ isLoggedIn = false, user = null }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const width = useWindowWidth();
    const { isMobile2Xs, isMobileXs, isMobileSm, isMobile, isTablet, isDesktop } = useDevice();

    const mobileNavRef = useRef(null);
    const Navigate = useNavigate();
    const { pathname } = useLocation();

    const { cart } = useContext(CartsContext);
    const { theme } = useContext(ThemeContext);
    const { getText } = useContext(LanguageContext);

    useEffect(() => setIsMobileMenuOpen(false), [pathname]);

    useEffect(() => {
        if (!mobileNavRef?.current) return;

        const mobileMenuContainer = mobileNavRef.current;

        if (isMobileMenuOpen) mobileMenuContainer.style.height = `${mobileMenuContainer.scrollHeight}px`;
        if (!isMobileMenuOpen) mobileMenuContainer.style.height = 0;
    }, [mobileNavRef, isMobileMenuOpen, width]);

    const logoSizeConfig = classNames({
        "w-6": isMobile2Xs,
        "w-7": isMobileXs,
        "w-8": isMobileSm,
        "w-9": isTablet,
        "w-10": isDesktop,
    });

    // FUNCIONES UTILITARIAS
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
            className={`navbar transition-all duration-500 ease-in-out fixed top-0 w-full z-10 shadow-xl ${
                theme === "light" ? "bg-accent-background" : "bg-accent-background-dark"
            }`}
        >
            <Container className="navbar-content">
                <div className="navbar-inner">
                    <Link className="navbar-logo" to={isLoading ? null : "/"}>
                        <ImageContainer size={logoSizeConfig} className="flex-1 logo-icon">
                            <Image
                                imageData={theme === "light" ? LOGO_LIGHT : LOGO_DARK}
                                alt="Logo ReservApp"
                            />
                        </ImageContainer>
                        {isLoggedIn && !isMobile && <h2 className="logo-text">ReservApp</h2>}
                    </Link>
                    <div className="navbar-menu-container">
                        <NavbarLinks handleLinkClick={handleLinkClick} />
                    </div>
                    <div className="navbar-actions">
                        {/*    colocar despues de la prueba size={isMobile ? "sm" : "md"} */}
                        {!isLoggedIn && (
                            <div className="perfect-center gap-2">
                                <Button onClick={handleLogin} size="md" variant="primary">
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
                        <ThemeButton />
                        <LanguagesSelector placement="bottom-end" onClick={handleCloseMobileMenu} />
                        <div className="navbar-user-profile">
                            {isLoggedIn && (
                                <>
                                    {cart &&
                                        cart?.items &&
                                        cart.items?.length > 0 &&
                                        !pathname.includes("/cart") && <TrollyButton />}
                                    {pathname !== "/user" && (
                                        <ProfileButton onClick={handleCloseMobileMenu} />
                                    )}
                                </>
                            )}
                        </div>

                        {user && (
                            <div className="flex flex-col self-stretch lg:hidden">
                                <BurgerButton
                                    isMobileMenuOpen={isMobileMenuOpen}
                                    toggleMobileMenu={toggleMobileMenu}
                                />
                            </div>
                        )}
                    </div>
                </div>
                <div
                    ref={mobileNavRef}
                    className={`${isMobile || isTablet ? "" : "hidden"} mobile-menu ${
                        isMobileMenuOpen ? "" : "cursor-not-allowed"
                    }`}
                >
                    <Container
                        className={`${
                            theme === "light" ? "bg-accent-background" : "bg-accent-background-dark"
                        } py-3 gap-2`}
                    >
                        <NavbarLinks handleLinkClick={handleLinkClick} />
                    </Container>
                </div>
            </Container>
        </nav>
    );
};
