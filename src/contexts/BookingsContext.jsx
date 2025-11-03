import { createContext, useEffect, useState } from "react";
import {
    getBookingDetailsFromLocalStorage,
    getBookingsFromLocalStorage,
} from "../core/bookings/bookings.service";

export const BookingsContext = createContext(null);

export const BookingsProvider = ({ children }) => {
    const [bookings, setBookings] = useState([]);
    const [bookingDetails, setBookingDetails] = useState(null);

    useEffect(() => {
        const bookingsFromStorage = getBookingsFromLocalStorage();
        const bookingDetailsFromStorage = getBookingDetailsFromLocalStorage();

        if (bookingsFromStorage) setBookings(bookingsFromStorage);
        if (bookingDetailsFromStorage) setBookingDetails(bookingDetailsFromStorage);
    }, []);

    return (
        <BookingsContext value={{ bookings, bookingDetails, setBookings, setBookingDetails }}>
            {children}
        </BookingsContext>
    );
};
