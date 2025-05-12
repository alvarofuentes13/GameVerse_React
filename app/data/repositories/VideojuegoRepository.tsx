import {VideojuegoRepository} from "../../domain/repositories/VideojuegoRepository";
import {ApiDelivery} from "../sources/remote/api/ApiDelivery";
import {AxiosError} from "axios";
import {VideojuegoInterface} from "../../domain/entitites/Videojuego";


export class VideojuegoRepositoryImpl implements VideojuegoRepository{

    async getVideojuegos(): Promise<VideojuegoInterface[]> {
        try {
            const response = await ApiDelivery.get<VideojuegoInterface[]>("/videojuegos");
            return Promise.resolve(response.data);
        }
        catch (error) {
            let e = (error as AxiosError);
            console.log("Error:", JSON.stringify(e.request?.data));
            return Promise.resolve([]);
        }
    }

}