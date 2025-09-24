import { api } from "../http/axios";

export const getProductsApi = async () => {
    try {
        const response = await api.get("/products");
        return response.data;
    } catch (err) {
        console.error("Error al Obtener Productos", err);
        throw err;
    }
};

export const getCategoriesApi = async () => {
    try {
        const response = await api.get("products/categories");
        return response.data;
    } catch (err) {
        console.error("Error al Obtener Categorias", err);
        throw err;
    }
};
