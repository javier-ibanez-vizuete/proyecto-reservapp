import { useContext } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { UnderConstruction } from "../components/UnderConstruction";
import { AuthContext } from "../contexts/AuthContext";
import { useAuth } from "../core/auth/useAuth";
import { AdminPrivateRoute } from "../dashboard/components/AdminPrivateRoute";
import { AdminUsersPage } from "../dashboard/pages/AdminUsersPage";
import { DashboardPage } from "../pages/DashboardPage";

export const AdminRouter = () => {
    const { user } = useContext(AuthContext);
    const { loaderUser } = useAuth();
    const navigate = useNavigate();

    if (user && user?.role === "user") return navigate("/", { replace: true });

    if (user?.role !== "admin") return <Navigate to="/" replace />;

    if (loaderUser.isLoading) return <div>Cargando...</div>;

    return (
        <Routes>
            <Route element={<AdminPrivateRoute />}>
                <Route path="/dashboard" element={<DashboardPage />} />

                <Route path="/dashboard/users" element={<AdminUsersPage />} />

                <Route path="/dashboard/bookings" element={<UnderConstruction pageName="Bookings Page" />} />

                <Route path="/dashboard/orders" element={<UnderConstruction pageName="Orders Page" />} />

                <Route path="/dashboard/products" element={<UnderConstruction pageName="Products Page" />} />
            </Route>

            <Route path="*" element={<Navigate to={user?.role === "admin" ? "/dashboard" : "/"} />} />
        </Routes>
    );
};
