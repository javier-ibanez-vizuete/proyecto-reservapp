import { api } from "../http/axios";

export const loginApi = async (user) => {
    try {
        const response = await api.post("/auth/login", user);

        return response.data;
    } catch (error) {
        console.error("Error al iniciar sesión:", error);
        throw error;
    }
};

export const registerApi = async (user) => {
    try {
        const response = await api.post("/auth/register", user);

        return response.data;
    } catch (error) {
        console.error("Error al registrar usuario:", error);
        throw error;
    }
};

export const logoutApi = async () => {
    try {
        const response = await api.post("/auth/logout");

        return response.data;
    } catch (error) {
        console.error("Error al cerrar sesión:", error);
        throw error;
    }
};

export const getProfileApi = async () => {
    try {
        const response = await api.get("/auth/me");
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const patchUserBookingApi = async (newBooking) => {
    try {
        const userId = newBooking?.userId;
        if (!userId) return;

        const userResponse = await api.get("/auth/me");
        const userBookings = userResponse.data.bookings || [];

        const updatedBookings = [newBooking, ...userBookings];
        const updatedUser = await api.patch(`/users/${userId}`, { bookings: updatedBookings });
        return updatedUser.data;
    } catch (err) {
        console.error("Error Adding Booking to User");
        throw err;
    }
};

export const patchUserApi = async (userId, newUserData) => {
    try {
        const response = await api.patch(`/users/${userId}`, newUserData);
        return response.data;
    } catch (err) {
        throw err;
    }
};
