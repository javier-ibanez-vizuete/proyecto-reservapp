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
import { useAuth } from "../core/auth/useAuth";
import { useDevice } from "../hooks/useDevice";
import { useToast } from "../hooks/useToast";
import { Avatar } from "./Avatar";
import { BurgerButton } from "./BurgerButton";
import { Container } from "./Container";
import { LanguagesSelector } from "./LanguagesSelector";
import { NavbarLinks } from "./NavbarLinks";
import { LoadingButton } from "./Spinner/LoadingButton";
import { ToastContainer } from "./ToastContainer";
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
    const { logout } = useAuth();

    const Navigate = useNavigate();
    const { pathname } = useLocation();

    const { toasts, showToast, dismissToast } = useToast();

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
    const handleLogout = async () => {
        setIsLoading(true);
        try {
            await logout();
        } catch (err) {
            console.log("Hubo un problema con el Logouut 'Navbar-handleLogout()'", err);
            showToast(getText("toastLogoutError"), "error", 2000);
        } finally {
            setIsLoading(false);
            showToast(getText("toastLogoutSuccess"), "success", 2000);
        }
    };

    const handleLogin = () => {
        Navigate("/login");
        handleCloseMobileMenu();
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
        handleCloseMobileMenu();
        return linkName;
    };

    const handleHomeClick = () => {
        console.log("Navegacion a Home");
    };

    return (
        <nav
            className={`navbar transition-all duration-1000 ease-in-out fixed top-0 w-full z-10 shadow-lg ${
                theme === "light" ? "bg-accent-background" : "bg-accent-background-dark"
            }`}
        >
            <Container className="navbar-content">
                <div className="navbar-inner">
                    <Link className="navbar-logo" to={isLoading ? null : "/"} onClick={handleHomeClick}>
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

                                <Avatar
                                    avatar={user.avatar}
                                    alt="Avatar"
                                    online={user && true}
                                    onClick={handleProfile}
                                    fallback={user?.name}
                                />
                                {cart &&
                                    cart?.items &&
                                    cart.items?.length > 0 &&
                                    !pathname.includes("/cart") && <TrollyButton />}
                                {!isMobile && !isTablet && (
                                    <LoadingButton
                                        loading={isLoading}
                                        onClick={handleLogout}
                                        className="justify-start"
                                        variant="danger"
                                        loadingText={getText("lodingTextLogoutUser")}
                                    >
                                        {getText("logoutButton")}
                                    </LoadingButton>
                                )}
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
                                        {getText("profilePageButton")}
                                    </Button>
                                    <LoadingButton
                                        loading={isLoading}
                                        onClick={handleLogout}
                                        className="justify-start"
                                        variant="danger"
                                        loadingText="Closing Profile..."
                                    >
                                        {getText("logoutButton")}
                                    </LoadingButton>
                                </div>
                            )}
                            {!isLoggedIn && (
                                <div className="flex items-center gap-3">
                                    <ThemeButton handleCloseMobileMenu={handleCloseMobileMenu} />
                                </div>
                            )}
                        </Container>
                    </div>
                )}
                <ToastContainer toasts={toasts} onClose={dismissToast} />
            </Container>
        </nav>
    );
};
