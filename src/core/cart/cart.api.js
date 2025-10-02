import { api } from "../http/axios";

export const getCartMeApi = async () => {
    try {
        const response = await api.get("/carts/me");
        return response.data;
    } catch (err) {
        throw err.status;
    }
};

export const getCartByIdApi = async (id) => {
    try {
        const response = await api.get(`/carts/${id}`);
        return response.data;
    } catch (err) {
        console.error("Error al Obtener carrito por ID", err);
        throw err;
    }
};

export const getCartSummaryApi = async () => {
    try {
        const response = await api.get("/carts/me/summary");
        return response.data;
    } catch (err) {
        console.error("Error Obteniendo Resumen del pedido", err);
        throw err;
    }
};

export const postCartApi = async (userId) => {
    try {
        const created = await api.post("/carts", { userId: userId });
        return created.data;
    } catch (err) {
        console.error("Error al Guardar Carrito");
        throw err;
    }
};

export const postCartItemApi = async (cartId, newProduct) => {
    try {
        const updated = await api.post(`/carts/${cartId}/items`, newProduct);
        return updated.data;
    } catch (err) {
        console.error("Error al Añadir Producto", err);
        throw err;
    }
};

export const postCartCheckoutApi = async (cartId) => {
    try {
        const response = await api.post(`/carts/${cartId}/checkout`);
        return response.data;
    } catch (err) {
        throw err;
    }
};

export const patchCartItemApi = async (cartId, productId, newProductData) => {
    try {
        const updated = await api.patch(`/carts/${cartId}/items/${productId}`, newProductData);
        return updated.data;
    } catch (err) {
        console.error("Error al Modificar Producto", err);
        throw err;
    }
};

export const deleteCartItemApi = async (cartId, productId) => {
    try {
        const updated = await api.delete(`/carts/${cartId}/items/${productId}`);
        return updated.data;
    } catch (err) {
        console.error("Error al borrar producto del carrito", err);
        throw err;
    }
};
