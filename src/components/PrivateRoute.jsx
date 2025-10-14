import { useContext, useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import {
    getDataFromSessionStorage,
    removeFromSessionStorage,
    saveDataInSessionStorage,
} from "../helpers/storage";

export const PrivateRoute = () => {
    const { user } = useContext(AuthContext);
    const location = useLocation();

    useEffect(() => {
        if (user === null) {
            saveDataInSessionStorage("intendedRoute", location.pathname);
        }
    }, [user, location.pathname]);

    if (user === null) {
        const routeFromStorage = getDataFromSessionStorage("currentRoute");
        if (!routeFromStorage) return <Navigate to={"login"} />;
        <Navigate to={routeFromStorage} />;
        return removeFromSessionStorage("currentRoute");
    }

    if (user === false) return <Navigate to={"/"} state={{ isUser: "No Existe Usuario" }} />;

    return <Outlet />;
};
