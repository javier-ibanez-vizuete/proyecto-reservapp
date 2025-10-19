import { useContext } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
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

    if (user && user?.role === "user") return navigate("/", { replace: true });

    if (user?.role !== "admin") return navigate("/");
    console.log("que vale user", user);

    return (
        <Routes>
            <Route element={<PrivateRoute />}>
                <Route path="/dashboard/*" element={<DashboardPage />} />

                <Route path="/dashboard/users" element={<AdminUsersPage />} />

                <Route path="/dashboard/products" element={<AdminProductsPage />} />

                <Route path="/dashboard/bookings" element={<AdminBookingsPage />} />

                <Route path="/dashboard/orders" element={<AdminOrdersPage />} />
            </Route>

            <Route path="*" element={<Navigate to={user?.role === "admin" ? "/dashboard" : "/"} />} />
        </Routes>
    );
};
