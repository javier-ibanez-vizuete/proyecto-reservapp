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
