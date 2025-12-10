import { memo, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
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

export const Navbar = memo(({ isLoggedIn = false, user = null, height, padding, logoSize }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const width = useWindowWidth();
    const { isMobile2Xs, isMobileXs, isMobileSm, isMobile, isTablet, isDesktop } = useDevice();

    const mobileNavRef = useRef(null);
    const navigate = useNavigate();
    const { pathname } = useLocation();

    const { cart } = useContext(CartsContext);
    const { theme } = useContext(ThemeContext);
    const { getText } = useContext(LanguageContext);

    console.log("Render Navbar");

    useEffect(() => setIsMobileMenuOpen(false), [pathname]);

    useEffect(() => {
        if (!mobileNavRef?.current) return;

        const mobileMenuContainer = mobileNavRef.current;

        if (isMobileMenuOpen) mobileMenuContainer.style.height = `${mobileMenuContainer.scrollHeight}px`;
        if (!isMobileMenuOpen) mobileMenuContainer.style.height = 0;
    }, [mobileNavRef, isMobileMenuOpen, width]);

    // FUNCIONES UTILITARIAS
    const handleCloseMobileMenu = useCallback(
        () => () => {
            setIsMobileMenuOpen(false);
        },
        []
    );

    const toggleMobileMenu = useCallback(() => {
        setIsMobileMenuOpen((prevValue) => !prevValue);
    });

    // HANDLER EVENTS

    const handleLogin = useCallback(() => {
        handleCloseMobileMenu();
        navigate("/login");
    }, [navigate]);

    const handleRegister = useCallback(() => {
        navigate("register");
    }, [navigate]);

    const handleLinkClick = useCallback((linkName) => {
        handleCloseMobileMenu();
        return linkName;
    }, []);

    const baseNavbarInnerClasses = "flex justify-between items-center";

    const variantsPadding = {
        default: "py-xs",
        none: " ",
        xs: "py-xs",
        sm: "py-sm",
        md: "py-md",
        lg: "py-lg",
        xl: "py-xl",
    };

    const variantsHeight = {
        default: "h-15",
        xs: "h-15",
        sm: "h-16",
        md: "h-17",
        lg: "h-18",
        xl: "h-19",
    };

    const variantsLogoSize = {
        xs: "w-8",
        sm: "w-10",
        default: "w-12",
        md: "w-14",
        lg: "w-16",
        xl: "w-18",
    };

    const autoConfig = useMemo(
        () => ({
            padding: classNames({
                "py-md": isMobile2Xs || isMobileXs || isMobileSm || isTablet,
                "py-lg": isDesktop,
            }),
            height: classNames({
                "h-14": isMobile2Xs,
                "h-15": isMobileXs,
                "h-16": isMobileSm,
                "h-17": isTablet,
                "h-18": isDesktop,
            }),
            logoSize: classNames({
                "w-6": isMobile2Xs,
                "w-7": isMobileXs,
                "w-8": isMobileSm,
                "w-9": isTablet,
                "w-10": isDesktop,
            }),
        }),
        [isMobile2Xs, isMobileXs, isMobileSm, isTablet, isDesktop, width]
    );

    const currentNavbarInnerClasses = useMemo(
        () =>
            classNames(
                baseNavbarInnerClasses,
                variantsHeight[height] || autoConfig?.height || variantsHeight.default,
                variantsPadding[padding] || autoConfig?.padding || variantsPadding.default
            ),
        [height, padding]
    );

    const currentLogoSize = useMemo(
        () => classNames(variantsLogoSize[logoSize] || autoConfig.logoSize || variantsLogoSize.default),
        []
    );

    const logoTheme = useMemo(() => {
        if (theme === "light") return LOGO_LIGHT;
        if (theme !== "light") return LOGO_DARK;
    }, [theme]);

    return (
        <nav
            className={`navbar transition-all duration-500 ease-in-out fixed top-0 w-full z-10 shadow-xl ${
                theme === "light" ? "bg-accent-background" : "bg-accent-background-dark"
            }`}
        >
            <Container className="navbar-content">
                <div className={currentNavbarInnerClasses}>
                    <Link className="navbar-logo" to={isLoading ? null : "/"}>
                        <ImageContainer size={currentLogoSize} className="flex-1 logo-icon">
                            <Image imageData={logoTheme} alt="Logo ReservApp" />
                        </ImageContainer>
                        {isLoggedIn && !isMobile && <h2 className="logo-text">ReservApp</h2>}
                    </Link>
                    <div className="navbar-menu-container">
                        <NavbarLinks handleLinkClick={handleLinkClick} />
                    </div>
                    <div className="navbar-actions">
                        {!isLoggedIn && (
                            <div className="perfect-center self-center gap-2">
                                <Button onClick={handleLogin} variant="primary">
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
                            <div
                                className={`flex flex-col lg:hidden ${autoConfig?.height} ${autoConfig?.padding}`}
                            >
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
});
