import classNames from "classnames";
import { memo, useCallback, useContext, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BookingCalendar } from "../../components/BookingCalendar";
import { ErrorBoundary } from "../../components/ErrorBoundary/ErrorBoundary";
import { PageError } from "../../components/ErrorBoundary/PageError";
import { LanguageContext } from "../../contexts/LanguageContext";
import { dateVerificator } from "../../helpers/dateVerificator";
import { useDevice } from "../../hooks/useDevice";
import { AdminBookingCard } from "../components/AdminBookingCard";
import { AdminBookingsContainer } from "../components/AdminBookingsContainer";
import { AdminSkeleton } from "../components/AdminSkeleton";
import { AdminButton } from "../components/UI/AdminButton";
import { AdminContainer } from "../components/UI/AdminContainer";
import { useAdminData } from "../hooks/useAdminData";

const CURRENT_DATE = new Date(new Date().toISOString().split("T")[0]).getTime();

function AdminBookingsByDateSection({ padding, gap }) {
    const [selectedDate, setSelectedDate] = useState(CURRENT_DATE);

    const { bookings, isLoadingBookings } = useAdminData({ enablePolling: true, pollingInterval: 120000 });

    const { getText } = useContext(LanguageContext);
    const { isMobile2Xs, isMobileXs, isMobileSm, isTablet, isDesktop } = useDevice();

    const navigate = useNavigate();

    const filteredBookings = useMemo(() => {
        if (!selectedDate || !bookings?.length) return;

        return bookings.filter((booking) => {
            if (!booking?.scheduledFor) return;
            const bookingDate = new Date(booking.scheduledFor.split("T")[0]).getTime();
            const sameDate = bookingDate === selectedDate;
            return sameDate;
        });
    }, [selectedDate, bookings]);

    const onchangeDate = useCallback((selectedDate) => {
        const date = selectedDate.toISOString().split("T")[0];

        let year = Number(date.split("-")[0]);
        let month = Number(date.split("-")[1]);
        let day = ++date.split("-")[2];

        if (day.toString().length < 2) day = `0${day}`;

        let dateChange = `${year}-${month}-${day}`;

        const hasValidDay = dateVerificator(dateChange);
        if (!hasValidDay) {
            dateChange = `${year}-${++month}-${1}`;
        }
        const hasValidMonth = dateVerificator(dateChange);
        if (!hasValidMonth) {
            dateChange = `${++year}-0${1}-0${1}`;
        }
        const timeStampDate = new Date(dateChange).getTime();

        setSelectedDate(timeStampDate);
    }, []);

    const handleNavigateToTodayBookings = useCallback(() => navigate("/dashboard/bookings/today"));

    const getVariantCardByStatus = useCallback((status) => {
        if (!status) return null;
        if (status === "completed") return "success";
        if (status === "pending") return "warning";
        if (status === "cancelled") return "error";
        return "default";
    }, []);

    const handleOpenBookingDetails = (id) => navigate(`/dashboard/bookings/${id}`);

    const baseSectionClasses = "flex flex-col";
    const baseButtonContainerClasses = "flex flex-col sm:flex-row sm:items-center sm:justify-between";

    const variantsPadding = {
        default: "py-sm",
        none: " ",
        xs: "py-xs",
        sm: "py-sm",
        md: "py-md",
        lg: "py-lg",
        xl: "py-xl",
    };

    const variantsGap = {
        default: "gap-sm",
        none: " ",
        xs: "gap-xs",
        sm: "gap-sm",
        md: "gap-md",
        lg: "gap-lg",
        xl: "gap-xl",
    };

    const autoConfig = useMemo(
        () => ({
            padding: classNames({
                "py-md": isMobile2Xs || isMobileXs || isMobileSm,
                "py-lg": isTablet,
                "px-md py-lg": isDesktop,
            }),
            gap: classNames({
                "gap-xs": isMobile2Xs || isMobileXs,
                "gap-sm": isMobileSm || isTablet,
                "gap-md": isDesktop,
            }),
        }),
        [isMobile2Xs, isMobileXs, isMobileSm, isTablet, isDesktop]
    );

    const currentSectionClasses = classNames(
        baseSectionClasses,
        variantsPadding[padding] || autoConfig?.padding || variantsPadding.default,
        variantsGap[gap] || autoConfig?.gap || variantsGap.default
    );

    const currentButtonContainerClasses = classNames(baseButtonContainerClasses);

    return (
        <section className={currentSectionClasses}>
            <ErrorBoundary
                fallback={
                    <AdminContainer className="flex-1">
                        <PageError title={getText("error_sentences.on_error_booking_by_date_title")} />
                    </AdminContainer>
                }
            >
                <BookingCalendar userConfig={false} onChange={onchangeDate} selectedDate={selectedDate} />

                <div className={currentButtonContainerClasses}>
                    <AdminButton
                        variant={"danger"}
                        onClick={handleNavigateToTodayBookings}
                        className={`${selectedDate === CURRENT_DATE && "invisible"}`}
                    >
                        {getText("admin_bookings_by_date.admin_bookings_by_date_button_text")}
                    </AdminButton>

                    {filteredBookings?.length > 0 && (
                        <p>{`${filteredBookings?.length} ${
                            filteredBookings?.length === 1
                                ? getText("admin_bookings_by_date.admin_bookings_by_date_label_text1")
                                : getText("admin_bookings_by_date.admin_bookings_by_date_label_text2")
                        }`}</p>
                    )}
                </div>

                {isLoadingBookings && (
                    <AdminBookingsContainer>
                        {Array.from({ length: 2 }).map((_, index) => (
                            <AdminSkeleton className="gap-sm" key={index}>
                                <AdminSkeleton
                                    variant="text"
                                    lines={1}
                                    padding="none"
                                    borderColor="none"
                                    bgCard="none"
                                    height="sm"
                                    width="full"
                                />
                                <AdminSkeleton
                                    variant="text"
                                    lines={1}
                                    padding="none"
                                    borderColor="none"
                                    bgCard="none"
                                    height="2xs"
                                    width="6xl"
                                />
                                <AdminSkeleton
                                    variant="text"
                                    lines={1}
                                    padding="none"
                                    borderColor="none"
                                    bgCard="none"
                                    height="2xs"
                                    width="2xl"
                                />
                                <AdminSkeleton
                                    variant="text"
                                    lines={1}
                                    padding="none"
                                    borderColor="none"
                                    bgCard="none"
                                    height="2xs"
                                    width="2xl"
                                />
                                <AdminSkeleton
                                    variant="text"
                                    lines={1}
                                    padding="none"
                                    borderColor="none"
                                    bgCard="none"
                                    height="2xs"
                                    width="4xl"
                                />
                            </AdminSkeleton>
                        ))}
                    </AdminBookingsContainer>
                )}

                {!isLoadingBookings && !filteredBookings?.length > 0 && (
                    <div>
                        <p className="italic opacity-50">
                            {getText("admin_bookings_by_date.admin_bookings_by_date_not_bookings_text")}
                        </p>
                    </div>
                )}

                {!isLoadingBookings && filteredBookings?.length > 0 && (
                    <AdminBookingsContainer>
                        {filteredBookings.map((booking) => (
                            <AdminBookingCard
                                key={booking?.id || booking?._id}
                                bookingData={booking}
                                variant={getVariantCardByStatus(booking?.status)}
                                onClick={() => handleOpenBookingDetails(booking?.id || booking?._id)}
                            />
                        ))}
                    </AdminBookingsContainer>
                )}
            </ErrorBoundary>
        </section>
    );
}

export default memo(AdminBookingsByDateSection);
