import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

export const PrivateRoute = () => {
    const { user } = useContext(AuthContext);

    if (!user) return <Navigate to={"/"} state={{ isUser: "No Existe Usuario" }} />;

    return <Outlet />;
};
