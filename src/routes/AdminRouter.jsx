import { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { PrivateRoute } from "../components/PrivateRoute";
import { AuthContext } from "../contexts/AuthContext";
import { DashboardPage } from "../pages/DashboardPage";

export const AdminRouter = () => {
    const { user } = useContext(AuthContext);

    console.log("Estoy pasando por aqui");

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

            <Route element={<PrivateRoute />}>
                <Route path="/dashboard/*" element={<DashboardPage />} />
            </Route>

            <Route path="*" element={<DashboardPage />} />
        </Routes>
    );
};
