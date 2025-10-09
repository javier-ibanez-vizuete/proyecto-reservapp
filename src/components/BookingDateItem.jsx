import { useCallback, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { LanguageContext } from "../contexts/LanguageContext";
import { ThemeContext } from "../contexts/ThemeContext";
import { useBookings } from "../core/bookings/useBookings";
import { getDataFromSessionStorage, removeFromSessionStorage } from "../helpers/storage";
import { useLoading } from "../hooks/useLoading";
import { useToast } from "../hooks/useToast";
import { ConfirmModal } from "./Modal/ConfirmModal";
import { Modal } from "./Modal/Modal";
import { ModalBody } from "./Modal/ModalBody";
import { ModalFooter } from "./Modal/ModalFooter";
import { ModalHeader } from "./Modal/ModalHeader";
import { ToastContainer } from "./ToastContainer";
import { Button } from "./UI/Button";

const INITIAL_MODAL_INFO = {
    customerNumber: 0,
    date: "",
    time: "",
    extras: { highChair: false },
};

export const BookingDateItem = ({ title = "", content = [], areOldBooking = false }) => {
    const [showModalDelete, setShowModalDelete] = useState(false);
    const [messageModal, setMessageModal] = useState("");
    const [showModalInfo, setShowModalInfo] = useState(false);
    const [modalInfo, setModalInfo] = useState(INITIAL_MODAL_INFO);

    const [bookingId, setBookingId] = useState("");

    const { toasts, showToast, dismissToast } = useToast();
    const { isLoading, setIsLoading } = useLoading();
    const { deleteBookingById } = useBookings();

    const { theme } = useContext(ThemeContext);
    const { getText } = useContext(LanguageContext);

    const navigate = useNavigate();
    const location = useLocation();

    const getDate = useCallback((fullDate) => {
        const date = fullDate?.split("T")[0];
        return date;
    }, []);

    const getTime = useCallback((fullDate) => {
        const hourDate = new Date(fullDate).getHours();
        const minutesDate = new Date(fullDate).getMinutes();

        const timeDate = `${hourDate}:${minutesDate === 0 ? minutesDate + "0" : minutesDate} `;
        return timeDate;
    }, []);

    const handleShowModal = useCallback(
        (bookingData) => {
            if (!bookingData) setBookingId("");
            if (bookingData) {
                const modalMessage = `${getText("bookingDataModalInfoMessageText1")} ${
                    bookingData?.partySize
                } ${
                    bookingData?.partySize === 1
                        ? getText("bookingDataModalInfoMessageCustomer1")
                        : getText("bookingDataModalInfoMessageCustomer2")
                } ?`;
                setBookingId(bookingData.id || bookingData._id);
                setMessageModal(modalMessage);
            }
            setShowModalDelete((prev) => !prev);
        },
        [showModalDelete]
    );

    const handleShowModalInfo = useCallback(
        (bookingData) => {
            if (!bookingData) setModalInfo(INITIAL_MODAL_INFO);
            if (bookingData) {
                const newModalInfo = {
                    customerNumber: bookingData?.partySize,
                    date: getDate(bookingData?.scheduledFor),
                    time: getTime(bookingData?.scheduledFor),
                    extras: {
                        highChair: bookingData?.extras?.highChair,
                    },
                };
                setModalInfo({ ...newModalInfo });
            }
            setShowModalInfo((prev) => !prev);
        },
        [showModalInfo, modalInfo]
    );

    const handleDeleteBooking = useCallback(
        async (bookingId) => {
            setIsLoading(true);
            try {
                await deleteBookingById(bookingId);
            } catch (err) {
                showToast(getText("toastBookingDataDeltingBookingError"), "error", 1000);
            } finally {
                setIsLoading(false);
                setShowModalDelete(false);
            }
        },
        [content?.length]
    );

    useEffect(() => {
        const fromDeleteBooking =
            location?.pathname?.fromDeleteBooking === true ||
            getDataFromSessionStorage("fromDeleteBooking") === true;
        if (fromDeleteBooking) {
            showToast("Reserva eliminada con exito", "success", 1000);
            navigate(location?.pathname, { replace: true, state: {} });
            removeFromSessionStorage("fromDeleteBooking");
        }
    }, []);

    if (content?.length <= 0 && !areOldBooking)
        return (
            <div className="flex flex-col gap-1">
                <h3>{title}</h3>
                <div
                    className="flex items-center justify-between gap-2"
                    onClick={(event) => event.stopPropagation()}
                >
                    <p className="flex-1 opacity-80">{getText("bookingDataNoPendingBookingsFound")}</p>
                    <Button size="sm" onClick={() => navigate("/bookings")}>
                        {getText("buttonBookingDataMakeABook")}
                    </Button>
                </div>
            </div>
        );

    if (content?.length <= 0 && areOldBooking)
        return (
            <div className="flex flex-col gap-1">
                <h3>{title}</h3>
                <p className="opacity-80">{getText("bookingDataNoPastVisitsFound")}</p>
            </div>
        );

    return (
        <div className="flex flex-col" onClick={(event) => event.stopPropagation()}>
            <ConfirmModal
                className={`${theme === "light" ? "bg-accent-background" : "bg-accent-background-dark"}`}
                isOpen={showModalDelete}
                onClose={handleShowModal}
                onConfirm={() => handleDeleteBooking(bookingId)}
                title={getText("bookingDataModalDeletingTitle")}
                message={messageModal}
                confirmText={getText("bookingDataModalDeletingbutton")}
                variant="danger"
                loadingText={getText("loadingBookingDataModalDeletingbutton")}
                loading={isLoading}
            />
            <Modal
                isOpen={showModalInfo}
                onClose={handleShowModalInfo}
                closeOnEscape={true}
                className={`${theme === "light" ? "bg-accent-background" : "bg-accent-background-dark"}`}
            >
                <ModalHeader>{getText("bookingDataModalInfotitle")}</ModalHeader>
                <ModalBody className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                        <p>{getText("bookingDataModalInfoDateText")}</p>
                        <p>{modalInfo.date}</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <p>{getText("bookingDataModalInfoTimeText")}</p>
                        <p>{modalInfo.time}</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <p>{getText("bookingDataModalInfoPartySizeText")}</p>
                        <p>{modalInfo.customerNumber}</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <p>{getText("High chair needed?")}</p>
                        <p>{modalInfo.extras.highChair ? "Yes" : "No"}</p>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={handleShowModalInfo}>
                        {getText("buttonBookingDataCloseModalInfo")}
                    </Button>
                </ModalFooter>
            </Modal>
            <h3>{title}</h3>
            <ul>
                {content.map((booking) => (
                    <li key={booking?.id || booking?._id} className="flex flex-col py-2 pr-2">
                        <div className="flex flex-1 items-center justify-between gap-2">
                            <div
                                className="flex flex-1 items-center gap-3"
                                onClick={() => handleShowModalInfo(booking)}
                            >
                                <p>{getDate(booking?.scheduledFor)}</p>
                                <p>{getTime(booking?.scheduledFor)}</p>
                            </div>

                            {!areOldBooking && (
                                <Button
                                    size="sm"
                                    variant="secondary"
                                    onClick={() => handleShowModal(booking)}
                                >
                                    {getText("buttonBookingDataCancelReservation")}
                                </Button>
                            )}
                        </div>
                    </li>
                ))}
            </ul>
            <ToastContainer toasts={toasts} onClose={dismissToast} />
        </div>
    );
};
