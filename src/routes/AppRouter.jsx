import { useCallback, useContext, useMemo } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { Container } from "../components/Container";
import { ErrorBoundary } from "../components/ErrorBoundary/ErrorBoundary";
import { PageError } from "../components/ErrorBoundary/PageError";
import { PrivateRoute } from "../components/PrivateRoute";
import { LanguageContext } from "../contexts/LanguageContext";
import { useAuth } from "../core/auth/useAuth";
import { BookingPage } from "../pages/BookingPage";
import { CartPage } from "../pages/CartPage";
import { HomePage } from "../pages/HomePage";
import { LoginPage } from "../pages/LoginPage";
import { MenuPage } from "../pages/MenuPage";
import { OrderPage } from "../pages/OrdersPage";
import { RegisterPage } from "../pages/RegisterPage";
import { UserPage } from "../pages/UserPage";

export const AppRouter = () => {
    const location = useLocation();
    const { loaderUser } = useAuth();
    const { getText } = useContext(LanguageContext);

    console.log("Render AppRouter.jsx");

    const handleIntendedRoute = useMemo(() => {
        if (location.pathname.includes("/dashboard")) {
            return null;
        }
        return { errorRoute: true, intendedRoute: location.pathname };
    }, [location.pathname]);

    if (loaderUser.isLoading) return <div>Cargando...</div>;

    if (location.pathname.startsWith("/dashboard")) {
        return null;
    }

    const getErrorLocationName = useCallback(() => {
        const pathName = location.pathname;
        if (pathName.includes("menu")) return getText("onErrorMenuPage");
        if (pathName.includes("bookings")) return getText("onErrorBookingsPage");
        if (pathName.includes("orders")) return getText("onErrorOrdersPage");
        if (pathName.includes("cart")) return getText("onErrorCartPage");
        if (pathName.includes("user")) return "onErrorUserPage";
        if (pathName.includes("login")) return getText("onErrorLoginPage");
        if (pathName.includes("register")) return getText("onErrorRegisterPage");
        return getText("onErrorHomePage");
    }, [location.pathname, getText]);

    return (
        <ErrorBoundary
            fallback={
                <Container className="flex-1">
                    <PageError title={`${getText("onErrorBaseSentence")} ${getErrorLocationName()}`} />
                </Container>
            }
        >
            <Routes>
                <Route path="/" element={<HomePage />} />

                <Route path="/menu" element={<MenuPage />} />

                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage />} />

                <Route element={<PrivateRoute />}>
                    <Route path="/bookings" element={<BookingPage />} />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/user" element={<UserPage />} />
                    <Route path="/orders" element={<OrderPage />} />
                </Route>

                <Route path="/*" element={<Navigate to={"/"} state={handleIntendedRoute} replace />} />
            </Routes>
        </ErrorBoundary>
    );
};
