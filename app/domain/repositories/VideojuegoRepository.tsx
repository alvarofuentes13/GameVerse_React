import {VideojuegoInterface} from "../entities/Videojuego";

export interface VideojuegoRepository {
    getVideojuegos(): Promise<VideojuegoInterface[]>;
}