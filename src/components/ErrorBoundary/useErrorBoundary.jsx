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
        if (pathName.startsWith("/menu")) return getText("onErrorMenuPage");
        if (pathName.startsWith("/bookings")) return getText("onErrorBookingsPage");
        if (pathName.startsWith("/orders")) return getText("onErrorOrdersPage");
        if (pathName.startsWith("/cart")) return getText("onErrorCartPage");
        if (pathName.startsWith("/user")) return "onErrorUserPage";
        if (pathName.startsWith("/login")) return getText("onErrorLoginPage");
        if (pathName.startsWith("/register")) return getText("onErrorRegisterPage");

        if (pathName.startsWith("/dashboard/users")) return getText("onErrorDashboardUsersPage");
        if (pathName.startsWith("/dashboard/bookings")) return getText("onErrorDashboardBookingsPage");
        if (pathName.startsWith("/dashboard/orders")) return getText("onErrorDashboardOrdersPage");
        if (pathName.startsWith("/dashboard/products")) return getText("onErrorDashboardProductsPage");
        if (pathName.startsWith("/dashboard")) return getText("onErrorDashboardPage");
        return getText("onErrorHomePage");
    }, [location.pathname, getText]);

    return { onErrorRetry, onErrorReset, getErrorLocationName };
}
