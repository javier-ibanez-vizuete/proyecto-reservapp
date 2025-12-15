import { useCallback, useContext, useState } from "react";
import { BookingCalendar } from "../components/BookingCalendar";
import { Container } from "../components/Container";
import { CustomCheckbox } from "../components/CustomCheckbox";
import { CustomInput } from "../components/CustomInput";
import { Dropdown } from "../components/Dropdown/Dropdown";
import { DropdownItem } from "../components/Dropdown/DropdownItem";
import { DropdownMenu } from "../components/Dropdown/DropdownMenu";
import { DropdownTrigger } from "../components/Dropdown/DropdownTrigger";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "../components/Modal";
import { LoadingButton } from "../components/Spinner/LoadingButton";
import { TableCard } from "../components/TableCard";
import { ToastContainer } from "../components/ToastContainer";
import { Button } from "../components/UI/Button";
import { AuthContext } from "../contexts/AuthContext";
import { LanguageContext } from "../contexts/LanguageContext";
import { ThemeContext } from "../contexts/ThemeContext";
import {
    getBookingFormFromLocalStorage,
    saveBookingFormInLocalStorage,
} from "../core/bookings/bookings.service";
import { useBookings } from "../core/bookings/useBookings";
import { TABLES } from "../data/tables";
import { dateVerificator } from "../helpers/dateVerificator";
import { BookingVerificationSubmit } from "../helpers/FieldsVerificator";
import {
    getDataFromSessionStorage,
    removeFromSessionStorage,
    saveDataInSessionStorage,
} from "../helpers/storage";
import { useToast } from "../hooks/useToast";

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

    const { postBookings, isLoading } = useBookings();

    const { user } = useContext(AuthContext);
    const { theme } = useContext(ThemeContext);
    const { getText } = useContext(LanguageContext);
    const { toasts, showToast, dismissToast } = useToast();

    const onChangeDate = useCallback((selectedDate) => {
        setError("");
        const date = selectedDate.toISOString().split("T")[0];
        let year = date.split("-")[0];
        let month = date.split("-")[1];
        let day = ++date.split("-")[2];
        let dateChange = `${year}-${month}-${day}`;

        const isValidDay = dateVerificator(dateChange);
        if (!isValidDay) {
            dateChange = `${year}-${++month}-${1}`;
        }

        const isValidMonth = dateVerificator(dateChange);
        if (!isValidMonth) {
            dateChange = `${++year}-${1}-${1}`;
        }

        setForm((prevValue) => {
            const newBookingValue = { ...prevValue, date: dateChange };
            saveBookingFormInLocalStorage(newBookingValue);
            return newBookingValue;
        });

        setSelectedDate(dateChange);
        saveDataInSessionStorage("selectedDate", dateChange);
    }, []);

    const onChangeTime = useCallback((time) => {
        setError("");
        setForm((prevValue) => {
            const newBookingValue = { ...prevValue, time: time };
            saveBookingFormInLocalStorage(newBookingValue);
            return newBookingValue;
        });
    }, []);

    const onChangeCustomer = useCallback((customers) => {
        setError("");
        setForm((prevValue) => {
            const newBookingValue = { ...prevValue, partySize: customers };
            saveBookingFormInLocalStorage(newBookingValue);
            return newBookingValue;
        });
    }, []);

    const onChangeTable = useCallback((id) => {
        setError("");
        setForm((prevValue) => {
            const newValue = { ...prevValue, tableId: id };
            saveBookingFormInLocalStorage(newValue);
            return newValue;
        });
        setSelectedTable(id);
        saveDataInSessionStorage("selectedTable", id);
    }, []);

    const onInputChange = useCallback((event) => {
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

            setForm((prevValue) => {
                const newValue = { ...prevValue, [name]: value };
                saveBookingFormInLocalStorage(newValue);
                return newValue;
            });
        }
    }, []);

    const onBookingSubmit = useCallback(() => {
        const hasError = BookingVerificationSubmit(form);
        if (hasError) return setError(hasError);

        setShowModal(true);
    }, [form]);

    const onConfirmSubmit = useCallback(async () => {
        try {
            const newFormValue = { ...form, userId: user?.id };
            const booked = await postBookings(newFormValue);
            if (booked) {
                resetForm();
                showToast(getText("toastBookingSuccess"), "success");
            }
        } catch (err) {
            if (err?.status === 409) {
                resetForm();
                return showToast(getText("toastBookingUnavailable"), "error");
            }
            showToast(getText("toastBookingError"), "error");
        }
    }, [form, user?.id]);

    const resetForm = useCallback(() => {
        setForm(INITIAL_BOOKING_DATA);
        saveBookingFormInLocalStorage(INITIAL_BOOKING_DATA);
        setSelectedDate(null);
        removeFromSessionStorage("selectedDate");
        setSelectedTable("");
        removeFromSessionStorage("selectedTable");
        setShowModal(false);
    }, []);

    const onCloseModal = useCallback(() => setShowModal(false), []);

    return (
        <div className="flex flex-1 flex-col py-4">
            <Container className="flex-1 gap-2">
                <h1>{getText("h1BookingPage")}</h1>

                <Modal
                    isOpen={showModal}
                    size="lg"
                    onClose={onCloseModal}
                    className={theme === "light" ? "bg-accent-background" : "bg-accent-background-dark"}
                >
                    <ModalHeader>{getText("confirmBookingTitle")}</ModalHeader>
                    <ModalBody>
                        <ul className="flex flex-col gap-3">
                            <li className="flex flex-col gap-1">
                                <p>{getText("userNameConfirmText")}:</p>
                                <h6>{user?.name}</h6>
                            </li>
                            <li className="flex flex-col gap-1">
                                <p>{getText("dateConfirmText")}:</p>
                                <h6>{form?.date}</h6>
                            </li>
                            <li className="flex flex-col gap-1">
                                <p>{getText("timeConfirmText")}:</p>
                                <h6>{form?.time}</h6>
                            </li>
                            <li className="flex flex-col gap-1">
                                <p>{getText("customersConfirmText")}:</p>
                                <h6>{form?.partySize}</h6>
                            </li>
                            {form.extras?.highChair && (
                                <li className="flex flex-col gap-1">
                                    <p>{getText("highChairConfirmText")}</p>
                                    <h6>
                                        {form.extras.highChair
                                            ? getText("affirmationText")
                                            : getText("NegationText")}
                                    </h6>
                                </li>
                            )}
                            {form?.notes && (
                                <li className="flex flex-col gap-1">
                                    <p>{getText("aditionalMessageConfirmText")}:</p>
                                    <h6 className="break-all">{form.notes}</h6>
                                </li>
                            )}
                        </ul>
                    </ModalBody>
                    <ModalFooter>
                        <LoadingButton
                            variant="primary"
                            onClick={onConfirmSubmit}
                            loading={isLoading}
                            loadingText={getText("loadingTextConfirmButtonModal")}
                            disabled={isLoading ? true : false}
                        >
                            {getText("confirmButtonModal")}
                        </LoadingButton>
                    </ModalFooter>
                </Modal>
                <div>
                    <BookingCalendar
                        className="shadow-lg"
                        onChange={onChangeDate}
                        selectedDate={selectedDate}
                        userConfig={true}
                    />
                </div>
                <div className="flex flex-col gap-4 md:flex-row md:justify-center md:items-stretch">
                    <div className="flex">
                        <Dropdown placement={"right-center"}>
                            <DropdownTrigger
                                btnStyle={false}
                                className={`shadow-lg px-4 py-2.5  border-gray-300 rounded-lg hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ring-primary-color focus:border-primary-color ${
                                    theme === "light" ? "bg-accent-background" : "bg-accent-background-dark"
                                }`}
                            >
                                {(form?.time && `${getText("bookingTimeText")}: ${form?.time}`) ||
                                    getText("bookingTimeText")}
                            </DropdownTrigger>
                            <DropdownMenu classNameMenuContainer="flex-col">
                                <DropdownItem
                                    key={"Hora"}
                                    variant="none"
                                    className={`perfect-center py-1 px-1.5 hover:scale-120 ${
                                        form.time === "" ? "font-bold" : "opacity-60"
                                    }`}
                                    onClick={() => onChangeTime("")}
                                >
                                    {getText("bookingTimePlaceholder")}
                                </DropdownItem>
                                {DATE_TIMES_POSIBILITIES.map((time) => {
                                    const currentDate = new Date().toISOString().split("T")[0];
                                    const currentTime = new Date().getHours();
                                    return (
                                        <DropdownItem
                                            key={time.label}
                                            variant="none"
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
                                className={`shadow-lg px-4 py-2.5 border-gray-300 rounded-lg hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ring-primary-color focus:border-primary-color ${
                                    theme === "light" ? "bg-accent-background" : "bg-accent-background-dark"
                                }`}
                            >
                                {(form?.partySize &&
                                    `${getText("bookingCustomersText")}: ${form?.partySize}`) ||
                                    getText("bookingCustomersText")}
                            </DropdownTrigger>
                            <DropdownMenu classNameMenuContainer="flex-col">
                                <DropdownItem
                                    variant="none"
                                    className={`perfect-center py-1.5 px-1.5 hover:scale-120 ${
                                        form.partySize === "" ? "font-bold" : "opacity-60"
                                    }`}
                                    key={"defaultOption"}
                                    onClick={() => onChangeCustomer("")}
                                >
                                    <span className="text-sm">{getText("bookingCustomersPlaceholder")}</span>
                                </DropdownItem>
                                {Array.from({ length: 8 }, (_, index) => (
                                    <DropdownItem
                                        variant="none"
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

                    <div className="flex md:-order-1">
                        <CustomCheckbox
                            onChange={onInputChange}
                            checked={form.extras.highChair}
                            title={getText("bookingHighChairTitle")}
                            description={getText("bookingHighChairDescription")}
                        />
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
                            rows={3}
                            className={`bg-white rounded-lg p-2 focus:outline-primary-color focus-visible:ring-primary-color text-text-color placeholder:text-text-color/50`}
                            placeholder={getText("bookingAditionalMessagePlaceholder")}
                            maxLength={100}
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
                <div className="flex flex-col gap-2 md:flex-row lg:justify-center lg:gap-4">
                    <Button onClick={onBookingSubmit} variant="primary" className="flex-1 lg:flex-none">
                        {getText("bookingButtonConfirmText")}
                    </Button>
                    <Button onClick={resetForm} variant="danger" className="flex-1 lg:flex-none">
                        {getText("bookingButtonResetForm")}
                    </Button>
                </div>
                <ToastContainer toasts={toasts} onClose={dismissToast} />
            </Container>
        </div>
    );
};
