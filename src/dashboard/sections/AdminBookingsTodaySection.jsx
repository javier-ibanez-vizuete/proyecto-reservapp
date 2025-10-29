import { useMemo } from "react";
import { AdminSkeleton } from "../components/AdminSkeleton";
import { useAdminData } from "../hooks/useAdminData";

export const AdminBookingsTodaySection = () => {
    const { bookings, isLoadingBookings } = useAdminData({ enablePolling: true, pollingInterval: 60000 });

    const filteredBookings = useMemo(() => {}, [bookings]);

    const todayDate = new Date().toISOString().split("T")[0];

    if (isLoadingBookings)
        return (
            <div className="flex flex-col gap-md">
                <AdminSkeleton variant="text" lines={1} height="xs" className="w-2/3" width="full" />
                <AdminSkeleton variant="text" lines={1} height="2xs" className="w-1/3" width="full" />
                {/* METER ESTILOS DE GRID AL CONTENEDOR DE RESERVAS DEL SKELETON */}
                <div className="flex flex-col gap-sm">
                    <AdminSkeleton className="gap-sm">
                        <AdminSkeleton
                            variant="text"
                            lines={1}
                            padding="none"
                            borderColor="none"
                            bgCard="none"
                            height="sm"
                            width="full"
                        />
                        <AdminSkeleton
                            variant="text"
                            lines={1}
                            padding="none"
                            borderColor="none"
                            bgCard="none"
                            height="2xs"
                            width="6xl"
                        />
                        <AdminSkeleton
                            variant="text"
                            lines={1}
                            padding="none"
                            borderColor="none"
                            bgCard="none"
                            height="2xs"
                            width="2xl"
                        />
                        <AdminSkeleton
                            variant="text"
                            lines={1}
                            padding="none"
                            borderColor="none"
                            bgCard="none"
                            height="2xs"
                            width="2xl"
                        />
                        <AdminSkeleton
                            variant="text"
                            lines={1}
                            padding="none"
                            borderColor="none"
                            bgCard="none"
                            height="2xs"
                            width="4xl"
                        />
                    </AdminSkeleton>
                    <AdminSkeleton className="gap-sm">
                        <AdminSkeleton
                            variant="text"
                            lines={1}
                            padding="none"
                            borderColor="none"
                            bgCard="none"
                            height="sm"
                            width="full"
                        />
                        <AdminSkeleton
                            variant="text"
                            lines={1}
                            padding="none"
                            borderColor="none"
                            bgCard="none"
                            height="2xs"
                            width="6xl"
                        />
                        <AdminSkeleton
                            variant="text"
                            lines={1}
                            padding="none"
                            borderColor="none"
                            bgCard="none"
                            height="2xs"
                            width="2xl"
                        />
                        <AdminSkeleton
                            variant="text"
                            lines={1}
                            padding="none"
                            borderColor="none"
                            bgCard="none"
                            height="2xs"
                            width="2xl"
                        />
                        <AdminSkeleton
                            variant="text"
                            lines={1}
                            padding="none"
                            borderColor="none"
                            bgCard="none"
                            height="2xs"
                            width="4xl"
                        />
                    </AdminSkeleton>
                    <AdminSkeleton className="gap-sm">
                        <AdminSkeleton
                            variant="text"
                            lines={1}
                            padding="none"
                            borderColor="none"
                            bgCard="none"
                            height="sm"
                            width="full"
                        />
                        <AdminSkeleton
                            variant="text"
                            lines={1}
                            padding="none"
                            borderColor="none"
                            bgCard="none"
                            height="2xs"
                            width="6xl"
                        />
                        <AdminSkeleton
                            variant="text"
                            lines={1}
                            padding="none"
                            borderColor="none"
                            bgCard="none"
                            height="2xs"
                            width="2xl"
                        />
                        <AdminSkeleton
                            variant="text"
                            lines={1}
                            padding="none"
                            borderColor="none"
                            bgCard="none"
                            height="2xs"
                            width="2xl"
                        />
                        <AdminSkeleton
                            variant="text"
                            lines={1}
                            padding="none"
                            borderColor="none"
                            bgCard="none"
                            height="2xs"
                            width="4xl"
                        />
                    </AdminSkeleton>
                </div>
            </div>
        );

    return (
        <section>
            <h4>RESERVAS DE {todayDate}</h4>
            <div>CONTENEDOR PARA LAS RESERVAS RETRASADAS.</div>
            <div>CONTENEDOR PARA LAS RESERVAS SIN RETRASO.</div>
        </section>
    );
};
