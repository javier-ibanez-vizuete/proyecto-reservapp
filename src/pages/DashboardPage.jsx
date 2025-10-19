import classNames from "classnames";
import { useCallback, useContext, useEffect, useMemo } from "react";
import { BookingsContext } from "../contexts/BookingsContext";
import { OrdersContext } from "../contexts/OrdersContext";
import { UsersContext } from "../contexts/UsersContext";
import { useBookings } from "../core/bookings/useBookings";
import { useUsers } from "../core/users/useUsers";
import { AdminBentoGrid } from "../dashboard/components/AdminBentoGrid";
import { AdminBentoGridItem } from "../dashboard/components/AdminBentoGridItem";
import { AdminBentoGridItemUser } from "../dashboard/components/AdminBentoGridItemUser";
import { AdminSkeleton } from "../dashboard/components/AdminSkeleton";
import { useDevice } from "../hooks/useDevice";
import { useLoading } from "../hooks/useLoading";
import {
    calculateCompletedOrdersPercentage,
    getCancelledOrders,
    getCompletedOrders,
    getConnectedUsers,
    getDelayedBookings,
    getPendingOrders,
    getTodaysBookings,
    getTotalBookings,
    getTotalOrders,
    getTotalUsers,
} from "../utils/stats";

export const DashboardPage = () => {
    const { users } = useContext(UsersContext);
    const { orders } = useContext(OrdersContext);
    const { bookings } = useContext(BookingsContext);

    const { getUsers } = useUsers();
    const loaderUsers = useLoading();

    const { getBookings } = useBookings();
    const loaderBookings = useLoading();

    const { isMobile2Xs, isMobileXs, isMobileSm, isTablet, isDesktop } = useDevice();

    const handleGetUsers = useCallback(async () => {
        try {
            loaderUsers.setIsLoading(true);
            const usersResponse = await getUsers();
            console.log("que vale userresponse", usersResponse);
        } catch (err) {
            //Aqui meter un toast
        } finally {
            loaderUsers.setIsLoading(false);
        }
    }, []);

    const handleGetBookings = useCallback(async () => {
        try {
            loaderBookings.setIsLoading(true);
            const bookingsResponse = await getBookings();
        } catch (err) {
            // Aqui meter un toast
        } finally {
            loaderBookings.setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        if (!users || !users.length) handleGetUsers();
    }, [users]);

    useEffect(() => {
        if (!bookings || !bookings.length) handleGetBookings();
    }, [bookings]);

    // LLAMAR FUNCION DE OBTENER USUARIOS

    const dashboardItems = [
        {
            title: getTotalUsers(users),
            description: "Usuarios",
            icon: "",
            to: "/dashboard/users",
            colSpan: 1,
            rowSpan: 1,
            gradient: null,
        },
        {
            title: getConnectedUsers(users),
            description: "Usuarios Conectados",
            icon: "",
            to: "/dashboard/users",
            colSpan: 1,
            rowSpan: 1,
            gradient: null,
        },
        {
            title: getTotalOrders(orders),
            description: "PEDIDOS TOTALES",
            icon: "",
            to: "/dashboard/orders",
            colSpan: 1,
            rowSpan: 1,
            gradient: null,
        },
        {
            title: getCompletedOrders(orders),
            description: "PEDIDOS COMPLETADOS",
            icon: "",
            to: "/dashboard/orders",
            colSpan: 1,
            rowSpan: 1,
            gradient: null,
        },
        {
            title: getPendingOrders(orders),
            description: "PEDIDOS PENDIENTES",
            icon: "",
            to: "/dashboard/orders",
            colSpan: 1,
            rowSpan: 1,
            gradient: null,
        },
        {
            title: getCancelledOrders(orders),
            description: "PEDIDOS CANCELADOS",
            icon: "",
            to: "/dashboard/orders",
            colSpan: 1,
            rowSpan: 1,
            gradient: null,
        },
        {
            title: `${calculateCompletedOrdersPercentage(orders).toFixed(0)}%`,
            description: "PORCENTAJE Completados",
            icon: "",
            to: "/dashboard/orders",
            colSpan: 1,
            rowSpan: 1,
            gradient: null,
        },
        {
            title: getTotalBookings(bookings),
            description: "Reservas Totales",
            icon: "",
            to: "/dashboard/bookings",
            colSpan: 1,
            rowSpan: 1,
            gradient: null,
        },
        {
            title: getTodaysBookings(bookings),
            description: "Reservas (Hoy)",
            icon: "",
            to: "/dashboard/bookings",
            colSpan: 1,
            rowSpan: 1,
            gradient: null,
        },
        {
            title: getDelayedBookings(bookings),
            description: "Reservas con retraso",
            icon: "",
            to: "/dashboard/bookings",
            colSpan: 1,
            rowSpan: 1,
            gradient: null,
        },
        {
            title: 40,
            description: "Productos",
            icon: "",
            to: "/dashboard/products",
            colSpan: 1,
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
                        gradient={item.gradient}
                    />
                ))}
                {/* ESTO ES UN EJEMPLO HAY QUE COMPONETIZARLO */}
                <AdminBentoGridItem to="/dashboard/users" colSpan={2}>
                    <article className="flex flex-1 justify-center gap-xs">
                        {loaderUsers.isLoading &&
                            Array.from({ length: usersBentoDisplay }).map((_, index) => (
                                <AdminSkeleton key={index} variant="avatar" />
                            ))}
                        {users
                            .sort((userA, userB) => userB.isActive - userA.isActive)
                            .slice(0, usersBentoDisplay)
                            .map((user) => (
                                <AdminBentoGridItemUser key={user?.id || user?._id} user={user} />
                            ))}
                    </article>
                </AdminBentoGridItem>
            </AdminBentoGrid>
        </div>
    );
};
