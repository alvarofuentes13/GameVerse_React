import { VideojuegoRepository } from "../../domain/repositories/VideojuegoRepository"; // Importa la interfaz del repositorio de videojuegos
import { ApiDelivery } from "../sources/remote/api/ApiDelivery"; // Importa la clase que maneja las solicitudes API
import { AxiosError } from "axios"; // Importa la clase de error de Axios para manejar errores en las solicitudes HTTP
import { VideojuegoInterface } from "../../domain/entities/Videojuego"; // Importa la interfaz que define la estructura de un videojuego

// Implementación de la interfaz VideojuegoRepository
export class VideojuegoRepositoryImpl implements VideojuegoRepository {
    // Método asíncrono para obtener la lista de videojuegos
    async getVideojuegos(): Promise<VideojuegoInterface[]> {
        try {
            // Realiza una solicitud POST a la API para obtener los videojuegos
            const response = await ApiDelivery.post<VideojuegoInterface[]>(
                "http://localhost:8080/api/igdb/limited", // URL de la API
                JSON.stringify(7), // Envía un número (en este caso, 7) como cuerpo de la solicitud
                {
                    headers: {
                        'Content-Type': 'application/json', // Establece el tipo de contenido de la solicitud
                    }
                }
            );
            // Devuelve los datos de la respuesta de la API
            return Promise.resolve(response.data);
        } catch (error) {
            // Captura cualquier error que ocurra durante la solicitud
            let e = (error as AxiosError); // Convierte el error a un tipo AxiosError
            console.log("Error:", JSON.stringify(e.request?.data)); // Imprime los datos de la solicitud que causó el error
            return Promise.resolve([]); // Devuelve un array vacío en caso de error
        }
    }
}
