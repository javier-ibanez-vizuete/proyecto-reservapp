import { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { PrivateRoute } from "../components/PrivateRoute";
import { AuthContext } from "../contexts/AuthContext";
import { DashboardPage } from "../pages/DashboardPage";
import { HomePage } from "../pages/HomePage";
import { LoginPage } from "../pages/LoginPage";
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

            <Route path="/orders" element={<OrdersPage />} />

            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />

            <Route element={<PrivateRoute />}>
                <Route path="/user" element={<h1>RUTA PRIVADA</h1>} />
                <Route path="/dashboard/*" element={<DashboardPage />} />
            </Route>

            <Route path="*" element={<h1>RUTA NO ENCONTRADA</h1>} />
        </Routes>
    );
};
