import { useContext, useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { LanguageContext } from "../contexts/LanguageContext";
import { Container } from "./Container.jsx";
import { Image } from "./UI/Image";
import { ImageContainer } from "./UI/ImageContainer";

import logoReservappAvif from "../assets/logos/reservapp-logo/logo-reservapp.avif";
import logoReservappPng from "../assets/logos/reservapp-logo/logo-reservapp.png";
import logoReservappWebp from "../assets/logos/reservapp-logo/logo-reservapp.webp";
import { ThemeContext } from "../contexts/ThemeContext.jsx";
import { useAuth } from "../core/auth/useAuth.jsx";

const LOGO_IMAGES = {
    default: logoReservappPng,
    webp: logoReservappWebp,
    avif: logoReservappAvif,
};

const cn = (...classes) => classes.filter(Boolean).join(" ");

const BurgerButton = ({ openMobileNav, handleClick }) => {
    return (
        <button
            type="button"
            className="relative md:hidden block w-[45px] h-[45px] cursor-pointer"
            onClick={handleClick}
            aria-label="Open Menu"
            aria-expanded={openMobileNav}
            aria-controls="mobile-nav"
        >
            <span
                className="absolute left-0 w-[45px] h-[7px] top-0 bg-accent-color rounded-full transition-all duration-400 ease-in-out"
                style={{
                    transform: openMobileNav ? "rotate(45deg)" : "rotate(0deg)",
                    transformOrigin: "top left",
                    width: openMobileNav ? "56px" : "45px",
                    left: openMobileNav ? "6px" : "0px",
                }}
            />
            <span
                className="absolute left-0 w-[45px] h-[7px] top-1/2 -translate-y-1/2 bg-accent-color rounded-full transition-all duration-500 ease-in-out"
                style={{
                    transform: openMobileNav ? "translateX(-20px)" : "translateX(0px)",
                    opacity: openMobileNav ? 0 : 1,
                }}
            />
            <span
                className="absolute left-0 w-[45px] h-[7px] bottom-0 bg-accent-color rounded-full transition-all duration-400 ease-in-out"
                style={{
                    transform: openMobileNav ? "rotate(-45deg)" : "rotate(0deg)",
                    transformOrigin: "bottom left",
                    width: openMobileNav ? "56px" : "45px",
                    boxShadow: openMobileNav ? "0 0 10px #898c23" : "none",
                    left: openMobileNav ? "6px" : "0px",
                }}
            />
        </button>
    );
};

const getNavLinksClasses = ({ isActive, isPending, isTransitioning }) => {
    const { theme } = useContext(ThemeContext);

    const base = `py-sm p-lg rounded-lg ${
        theme === "light"
            ? "hover:bg-background-color-dark/50 hover:text-text-color-dark"
            : "hover:bg-background-color/50 hover:text-text-color"
    }  transition-all duration-300 ease-in-out`;
    const normal = `${theme === "light" ? "bg-background-color-dark/15" : "bg-background-color/15"}`;
    const active = `${
        theme === "light"
            ? "bg-background-color-dark/65 text-text-color-dark"
            : "bg-background-color/65 text-text-color"
    }`;
    const pending = "";
    const transitioning = "";

    if (isActive) return cn(base, active);
    if (isPending) return cn(base, pending);
    if (isTransitioning) return cn(base, transitioning);
    return cn(base, normal);
};

const NavbarLinks = () => {
    const { user } = useContext(AuthContext);
    const { getText } = useContext(LanguageContext);

    const NAV_LINKS = [
        { to: "/home", label: getText("homePageNavLabel") },
        { to: "/booking", label: getText("bookingPageNavLabel") },
        { to: "/orders", label: getText("ordersPageNavLabel") },
        { to: "/menus", label: getText("menusPageNavLabel") },
        { to: "/cart", label: getText("cartPageNavLabel") },
    ];

    return (
        <ul className="flex flex-col gap-lg md:flex-row md:items-center">
            {NAV_LINKS.map((link) => (
                <li key={link.to} className="flex">
                    <NavLink to={link.to} className={(state) => getNavLinksClasses(state)}>
                        {link.label}
                    </NavLink>
                </li>
            ))}
            {user?.id && (
                <>
                    <li className="flex">
                        <NavLink className={(state) => getNavLinksClasses(state)} to={"/user"}>
                            {getText("userPageNavLabel")}
                        </NavLink>
                    </li>
                </>
            )}
        </ul>
    );
};

export const NavBar = () => {
    const [openMobileNav, setOpenMobileNav] = useState(false);

    const { user } = useContext(AuthContext);
    const { getText } = useContext(LanguageContext);
    const { theme } = useContext(ThemeContext);
    const { logout } = useAuth();

    const { pathname } = useLocation();
    const contentRef = useRef();

    useEffect(() => {
        setOpenMobileNav(false);
    }, [pathname]);

    useEffect(() => {
        const mobileNavContainer = contentRef.current;
        if (!mobileNavContainer) return;

        mobileNavContainer.style.maxHeight = openMobileNav ? `${mobileNavContainer.scrollHeight}px` : "0px";
    }, [openMobileNav]);

    const handleClick = () => setOpenMobileNav((prevValue) => !prevValue);

    return (
        <nav className="flex font-semibold">
            <Container
                className={`flex-1 py-md md:py-lg transition-all duration-400 ease-in-out ${
                    openMobileNav ? "gap-lg" : "gap-0"
                }`}
            >
                <div className="flex items-center justify-between">
                    <Link to={"/"} className="flex justify-center items-center">
                        <ImageContainer className="flex-1 w-10">
                            <Image imageData={LOGO_IMAGES} alt="Logo ReservApp" />
                        </ImageContainer>
                    </Link>

                    <div className="hidden md:block">
                        <NavbarLinks />
                    </div>

                    <div className="hidden md:flex md:gap-lg">
                        {!user?.id && (
                            <>
                                <Link
                                    className={`btn btn-primary ${theme === "dark" ? "text-text-color" : ""}`}
                                    to={"/register"}
                                >
                                    {getText("signUpButton")}
                                </Link>
                                <Link
                                    className={`btn btn-secondary ${
                                        theme === "dark" ? "text-text-color" : ""
                                    }`}
                                    to={"/login"}
                                >
                                    {getText("logInButton")}
                                </Link>
                            </>
                        )}
                        {user?.id && <button onClick={logout}>{getText("logOutButton")}</button>}
                    </div>

                    <BurgerButton openMobileNav={openMobileNav} handleClick={handleClick} />
                </div>

                <div
                    id="mobile-nav"
                    ref={contentRef}
                    className={cn(
                        "md:hidden flex flex-col overflow-hidden max-h-0 transition-[max-height] duration-300 ease-in-out"
                    )}
                >
                    <div className="flex flex-col items-start gap-lg">
                        <NavbarLinks />
                        {!user?.id && (
                            <>
                                <Link
                                    className={`btn btn-primary ${theme === "dark" ? "text-text-color" : ""}`}
                                    to={"/register"}
                                >
                                    {getText("signUpButton")}
                                </Link>
                                <Link
                                    className={`btn btn-secondary ${
                                        theme === "dark" ? "text-text-color" : ""
                                    }`}
                                    to={"/login"}
                                >
                                    {getText("logInButton")}
                                </Link>
                            </>
                        )}
                        {user?.id && <button onClick={logout}>{getText("logOutButton")}</button>}
                    </div>
                    <div className="flex flex-col bg-red-500"></div>
                </div>
            </Container>
        </nav>
    );
};
