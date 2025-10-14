import classNames from "classnames";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { ThemeContext } from "../contexts/ThemeContext";
import { useAuth } from "../core/auth/useAuth";
import { AdminNavbar } from "../dashboard/components/AdminNavbar";
import { AdminAside } from "../dashboard/components/UI/AdminAside";
import { AdminContainer } from "../dashboard/components/UI/AdminContainer";
import { useDevice } from "../hooks/useDevice";

export const AdminLayout = ({ children }) => {
    const [isAsideOpen, setIsAsideOpen] = useState(false);
    const { user } = useContext(AuthContext);
    const { isDesktop } = useDevice();
    const theme = useContext(ThemeContext);

    useEffect(() => {
        if (isDesktop) setIsAsideOpen(true);
    }, [isDesktop]);

    const onToggleAside = () => {
        console.log("haciendo click en Menu Hamburguesa");
        setIsAsideOpen((prev) => !prev);
    };

    const divideLineColor = classNames({
        "divide-admin-text-color": theme === "light",
        "divide-admin-text-color-dark": theme !== "light",
    });

    const { logout } = useAuth();
    return (
        <div className="admin-layout divide-y divide-admin-">
            <AdminNavbar
                isLoggedIn={user ? true : false}
                user={user}
                isAsideOpen={isAsideOpen}
                onToggleAside={onToggleAside}
            />
            <div className="flex flex-1 flex-col lg:gap-md">
                <AdminContainer className="flex-1 justify-between">
                    <AdminAside isAsideOpen={isAsideOpen} />
                    <main className="flex-3">{children}</main>
                </AdminContainer>
            </div>
            <footer onClick={logout}>FOOTER: CERRAR SESION</footer>
        </div>
    );
};
