import classNames from "classnames";
import { useCallback, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../../contexts/ThemeContext";
import { useDevice } from "../../hooks/useDevice";
import { AdminBookingCard } from "../components/AdminBookingCard";
import { AdminBookingsContainer } from "../components/AdminBookingsContainer";
import { AdminSkeleton } from "../components/AdminSkeleton";
import { useAdminData } from "../hooks/useAdminData";

export const AdminBookingsTodaySection = ({ padding, gap }) => {
    const { bookings, isLoadingBookings } = useAdminData({ enablePolling: true, pollingInterval: 120000 });

    const { isMobile2Xs, isMobileXs, isMobileSm, isTablet, isDesktop } = useDevice();
    const { theme } = useContext(ThemeContext);

    const navigate = useNavigate();

    const todayDate = new Date().toISOString().split("T")[0];
    const warningTime = 15 * 60 * 1000;

    /**
     * Converts a time string in format "HH:MM:SS" to milliseconds
     * @param {string} time - Time string (e.g., "22:25:12")
     * @returns {number} Time converted to milliseconds
     */
    const getTimeInMs = useCallback((time) => {
        const timeSplitted = time.split(":");
        const timeInMs =
            Number(timeSplitted[0]) * 60 * 60 * 1000 +
            Number(timeSplitted[1]) * 60 * 1000 +
            Number(timeSplitted[2]) * 1000;
        return timeInMs;
    }, []);

    /**
     * Checks if a booking is within warning time (less than 15 minutes)
     * @param {string} bookingTime - Booking time in format "HH:MM:SS"
     * @returns {boolean} True if less than 15 minutes remaining
     */
    const isBookingNearby = useCallback(
        (bookingTime) => {
            const now = new Date();
            const currentTimeInMs =
                now.getHours() * 60 * 60 * 1000 + now.getMinutes() * 60 * 1000 + now.getSeconds() * 1000;

            const bookingTimeInMs = getTimeInMs(bookingTime);
            const timeDifference = bookingTimeInMs - currentTimeInMs;

            // Retorna true si quedan menos de 15 minutos y la reserva es futura
            return timeDifference > 0 && timeDifference <= warningTime;
        },
        [getTimeInMs]
    );

    const handleOpenBookingDetails = (id) => navigate(`/dashboard/bookings/${id}`);

    const filteredBookings = useMemo(() => {
        if (!bookings || !bookings?.length) return null;
        return bookings.filter((booking) => {
            const bookingDate = booking?.scheduledFor.split("T")[0];

            return bookingDate === todayDate;
        });
    }, [bookings]);

    const pendingBookings = useMemo(() => {
        if (!bookings || !filteredBookings?.length) return [];
        const nowTime = new Date().toLocaleTimeString();
        return filteredBookings
            .filter((booking) => {
                const bookingTime = booking?.scheduledFor.split("T")[1].split(".")[0];
                return bookingTime >= nowTime;
            })
            .sort((bookingA, bookingB) => new Date(bookingA.scheduledFor) - new Date(bookingB.scheduledFor));
    }, [filteredBookings]);

    const notPendingBookings = useMemo(() => {
        if (!pendingBookings || !pendingBookings?.length) return null;
        const allCancelled = pendingBookings.every((booking) => booking?.status === "cancelled");
        return allCancelled;
    }, [pendingBookings]);

    const delayedBookings = useMemo(() => {
        if (!bookings || !filteredBookings?.length) return [];
        const nowTime = new Date().toLocaleTimeString();
        return filteredBookings
            .filter((booking) => {
                const bookingTime = booking?.scheduledFor.split("T")[1].split(".")[0];
                return bookingTime < nowTime;
            })
            .sort(
                (bookingA, bookingB) => new Date(bookingB?.scheduledFor) - new Date(bookingA?.scheduledFor)
            );
    }, [filteredBookings]);

    const notDelayedBookings = useMemo(() => {
        if (!delayedBookings || !delayedBookings?.length) return null;
        const allCancelled = delayedBookings.every((booking) => booking?.status === "cancelled");
        return allCancelled;
    }, [delayedBookings]);

    const baseSectionClasses = "flex flex-col";

    const variantsPadding = {
        default: "py-sm",
        none: " ",
        xs: "py-xs",
        sm: "py-sm",
        md: "py-md",
        lg: "py-lg",
        xl: "py-xl",
    };

    const variantsGap = {
        default: "gap-sm",
        none: " ",
        xs: "gap-xs",
        sm: "gap-sm",
        md: "gap-md",
        lg: "gap-lg",
        xl: "gap-xl",
    };

    const autoConfig = useMemo(
        () => ({
            padding: classNames({
                "py-md": isMobile2Xs || isMobileXs || isMobileSm,
                "py-lg": isTablet,
                "px-md py-lg": isDesktop,
            }),
            gap: classNames({
                "gap-xs": isMobile2Xs || isMobileXs,
                "gap-sm": isMobileSm || isTablet,
                "gap-md": isDesktop,
            }),
            columns: classNames({
                "grid-cols-1": isMobile2Xs || isMobileXs,
                "grid-cols-2": isMobileSm,
                "grid-cols-3": isTablet || isDesktop,
            }),
        }),
        [isMobile2Xs, isMobileXs, isMobileSm, isTablet, isDesktop]
    );

    const currentSectionClasses = classNames(
        baseSectionClasses,
        variantsPadding[padding] || autoConfig?.padding || variantsPadding.default,
        variantsGap[gap] || autoConfig?.gap || variantsGap.default
    );

    if (isLoadingBookings)
        return (
            <div className={currentSectionClasses}>
                <AdminSkeleton variant="text" lines={1} height="xs" className="w-2/3" width="full" />
                <AdminSkeleton variant="text" lines={1} height="2xs" className="w-1/3" width="full" />
                {/* METER ESTILOS DE GRID AL CONTENEDOR DE RESERVAS DEL SKELETON */}
                <div
                    className={classNames(
                        "grid grid-flow-dense auto-rows-fr",
                        autoConfig?.columns,
                        variantsGap[gap] || autoConfig?.gap || variantsGap.default
                    )}
                >
                    {Array.from({ length: 5 }).map((_, index) => (
                        <AdminSkeleton className="gap-sm" key={index}>
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
                    ))}
                </div>
            </div>
        );

    return (
        <section className={currentSectionClasses}>
            <h5>RESERVAS DE {todayDate}</h5>
            <AdminBookingsContainer title="PENDIENTES">
                {notPendingBookings && (
                    <small className="italic opacity-60">no hay reservas Pendientes</small>
                )}
                {pendingBookings.map((booking) => {
                    const bookingTime = booking?.scheduledFor.split("T")[1].split(".")[0];
                    const isNearby = isBookingNearby(bookingTime);

                    if (booking?.status === "cancelled") return null;

                    return (
                        <AdminBookingCard
                            key={booking?.id || booking?._id}
                            bookingData={booking}
                            variant={isNearby ? "warning" : null}
                            className={`${isNearby ? "animate-pulse" : ""}`}
                            onClick={() => handleOpenBookingDetails(booking?.id || booking?._id)}
                        />
                    );
                })}
            </AdminBookingsContainer>
            <AdminBookingsContainer title="RETRASADAS">
                {notDelayedBookings && (
                    <small className="italic opacity-60">No hay reservas retrasadas</small>
                )}
                {delayedBookings.map((booking) => {
                    if (booking?.status === "cancelled") return null;

                    return (
                        <AdminBookingCard
                            key={booking?.id || booking?._id}
                            bookingData={booking}
                            variant={"error"}
                            borderColor={"error"}
                            onClick={() => handleOpenBookingDetails(booking?.id || booking?._id)}
                        />
                    );
                })}
            </AdminBookingsContainer>
        </section>
    );
};
