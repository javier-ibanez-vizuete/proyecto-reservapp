import { lazy, Suspense, useContext } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { ErrorBoundary } from "../components/ErrorBoundary/ErrorBoundary";
import { PageError } from "../components/ErrorBoundary/PageError";
import { useErrorBoundary } from "../components/ErrorBoundary/useErrorBoundary";
import { UnderConstruction } from "../components/UnderConstruction";
import { AuthContext } from "../contexts/AuthContext";
import { LanguageContext } from "../contexts/LanguageContext";
import { useAuth } from "../core/auth/useAuth";
import { AdminPrivateRoute } from "../dashboard/components/AdminPrivateRoute";
import { AdminContainer } from "../dashboard/components/UI/AdminContainer";
import { AdminProductsPage } from "../dashboard/pages/AdminProductsPage";
import { LoadingPage } from "../pages/LoadingPage";

const DashboardPage = lazy(() => import("../pages/DashboardPage"));
const AdminUsersPage = lazy(() => import("../dashboard/pages/AdminUsersPage"));
const AdminUserDetail = lazy(() => import("../dashboard/pages/AdminUserDetail"));
const AdminBookingsPage = lazy(() => import("../dashboard/pages/AdminBookingsPage"));
const AdminBookingsByDateSection = lazy(() => import("../dashboard/sections/AdminBookingsByDateSection"));
const AdminBookingsTodaySection = lazy(() => import("../dashboard/sections/AdminBookingsTodaySection"));
const AdminBookingsListSection = lazy(() => import("../dashboard/sections/AdminBookingsListSection"));
const AdminBookingDetail = lazy(() => import("../dashboard/pages/AdminBookingDetail"));

export const AdminRouter = () => {
    const { loaderUser } = useAuth();
    const navigate = useNavigate();
    const { getErrorLocationName } = useErrorBoundary();

    const { user } = useContext(AuthContext);
    const { getText } = useContext(LanguageContext);

    if (user && user?.role === "user") return navigate("/", { replace: true });

    if (user?.role !== "admin") return <Navigate to="/" replace />;

    if (loaderUser.isLoading) return <div>Cargando...</div>;

    return (
        <ErrorBoundary
            fallback={
                <AdminContainer className="flex-1">
                    <PageError
                        title={`${getText(
                            "error_sentences.on_error_base_sentence"
                        )} ${getErrorLocationName()}`}
                    />
                </AdminContainer>
            }
        >
            <Suspense fallback={<LoadingPage />}>
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

                        <Route
                            path="/dashboard/orders"
                            element={<UnderConstruction pageName="Orders Page" />}
                        />

                        {/* <Route
                            path="/dashboard/products"
                            element={<UnderConstruction pageName="Products Page" />}
                        /> */}
                        <Route path="/dashboard/products" element={<AdminProductsPage />} />
                    </Route>

                    <Route path="*" element={<Navigate to={user?.role === "admin" ? "/dashboard" : "/"} />} />
                </Routes>
            </Suspense>
        </ErrorBoundary>
    );
};
