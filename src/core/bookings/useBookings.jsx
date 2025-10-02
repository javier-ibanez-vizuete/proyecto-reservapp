import { useContext, useState } from "react";
import { BookingsContext } from "../../contexts/BookingsContext";
import { getBookingsByDateApi, postBookingApi } from "./bookings.api";
import { saveBookingsInLocalStorage } from "./bookings.service";

export const useBookings = () => {
    const [loadingBookings, setLoadingBookings] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { setBookings } = useContext(BookingsContext);

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
            console.error("Algo ha salido mal en getBookingsByDate(useBookings):", err);
        } finally {
            setLoadingBookings(false);
        }
    };

    const postBookings = async (bookingData) => {
        setIsLoading(true);
        try {
            const booking = await postBookingApi(bookingData);
            if (!booking) return;
            setBookings((prev) => {
                if (prev.length) {
                    const newValue = [...prev, booking];
                    saveBookingsInLocalStorage(newValue);
                    return newValue;
                }
                if (!prev.length) {
                    const newValue = [booking];
                    saveBookingsInLocalStorage([booking]);
                    return newValue;
                }
            });
            return booking;
        } catch (err) {
            console.error("Algo ha salido mal en postBookings(useBookings):", err);
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    return { getBookingsByDate, postBookings, loadingBookings, isLoading };
};
