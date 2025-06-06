import { useState } from "react"; // Importa el hook useState de React
import { GetVideojuegoUseCase } from "../../../../../domain/useCases/GetVideojuegoUseCase"; // Importa el caso de uso para obtener videojuegos
import { VideojuegoInterface } from "../../../../../domain/entities/Videojuego"; // Importa la interfaz para Videojuego

// Componente ViewModel para manejar la lógica de negocio relacionada con videojuegos
export const VideojuegoViewModel = () => {
    const [videojuego, setVideojuego] = useState<VideojuegoInterface[]>([]); // Estado para almacenar los videojuegos

    // Función para obtener videojuegos utilizando el caso de uso
    const getVideojuegos = async () => {
        const result = await GetVideojuegoUseCase(); // Llama al caso de uso para obtener videojuegos
        setVideojuego(result); // Actualiza el estado con los videojuegos obtenidos
    }

    // Retorna el estado y la función para obtener videojuegos
    return {
        videojuego, // Estado de videojuegos
        getVideojuegos, // Función para obtener videojuegos
    }
}

// Exporta el ViewModel
export default { VideojuegoViewModel };
