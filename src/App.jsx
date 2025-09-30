import { useContext, useEffect } from "react";
import { AuthContext } from "./contexts/AuthContext";
import { CartsContext } from "./contexts/CartsContext";
import { ProductsContext } from "./contexts/ProductsContext";
import { useCarts } from "./core/carts/useCarts";
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
    const { carts, setUserCart } = useContext(CartsContext);
    const { getCartsById } = useCarts();

    useEffect(() => {
        if (!products?.length) getProducts();
        if (!categories?.length) getCategories();
    }, [user]);

    useEffect(() => {
        if (!carts) getCartsById("68dbba33ddf16868fca56e45");
        if (carts && Array.isArray(carts)) {
            console.log("Que vale carts", carts);

            carts.forEach((cart) => {
                if (cart.userId === user.id) setUserCart(cart);
            });
        }
    }, [carts]);

    useImageFallback();

    if (user?.role === "admin")
        return (
            <AdminLayout>
                <AdminRouter />
            </AdminLayout>
        );

    return (
        <MainLayout>
            <AppRouter />
        </MainLayout>
    );
};
