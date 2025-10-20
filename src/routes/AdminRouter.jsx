import { useContext } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { PrivateRoute } from "../components/PrivateRoute";
import { UnderConstruction } from "../components/UnderConstruction";
import { AuthContext } from "../contexts/AuthContext";
import { useAuth } from "../core/auth/useAuth";
import { DashboardPage } from "../pages/DashboardPage";

export const AdminRouter = () => {
    const { user } = useContext(AuthContext);
    const { loaderUser } = useAuth();
    const navigate = useNavigate();

    if (user && user?.role === "user") return navigate("/", { replace: true });

    if (user?.role !== "admin") return navigate("/");

    if (loaderUser.isLoading) return <div>Cargando...</div>;

    return (
        <Routes>
            <Route element={<PrivateRoute />}>
                <Route path="/dashboard/*" element={<DashboardPage />} />

                <Route path="/dashboard/users" element={<UnderConstruction pageName="Users Page" />} />

                <Route path="/dashboard/bookings" element={<UnderConstruction pageName="Bookings Page" />} />

                <Route path="/dashboard/orders" element={<UnderConstruction pageName="Orders Page" />} />

                <Route path="/dashboard/products" element={<UnderConstruction pageName="Products Page" />} />
            </Route>

            <Route path="*" element={<Navigate to={user?.role === "admin" ? "/dashboard" : "/"} />} />
        </Routes>
    );
};
