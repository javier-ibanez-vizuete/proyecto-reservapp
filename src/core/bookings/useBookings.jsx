import { useCallback, useContext, useState } from "react";
import { replace, useNavigate } from "react-router-dom";
import { BookingsContext } from "../../contexts/BookingsContext";
import { saveDataInSessionStorage } from "../../helpers/storage";
import {
    deleteBookingByIdApi,
    getBookingsApi,
    getBookingsByDateApi,
    postBookingApi,
    postCancelBookingByIdApi,
} from "./bookings.api";
import { saveBookingDetailsInLocalStorage, saveBookingsInLocalStorage } from "./bookings.service";

export const useBookings = () => {
    const [loadingBookings, setLoadingBookings] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { setBookings, setBookingDetails } = useContext(BookingsContext);
    const navigate = useNavigate();

    const defaultDate = new Date().toISOString().split("T")[0];

    const getBookings = useCallback(async () => {
        try {
            const bookings = await getBookingsApi();
            if (!bookings) throw new Error("Not Bookings Found");
            setBookings(bookings);
            saveBookingsInLocalStorage(bookings);
        } catch (err) {
            console.error("Error Getting Bookings", err);
            throw err;
        }
    }, []);

    const getBookingsById = useCallback(async (id) => {
        try {
            setIsLoading(true);
            const booking = await getBookingsByIdApi(id);
            if (!booking) throw new Error("NOT Booking by ID FOUND");
            saveBookingDetailsInLocalStorage(booking);
            setBookingDetails(booking);
        } catch (err) {
            console.error("NOT Booking by ID FOUND", err);
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, []);

    const getBookingsByDate = useCallback(async (date = defaultDate) => {
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
    }, []);

    const postBookings = useCallback(async (bookingData) => {
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
    }, []);

    const postCancelBookingById = useCallback(async (bookingId) => {
        try {
            const canceledBooking = await postCancelBookingByIdApi(bookingId);
            if (!canceledBooking.ok) return;
            setBookings((prevValue) => {
                const restBookings = prevValue.filter(
                    (booking) => (booking?.id || booking._id) !== bookingId
                );
                const updatedBooking = { ...canceledBooking.booking };
                const newBookings = { ...restBookings, updatedBooking };
                saveBookingsInLocalStorage(newBookings);
                return newBookings;
            });
            saveBookingDetailsInLocalStorage(canceledBooking?.booking);
            setBookingDetails(canceledBooking?.booking);
            return canceledBooking?.booking;
        } catch (err) {
            console.error("Error Cancelling Booking by ID", err);
            throw err;
        }
    }, []);

    const deleteBookingById = useCallback(async (bookingId) => {
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
    }, []);

    return {
        getBookings,
        getBookingsById,
        getBookingsByDate,
        postBookings,
        postCancelBookingById,
        deleteBookingById,
        loadingBookings,
        isLoading,
    };
};
