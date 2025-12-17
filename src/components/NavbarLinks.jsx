import classNames from "classnames";
import { memo, useContext, useMemo } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { ThemeContext } from "../contexts/ThemeContext";
import { useDevice } from "../hooks/useDevice";
import { useTranslate } from "../translations/useTranslate";

export const NavbarLinks = memo(({ handleLinkClick }) => {
    const { theme } = useContext(ThemeContext);
    const { t } = useTranslate();
    const { user } = useContext(AuthContext);
    const { isMobile2Xs, isMobileXs, isMobileSm, isTablet, isDesktop } = useDevice();

    const NAV_LINKS = [
        { to: "/bookings", label: t("navigation_bar.booking_page_nav_label") },
        { to: "/orders", label: t("navigation_bar.orders_page_nav_label") },
        { to: "/menu", label: t("navigation_bar.menus_page_nav_label") },
        { to: "/cart", label: t("navigation_bar.cart_page_nav_label") },
    ];

    const linksBaseClasses = `flex-1 relative transition-all  duration-500 ease-in-out active:scale-95 font-medium shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2`;

    const linksConfig = useMemo(
        () =>
            classNames({
                "px-xs py-0.5 rounded-sm": isMobile2Xs,
                "px-sm py-xs rounded-sm": isMobileXs || isDesktop,
                "px-md py-sm rounded-sm": isMobileSm || isTablet,
            }),
        [isMobile2Xs, isMobileXs, isMobileSm, isTablet, isDesktop]
    );

    return (
        <ul className="flex flex-1 flex-col 2xs:gap-xs xs:gap-sm lg:flex-row lg:justify-center lg:gap-md">
            {NAV_LINKS.map((link) => {
                if (!user) return null;
                return (
                    <li key={link.to} className="perfect-center">
                        <NavLink
                            to={link.to}
                            onClick={() => handleLinkClick(link.to)}
                            className={(state) =>
                                `${theme} navbar-link ${linksBaseClasses} ${linksConfig} ${
                                    state.isActive ? "active" : ""
                                }`
                            }
                        >
                            {link.label}
                        </NavLink>
                    </li>
                );
            })}
        </ul>
    );
});
