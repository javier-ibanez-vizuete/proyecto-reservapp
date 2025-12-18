import { useEffect, useMemo, useState } from "react";
import { BookingDateItem } from "../components/BookingDateItem";
import { getUserBookingsFromStorage } from "../core/bookings/bookings.service";
import { useTranslate } from "../translations/useTranslate";

const actualDate = new Date(new Date());

export const UserBookingsSection = ({ userBookingsData }) => {
    const [userBookings, setUserBookings] = useState(userBookingsData || []);
    const { t } = useTranslate();

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
                title={t("booking_data.booking_data_title1")}
                content={pendingBookings}
                areOldBooking={false}
            />
            <BookingDateItem
                title={t("booking_data.booking_data_title2")}
                content={oldBookings}
                areOldBooking={true}
            />
        </div>
    );
};
