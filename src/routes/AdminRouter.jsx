import { useContext } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { UnderConstruction } from "../components/UnderConstruction";
import { AuthContext } from "../contexts/AuthContext";
import { useAuth } from "../core/auth/useAuth";
import { AdminPrivateRoute } from "../dashboard/components/AdminPrivateRoute";
import { AdminBookingDetail } from "../dashboard/pages/AdminBookingDetail";
import { AdminBookingsPage } from "../dashboard/pages/AdminBookingsPage";
import { AdminUserDetail } from "../dashboard/pages/AdminUserDetail";
import { AdminUsersPage } from "../dashboard/pages/AdminUsersPage";
import { AdminBookingsByDateSection } from "../dashboard/sections/AdminBookingsByDateSection";
import { AdminBookingsListSection } from "../dashboard/sections/AdminBookingsListSection";
import { AdminBookingsTodaySection } from "../dashboard/sections/AdminBookingsTodaySection";
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
                <Route path="/dashboard/users/:id" element={<AdminUserDetail />} />

                <Route path="/dashboard/bookings" element={<AdminBookingsPage />}>
                    <Route path="date" element={<AdminBookingsByDateSection />} />
                    <Route path="today" element={<AdminBookingsTodaySection />} />
                    <Route path="all" element={<AdminBookingsListSection />} />
                </Route>

                <Route path="/dashboard/bookings/:id" element={<AdminBookingDetail />} />

                <Route path="/dashboard/orders" element={<UnderConstruction pageName="Orders Page" />} />

                <Route path="/dashboard/products" element={<UnderConstruction pageName="Products Page" />} />
            </Route>

            <Route path="*" element={<Navigate to={user?.role === "admin" ? "/dashboard" : "/"} />} />
        </Routes>
    );
};
