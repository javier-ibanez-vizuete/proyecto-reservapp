import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { PrivateRoute } from "../components/PrivateRoute";
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

    return (
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

            <Route
                path="/*"
                element={
                    <Navigate
                        to={"/"}
                        state={{ errorRoute: true, intendedRoute: location.pathname }}
                        replace
                    />
                }
            />
        </Routes>
    );
};
