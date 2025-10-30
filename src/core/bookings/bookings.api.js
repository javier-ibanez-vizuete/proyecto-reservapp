import { api } from "../http/axios";

export const getBookingsApi = async () => {
    try {
        const response = await api.get("/bookings");
        return response.data;
    } catch (err) {
        console.error("Error Getting Bookings From Api", err);
        throw err;
    }
};

export const getBookingsByIdApi = async (id) => {
    try {
        const response = await api.get(`/bookings/${id}`);
        return response.data;
    } catch (err) {
        console.error("Error Getting Booking By ID", err);
        throw err;
    }
};

export const getBookingsByDateApi = async (date) => {
    try {
        const response = await api.get(`/bookings?date=${date}`);
        return response?.data;
    } catch (err) {
        console.error("Error al Obtener Bookings", err);
        throw err;
    }
};

export const postBookingApi = async (bookingData) => {
    try {
        const created = await api.post("/bookings", bookingData);
        return created.data;
    } catch (err) {
        console.error("Error al Guardar Reserva");
        throw err;
    }
};

export const deleteBookingByIdApi = async (bookingId) => {
    try {
        const removed = await api.delete(`/bookings/${bookingId}`);
        return removed.data;
    } catch (err) {
        console.error("Error removing booking by id");
        throw err;
    }
};
