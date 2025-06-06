import { VideojuegoInterface } from "../entities/Videojuego"; // Importa la interfaz que define la estructura de un videojuego

// Define la interfaz VideojuegoRepository
export interface VideojuegoRepository {
    // Método para obtener una lista de videojuegos
    getVideojuegos(): Promise<VideojuegoInterface[]>; // Devuelve una promesa que resuelve un array de objetos VideojuegoInterface
}
