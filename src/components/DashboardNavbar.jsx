import { useState } from "react";
import { Link } from "react-router-dom";
import { Image } from "./UI/Image";
import { ImageContainer } from "./UI/ImageContainer";

import logoReservappAvif from "../assets/logos/reservapp-logo/logo-reservapp.avif";
import logoReservappPng from "../assets/logos/reservapp-logo/logo-reservapp.png";
import logoReservappWebp from "../assets/logos/reservapp-logo/logo-reservapp.webp";
import { NavbarLinks } from "./NavbarLinks";

const LOGO_IMAGES = {
    default: logoReservappPng,
    webp: logoReservappWebp,
    avif: logoReservappAvif,
};

export const DashboardNavbar = ({ isLoggedIn = false, user = null }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // FUNCIONES UTILITARIAS
    const getUserInitial = () => {
        return user?.name ? user.name.charAt(0).toUpperCase() : "U";
    };

    const getUserDisplayName = () => {
        return user?.name || "User";
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    // HANDLER EVENTS
    const handleLogin = () => {
        closeMobileMenu();
        console.log("Login clicked");
        //AQUI PONER NAVIGATE TO PAGINA LOGIN
    };

    const handleRegister = () => {
        closeMobileMenu();
        console.log("Register Clicked");
        //AQUI PONER NAVIGATE TO PAGINA REGISTER
    };

    const handleProfile = () => {
        closeMobileMenu();
        console.log("Profile Clicked");
        // AQUI PONER NAVIGATE TO PAGINA PROFILE
    };

    const handleLinkClick = (linkName) => {
        closeMobileMenu();
        console.log(`Navigating to ${linkName}`);
        return linkName;
    };

    const handleHomeClick = () => {
        closeMobileMenu();
        console.log(`NAVIGANDO A /HOME o /DASHBOARD`);
    };

    return (
        <nav className="navbar">
            <div className="navbar-content">
                <div className="navbar-inner">
                    <Link className="navbar-logo" to={"/"} onClick={handleHomeClick}>
                        <ImageContainer className="flex-1 logo-icon">
                            <Image imageData={LOGO_IMAGES} alt="Logo ReservApp" />
                        </ImageContainer>
                        <span className="logo-text">ReservApp</span>
                    </Link>
                    <NavbarLinks handleLinkClick={handleLinkClick} />
                    <div>USER ACTIONS</div>
                </div>
                <div>MOBILE MENU</div>
            </div>
        </nav>
    );
};
