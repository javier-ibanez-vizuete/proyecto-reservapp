import axios from "axios";

const baseURL = "https://react-students-api-eleven-code.vercel.app/api";

export const api = axios.create({
    baseURL,
    timeout: 10000, // ms milliseconds
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});
