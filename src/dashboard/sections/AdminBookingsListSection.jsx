import { useCallback, useMemo, useState } from "react";
import { AdminCheckbox } from "../components/AdminCheckbox";
import { AdminDropdown } from "../components/AdminDropdown/AdminDropdown";
import { AdminDropdownItem } from "../components/AdminDropdown/AdminDropdownItem";
import { AdminDropdownMenu } from "../components/AdminDropdown/AdminDropdownMenu";
import { AdminDropdownTrigger } from "../components/AdminDropdown/AdminDropdownTrigger";
import { useAdminData } from "../hooks/useAdminData";

const INITIAL_FILTER_STATES = {
    ownerName: "",
    guestsNumber: "",
    bookingStatus: "",
    highChair: false,
};

export const AdminBookingsListSection = ({ padding, gap }) => {
    const [filters, setFilters] = useState(INITIAL_FILTER_STATES);

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
        setFilters((prevValue) => ({ ...prevValue, [name]: value }));
    }, []);

    /**
     * Handles guest number filter from dropdown
     * @param {number} number - Selected number of guests
     */
    const handleGuestNumberFilter = useCallback((number) => {
        if (!number) return setFilters((prev) => ({ ...prev, guestsNumber: "" }));
        return setFilters((prev) => ({ ...prev, guestsNumber: number }));
    }, []);

    const handleStatusFilter = useCallback((status) => {
        if (!status) return setFilters((prev) => ({ ...prev, bookingStatus: "" }));
        return setFilters((prev) => ({ ...prev, bookingStatus: status }));
    });

    const onToggleHighchair = () =>
        setFilters((prevValue) => ({ ...prevValue, highChair: !prevValue.highChair }));

    /**
     * Resets all filters to initial state
     */
    const handleResetFilters = useCallback(() => {
        setFilters(INITIAL_FILTER_STATES);
    }, []);

    const guestsOptions = [1, 2, 3, 4, 5, 6, 7, 8];
    const statusOptions = [
        { value: "completed", label: "Completadas" },
        { value: "pending", label: "Pendientes" },
        { value: "cancelled", label: "Canceladas" },
    ];

    return (
        <section>
            <h5>Todas las reservas</h5>

            <div className="flex flex-col gap-3">
                {/* Name Filter */}
                <div className="flex flex-col gap-1">
                    <label htmlFor="ownerName">Nombre del usuario</label>
                    <input
                        type="text"
                        name="ownerName"
                        id="ownerName"
                        value={filters?.ownerName}
                        onChange={onInputChange}
                        placeholder="Introduce un nombre"
                    />
                </div>

                {/* Guests Dropdown */}
                <div>
                    <AdminDropdown variant={"accent"} placement="right-center">
                        <AdminDropdownTrigger>
                            {filters.guestsNumber ? `${filters.guestsNumber} Comensal/es` : "Comensales"}
                        </AdminDropdownTrigger>
                        <AdminDropdownMenu>
                            <AdminDropdownItem
                                onClick={() => handleGuestNumberFilter()}
                                disabled={!filters?.guestsNumber}
                            >
                                Sin especificar
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
                        <AdminDropdownTrigger>
                            {filters?.bookingStatus ? filters?.bookingStatus : "Estado"}
                        </AdminDropdownTrigger>
                        <AdminDropdownMenu>
                            <AdminDropdownItem
                                onClick={() => handleStatusFilter()}
                                disabled={!filters?.bookingStatus}
                            >
                                Sin Especificar
                            </AdminDropdownItem>
                            {statusOptions.map((option) => (
                                <AdminDropdownItem
                                    key={option.value}
                                    onClick={() => handleStatusFilter(option.value)}
                                >
                                    {option.label}
                                </AdminDropdownItem>
                            ))}
                        </AdminDropdownMenu>
                    </AdminDropdown>
                </div>

                <div>
                    <AdminCheckbox isChecked={filters?.highChair} onClick={onToggleHighchair} />
                </div>

                {/* Reset Filters Button */}
                {hasActiveFilters && (
                    <button
                        onClick={handleResetFilters}
                        className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded"
                    >
                        Limpiar filtros
                    </button>
                )}
            </div>

            {/* Results Info */}
            <div className="mt-4">
                {hasActiveFilters && filteredBookings.length === 0 && (
                    <h5>No se encontraron reservas que coincidan con los filtros</h5>
                )}
                {hasActiveFilters && filteredBookings.length > 0 && (
                    <p>Se encontraron {filteredBookings.length} reserva(s)</p>
                )}
                {!hasActiveFilters && <p>Mostrando todas las reservas ({bookings?.length || 0})</p>}
            </div>
        </section>
    );
};
