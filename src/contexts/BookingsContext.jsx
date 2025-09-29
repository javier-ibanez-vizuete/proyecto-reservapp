import { createContext, useEffect, useState } from "react";
import { getBookingsFromLocalStorage } from "../core/bookings/bookings.service";

export const BookingsContext = createContext(null);

export const BookingsProvider = ({ children }) => {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        const bookingsFromStorage = getBookingsFromLocalStorage();
        if (bookingsFromStorage) setBookings(bookingsFromStorage);
    }, []);

    return <BookingsContext value={{ bookings, setBookings }}>{children}</BookingsContext>;
};
