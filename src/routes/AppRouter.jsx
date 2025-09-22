import { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { PrivateRoute } from "../components/PrivateRoute";
import { AuthContext } from "../contexts/AuthContext";
import { BookingPage } from "../pages/BookingPage";
import { CartPage } from "../pages/CartPage";
import { DashboardPage } from "../pages/DashboardPage";
import { HomePage } from "../pages/HomePage";
import { LoginPage } from "../pages/LoginPage";
import { MenuPage } from "../pages/MenuPage";
import { OrdersPage } from "../pages/OrdersPage";
import { RegisterPage } from "../pages/RegisterPage";

export const AppRouter = () => {
    const { user } = useContext(AuthContext);

    return (
        <Routes>
            <Route
                path="/"
                element={
                    user?.role === "admin" ? (
                        <Navigate to={"/dashboard"} replace />
                    ) : (
                        <Navigate to={"/home"} />
                    )
                }
            />
            <Route path="/home" element={<HomePage />} />

            <Route path="/menu" element={<MenuPage />} />

            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />

            <Route element={<PrivateRoute />}>
                <Route path="/booking" element={<BookingPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/user" element={<h1>RUTA PRIVADA</h1>} />
                <Route path="/dashboard/*" element={<DashboardPage />} />
                <Route path="/orders" element={<OrdersPage />} />
            </Route>

            <Route path="/*" element={<h1>RUTA NO ENCONTRADA</h1>} />
        </Routes>
    );
};
