import { useAuth } from "../core/auth/useAuth";

export const AdminLayout = ({ children }) => {
    const { logout } = useAuth();
    return (
        <div className="admin-layout">
            <aside>ASIDE DEL DASHBOARD</aside>
            <main>{children}</main>
            <footer onClick={logout}>FOOTER: CERRAR SESION</footer>
        </div>
    );
};
