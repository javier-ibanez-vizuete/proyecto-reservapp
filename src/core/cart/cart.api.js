import { api } from "../http/axios";

// export const getCartsApi = async () => {
//     try {
//         const response = await api.get("/carts");
//         return response.data;
//     } catch (err) {
//         console.error("Error al Obtener Carrito", err);
//         throw err;
//     }
// };

export const getCartMeApi = async () => {
    try {
        const response = await api.get("/carts/me");
        console.log("Que vale response", response);
        return response.data;
    } catch (err) {
        throw err.status;
    }
};

export const getCartsByIdApi = async (id) => {
    try {
        const response = await api.get(`/carts/${id}`);
        return response.data;
    } catch (err) {
        console.error("Error al Obtener carrito por ID", err);
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
