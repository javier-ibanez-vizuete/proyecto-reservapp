import classNames from "classnames";
import { useContext, useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { ThemeContext } from "../contexts/ThemeContext";
import { AdminNavbar } from "../dashboard/components/AdminNavbar";
import { AdminAside } from "../dashboard/components/UI/AdminAside";
import { AdminContainer } from "../dashboard/components/UI/AdminContainer";
import { useDevice } from "../hooks/useDevice";

export const AdminLayout = ({ children }) => {
    const [isAsideOpen, setIsAsideOpen] = useState(false);
    const { user } = useContext(AuthContext);

    const { isDesktop } = useDevice();
    const { theme } = useContext(ThemeContext);
    const location = useLocation();

    useEffect(() => {
        if (isDesktop) setIsAsideOpen(true);
        if (!isDesktop) setIsAsideOpen(false);
    }, [isDesktop]);

    useEffect(() => {
        if (!isDesktop) setIsAsideOpen(false);
    }, [location.pathname]);

    useEffect(() => {
        if (isAsideOpen && !isDesktop) return document.body.classList.add("overflow-hidden");
        if (!isAsideOpen) return document.body.classList.remove("overflow-hidden");
    }, [isAsideOpen, isDesktop]);

    const onToggleAside = () => {
        setIsAsideOpen((prev) => !prev);
    };

    const baseLayoutContainerClasses = "flex flex-1 flex-col divide-y";
    const baseAsideContainerClasses = `flex flex-1 flex-col relative admin-aside-container`;
    const baseAdminContainerBaseClasses = "flex-1 justify-between before";
    const baseMainClasses = "flex flex-6 flex-col";

    const autoColorConfig = useMemo(
        () => ({
            layoutContainer: classNames({
                "divide-admin-text-color text-admin-text-color": theme === "light",
                "divide-admin-text-color-dark text-admin-text-color-dark": theme !== "light",
            }),
            mainContainer: classNames({
                "bg-admin-background": theme === "light",
                "bg-admin-background-dark": theme !== "light",
            }),
        }),
        [theme]
    );

    const currentAdminLayoutClasses = classNames(baseLayoutContainerClasses, autoColorConfig.layoutContainer);
    const currentAdminContainerClasses = classNames(baseAdminContainerBaseClasses);
    const currentAsideContainerClasses = classNames(
        baseAsideContainerClasses,
        autoColorConfig.mainContainer,
        theme
    );

    return (
        <div className={currentAdminLayoutClasses}>
            <AdminNavbar
                isLoggedIn={user ? true : false}
                user={user}
                isAsideOpen={isAsideOpen}
                onToggleAside={onToggleAside}
            />
            <div className={currentAsideContainerClasses}>
                <AdminContainer className={currentAdminContainerClasses}>
                    <AdminAside isAsideOpen={isAsideOpen} />
                    <main className={baseMainClasses}>{children}</main>
                </AdminContainer>
            </div>
        </div>
    );
};
