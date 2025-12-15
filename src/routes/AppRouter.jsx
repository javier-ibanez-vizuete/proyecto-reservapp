import { lazy, useContext, useMemo } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { Container } from "../components/Container";
import { ErrorBoundary } from "../components/ErrorBoundary/ErrorBoundary";
import { PageError } from "../components/ErrorBoundary/PageError";
import { useErrorBoundary } from "../components/ErrorBoundary/useErrorBoundary";
import { PrivateRoute } from "../components/PrivateRoute";
import { LanguageContext } from "../contexts/LanguageContext";
import { useAuth } from "../core/auth/useAuth";

const HomePage = lazy(() => import("../pages/HomePage"));
const MenuPage = lazy(() => import("../pages/MenuPage"));
const RegisterPage = lazy(() => import("../pages/RegisterPage"));
const LoginPage = lazy(() => import("../pages/LoginPage"));
const BookingPage = lazy(() => import("../pages/BookingPage"));
const CartPage = lazy(() => import("../pages/CartPage"));
const UserPage = lazy(() => import("../pages/UserPage"));
const OrderPage = lazy(() => import("../pages/OrdersPage"));

export const AppRouter = () => {
    const { loaderUser } = useAuth();

    const location = useLocation();

    const { getText } = useContext(LanguageContext);

    const { getErrorLocationName } = useErrorBoundary();

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
