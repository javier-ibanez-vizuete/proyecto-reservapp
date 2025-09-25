import { useContext, useState } from "react";
import { BookingCalendar } from "../components/BookingCalendar";
import { Container } from "../components/Container";
import { Dropdown } from "../components/Dropdown/Dropdown";
import { DropdownItem } from "../components/Dropdown/DropdownItem";
import { DropdownMenu } from "../components/Dropdown/DropdownMenu";
import { DropdownTrigger } from "../components/Dropdown/DropdownTrigger";
import { BookingsContext } from "../contexts/BookingsContext";
import { ThemeContext } from "../contexts/ThemeContext";
import {
    getBookingFormFromLocalStorage,
    saveBookingFormInLocalStorage,
} from "../core/bookings/bookings.service";
import { useBookings } from "../core/bookings/useBookings";
import { TABLES } from "../data/tables";
import {
    getDataFromSessionStorage,
    removeFromSessionStorage,
    saveDataInSessionStorage,
} from "../helpers/storage";
import { useDevice } from "../hooks/useDevice";

const INITIAL_BOOKING_DATA = {
    tableId: "",
    date: new Date().toISOString().split("T")[0],
    time: "",
    partySize: "",
    notes: "",
    extras: {
        highChair: false,
    },
};

const DATE_TIMES_POSIBILITIES = [
    { time: "13:00", label: "13:00" },
    { time: "13:30", label: "13:30" },
    { time: "14:00", label: "14:00" },
    { time: "14:30", label: "14:30" },
    { time: "15:00", label: "15:00" },
    { time: "20:00", label: "20:00" },
    { time: "20:30", label: "20:30" },
    { time: "21:00", label: "21:00" },
    { time: "21:30", label: "21:30" },
    { time: "22:00", label: "22:00" },
];

export const BookingPage = () => {
    const [form, setForm] = useState(() => {
        const formFromStorage = getBookingFormFromLocalStorage();
        return formFromStorage || INITIAL_BOOKING_DATA;
    });

    const [selectedDate, setSelectedDate] = useState(() => {
        const selectedDateFromStorage = getDataFromSessionStorage("selectedDate");
        return selectedDateFromStorage || null;
    });

    const { bookings } = useContext(BookingsContext);
    const { postBookings, isLoading } = useBookings();

    const { theme } = useContext(ThemeContext);
    const { isDesktop } = useDevice();

    const onSubmitBooking = () => {};

    const onChangeDate = (selectedDate) => {
        const date = selectedDate.toISOString().split("T")[0];
        const year = date.split("-")[0];
        const month = date.split("-")[1];
        const day = ++date.split("-")[2];
        const dateChange = `${year}-${month}-${day}`;

        setForm((prevValue) => {
            const newBookingValue = { ...prevValue, date: dateChange };
            saveBookingFormInLocalStorage(newBookingValue);
            return newBookingValue;
        });

        setSelectedDate(dateChange);
        saveDataInSessionStorage("selectedDate", dateChange);
    };

    const onChangeTime = (time) => {
        setForm((prevValue) => {
            const newBookingValue = { ...prevValue, time: time };
            saveBookingFormInLocalStorage(newBookingValue);
            return newBookingValue;
        });
        console.log("Hora seleccionada", time);
    };

    const onChangeCustomer = (customers) => {
        setForm((prevValue) => {
            const newBookingValue = { ...prevValue, partySize: customers };
            saveBookingFormInLocalStorage(newBookingValue);
            return newBookingValue;
        });
        console.log("Comensales deseados", customers);
    };

    const resetForm = () => {
        setForm(INITIAL_BOOKING_DATA);
        saveBookingFormInLocalStorage(INITIAL_BOOKING_DATA);
        setSelectedDate(null);
        removeFromSessionStorage("selectedDate");
    };

    return (
        <div className="flex flex-1 flex-col py-4">
            <Container className="flex-1 gap-2">
                <h1>RESERVAR</h1>

                <div className="perfect-center">
                    <BookingCalendar
                        className="shadow-lg"
                        onChange={onChangeDate}
                        selectedDate={selectedDate}
                    />
                </div>

                <div className="flex gap-4 md:justify-center">
                    <div className="flex flex-col md:items-center">
                        <Dropdown placement={`${isDesktop ? "right-center" : "right-center"}`}>
                            <DropdownTrigger
                                btnStyle={false}
                                className={`px-4 py-2.5  border-gray-300 rounded-lg hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ring-primary-color focus:border-primary-color ${
                                    theme === "light" ? "bg-accent-background" : "bg-accent-background-dark"
                                }`}
                            >
                                {form?.time || "Elegir Hora"}
                            </DropdownTrigger>
                            <DropdownMenu className="">
                                {DATE_TIMES_POSIBILITIES.map((time) => {
                                    const currentDate = new Date().toISOString().split("T")[0];
                                    const currentTime = new Date().getHours();
                                    return (
                                        <DropdownItem
                                            key={time.label}
                                            defaultStyles={false}
                                            className={"perfect-center py-1 px-1.5 hover:scale-120"}
                                            onClick={() => onChangeTime(time.time)}
                                            disabled={
                                                currentDate === form.date &&
                                                parseFloat(time.label) <= currentTime
                                                    ? true
                                                    : false
                                            }
                                        >
                                            <p>{time.label}</p>
                                        </DropdownItem>
                                    );
                                })}
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                    <div className="flex flex-col md:items-center">
                        <Dropdown placement={`${isDesktop ? "left-start" : "left-center"}`}>
                            <DropdownTrigger
                                btnStyle={false}
                                className={`px-4 py-2.5  border-gray-300 rounded-lg hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ring-primary-color focus:border-primary-color ${
                                    theme === "light" ? "bg-accent-background" : "bg-accent-background-dark"
                                }`}
                            >
                                {form?.partySize || "Comensales"}
                            </DropdownTrigger>
                            <DropdownMenu>
                                {Array.from({ length: 8 }, (_, index) => (
                                    <DropdownItem
                                        defaultStyles={false}
                                        className={`perfect-center py-1.5 px-1.5 hover:scale-120 ${
                                            form.partySize === index + 1 ? "font-bold" : ""
                                        }`}
                                        key={index}
                                        onClick={() => onChangeCustomer(index + 1)}
                                    >
                                        <p>{index + 1}</p>
                                    </DropdownItem>
                                ))}
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                    <button onClick={resetForm}>RESETEAR</button>
                </div>
                <div className="flex flex-col lg:items-center">
                    {TABLES.map((table) => (
                        <h5 key={table.tableId}>{table.maxCapacity}</h5>
                    ))}
                </div>

                <button onClick={onSubmitBooking}>ENVIAR</button>
            </Container>
        </div>
    );
};
