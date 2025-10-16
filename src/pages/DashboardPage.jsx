import classNames from "classnames";
import { useCallback, useContext, useEffect, useMemo } from "react";
import { UsersContext } from "../contexts/UsersContext";
import { useUsers } from "../core/users/useUsers";
import { AdminBentoGrid } from "../dashboard/components/AdminBentoGrid";
import { AdminBentoGridItem } from "../dashboard/components/AdminBentoGridItem";
import { AdminBentoGridItemUser } from "../dashboard/components/AdminBentoGridItemUser";
import { AdminSkeleton } from "../dashboard/components/AdminSkeleton";
import { useDevice } from "../hooks/useDevice";
import { useLoading } from "../hooks/useLoading";

export const DashboardPage = () => {
    const { users } = useContext(UsersContext);
    const { getUsers } = useUsers();
    const loaderUsers = useLoading();

    const { isMobile2Xs, isMobileXs, isMobileSm, isTablet, isDesktop } = useDevice();

    const handleGetUsers = useCallback(async () => {
        try {
            loaderUsers.setIsLoading(true);
            await getUsers();
            console.log("Usuarios Obtenidos");
        } catch (err) {
        } finally {
            loaderUsers.setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        if (!users) handleGetUsers();
    }, []);

    // LLAMAR FUNCION DE OBTENER USUARIOS

    const dashboardItems = [
        {
            title: 5,
            description: "Usuarios Conectados",
            icon: "",
            to: "/dashboard/users",
            colSpan: 1,
            rowSpan: 1,
            gradient: null,
        },
        {
            title: 6,
            description: "Reservas (Hoy)",
            icon: "",
            to: "/dashboard/bookings",
            colSpan: 2,
            rowSpan: 2,
            gradient: null,
        },
        {
            title: 4,
            description: "Pedidos Pendientes",
            icon: "",
            to: "/dashboard/orders",
            colSpan: 1,
            rowSpan: 1,
            gradient: null,
        },
        {
            title: 40,
            description: "Productos",
            icon: "",
            to: "/dashboard/products",
            colSpan: 2,
            rowSpan: 1,
            gradient: null,
        },
    ];

    const usersBentoDisplay = useMemo(
        () =>
            classNames({
                3: isMobile2Xs || isMobileXs || isTablet || isDesktop,
                2: isMobileSm,
            }),
        [isMobile2Xs, isMobileXs, isMobileSm, isTablet, isDesktop]
    );

    console.log("users", users);

    return (
        <div className="flex flex-1 flex-col">
            <AdminBentoGrid>
                {dashboardItems.map((item) => (
                    <AdminBentoGridItem
                        key={item.description}
                        to={item.to}
                        colSpan={item.colSpan}
                        rowSpan={item.rowSpan}
                        title={item.title}
                        description={item.description}
                    />
                ))}
                {/* ESTO ES UN EJEMPLO HAY QUE COMPONETIZARLO */}
                <AdminBentoGridItem to="/dashboard/users">
                    <article className="flex flex-1 justify-center gap-xs">
                        {loaderUsers.isLoading &&
                            Array.from({ length: usersBentoDisplay }).map((_, index) => (
                                <AdminSkeleton key={index} variant="avatar" />
                            ))}
                        {users
                            .sort((userA, userB) => userB.isActive - userA.isActive)
                            .slice(0, usersBentoDisplay)
                            .map((user) => (
                                <AdminBentoGridItemUser user={user} />
                            ))}
                    </article>
                </AdminBentoGridItem>
            </AdminBentoGrid>
        </div>
    );
};
