import {UsuarioInterface} from "./Usuario";
import {VideojuegoInterface} from "./Videojuego";


export interface ReviewInterface {
    id: number;
    fechaCompra: string;
    calificacion: number;
    comentario: string;
    favorito: boolean;
    usuario: UsuarioInterface;
    videojuego: VideojuegoInterface;
}