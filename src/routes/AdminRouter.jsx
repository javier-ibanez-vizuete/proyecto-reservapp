import { useContext } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { PrivateRoute } from "../components/PrivateRoute";
import { AuthContext } from "../contexts/AuthContext";
import { DashboardPage } from "../pages/DashboardPage";

export const AdminRouter = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    if (user && user?.role === "user") return navigate("/dashboard", { replace: true });

    return (
        <Routes>
            <Route element={<PrivateRoute />}>
                <Route path="/dashboard/*" element={<DashboardPage />} />
            </Route>

            <Route path="*" element={<h1>PAGINA NO ENCONTRADA</h1>} />
        </Routes>
    );
};
