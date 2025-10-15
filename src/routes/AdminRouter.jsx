import { useContext } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { PrivateRoute } from "../components/PrivateRoute";
import { AuthContext } from "../contexts/AuthContext";
import { AdminBookingsPage } from "../dashboard/pages/AdminBookingsPage";
import { AdminOrdersPage } from "../dashboard/pages/AdminOrdersPage";
import { AdminProductsPage } from "../dashboard/pages/AdminProductsPage";
import { AdminUsersPage } from "../dashboard/pages/AdminUsersPage";
import { DashboardPage } from "../pages/DashboardPage";

export const AdminRouter = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    if (user && user?.role === "user") return navigate("/dashboard", { replace: true });

    return (
        <Routes>
            <Route element={<PrivateRoute />}>
                <Route path="/dashboard/*" element={<DashboardPage />} />

                <Route path="/dashboard/users" element={<AdminUsersPage />} />

                <Route path="/dashboard/products" element={<AdminProductsPage />} />

                <Route path="/dashboard/bookings" element={<AdminBookingsPage />} />

                <Route path="/dashboard/orders" element={<AdminOrdersPage />} />
            </Route>

            <Route path="*" element={<h1>PAGINA NO ENCONTRADA</h1>} />
        </Routes>
    );
};
