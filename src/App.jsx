import { useContext } from "react";
import { AuthContext } from "./contexts/AuthContext";
import { useImageFallback } from "./hooks/useImageFallback";
import { AdminLayout } from "./layouts/AdminLayout";
import { MainLayout } from "./layouts/MainLayout";
import { AppRouter } from "./routes/AppRouter";

export const App = () => {
    const { user } = useContext(AuthContext);

    useImageFallback();

    if (user?.role === "admin")
        return (
            <AdminLayout>
                <AppRouter />
            </AdminLayout>
        );

    return (
        <MainLayout>
            <AppRouter />
        </MainLayout>
    );
};
