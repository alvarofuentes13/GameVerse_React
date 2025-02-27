import axios from "axios";

const API_URL = "http://10.0.2.2:8080/api/games"; // Para emulador Android

export const getGames = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error("Error obteniendo juegos:", error);
        return [];
    }
};