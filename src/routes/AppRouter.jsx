import { Navigate, Route, Routes } from "react-router-dom";
import { PrivateRoute } from "../components/PrivateRoute";
import { HomePage } from "../pages/HomePage";
import { RegisterPage } from "../pages/RegisterPage";
import { LoginPage } from "../pages/LoginPage";
import { OrdersPage } from "../pages/OrdersPage";

export const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<Navigate to={"/home"} />} />
            <Route path="/home" element={<HomePage />} />

            <Route path="/orders" element={<OrdersPage />} />

            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />

            <Route element={<PrivateRoute />}>
                <Route path="/user" element={<h1>RUTA PRIVADA</h1>} />
            </Route>

            <Route path="*" element={<h1>RUTA NO ENCONTRADA</h1>} />
        </Routes>
    );
};
