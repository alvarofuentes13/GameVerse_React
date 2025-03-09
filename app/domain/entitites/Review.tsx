import {UsuarioInterface} from "./Usuario";
import {VideojuegoInterface} from "./Videojuego";


export interface ReviewInterface {
    id: number;
    fechaCompra: string;
    calificacion: number;
    comentario: string;
    usuario: UsuarioInterface;
    videojuego: VideojuegoInterface;
}