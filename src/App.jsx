import { useContext, useEffect } from "react";
import { AuthContext } from "./contexts/AuthContext";
import { OrdersContext } from "./contexts/OrdersContext";
import { ProductsContext } from "./contexts/ProductsContext";
import { useOrders } from "./core/orders/useOrders";
import { useProducts } from "./core/products/useProducts";
import { useImageFallback } from "./hooks/useImageFallback";
import { AdminLayout } from "./layouts/AdminLayout";
import { MainLayout } from "./layouts/MainLayout";
import { AdminRouter } from "./routes/AdminRouter";
import { AppRouter } from "./routes/AppRouter";

export const App = () => {
    const { user } = useContext(AuthContext);

    const { products, categories } = useContext(ProductsContext);
    const { getProducts, getCategories } = useProducts();

    const { orders } = useContext(OrdersContext);
    const { getOrders, getOrdersByUserId } = useOrders();

    useImageFallback();
    useEffect(() => {
        if (!products?.length) getProducts();
        if (!categories?.length) getCategories();
        if ((!orders || !orders.length) && user?.role === "admin") getOrders();
        if (!orders && user?.role === "user") getOrdersByUserId();
    }, [user]);

    if (!user || user?.role === "user")
        return (
            <MainLayout>
                <AppRouter />
            </MainLayout>
        );

    if (user?.role === "admin")
        return (
            <AdminLayout>
                <AdminRouter />
            </AdminLayout>
        );
};
