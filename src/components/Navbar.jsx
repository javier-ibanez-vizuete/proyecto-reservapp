import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Image } from "./UI/Image";
import { ImageContainer } from "./UI/ImageContainer";

import logoReservappAvif from "../assets/logos/reservapp-logo/logo-reservapp.avif";
import logoReservappPng from "../assets/logos/reservapp-logo/logo-reservapp.png";
import logoReservappWebp from "../assets/logos/reservapp-logo/logo-reservapp.webp";
import { ThemeContext } from "../contexts/ThemeContext";
import { useAuth } from "../core/auth/useAuth";
import { useDevice } from "../hooks/useDevice";
import { Avatar } from "./Avatar";
import { BurgerButton } from "./BurgerButton";
import { Container } from "./Container";
import { NavbarLinks } from "./NavbarLinks";
import { Button } from "./UI/Button";
import { ThemeButton } from "./UI/ThemeButton";

const LOGO_IMAGES = {
    default: logoReservappPng,
    webp: logoReservappWebp,
    avif: logoReservappAvif,
};
export const Navbar = ({ isLoggedIn = false, user = null }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { isMobile, isTablet } = useDevice();
    const { logout } = useAuth();

    const Navigate = useNavigate();
    const { pathname } = useLocation();

    const { theme } = useContext(ThemeContext);
    // const contentMobileRef = useRef();

    useEffect(() => setIsMobileMenuOpen(false), [pathname]);

    // useEffect(() => {
    //     const mobileMenuContainer = contentMobileRef.current;
    //     if (!mobileMenuContainer) return;

    //     mobileMenuContainer.style.maxHeight = isMobileMenuOpen
    //         ? `${mobileMenuContainer.scrollHeight}px`
    //         : "0px";
    // }, [isMobileMenuOpen]);

    // FUNCIONES UTILITARIAS
    const getUserInitial = () => {
        return user?.name ? user.name.charAt(0).toUpperCase() : "U";
    };

    const getUserDisplayName = () => {
        return user?.name || "User";
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    // HANDLER EVENTS
    const handleLogout = () => {
        console.log("LOGOUT CLICKED");
        logout();
    };

    const handleLogin = () => {
        console.log("Login clicked");
        Navigate("/login");
        //AQUI PONER NAVIGATE TO PAGINA LOGIN
    };

    const handleRegister = () => {
        console.log("Register Clicked");
        Navigate("register");
        //AQUI PONER NAVIGATE TO PAGINA REGISTER
    };

    const handleProfile = () => {
        console.log("Profile Clicked");
        // AQUI PONER NAVIGATE TO PAGINA PROFILE
    };

    const handleLinkClick = (linkName) => {
        console.log(`Navigating to ${linkName}`);
        return linkName;
    };

    const handleHomeClick = () => {
        console.log(`NAVIGANDO A /HOME o /DASHBOARD`);
    };

    return (
        <nav className={`navbar ${theme === "light" ? "bg-accent-background" : "bg-accent-background-dark"}`}>
            <Container className="navbar-content">
                <div className="navbar-inner">
                    <Link className="navbar-logo" to={"/"} onClick={handleHomeClick}>
                        <ImageContainer className="flex-1 logo-icon">
                            <Image imageData={LOGO_IMAGES} alt="Logo ReservApp" />
                        </ImageContainer>
                        {isLoggedIn && <span className="logo-text text-text-color">ReservApp</span>}
                    </Link>
                    <div className="navbar-menu-container">
                        <NavbarLinks handleLinkClick={handleLinkClick} />
                    </div>
                    <div className="navbar-actions">
                        {isLoggedIn && (
                            <div className="navbar-user-profile">
                                {/* Cambiar por un DropDown */}
                                <ThemeButton />

                                <Avatar
                                    src={user?.src}
                                    alt="Avatar"
                                    online={user && true}
                                    onClick={handleProfile}
                                    fallback={user?.name}
                                />
                                {!isMobile && !isTablet && (
                                    <Button onClick={handleLogout} variant="danger" size={isMobile && "sm"}>
                                        Logout
                                    </Button>
                                )}
                            </div>
                        )}
                        {!isLoggedIn && (
                            <div className="perfect-center gap-2">
                                <Button onClick={handleLogin} size={isMobile && "sm"} variant="outline">
                                    LOGIN
                                </Button>
                                <Button onClick={handleRegister} size={isMobile && "sm"} variant="secondary">
                                    REGISTER
                                </Button>
                            </div>
                        )}
                        <div className="flex justify-center h-10 w-10">
                            <BurgerButton
                                isMobileMenuOpen={isMobileMenuOpen}
                                toggleMobileMenu={toggleMobileMenu}
                            />
                        </div>
                    </div>
                </div>
                {isMobileMenuOpen && (
                    <div
                        className={`${isMobile || isTablet ? "" : "hidden"} mobile-menu`}
                        // ref={contentMobileRef}
                    >
                        <Container
                            className={`${
                                theme === "light" ? "bg-accent-background" : "bg-accent-background-dark"
                            } py-3 gap-2`}
                        >
                            <NavbarLinks handleLinkClick={handleLinkClick} />
                            {isLoggedIn && (
                                <div className="flex flex-col gap-2">
                                    <Button
                                        onClick={handleProfile}
                                        className="justify-start"
                                        variant="outline"
                                    >
                                        Perfil
                                    </Button>
                                    <Button onClick={handleLogout} className="justify-start" variant="danger">
                                        Logout
                                    </Button>
                                </div>
                            )}
                            {!isLoggedIn && (
                                <div className="flex items-center gap-3">
                                    <ThemeButton />
                                </div>
                            )}
                        </Container>
                    </div>
                )}
            </Container>
        </nav>
    );
};
