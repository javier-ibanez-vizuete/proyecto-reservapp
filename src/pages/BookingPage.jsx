import { useContext, useState } from "react";
import { BookingCalendar } from "../components/BookingCalendar";
import { Container } from "../components/Container";
import { BookingsContext } from "../contexts/BookingsContext";
import { ThemeContext } from "../contexts/ThemeContext";
import { useBookings } from "../core/bookings/useBookings";

const INITIAL_BOOKING_DATA = {
    tableId: "",
    date: "",
    time: "",
    partySize: "",
    notes: "",
    extras: {
        highChair: false,
    },
};

const BOOKING_FORM_FIELDS = [
    {
        containerClass: "flex",
    },
];

export const BookingPage = () => {
    const [form, setForm] = useState(INITIAL_BOOKING_DATA);

    const { bookings } = useContext(BookingsContext);
    const { postBookings, isLoading } = useBookings();

    const { theme } = useContext(ThemeContext);

    const onSubmitBooking = () => {};

    const onChangeDate = (selectedDate) => {
        const year = selectedDate.getFullYear();
        const month = selectedDate.getMonth();
        const day = selectedDate.getDate();
        const bookingDate = `${year}-${month}-${day}`;
        console.log("Fecha Seleccionada", bookingDate);
    };

    return (
        <div className="flex flex-1 flex-col py-4">
            <Container className="flex-1">
                <h1>RESERVAR</h1>

                <div className="perfect-center">
                    <BookingCalendar onChange={onChangeDate} />
                </div>

                <button onClick={onSubmitBooking}>ENVIAR</button>
            </Container>
        </div>
    );
};
