import { useContext, useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { saveDataInSessionStorage } from "../helpers/storage";

export const PrivateRoute = () => {
    const { user } = useContext(AuthContext);
    const location = useLocation();

    useEffect(() => {
        if (!user) {
            saveDataInSessionStorage("intendedRoute", location.pathname);
        }
    }, [user, location.pathname]);

    if (user === null) {
        return <div>Cargando...</div>;
    }

    if (user === false) {
        console.log("Entrando en false");

        return <Navigate to={"/login"} />;
    }

    return <Outlet />;
};
