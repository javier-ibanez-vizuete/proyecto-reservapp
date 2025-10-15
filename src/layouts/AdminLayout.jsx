import classNames from "classnames";
import { useContext, useEffect, useMemo, useState } from "react";
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
    const { theme } = useContext(ThemeContext);

    useEffect(() => {
        if (isDesktop) setIsAsideOpen(true);
    }, [isDesktop]);

    const onToggleAside = () => {
        console.log("haciendo click en Menu Hamburguesa");
        setIsAsideOpen((prev) => !prev);
    };

    const baseLayoutContainerClasses = "flex flex-1 flex-col divide-y";
    const baseMainClasses = "flex flex-col flex-3";

    const autoColorConfig = useMemo(
        () => ({
            layoutContainer: classNames({
                "divide-admin-text-color text-admin-text-color": theme === "light",
                "divide-admin-text-color-dark text-admin-text-color-dark": theme !== "light",
            }),
            main: classNames({
                "bg-admin-background": theme === "light",
                "bg-admin-background-dark": theme !== "light",
            }),
        }),
        [theme]
    );

    const currentAdminLayoutClasses = classNames(
        baseLayoutContainerClasses,
        autoColorConfig.layoutContainer || "divide-admin-text-color text-admin-text-color"
    );

    const currentMainClasses = classNames(baseMainClasses);

    const { logout } = useAuth();
    return (
        <div className={currentAdminLayoutClasses}>
            <AdminNavbar
                isLoggedIn={user ? true : false}
                user={user}
                isAsideOpen={isAsideOpen}
                onToggleAside={onToggleAside}
            />
            <div className={`flex flex-1 flex-col ${autoColorConfig.main} lg:gap-md`}>
                <AdminContainer className="flex-1 justify-between">
                    <AdminAside isAsideOpen={isAsideOpen} />
                    <main className={currentMainClasses}>{children}</main>
                </AdminContainer>
            </div>
            <footer onClick={logout}>FOOTER: CERRAR SESION</footer>
        </div>
    );
};
