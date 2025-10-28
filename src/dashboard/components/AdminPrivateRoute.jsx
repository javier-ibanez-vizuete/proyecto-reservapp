import { useContext } from "react";
import { Outlet } from "react-router-dom";
import { Spinner } from "../../components/Spinner/Spinner";
import { AuthContext } from "../../contexts/AuthContext";

export const AdminPrivateRoute = () => {
    const { user } = useContext(AuthContext);

    // console.log("que vale user en AdminPrivateRoute", user);

    if (user === null) {
        return (
            <div className="flex-1 perfect-center">
                <Spinner size="xl" color="primary" />
            </div>
        );
    }
    if (user === false || user?.role !== "admin") {
        console.log("Estoy entrando por aqui");

        return <Navigate to={"/"} replace />;
    }

    return <Outlet />;
};
