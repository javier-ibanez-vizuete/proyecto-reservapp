import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { LanguageContext } from "../contexts/LanguageContext";

export const NavbarLinks = ({ handleLinkClick }) => {
    const { getText } = useContext(LanguageContext);
    const { user } = useContext(AuthContext);

    const NAV_LINKS = [
        { to: "/booking", label: getText("bookingPageNavLabel") },
        { to: "/orders", label: getText("ordersPageNavLabel") },
        { to: "/menu", label: getText("menusPageNavLabel") },
        { to: "/cart", label: getText("cartPageNavLabel") },
    ];

    return (
        <ul className="flex flex-col gap-2 lg:flex-row lg:gap-3 lg:flex-1 lg:justify-center">
            {NAV_LINKS.map((link) => {
                if (!user) return null;
                return (
                    <li key={link.to} className="flex justify-center items-center">
                        <NavLink
                            to={link.to}
                            onClick={() => handleLinkClick(link.to)}
                            className={(state) => `navbar-link ${state.isActive ? "active" : ""}`}
                        >
                            {link.label}
                        </NavLink>
                    </li>
                );
            })}
        </ul>
    );
};
