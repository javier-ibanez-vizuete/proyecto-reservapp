import { api } from "../http/axios";

export const getUsersApi = async () => {
    try {
        const response = await api.get("/users");
        return response.data;
    } catch (err) {
        console.error("Error getting Users", err);
        throw err;
    }
};

export const getUserByIdApi = async (id) => {
    try {
        const response = await api.get(`/users/${id}`);
        return response.data;
    } catch (err) {
        console.error("There is an Error getting user by ID", err);
        throw err;
    }
};
