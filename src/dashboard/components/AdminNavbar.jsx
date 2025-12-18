import classNames from "classnames";
import { useContext, useMemo } from "react";
import { Link } from "react-router-dom";
import { BurgerButton } from "../../components/BurgerButton";
import { Image } from "../../components/UI/Image";
import { ImageContainer } from "../../components/UI/ImageContainer";
import { ThemeButton } from "../../components/UI/ThemeButton";
import { ThemeContext } from "../../contexts/ThemeContext";
import { LOGO_DARK, LOGO_LIGHT } from "../../data/LOGO_DATA";
import { useDevice } from "../../hooks/useDevice";
import { useWindowWidth } from "../../hooks/useWindowWidth";
import { LanguagesSelector } from "../../translations/LanguagesSelector.jsx";
import { AdminContainer } from "./UI/AdminContainer";

export const AdminNavbar = ({
    isAsideOpen = false,
    onToggleAside = () => {},
    padding,
    height,
    bgColor,
    logoSize,
    className = "",
}) => {
    const { isMobile2Xs, isMobileXs, isMobileSm, isTablet, isDesktop } = useDevice();
    const width = useWindowWidth();
    const { theme } = useContext(ThemeContext);

    const baseClasses = "flex flex-col justify-center";

    const variantsBgColor = classNames({
        "bg-admin-accent-background": theme === "light",
        "bg-admin-accent-background-dark": theme !== "light",
    });

    const variantsPadding = {
        xs: "py-xs",
        sm: "py-sm",
        md: "py-md",
        lg: "py-lg",
        xl: "py-xl",
    };

    const variantsHeight = {
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

    const navClasses = classNames(
        baseClasses,
        variantsHeight[height] || autoConfig.height || variantsHeight?.sm,
        variantsPadding[padding] || autoConfig.padding || variantsPadding?.sm,
        bgColor || variantsBgColor || "bg-admin-accent-background",
        className
    );

    const currentLogoSize = classNames(
        variantsLogoSize[logoSize] || autoConfig.logoSize || variantsLogoSize.default
    );

    return (
        <nav className={navClasses}>
            <AdminContainer className="justify-between items-center">
                <div className="flex items-center 2xs:gap-sm md:gap-md">
                    <div className="flex flex-col self-stretch lg:hidden">
                        <BurgerButton isMobileMenuOpen={isAsideOpen} toggleMobileMenu={onToggleAside} />
                    </div>
                    <div className="perfect-center flex-1">
                        <Link to={"/dashboard"}>
                            <ImageContainer size={currentLogoSize}>
                                <Image
                                    imageData={theme === "light" ? LOGO_LIGHT : LOGO_DARK}
                                    alt="Logo ReservApp"
                                />
                            </ImageContainer>
                        </Link>
                    </div>
                </div>
                <h2>ReservApp</h2>
                <div className="flex justify-end items-center 2xs:gap-sm md:gap-md">
                    <ThemeButton />
                    <LanguagesSelector placement="bottom-end" />
                </div>
            </AdminContainer>
        </nav>
    );
};
