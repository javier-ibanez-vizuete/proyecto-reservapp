import { useContext } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { PrivateRoute } from "../components/PrivateRoute";
import { AuthContext } from "../contexts/AuthContext";
import { BookingPage } from "../pages/BookingPage";
import { CartPage } from "../pages/CartPage";
import { DashboardPage } from "../pages/DashboardPage";
import { HomePage } from "../pages/HomePage";
import { LoginPage } from "../pages/LoginPage";
import { MenuPage } from "../pages/MenuPage";
import { OrderPage } from "../pages/OrdersPage";
import { RegisterPage } from "../pages/RegisterPage";
import { UserPage } from "../pages/UserPage";

export const AppRouter = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    if (user && user?.role === "admin") return navigate("/dashboard", { replace: true });

    return (
        <Routes>
            <Route path="/" element={<HomePage />} />

            <Route path="/menu" element={<MenuPage />} />

            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />

            <Route element={<PrivateRoute />}>
                <Route path="/booking" element={<BookingPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/user" element={<UserPage />} />
                <Route path="/dashboard/*" element={<DashboardPage />} />
                <Route path="/orders" element={<OrderPage />} />
            </Route>

            <Route path="/*" element={<h1>RUTA NO ENCONTRADA</h1>} />
        </Routes>
    );
};
