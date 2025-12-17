import { useCallback, useContext } from "react";
import { useLocation } from "react-router-dom";
import { LanguageContext } from "../../contexts/LanguageContext";

export function useErrorBoundary() {
    const location = useLocation();
    const { getText } = useContext(LanguageContext);

    const onErrorRetry = useCallback(() => window.location.reload(), []);

    const onErrorReset = useCallback(() => (window.location.href = "/"), []);

    const getErrorLocationName = useCallback(() => {
        const pathName = location.pathname;
        if (pathName.startsWith("/menu")) return getText("error_sentences.on_error_menu_page");
        if (pathName.startsWith("/bookings")) return getText("error_sentences.on_error_bookings_page");
        if (pathName.startsWith("/orders")) return getText("error_sentences.on_error_orders_page");
        if (pathName.startsWith("/cart")) return getText("error_sentences.on_error_cart_page");
        if (pathName.startsWith("/user")) return "error_sentences.on_error_user_page";
        if (pathName.startsWith("/login")) return getText("error_sentences.on_error_login_page");
        if (pathName.startsWith("/register")) return getText("error_sentences.on_error_register_page");

        if (pathName.startsWith("/dashboard/users"))
            return getText("error_sentences.on_error_dashboard_users_page");
        if (pathName.startsWith("/dashboard/bookings"))
            return getText("error_sentences.on_error_dashboard_bookings_page");
        if (pathName.startsWith("/dashboard/orders"))
            return getText("error_sentences.on_error_dashboard_orders_page");
        if (pathName.startsWith("/dashboard/products"))
            return getText("error_sentences.on_error_dashboard_products_page");
        if (pathName.startsWith("/dashboard")) return getText("error_sentences.on_error_dashboard_page");
        return getText("error_sentences.on_error_home_page");
    }, [location.pathname, getText]);

    return { onErrorRetry, onErrorReset, getErrorLocationName };
}
