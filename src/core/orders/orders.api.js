import { api } from "../http/axios";

export const getOrdersApi = async () => {
    try {
        const response = await api.get("/orders");
        return response.data;
    } catch (err) {
        throw err;
    }
};

export const getOrdersByUserIdApi = async (userId) => {
    try {
        const response = await api.get(`/orders?userId=${userId}`);
        return response.data;
    } catch (err) {
        throw err;
    }
};

export const getOrdersByIdApi = async (orderId) => {
    try {
        const response = await api.get(`/orders/${orderId}`);
        return response.data;
    } catch (err) {
        throw err;
    }
};

export const postOrderApi = async (orderData) => {
    try {
        const response = await api.post("/orders", orderData);
        return response.data;
    } catch (err) {
        throw err;
    }
};

export const patchOrderDeliveredApi = async (orderId) => {
    try {
        const response = await api.patch(`/orders/${orderId}/status`, { status: "delivered" });
        return response.data;
    } catch (err) {
        throw err;
    }
};

export const patchOrderCancelledApi = async (orderId) => {
    try {
        const response = await api.patch(`/orders/${orderId}/status`, {
            status: "cancelled",
        });
        return response.data;
    } catch (err) {
        throw err;
    }
};
