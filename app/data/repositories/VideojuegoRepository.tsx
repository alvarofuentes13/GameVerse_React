import { VideojuegoRepository } from "../../domain/repositories/VideojuegoRepository";
import { ApiDelivery } from "../sources/remote/api/ApiDelivery";
import { AxiosError } from "axios";
import { VideojuegoInterface } from "../../domain/entities/Videojuego";

export class VideojuegoRepositoryImpl implements VideojuegoRepository {
    async getVideojuegos(): Promise<VideojuegoInterface[]> {
        try {
            const response = await ApiDelivery.post<VideojuegoInterface[]>("http://localhost:8080/api/igdb/limited", JSON.stringify(7), {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            return Promise.resolve(response.data);
        } catch (error) {
            let e = (error as AxiosError);
            console.log("Error:", JSON.stringify(e.request?.data));
            return Promise.resolve([]);
        }
    }
}
