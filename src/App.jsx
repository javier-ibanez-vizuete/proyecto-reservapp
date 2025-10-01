import { useContext, useEffect } from "react";
import { AuthContext } from "./contexts/AuthContext";
import { CartsContext } from "./contexts/CartsContext";
import { ProductsContext } from "./contexts/ProductsContext";
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

    useEffect(() => {
        if (!products?.length) getProducts();
        if (!categories?.length) getCategories();
    }, [user]);

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
