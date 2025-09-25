import { useContext, useState } from "react";
import { BookingCalendar } from "../components/BookingCalendar";
import { Container } from "../components/Container";
import { CustomCheckbox } from "../components/CustomCheckbox";
import { CustomInput } from "../components/CustomInput";
import { Dropdown } from "../components/Dropdown/Dropdown";
import { DropdownItem } from "../components/Dropdown/DropdownItem";
import { DropdownMenu } from "../components/Dropdown/DropdownMenu";
import { DropdownTrigger } from "../components/Dropdown/DropdownTrigger";
import { ModalContainer } from "../components/Modal/ModalContainer";
import { TableCard } from "../components/tableCard";
import { Button } from "../components/UI/Button";
import { BookingsContext } from "../contexts/BookingsContext";
import { ThemeContext } from "../contexts/ThemeContext";
import {
    getBookingFormFromLocalStorage,
    saveBookingFormInLocalStorage,
} from "../core/bookings/bookings.service";
import { useBookings } from "../core/bookings/useBookings";
import { TABLES } from "../data/tables";
import { BookingVerificationSubmit } from "../helpers/FieldsVerificator";
import {
    getDataFromSessionStorage,
    removeFromSessionStorage,
    saveDataInSessionStorage,
} from "../helpers/storage";

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

    const [selectedTable, setSelectedTable] = useState(() => {
        const selectedTableFromStorage = getDataFromSessionStorage("selectedTable");
        return selectedTableFromStorage || "";
    });
    const [showModal, setShowModal] = useState(false);
    const [error, setError] = useState("");

    const { bookings } = useContext(BookingsContext);
    const { postBookings, isLoading } = useBookings();

    const { theme } = useContext(ThemeContext);

    const onChangeDate = (selectedDate) => {
        setError("");
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
        setError("");
        setForm((prevValue) => {
            const newBookingValue = { ...prevValue, time: time };
            saveBookingFormInLocalStorage(newBookingValue);
            return newBookingValue;
        });
        console.log("Hora seleccionada", time);
    };

    const onChangeCustomer = (customers) => {
        setError("");
        setForm((prevValue) => {
            const newBookingValue = { ...prevValue, partySize: customers };
            saveBookingFormInLocalStorage(newBookingValue);
            return newBookingValue;
        });
        console.log("Comensales deseados", customers);
    };

    const onChangeTable = (id) => {
        setError("");
        setForm((prevValue) => {
            const newValue = { ...prevValue, tableId: id };
            saveBookingFormInLocalStorage(newValue);
            return newValue;
        });
        setSelectedTable(id);
        saveDataInSessionStorage("selectedTable", id);
    };

    const onInputChange = (event) => {
        const isCheckbox = event.target.type === "checkbox";
        const isTextArea = event.target.type === "textarea";

        if (isCheckbox) {
            const isChecked = event.target.checked;

            setForm((prevValue) => {
                const newValue = {
                    ...prevValue,
                    extras: { ...prevValue.extras, highChair: isChecked },
                };
                saveBookingFormInLocalStorage(newValue);
                return newValue;
            });
        }

        if (isTextArea) {
            const { name, value } = event.target;
            console.log("Que vale name", name);
            console.log("Que vale Value", value);

            setForm((prevValue) => {
                const newValue = { ...prevValue, [name]: value };
                saveBookingFormInLocalStorage(newValue);
                return newValue;
            });
        }
    };

    const onBookingSubmit = () => {
        const hasError = BookingVerificationSubmit(form);
        if (hasError) return setError(hasError);

        setShowModal(true);
    };

    const resetForm = () => {
        setForm(INITIAL_BOOKING_DATA);
        saveBookingFormInLocalStorage(INITIAL_BOOKING_DATA);
        setSelectedDate(null);
        removeFromSessionStorage("selectedDate");
        setSelectedTable("");
        removeFromSessionStorage("selectedTable");
        setShowModal(false);
    };

    return (
        <div className="flex flex-1 flex-col py-4">
            <Container className="flex-1 gap-2">
                <ModalContainer isOpen={showModal} onClose={resetForm}>
                    <article>
                        <h3>Confirmar Reserva</h3>
                        <ul className="flex flex-col">
                            <li>
                                <p>Fecha de la Reserva</p>
                                <small>{form.date}</small>
                            </li>
                            <li>
                                <p>Hora de la Reserva</p>
                                <small>{form.time}</small>
                            </li>
                            <li>
                                <p>Numero de comensales</p>
                                <small>{form.partySize}</small>
                            </li>
                            {form.notes && (
                                <li>
                                    <p>Mensaje Adicional</p>
                                    <small>{form.notes}</small>
                                </li>
                            )}
                            <li>
                                <input
                                    type="checkbox"
                                    readOnly
                                    checked={form.extras?.highChair}
                                    className="sr-only"
                                />
                                <div
                                    className={`w-6 h-6 border-2 rounded-md transition-all duration-200 flex items-center justify-center ${
                                        form.extras?.highChair
                                            ? "bg-primary-color border-primary-color"
                                            : "border-gray-500"
                                    }`}
                                >
                                    {form.extras?.highChair && (
                                        <svg
                                            className="w-4 h-4 text-white"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    )}
                                </div>
                                <small>Highchair</small>
                            </li>
                        </ul>
                    </article>
                </ModalContainer>
                <h1>RESERVAR</h1>

                <div className="">
                    <BookingCalendar
                        className="shadow-lg"
                        onChange={onChangeDate}
                        selectedDate={selectedDate}
                    />
                </div>

                <div className="flex flex-col gap-4 md:flex-row md:justify-center md:items-start">
                    <div className="flex">
                        <Dropdown placement={"right-center"}>
                            <DropdownTrigger
                                btnStyle={false}
                                className={`shadow-lg px-4 py-2.5  border-gray-300 rounded-lg hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ring-primary-color focus:border-primary-color ${
                                    theme === "light" ? "bg-accent-background" : "bg-accent-background-dark"
                                }`}
                            >
                                {form?.time || "Hora"}
                            </DropdownTrigger>
                            <DropdownMenu className="">
                                <DropdownItem
                                    key={"Hora"}
                                    defaultStyles={false}
                                    className={`perfect-center py-1 px-1.5 hover:scale-120 ${
                                        form.time === "" ? "font-bold" : "opacity-60"
                                    }`}
                                    onClick={() => onChangeTime("")}
                                >
                                    Hora
                                </DropdownItem>
                                {DATE_TIMES_POSIBILITIES.map((time) => {
                                    const currentDate = new Date().toISOString().split("T")[0];
                                    const currentTime = new Date().getHours();
                                    return (
                                        <DropdownItem
                                            key={time.label}
                                            defaultStyles={false}
                                            className={`perfect-center py-1 px-1.5 hover:scale-120 ${
                                                form.time === time.time ? "font-bold" : ""
                                            }`}
                                            onClick={() => onChangeTime(time.time)}
                                            disabled={
                                                currentDate === form.date &&
                                                parseFloat(time.label) <= currentTime
                                                    ? true
                                                    : false
                                            }
                                        >
                                            {time.label}
                                        </DropdownItem>
                                    );
                                })}
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                    <div className="flex">
                        <Dropdown placement={"right-center"}>
                            <DropdownTrigger
                                btnStyle={false}
                                className={`shadow-lg px-4 py-2.5   border-gray-300 rounded-lg hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ring-primary-color focus:border-primary-color ${
                                    theme === "light" ? "bg-accent-background" : "bg-accent-background-dark"
                                }`}
                            >
                                {form?.partySize || "Comensales"}
                            </DropdownTrigger>
                            <DropdownMenu>
                                <DropdownItem
                                    defaultStyles={false}
                                    className={`perfect-center py-1.5 px-1.5 hover:scale-120 ${
                                        form.partySize === "" ? "font-bold" : "opacity-60"
                                    }`}
                                    key={"defaultOption"}
                                    onClick={() => onChangeCustomer("")}
                                >
                                    Comensales
                                </DropdownItem>
                                {Array.from({ length: 8 }, (_, index) => (
                                    <DropdownItem
                                        defaultStyles={false}
                                        className={`perfect-center py-1.5 px-1.5 hover:scale-120 ${
                                            form.partySize === index + 1 ? "font-bold" : ""
                                        }`}
                                        key={index}
                                        onClick={() => onChangeCustomer(index + 1)}
                                    >
                                        {index + 1}
                                    </DropdownItem>
                                ))}
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                    <div className="flex -order-1">
                        <CustomCheckbox
                            onChange={onInputChange}
                            checked={form.extras.highChair}
                            title="Añadir Trona"
                            description="Sin coste Adicional"
                        />
                    </div>
                    <div className="flex">
                        <Button onClick={resetForm} size="md" variant="danger">
                            resetear Form
                        </Button>
                    </div>
                </div>
                <div
                    className={`max-w-[1024px]  py-4 px-2 rounded-lg lg:self-center lg:min-w-[800px] ${
                        theme === "light" ? "bg-accent-background" : "bg-accent-background-dark"
                    }`}
                >
                    <CustomInput>
                        <textarea
                            name="notes"
                            id="notes"
                            cols={10}
                            rows={1}
                            className={`bg-white rounded-lg p-2 focus:outline-primary-color focus-visible:ring-primary-color text-text-color placeholder:text-text-color/50`}
                            placeholder="¿Algo que añadir?"
                            maxLength={200}
                            value={form.notes}
                            onChange={(event) => onInputChange(event)}
                        ></textarea>
                    </CustomInput>
                </div>

                {form.partySize && (
                    <div className="flex flex-col gap-4 lg:grid lg:grid-cols-4 lg:self-center">
                        {TABLES.filter((table) => table.maxCapacity >= form.partySize).map((table) => (
                            <TableCard
                                key={table.tableId}
                                tableData={table}
                                onClick={() => onChangeTable(table.tableId)}
                                selectedTable={selectedTable}
                            />
                        ))}
                    </div>
                )}
                {error && (
                    <div className="flex lg:justify-center">
                        <h5 className="text-error-600/60 font-bold italic">{error}</h5>
                    </div>
                )}
                <button onClick={onBookingSubmit}>ENVIAR</button>
            </Container>
        </div>
    );
};
