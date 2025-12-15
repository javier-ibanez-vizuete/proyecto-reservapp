import { useCallback, useContext, useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer } from "../components/ToastContainer";
import { LanguageContext } from "../contexts/LanguageContext";
import { AdminBentoGrid } from "../dashboard/components/AdminBentoGrid";
import { AdminBentoGridItem } from "../dashboard/components/AdminBentoGridItem";
import { useAdminData } from "../dashboard/hooks/useAdminData";
import { getDataFromSessionStorage, removeFromSessionStorage } from "../helpers/storage";
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

function DashboardPage() {
    const navigate = useNavigate();
    const location = useLocation();

    const { toasts, showToast, dismissToast } = useToast();
    const { getText } = useContext(LanguageContext);

    const {
        users,
        bookings,
        orders,
        products,
        isLoadingUsers,
        isLoadingBookings,
        isLoadingOrders,
        isLoadingProducts,
        refreshUsers,
        refreshBookings,
        refreshOrders,
        refreshProducts,
    } = useAdminData({
        enablePolling: true,
        pollingInterval: 30000,
    });

    useEffect(() => {
        if (!users || !users.length) refreshUsers();
        if (!bookings || !bookings.length) refreshBookings();
        if (!orders || !orders.length) refreshOrders();
        if (!products || !products.length) refreshProducts();
    }, [users, bookings, orders, products]);

    useEffect(() => {
        const fromLogin =
            location.state?.fromLogin === true || getDataFromSessionStorage("fromLogin") === true;

        if (!fromLogin) return;

        showToast(getText("toastLoginSuccess"), "success", 2000, "top-center");
        removeFromSessionStorage("fromLogin");
        navigate(location.pathname, { replace: true, state: {} });
    }, [location.state]);

    const dashboardItems = useMemo(
        () => [
            {
                title: isLoadingUsers ? isLoadingUsers : getTotalUsers(users),
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
                users: isLoadingUsers ? isLoadingUsers : users,
                to: "/dashboard/users",
                colSpan: 2,
                rowSpan: 1,
                gradient: "success",
            },
            {
                title: isLoadingUsers ? isLoadingUsers : getConnectedUsers(users),
                description: "dashboardConnectedUsersDescriptionLabel",
                icon: "",
                to: "/dashboard/users",
                colSpan: 1,
                rowSpan: 1,
                gradient: null,
            },
            {
                title: isLoadingBookings ? isLoadingBookings : getTotalBookings(bookings),
                description: "dashboardTotalBookingsDescriptionLabel",
                icon: "",
                to: "/dashboard/bookings/date",
                colSpan: 1,
                rowSpan: 2,
                gradient: null,
            },
            {
                title: isLoadingBookings ? isLoadingBookings : getTodaysBookings(bookings),
                description: "dashboardPendingBookingsDescriptionLabel",
                icon: "",
                to: "/dashboard/bookings/today",
                colSpan: 2,
                rowSpan: 2,
                gradient: null,
            },
            {
                title: isLoadingBookings ? isLoadingBookings : getDelayedBookings(bookings),
                description: "dashboardDelayedBookingsDescriptionLabel",
                icon: "",
                to: "/dashboard/bookings/today",
                colSpan: 1,
                rowSpan: 1,
                gradient: null,
            },
            {
                title: isLoadingOrders ? isLoadingOrders : getTotalOrders(orders),
                description: "dashboardTotalOrdersDescriptionLabel",
                icon: "",
                to: "/dashboard/orders",
                colSpan: 1,
                rowSpan: 2,
                gradient: null,
            },
            {
                title: isLoadingOrders ? isLoadingOrders : getCompletedOrders(orders),
                description: "dashboardCompletedOrdersDescriptionLabel",
                icon: "",
                to: "/dashboard/orders",
                colSpan: 1,
                rowSpan: 1,
                gradient: null,
            },
            {
                title: isLoadingOrders ? isLoadingOrders : getPendingOrders(orders),
                description: "dashboardPendingOrdersDescriptionLabel",
                icon: "",
                to: "/dashboard/orders",
                colSpan: 1,
                rowSpan: 1,
                gradient: null,
            },
            {
                title: isLoadingOrders ? isLoadingOrders : getCancelledOrders(orders),
                description: "dashboardCancelledOrdersDescriptionLabel",
                icon: "",
                to: "/dashboard/orders",
                colSpan: 1,
                rowSpan: 1,
                gradient: null,
            },
            {
                title: isLoadingOrders
                    ? isLoadingOrders
                    : `${calculateCompletedOrdersPercentage(orders).toFixed(0)}%`,
                description: "dashboardSuccesfulAverageOrdersDescriptionLabel",
                icon: "",
                to: "/dashboard/orders",
                colSpan: 2,
                rowSpan: 1,
                gradient: null,
            },
            {
                title: isLoadingProducts ? isLoadingProducts : getTotalProducts(products),
                description: "dashboardTotalProductsDescriptionLabel",
                icon: "",
                to: "/dashboard/products",
                colSpan: 1,
                rowSpan: 1,
                gradient: null,
            },
        ],
        [
            isLoadingUsers,
            isLoadingBookings,
            isLoadingOrders,
            isLoadingProducts,
            users,
            bookings,
            orders,
            products,
        ]
    );

    const handleDashboardItemsGradient = useCallback((item, index) => {
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
    }, []);

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
}

export default DashboardPage;
