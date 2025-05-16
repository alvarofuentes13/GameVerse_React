import {UsuarioInterface} from "./Usuario";
import {VideojuegoInterface} from "./Videojuego";


export interface ListInterface {
    id: number;
    nombre: string;
    descripcion: string;
    usuario: UsuarioInterface;
    videojuego: VideojuegoInterface[];
}