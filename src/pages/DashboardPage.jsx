import { useAuth } from "../core/auth/useAuth";

export const DashboardPage = () => {
    const { logout } = useAuth();

    return (
        <div>
            <h1>DASHBOARD</h1>
            <button onClick={logout}>CERRAR SESION</button>
        </div>
    );
};
