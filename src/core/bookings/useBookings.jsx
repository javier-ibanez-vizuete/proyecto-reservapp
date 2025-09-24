import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BookingsContext } from "../../contexts/BookingsContext";
import { postBookingApi } from "./bookings.api";
import { saveBookingsInLocalStorage } from "./bookings.service";

export const useBookings = () => {
    const [loadingBookings, setLoadingBookings] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { setBookings } = useContext(BookingsContext);
    const navigate = useNavigate();

    const defaultDate = new Date().toISOString().split("T")[0];

    const getBookingsByDate = async (date = defaultDate) => {
        setLoadingBookings(true);
        try {
            const bookings = await getBookingsByDateApi(date);
            if (bookings && bookings?.length) {
                setBookings(bookings);
                saveBookingsInLocalStorage(bookings);
            }
            if (!bookings?.length) console.error("NO HAY RESERVAS");
        } catch (err) {
            console.log("Algo ha salido mal en getBookingsByDate(useBookings):", err);
        } finally {
            setLoadingBookings(false);
        }
    };

    const postBookings = async (bookingData) => {
        setIsLoading(true);
        try {
            console.log("postBookings");
            const booking = await postBookingApi(bookingData);
            console.log("booking", booking);
            setBookings((prev) => {
                return [booking, ...prev];
                saveBookingsInLocalStorage([booking, ...prev]);
            });

            if (!booking) console.log("NO SE HA POSTEADO LA RESERVA");
        } catch (err) {
            console.error("Algo ha salido mal en postBookings(useBookings):", err);
        } finally {
            setIsLoading(false);
        }
    };

    return { getBookingsByDate, postBookings, loadingBookings, isLoading };
};
