import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

export const PrivateRoute = () => {
    const { user } = useContext(AuthContext);

    if (user === null) return <div>Cargando</div>;

    if (user === false) return <Navigate to={"/"} state={{ isUser: "No Existe Usuario" }} />;

    return <Outlet />;
};
