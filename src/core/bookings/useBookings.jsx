import { useContext, useState } from "react";
import { replace, useNavigate } from "react-router-dom";
import { BookingsContext } from "../../contexts/BookingsContext";
import { saveDataInSessionStorage } from "../../helpers/storage";
import { deleteBookingByIdApi, getBookingsByDateApi, postBookingApi } from "./bookings.api";
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

    const deleteBookingById = async (bookingId) => {
        try {
            const removedBooking = await deleteBookingByIdApi(bookingId);
            if (!removedBooking) return;
            setBookings((prevValue) => {
                const filteredBookings = prevValue?.filter(
                    (booking) => booking.id !== (removedBooking?.removed?.id || removedBooking?.removed?._id)
                );
                const newBookings = [...filteredBookings];
                saveBookingsInLocalStorage(newBookings);
                return newBookings;
            });
            navigate("/user", { state: { fromDeleteBooking: true } }, replace);
            saveDataInSessionStorage("fromDeleteBooking", true);
            return removedBooking?.removed;
        } catch (err) {
            console.error("Something went wrong deleting the booking", err);
            throw err;
        }
    };

    return { getBookingsByDate, postBookings, deleteBookingById, loadingBookings, isLoading };
};
