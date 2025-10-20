import { useCallback, useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer } from "../components/ToastContainer";
import { BookingsContext } from "../contexts/BookingsContext";
import { LanguageContext } from "../contexts/LanguageContext";
import { OrdersContext } from "../contexts/OrdersContext";
import { ProductsContext } from "../contexts/ProductsContext";
import { UsersContext } from "../contexts/UsersContext";
import { useBookings } from "../core/bookings/useBookings";
import { useOrders } from "../core/orders/useOrders";
import { useProducts } from "../core/products/useProducts";
import { useUsers } from "../core/users/useUsers";
import { AdminBentoGrid } from "../dashboard/components/AdminBentoGrid";
import { AdminBentoGridItem } from "../dashboard/components/AdminBentoGridItem";
import { getDataFromSessionStorage, removeFromSessionStorage } from "../helpers/storage";
import { useLoading } from "../hooks/useLoading";
import { useToast } from "../hooks/useToast";
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
    getTotalProducts,
    getTotalUsers,
} from "../utils/stats";

export const DashboardPage = () => {
    const { users } = useContext(UsersContext);
    const { bookings } = useContext(BookingsContext);
    const { orders } = useContext(OrdersContext);
    const { products } = useContext(ProductsContext);

    const { getUsers } = useUsers();
    const loaderUsers = useLoading();

    const { getBookings } = useBookings();
    const loaderBookings = useLoading();

    const { getOrders } = useOrders();
    const loaderOrders = useLoading();

    const { getProducts } = useProducts();
    const loaderProducts = useLoading();

    const navigate = useNavigate();
    const location = useLocation();

    const { toasts, showToast, dismissToast } = useToast();
    const { getText } = useContext(LanguageContext);

    const handleGetUsers = useCallback(async () => {
        try {
            loaderUsers.setIsLoading(true);
            await getUsers();
        } catch (err) {
            showToast("Error Obteniendo Usuarios", "error", 1000);
        } finally {
            loaderUsers.setIsLoading(false);
        }
    }, []);

    const handleGetBookings = useCallback(async () => {
        try {
            loaderBookings.setIsLoading(true);
            await getBookings();
        } catch (err) {
            showToast("Error Obteniendo Reservas", "error", 1000);
        } finally {
            loaderBookings.setIsLoading(false);
        }
    }, []);

    const handleGetOrders = useCallback(async () => {
        try {
            loaderOrders.setIsLoading(true);
            await getOrders();
        } catch (err) {
            showToast("Error Pedidos", "error", 1000);
        } finally {
            loaderOrders.setIsLoading(false);
        }
    }, []);

    const handleGetProducts = useCallback(async () => {
        try {
            loaderProducts.setIsLoading(true);
            await getProducts();
        } catch (err) {
            showToast("Error Productos", "error", 1000);
        } finally {
            loaderProducts.setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        if (!users || !users.length) handleGetUsers();
        if (!bookings || !bookings.length) handleGetBookings();
        if (!orders || !orders.length) handleGetOrders();
        if (!products || !products.length) handleGetProducts();
    }, [users, bookings, orders, products]);

    useEffect(() => {
        const fromLogin =
            location.state?.fromLogin === true || getDataFromSessionStorage("fromLogin") === true;

        if (!fromLogin) return;

        showToast(getText("toastLoginSuccess"), "success", 2000, "top-center");
        removeFromSessionStorage("fromLogin");
        navigate(location.pathname, { replace: true, state: {} });
    }, [location.state]);

    const dashboardItems = [
        {
            title: loaderUsers.isLoading ? loaderUsers.isLoading : getTotalUsers(users),
            description: "dashboardTotalUsersDescriptionLabel",
            icon: "",
            to: "/dashboard/users",
            colSpan: 1,
            rowSpan: 2,
            gradient: null,
        },
        {
            title: null,
            description: "",
            icon: null,
            users: loaderUsers.isLoading ? loaderUsers.isLoading : users,
            to: "/dashboard/users",
            colSpan: 2,
            rowSpan: 1,
            gradient: "success",
        },
        {
            title: loaderUsers.isLoading ? loaderUsers.isLoading : getConnectedUsers(users),
            description: "dashboardConnectedUsersDescriptionLabel",
            icon: "",
            to: "/dashboard/users",
            colSpan: 1,
            rowSpan: 1,
            gradient: null,
        },
        {
            title: loaderBookings.isLoading ? loaderBookings.isLoading : getTotalBookings(bookings),
            description: "dashboardTotalBookingsDescriptionLabel",
            icon: "",
            to: "/dashboard/bookings",
            colSpan: 1,
            rowSpan: 2,
            gradient: null,
        },
        {
            title: loaderBookings.isLoading ? loaderBookings.isLoading : getTodaysBookings(bookings),
            description: "dashboardPendingBookingsDescriptionLabel",
            icon: "",
            to: "/dashboard/bookings",
            colSpan: 2,
            rowSpan: 2,
            gradient: null,
        },
        {
            title: loaderBookings.isLoading ? loaderBookings.isLoading : getDelayedBookings(bookings),
            description: "dashboardDelayedBookingsDescriptionLabel",
            icon: "",
            to: "/dashboard/bookings",
            colSpan: 1,
            rowSpan: 1,
            gradient: null,
        },
        {
            title: loaderOrders.isLoading ? loaderOrders.isLoading : getTotalOrders(orders),
            description: "dashboardTotalOrdersDescriptionLabel",
            icon: "",
            to: "/dashboard/orders",
            colSpan: 1,
            rowSpan: 2,
            gradient: null,
        },
        {
            title: loaderOrders.isLoading ? loaderOrders.isLoading : getCompletedOrders(orders),
            description: "dashboardCompletedOrdersDescriptionLabel",
            icon: "",
            to: "/dashboard/orders",
            colSpan: 1,
            rowSpan: 1,
            gradient: null,
        },
        {
            title: loaderOrders.isLoading ? loaderOrders.isLoading : getPendingOrders(orders),
            description: "dashboardPendingOrdersDescriptionLabel",
            icon: "",
            to: "/dashboard/orders",
            colSpan: 1,
            rowSpan: 1,
            gradient: null,
        },
        {
            title: loaderOrders.isLoading ? loaderOrders.isLoading : getCancelledOrders(orders),
            description: "dashboardCancelledOrdersDescriptionLabel",
            icon: "",
            to: "/dashboard/orders",
            colSpan: 1,
            rowSpan: 1,
            gradient: null,
        },
        {
            title: loaderOrders.isLoading
                ? loaderOrders.isLoading
                : `${calculateCompletedOrdersPercentage(orders).toFixed(0)}%`,
            description: "dashboardSuccesfulAverageOrdersDescriptionLabel",
            icon: "",
            to: "/dashboard/orders",
            colSpan: 2,
            rowSpan: 1,
            gradient: null,
        },
        {
            title: loaderProducts.isLoading ? loaderProducts.isLoading : getTotalProducts(products),
            description: "dashboardTotalProductsDescriptionLabel",
            icon: "",
            to: "/dashboard/products",
            colSpan: 1,
            rowSpan: 2,
            gradient: null,
        },
    ];

    const handleDashboardItemsGradient = (item, index) => {
        if (!item || !item.title || !index) return null;

        const isPar = index % 2 === 0;
        if (typeof item.title === "string" && item.title.includes("%")) {
            const averageNumber = Number(item.title.split("%")[0]);
            if (averageNumber >= 60) return "success";
            if (averageNumber < 60 && averageNumber >= 50) return "warning";
            if (averageNumber < 50) return "error";
        }
        if (!isPar) return "default";
        if (isPar) return "accent";
    };

    return (
        <div className="flex flex-1 flex-col">
            <AdminBentoGrid>
                {dashboardItems.map((item, index) => (
                    <AdminBentoGridItem
                        key={item.description}
                        to={item.to}
                        colSpan={item.colSpan}
                        rowSpan={item.rowSpan}
                        title={item.title}
                        description={item.description}
                        gradient={handleDashboardItemsGradient(item, index)}
                        users={item.users}
                    />
                ))}
                {/* ESTO ES UN EJEMPLO HAY QUE COMPONETIZARLO */}
            </AdminBentoGrid>
            <ToastContainer toasts={toasts} onClose={dismissToast} />
        </div>
    );
};
