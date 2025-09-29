import { api } from "../http/axios";

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
        console.log("postBookingApi");
        console.log("DatosEnviados", bookingData);
        const created = await api.post("/bookings", bookingData);
        console.log("Respuesta", created);
        return created.data;
    } catch (err) {
        console.error("Error al Guardar Reserva");
        throw err;
    }
};
