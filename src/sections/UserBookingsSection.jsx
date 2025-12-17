import { useContext, useEffect, useMemo, useState } from "react";
import { BookingDateItem } from "../components/BookingDateItem";
import { LanguageContext } from "../contexts/LanguageContext";
import { getUserBookingsFromStorage } from "../core/bookings/bookings.service";

const actualDate = new Date(new Date());

export const UserBookingsSection = ({ userBookingsData }) => {
    const [userBookings, setUserBookings] = useState(userBookingsData || []);
    const { getText } = useContext(LanguageContext);

    const pendingBookings = useMemo(
        () =>
            userBookings.filter((booking) => {
                const bookingDate = new Date(new Date(booking?.scheduledFor));
                return bookingDate > actualDate;
            }),
        [actualDate, userBookings]
    );

    const oldBookings = useMemo(
        () =>
            userBookings.filter((booking) => {
                const bookingDate = new Date(new Date(booking?.scheduledFor));
                return bookingDate < actualDate;
            }),
        [actualDate, userBookings]
    );

    useEffect(() => {
        const userBookingsFromStorage = getUserBookingsFromStorage();
        if (userBookingsFromStorage) setUserBookings(userBookingsFromStorage);
    }, [userBookingsData]);

    return (
        <div>
            <BookingDateItem
                title={getText("booking_data.booking_data_title1")}
                content={pendingBookings}
                areOldBooking={false}
            />
            <BookingDateItem
                title={getText("booking_data.booking_data_title2")}
                content={oldBookings}
                areOldBooking={true}
            />
        </div>
    );
};
