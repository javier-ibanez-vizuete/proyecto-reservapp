import { useContext, useState } from "react";
import Calendar from "react-calendar";
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
        const date = selectedDate.toISOString().split("T")[0];
        setForm((prev) => ({ ...prev, date: date }));
        console.log(date);
    };

    const unvalidDates = ({ date }) => {
        return date.getDay() === 0;
    };

    return (
        <div className="flex flex-1 flex-col py-4">
            <Container className="flex-1">
                <h1>RESERVAR</h1>

                <Calendar
                    className={`${theme}`}
                    onChange={onChangeDate}
                    value={form.date}
                    locale={`es-ES`}
                    tileDisabled={unvalidDates}
                    minDate={new Date()}
                    maxDate={new Date(2026, 12, 31)}
                />
                <button onClick={onSubmitBooking}>ENVIAR</button>
            </Container>
        </div>
    );
};
