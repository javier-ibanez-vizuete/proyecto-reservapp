import { useContext, useEffect } from "react";
import { AuthContext } from "./contexts/AuthContext";
import { useImageFallback } from "./hooks/useImageFallback";
import { AdminLayout } from "./layouts/AdminLayout";
import { MainLayout } from "./layouts/MainLayout";
import { AdminRouter } from "./routes/AdminRouter";
import { AppRouter } from "./routes/AppRouter";

export const App = () => {
    const { user } = useContext(AuthContext);

    useEffect(() => {}, []);

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
