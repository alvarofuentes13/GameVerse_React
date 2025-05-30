import axios from "axios";

const ApiDelivery = axios.create({
    baseURL: "http://localhost:8080/api",
    headers: {
        "Content-Type": "application/json",
    }
})

export const setAuthToken = (token: string | null) => {
    if (token) {
        ApiDelivery.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
        delete ApiDelivery.defaults.headers.common["Authorization"];
    }
};

export { ApiDelivery };
