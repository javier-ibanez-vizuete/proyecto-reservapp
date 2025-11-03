import classNames from "classnames";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { ConfirmModal } from "../../components/Modal/ConfirmModal";
import { ToastContainer } from "../../components/ToastContainer";
import { BackButton } from "../../components/UI/BackButton";
import { BookingsContext } from "../../contexts/BookingsContext";
import { ThemeContext } from "../../contexts/ThemeContext";
import {
    removeBookingDetailsFromLocalStorage,
    saveBookingDetailsInLocalStorage,
} from "../../core/bookings/bookings.service";
import { useBookings } from "../../core/bookings/useBookings";
import { useDevice } from "../../hooks/useDevice";
import { useLoading } from "../../hooks/useLoading";
import { useToast } from "../../hooks/useToast";
import { AdminButton } from "../components/UI/AdminButton";
import { useAdminData } from "../hooks/useAdminData";

export const AdminBookingDetail = ({
    variant,
    padding,
    articleGap,
    elementsGap,
    rounded,
    borderColor,
    className = "",
    ...props
}) => {
    const [ownerDetails, setOwnerDetails] = useState(null);

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const loaderCancelBooking = useLoading();

    const { id } = useParams();
    const { bookings, users } = useAdminData({ enablePolling: false });
    const { bookingDetails, setBookingDetails } = useContext(BookingsContext);
    const { getBookingsById, postCancelBookingById, isLoading } = useBookings();

    const { toasts, showToast, dismissToast } = useToast();
    const { isMobile2Xs, isMobileXs, isMobileSm, isTablet, isDesktop } = useDevice();
    const { theme } = useContext(ThemeContext);

    const handleGetBookingById = useCallback(async () => {
        try {
            if (!id || bookingDetails) return;
            await getBookingsById(id);
        } catch (err) {
            console.error("Booking not Found");
        }
    }, [getBookingsById, bookingDetails]);

    const handleGetBookingOwner = useMemo(() => {
        if (!users.length || !bookingDetails?.userId) return;
        const bookingOwner = users.find((user) => (user?.id || user?._id) === bookingDetails.userId);
        return bookingOwner.name;
    }, [bookingDetails]);

    const getBookingStatusName = () => {
        if (bookingDetails?.status === "pending") return "Pendiente";
        if (bookingDetails?.status === "completed") return "Completada";
        if (bookingDetails?.status === "cancelled") return "Cancelada";
        return null;
    };

    useEffect(() => {
        if (!bookings) return;
        const bookingFound = bookings.find((booking) => (booking?.id || booking?._id) === id);
        if (bookingFound) {
            saveBookingDetailsInLocalStorage(bookingFound);
            return setBookingDetails(bookingFound);
        }

        if (!bookingFound && !bookingDetails) {
            handleGetBookingById();
        }

        return () => {
            removeBookingDetailsFromLocalStorage();
            setBookingDetails(null);
        };
    }, [id]);

    useEffect(() => {
        if (ownerDetails || !users?.length || !bookingDetails?.userId) return;
        const owner = users.find((user) => (user?.id || user?._id) === bookingDetails?.userId);
        if (!owner) return;
        setOwnerDetails({ ...owner });
    });

    const bookingTime = useMemo(() => {
        if (!bookingDetails?.scheduledFor) return;
        const date = bookingDetails?.scheduledFor.split(".")[0].replace("T", " ");
        return date;
    }, [bookingDetails?.scheduledFor]);

    const bookingMadeTime = useMemo(() => {
        if (!bookingDetails?.requestedAt) return;
        const date = bookingDetails.requestedAt.split(".")[0].replace("T", " ");
        return date;
    }, [bookingDetails?.requestedAt]);

    const handleSendEmailToOwner = useCallback(() => {
        if (!ownerDetails?.email) return;
        const mailtoURL = `mailto:${ownerDetails?.email}`;

        const anchor = document.createElement("a");
        anchor.href = mailtoURL;
        anchor.target = "_blank";

        document.body.appendChild(anchor);
        anchor.click();
        document.body.removeChild(anchor);
    }, [ownerDetails]);

    const handleCallOwner = useCallback(() => {
        if (!ownerDetails?.phoneNumber) return;
        const calltoURL = `tel:${ownerDetails?.phoneNumber}`;

        const anchor = document.createElement("a");
        anchor.href = calltoURL;
        anchor.target = "_blank";

        document.body.appendChild(anchor);
        anchor.click();
        document.body.removeChild(anchor);
    }, [ownerDetails]);

    const handleDeleteModal = useCallback(() => setShowDeleteModal((prev) => !prev), [showDeleteModal]);

    const handleCancelBooking = useCallback(async () => {
        try {
            loaderCancelBooking.setIsLoading(true);
            const cancelledBooking = await postCancelBookingById(bookingDetails?.id || bookingDetails?._id);
            if (!cancelledBooking) throw new Error("ERROR CANCELLING BOOKING");
            showToast("Reserva Cancelada con Exito", "success", 1000);
        } catch (err) {
            showToast("Error Cancelando Reserva", "error", 1000);
        } finally {
            loaderCancelBooking.setIsLoading(false);
            setShowDeleteModal(false);
        }
    }, [bookingDetails]);

    const baseArticleClasses = "flex-1 flex flex-col";
    const baseCardContainerClasses = "flex flex-col";
    const baseButtonsContainerClasses = "flex flex-col md:flex-row md:justify-between";
    const baseContactButtonsContainerClasses = "flex flex-col md:flex-row";

    const variantsConfig = {
        default: classNames("bg-gradient-to-br hover:bg-gradient-to-tr", {
            "from-admin-background to-admin-accent-background": theme === "light",
            "from-admin-background-dark to-admin-accent-background-dark": theme !== "light",
        }),
        accent: classNames("bg-gradient-to-tr hover:bg-gradient-to-br", {
            "from-admin-accent-background via-[#9cd4ec] to-admin-background": theme === "light",
            "from-admin-accent-background-dark via-[#103247] to-admin-background-dark": theme !== "light",
        }),
        primary: classNames(
            "bg-gradient-to-tr from-admin-primary-color to-admin-primary-hover",
            "hover:bg-gradient-to-r hover:from-admin-primary-hover hover:to-admin-primary-color"
        ),
        secondary: classNames(
            "bg-gradient-to-r from-admin-secondary-color to-admin-secondary-hover",
            "hover:bg-gradient-to-r hover:from-admin-secondary-hover hover:to-admin-secondary-color"
        ),
        success: classNames(
            "bg-gradient-to-br from-success-400 to-success-500",
            "hover:bg-gradient-to-lt hover:from-success-500 hover:to-success-400"
        ),
        warning: classNames(
            "bg-gradient-to-br from-warning-400 to-warning-500",
            "hover:bg-gradient-to-lt hover:from-warning-500 hover:to-warning-400"
        ),
        error: classNames(
            "bg-gradient-to-br from-error-400 to-error-500",
            "hover:bg-gradient-to-lt hover:from-error-500 hover:to-error-400"
        ),
        delayed: classNames(
            "bg-gradient-to-br from-error-400 to-error-500",
            "hover:from-error-500 hover:to-error-400"
        ),
    };

    const variantsPadding = {
        default: "p-sm",
        none: " ",
        xs: "p-xs",
        sm: "p-sm",
        md: "p-md",
        lg: "p-lg",
        xl: "p-xl",
    };

    const variantsArticleGap = {
        default: "gap-sm",
        none: " ",
        xs: "gap-xs",
        sm: "gap-sm",
        md: "gap-md",
        lg: "gap-lg",
        xl: "gap-xl",
    };

    const variantsElementsGap = {
        default: "gap-sm",
        none: " ",
        xs: "gap-xs",
        sm: "gap-sm",
        md: "gap-md",
        lg: "gap-lg",
        xl: "gap-xl",
    };

    const variantsRounded = {
        default: "rounded-default",
        none: " ",
        xs: "rounded-xs",
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        xl: "rounded-xl",
        full: "rounded-full",
    };

    const variantsBorder = {
        default: classNames("border", {
            "border-gray-700/50": theme === "light",
            "border-gray-200/50": theme !== "light",
        }),
        accent: classNames("border", {
            "border-admin-accent-background/40": theme === "light",
            "border-admin-accent-background-dark/40": theme !== "light",
        }),
        primary: classNames("border", {
            "border-admin-primary-color/40": theme === "light",
            "border-admin-primary-color/20": theme !== "light",
        }),
        secondary: classNames("border", {
            "border-admin-secondary-color/40": theme === "light",
            "border-admin-secondary-color/20": theme !== "light",
        }),
        success: classNames("border", {
            "border-success-700/40": theme === "light",
            "border-success-200/20": theme !== "light",
        }),
        warning: classNames("border", {
            "border-warning-700/40": theme === "light",
            "border-warning-200/20": theme !== "light",
        }),
        error: classNames("border", {
            "border-error-700/40": theme === "light",
            "border-error-200/20": theme !== "light",
        }),
    };

    const autoConfig = useMemo(
        () => ({
            variant: classNames("bg-gradient-to-bl hover:bg-gradient-to-tr", {
                "from-admin-accent-background via-[#9cd4ec] to-admin-background": theme === "light",
                "from-admin-accent-background-dark via-[#103247] to-admin-background-dark": theme !== "light",
            }),
            padding: classNames({
                "py-sm": isMobile2Xs || isMobileXs,
                "py-md": isMobileSm || isTablet,
                "p-lg": isDesktop,
            }),
            articleGap: classNames({
                "gap-sm": isMobile2Xs || isMobileXs,
                "gap-md": isMobileSm || isTablet || isDesktop,
            }),
            elementsGap: classNames({
                "gap-xs": isMobile2Xs || isMobileXs,
                "gap-sm": isMobileSm || isTablet,
                "gap-md": isDesktop,
            }),
            elementsPadding: classNames({
                "p-sm": isMobile2Xs || isMobileXs,
                "p-md": isMobileSm || isTablet,
                "p-lg": isDesktop,
            }),
            rounded: classNames({
                "rounded-xs": isMobile2Xs || isMobileXs,
                "rounded-default": isMobileSm || isTablet,
                "rounded-md": isDesktop,
            }),
            border: classNames("border", {
                "border-admin-text-color/40": theme === "light",
                "border-admin-text-color-dark/40": theme !== "light",
            }),
        }),
        [isMobile2Xs, isMobileXs, isMobileSm, isTablet, isDesktop, theme]
    );

    const currentArticleClasses = classNames(
        baseArticleClasses,
        variantsPadding[padding] || autoConfig?.padding || variantsPadding.default,
        variantsArticleGap[articleGap] || autoConfig?.articleGap || variantsArticleGap.default
    );

    const currentCardContainer = classNames(
        baseCardContainerClasses,
        variantsConfig[variant] || autoConfig?.variant || variantsConfig.default,
        autoConfig?.elementsPadding || variantsPadding.default,
        variantsArticleGap[articleGap] || autoConfig?.articleGap || variantsArticleGap.default,
        variantsRounded[rounded] || autoConfig?.rounded || variantsRounded.default,
        variantsBorder[borderColor] || autoConfig?.border || variantsBorder.default
    );

    const currentButtonsContainerClasses = classNames(
        baseButtonsContainerClasses,
        variantsElementsGap[elementsGap] || autoConfig?.elementsGap || variantsElementsGap.default
    );

    const currentContactButtonsContainerClasses = classNames(
        baseContactButtonsContainerClasses,
        variantsElementsGap[elementsGap] || autoConfig?.elementsGap || variantsElementsGap.default
    );

    if (!bookingDetails || isLoading)
        return (
            // PONER UN ESKELETON
            <div>Cargando...</div>
        );

    return (
        <article className={currentArticleClasses}>
            <ConfirmModal
                isOpen={showDeleteModal}
                onClose={handleDeleteModal}
                onConfirm={handleCancelBooking}
                title={"Cancelar Reserva?"}
                message={`Cancelar la reserva de ${ownerDetails?.name}`}
                confirmText={"Cancelar"}
                loadingText={"Cancelando..."}
                cancelText={"Volver"}
                showCloseButton={false}
                variantButton="danger"
                loading={loaderCancelBooking.isLoading}
            />
            <div className="perfect-center self-start lg:self-center">
                <BackButton />
            </div>

            {/* PONER ESTILOS PARA LOS DETALLES DE RESERVA */}
            <div className={currentCardContainer}>
                <h6>{bookingTime}</h6>
                <p>
                    Hecha por: <span>{handleGetBookingOwner}</span>
                </p>
                <p>
                    Creada el: <span>{bookingMadeTime}</span>
                </p>
                {bookingDetails?.notes && (
                    <div>
                        <p>Adicional Message:</p>
                        <p>{bookingDetails?.notes}</p>
                    </div>
                )}
                {bookingDetails?.extras?.highChair && (
                    <div>
                        <p>
                            Extras: <span>Trona</span>
                        </p>
                    </div>
                )}
                <p>
                    Estado: <span>{getBookingStatusName()}</span>
                </p>

                <div className={currentButtonsContainerClasses}>
                    <div className={currentContactButtonsContainerClasses}>
                        <AdminButton onClick={handleSendEmailToOwner} variant={"primary"}>
                            Contactar
                        </AdminButton>
                        {ownerDetails?.phoneNumber && (
                            <AdminButton variant={"secondary"} onClick={handleCallOwner}>
                                Llamar
                            </AdminButton>
                        )}
                    </div>
                    {bookingDetails?.status !== "cancelled" && (
                        <AdminButton onClick={handleDeleteModal} variant={"danger"}>
                            Cancelar Reserva
                        </AdminButton>
                    )}
                </div>
            </div>
            <ToastContainer toasts={toasts} onClose={dismissToast} />
        </article>
    );
};
