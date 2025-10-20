import { useContext, useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { saveDataInSessionStorage } from "../helpers/storage";
import { Spinner } from "./Spinner/Spinner";

export const PrivateRoute = () => {
    const { user } = useContext(AuthContext);
    const location = useLocation();

    useEffect(() => {
        if (!user && !location.pathname.includes("/dashboard")) {
            saveDataInSessionStorage("intendedRoute", location.pathname);
        }
    }, [user, location.pathname]);

    if (user === null) {
        return (
            <div className="flex-1 perfect-center">
                <Spinner size="xl" color="primary" />
            </div>
        );
    }

    if (user === false) {
        return <Navigate to={"/login"} />;
    }

    return <Outlet />;
};
