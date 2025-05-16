import {VideojuegoInterface} from "../entitites/Videojuego";

export interface VideojuegoRepository {
    getVideojuegos(): Promise<VideojuegoInterface[]>;
}