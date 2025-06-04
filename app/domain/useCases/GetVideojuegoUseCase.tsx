import {VideojuegoRepositoryImpl} from "../../data/repositories/VideojuegoRepository";
import {VideojuegoInterface} from "../entities/Videojuego";


const {getVideojuegos} = new VideojuegoRepositoryImpl();

export const GetVideojuegoUseCase = async (): Promise<VideojuegoInterface[]> => {
    return await getVideojuegos();
}