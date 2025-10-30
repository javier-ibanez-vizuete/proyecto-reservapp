import classNames from "classnames";
import { useCallback, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { BackButton } from "../../components/UI/BackButton";
import { BookingsContext } from "../../contexts/BookingsContext";
import {
    removeBookingDetailsFromLocalStorage,
    saveBookingDetailsInLocalStorage,
} from "../../core/bookings/bookings.service";
import { useBookings } from "../../core/bookings/useBookings";
import { useAdminData } from "../hooks/useAdminData";

export const AdminBookingDetail = () => {
    const { id } = useParams();
    const { bookings } = useAdminData({ enablePolling: false });
    const { bookingDetails, setBookingDetails } = useContext(BookingsContext);

    const { getBookingsById, isLoading } = useBookings();

    const handleGetBookingById = useCallback(async () => {
        try {
            if (!id || bookingDetails) return;
            await getBookingsById(id);
        } catch (err) {
            console.error("Booking not Found");
        }
    }, [getBookingsById, bookingDetails]);

    useEffect(() => {
        const bookingFound = bookings.find((booking) => (booking?.id || booking?._id) === id);
        if (bookingFound) {
            saveBookingDetailsInLocalStorage(bookingFound);
            return setBookingDetails(bookingFound);
        }

        if (!bookingFound && !bookingDetails) {
            handleGetBookingById();
        }

        return () => {
            removeBookingDetailsFromLocalStorage();
            setBookingDetails(null);
        };
    }, [id]);

    const baseArticleClasses = "flex-1 flex flex-col";

    const currentArticleClasses = classNames(baseArticleClasses);

    if (!bookingDetails || isLoading)
        return (
            // PONER UN ESKELETON
            <div>Cargando...</div>
        );

    return (
        <article className={currentArticleClasses}>
            <div className="perfect-center self-start lg:self-center">
                <BackButton />
            </div>

            {/* PONER ESTILOS PARA LOS DETALLES DE RESERVA */}
            <h6>{bookingDetails.id}</h6>
        </article>
    );
};
