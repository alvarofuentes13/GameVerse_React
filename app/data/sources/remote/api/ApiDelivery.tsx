import axios from "axios";
import {VideojuegoInterface} from "./VideojuegoInterface";

const API_URL = "http://localhost:8080/api/videojuegos"; // Para emulador Android

export const getGames = async (): Promise<VideojuegoInterface[]> => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error("Error obteniendo juegos:", error);
        return [];
    }
};