import { VideojuegoRepositoryImpl } from "../../data/repositories/VideojuegoRepository"; // Importa la implementación del repositorio de videojuegos
import { VideojuegoInterface } from "../entities/Videojuego"; // Importa la interfaz que define la estructura de un videojuego

// Desestructura el método getVideojuegos de una nueva instancia de VideojuegoRepositoryImpl
const { getVideojuegos } = new VideojuegoRepositoryImpl();

// Define el caso de uso para obtener videojuegos
export const GetVideojuegoUseCase = async (): Promise<VideojuegoInterface[]> => {
    // Llama al método getVideojuegos y devuelve su resultado
    return await getVideojuegos();
}
