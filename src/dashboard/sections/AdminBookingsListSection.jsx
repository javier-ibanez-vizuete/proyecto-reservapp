import classNames from "classnames";
import { memo, useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ErrorBoundary } from "../../components/ErrorBoundary/ErrorBoundary";
import { PageError } from "../../components/ErrorBoundary/PageError";
import {
    getDataFromSessionStorage,
    removeFromSessionStorage,
    saveDataInSessionStorage,
} from "../../helpers/storage";
import { useDevice } from "../../hooks/useDevice";
import { useTranslate } from "../../translations/useTranslate";
import { AdminBookingCard } from "../components/AdminBookingCard";
import { AdminBookingsContainer } from "../components/AdminBookingsContainer";
import { AdminCheckbox } from "../components/AdminCheckbox";
import { AdminDropdown } from "../components/AdminDropdown/AdminDropdown";
import { AdminDropdownItem } from "../components/AdminDropdown/AdminDropdownItem";
import { AdminDropdownMenu } from "../components/AdminDropdown/AdminDropdownMenu";
import { AdminDropdownTrigger } from "../components/AdminDropdown/AdminDropdownTrigger";
import { AdminButton } from "../components/UI/AdminButton";
import { AdminContainer } from "../components/UI/AdminContainer";
import { AdminInputSearch } from "../components/UI/AdminInputSearch";
import { useAdminData } from "../hooks/useAdminData";

const INITIAL_FILTER_STATES = {
    ownerName: "",
    guestsNumber: "",
    bookingStatus: "",
    highChair: false,
};

function AdminBookingsListSection({ padding, sectionGap, filtersGap }) {
    const [filters, setFilters] = useState(
        () => getDataFromSessionStorage("allBookingsFilters") || INITIAL_FILTER_STATES
    );

    const { t } = useTranslate();
    const { isMobile2Xs, isMobileXs, isMobileSm, isTablet, isDesktop } = useDevice();

    const navigate = useNavigate();

    const { users, bookings, isLoadingBookings } = useAdminData({
        enablePolling: true,
        pollingInterval: 120000,
    });

    const hasActiveFilters = useMemo(() => {
        return (
            filters.ownerName !== "" ||
            filters.guestsNumber !== "" ||
            filters.bookingStatus !== "" ||
            filters.highChair === true
        );
    }, [filters]);

    /**
     * Filters bookings based on active filter criteria
     * Uses AND logic - booking must match ALL active filters
     */
    const filteredBookings = useMemo(() => {
        if (!bookings?.length || !users?.length) return [];

        if (!hasActiveFilters) return bookings;

        return bookings.filter((booking) => {
            const userData = users.find((user) => booking?.userId === (user?.id || user?._id));

            const nameMatch = filters.ownerName
                ? userData?.name?.toLowerCase().includes(filters.ownerName.toLowerCase())
                : true;

            const guestsMatch = filters.guestsNumber ? booking?.partySize === filters.guestsNumber : true;

            const statusMatch = filters.bookingStatus ? booking?.status === filters.bookingStatus : true;

            const highChairMatch = filters.highChair ? booking?.extras?.highChair === true : true;

            return nameMatch && guestsMatch && statusMatch && highChairMatch;
        });
    }, [filters, users, bookings, hasActiveFilters]);

    /**
     * Handles input changes for text and select inputs
     */
    const onInputChange = useCallback((event) => {
        const { name, value } = event.target;
        setFilters((prevValue) => {
            const newValue = { ...prevValue, [name]: value };
            saveDataInSessionStorage("allBookingsFilters", newValue);
            return newValue;
        });
    }, []);

    const onInputRemove = useCallback(() => {
        setFilters((prevValue) => {
            const newValue = { ...prevValue, ownerName: "" };
            saveDataInSessionStorage("allBookingsFilters", newValue);
            return newValue;
        });
    }, []);

    /**
     * Handles guest number filter from dropdown
     * @param {number} number - Selected number of guests
     */
    const handleGuestNumberFilter = useCallback((number) => {
        if (!number)
            return setFilters((prev) => {
                const newValue = { ...prev, guestsNumber: "" };
                saveDataInSessionStorage("allBookingsFilters", newValue);
                return newValue;
            });
        return setFilters((prev) => {
            const newValue = { ...prev, guestsNumber: number };
            saveDataInSessionStorage("allBookingsFilters", newValue);
            return newValue;
        });
    }, []);

    const handleStatusFilter = useCallback((status) => {
        if (!status)
            return setFilters((prev) => {
                const newValue = { ...prev, bookingStatus: "" };
                saveDataInSessionStorage("allBookingsFilters", newValue);
                return newValue;
            });
        return setFilters((prev) => {
            const newValue = { ...prev, bookingStatus: status };
            saveDataInSessionStorage("allBookingsFilters", newValue);
            return newValue;
        });
    });

    const onToggleHighchair = () =>
        setFilters((prevValue) => {
            const newValue = { ...prevValue, highChair: !prevValue.highChair };
            saveDataInSessionStorage("allBookingsFilters", newValue);
            return newValue;
        });

    /**
     * Resets all filters to initial state
     */
    const handleResetFilters = useCallback(() => {
        setFilters(INITIAL_FILTER_STATES);
        removeFromSessionStorage("allBookingsFilters");
    }, []);

    const getVariantCardByStatus = useCallback((status) => {
        if (!status) return null;
        if (status === "completed") return "success";
        if (status === "pending") return "warning";
        if (status === "cancelled") return "error";
        return "default";
    }, []);

    const handleOpenBookingDetails = (id) => navigate(`/dashboard/bookings/${id}`);

    const baseSectionClasses = "flex-1 flex flex-col";
    const basefiltersContainerClasses = "flex flex-col items-start";

    const variantsPadding = {
        default: "py-sm",
        none: " ",
        xs: "py-xs",
        sm: "py-sm",
        md: "py-md",
        lg: "py-lg",
        xl: "py-xl",
    };

    const variantsSectionGap = {
        default: "gap-sm",
        none: " ",
        xs: "gap-xs",
        sm: "gap-sm",
        md: "gap-md",
        lg: "gap-lg",
        xl: "gap-xl",
    };

    const variantsFiltersGap = {
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
            sectionGap: classNames({
                "gap-xs": isMobile2Xs || isMobileXs,
                "gap-sm": isMobileSm || isTablet,
                "gap-md": isDesktop,
            }),
            filtersGap: classNames({
                "gap-xs": isMobile2Xs || isMobileXs || isMobileSm || isTablet,
                "gap-sm": isDesktop,
            }),
        }),
        [isMobile2Xs, isMobileXs, isMobileSm, isTablet, isDesktop]
    );

    const currentSectionClasses = classNames(
        baseSectionClasses,
        variantsPadding[padding] || autoConfig?.padding || variantsPadding.default,
        variantsSectionGap[sectionGap] || autoConfig?.sectionGap || variantsSectionGap.default
    );

    const currentFiltersContainerClasses = classNames(
        basefiltersContainerClasses,
        variantsFiltersGap[filtersGap] || autoConfig?.filtersGap || variantsFiltersGap.default,
        {
            "flex-row ": isDesktop,
        }
    );

    const guestsOptions = [1, 2, 3, 4, 5, 6, 7, 8];
    const statusOptions = [
        {
            value: "completed",
            label: t("admin_bookings_all.admin_bookings_all_completed_status_label"),
        },
        { value: "pending", label: t("admin_bookings_all.admin_bookings_all_pending_status_label") },
        {
            value: "cancelled",
            label: t("admin_bookings_all.admin_bookings_all_cancelled_status_label"),
        },
    ];

    return (
        <section className={currentSectionClasses}>
            <ErrorBoundary
                fallback={
                    <AdminContainer className="flex-1">
                        <PageError title={t("error_sentences.on_error_all_booking_title")} />
                    </AdminContainer>
                }
            >
                <h5>
                    {t("admin_bookings_all.h5_admin_bookings_all")} (
                    <span>{`${filteredBookings?.length} / ${bookings?.length}`}</span>)
                </h5>

                <div className={currentFiltersContainerClasses}>
                    <div className={`flex flex-1`}>
                        <AdminInputSearch
                            containerClassName="flex-col self-start flex-1 lg:flex-row lg:items-center"
                            className="lg:flex-1"
                            inputClassName="flex-1"
                            name={"ownerName"}
                            id={"ownerName"}
                            value={filters?.ownerName}
                            placeholder={t("admin_bookings_all.admin_bookings_all_input_placeholder")}
                            onChange={onInputChange}
                            onRemove={onInputRemove}
                            variant="outline"
                        />
                    </div>

                    <div className={currentFiltersContainerClasses}>
                        <AdminDropdown variant={"accent"} placement="right-center">
                            <AdminDropdownTrigger variant={filters?.guestsNumber ? "active" : "inactive"}>
                                {filters.guestsNumber
                                    ? `${filters.guestsNumber} ${t(
                                          "admin_bookings_all.admin_bookings_all_guest_number_selected"
                                      )}`
                                    : t("admin_bookings_all.admin_bookings_all_guest_number_unselected")}
                            </AdminDropdownTrigger>
                            <AdminDropdownMenu>
                                <AdminDropdownItem
                                    onClick={() => handleGuestNumberFilter()}
                                    disabled={!filters?.guestsNumber}
                                >
                                    {t("admin_bookings_all.admin_bookings_all_not_specified_text")}
                                </AdminDropdownItem>

                                {guestsOptions.map((option) => (
                                    <AdminDropdownItem
                                        key={option}
                                        onClick={() => handleGuestNumberFilter(option)}
                                        disabled={filters?.guestsNumber === option}
                                    >
                                        {option}
                                    </AdminDropdownItem>
                                ))}
                            </AdminDropdownMenu>
                        </AdminDropdown>

                        <AdminDropdown variant={"accent"} placement="right-center">
                            <AdminDropdownTrigger variant={filters?.bookingStatus ? "active" : "inactive"}>
                                {filters?.bookingStatus
                                    ? filters?.bookingStatus
                                    : t("admin_bookings_all.admin_bookings_all_status_trigger_text")}
                            </AdminDropdownTrigger>
                            <AdminDropdownMenu>
                                <AdminDropdownItem
                                    onClick={() => handleStatusFilter()}
                                    disabled={!filters?.bookingStatus}
                                >
                                    {t("admin_bookings_all.admin_bookings_all_not_status_specified_text")}
                                </AdminDropdownItem>
                                {statusOptions.map((option) => (
                                    <AdminDropdownItem
                                        key={option.value}
                                        onClick={() => handleStatusFilter(option.value)}
                                        disabled={filters?.bookingStatus === option.value}
                                    >
                                        {option.label}
                                    </AdminDropdownItem>
                                ))}
                            </AdminDropdownMenu>
                        </AdminDropdown>
                        <AdminCheckbox
                            variant={filters?.highChair ? "active" : "inactive"}
                            isChecked={filters?.highChair}
                            onClick={onToggleHighchair}
                            label={t("admin_bookings_all.admin_bookings_all_highchair_label_text")}
                            padding={"none"}
                        />
                        {hasActiveFilters && (
                            <AdminButton onClick={handleResetFilters} variant={"danger"}>
                                {t("menu_page.clear_filter_button")}
                            </AdminButton>
                        )}
                    </div>
                </div>

                {!filteredBookings?.length > 0 && (
                    <span className="italic opacity-80">
                        {t("admin_bookings_all.admin_bookings_all_no_booking_match_text")}
                    </span>
                )}
                {filteredBookings?.length > 0 && (
                    <AdminBookingsContainer>
                        {filteredBookings
                            .sort(
                                (bookingA, bookingB) =>
                                    new Date(bookingB?.scheduledFor) - new Date(bookingA?.scheduledFor)
                            )
                            .map((booking) => {
                                const variant = getVariantCardByStatus(booking?.status);
                                return (
                                    <AdminBookingCard
                                        key={booking?.id || booking?._id}
                                        bookingData={booking}
                                        variant={variant}
                                        onClick={() => handleOpenBookingDetails(booking?.id || booking?._id)}
                                    />
                                );
                            })}
                    </AdminBookingsContainer>
                )}
            </ErrorBoundary>
        </section>
    );
}

export default memo(AdminBookingsListSection);
