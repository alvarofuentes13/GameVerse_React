import { useState } from "react";
import { GetVideojuegoUseCase } from "../../../../../domain/useCases/GetVideojuegoUseCase";
import { VideojuegoInterface } from "../../../../../domain/entities/Videojuego";

export const VideojuegoViewModel = () => {
    const [videojuego, setVideojuego] = useState<VideojuegoInterface[]>([]);

    const getVideojuegos = async () => {
        const result = await GetVideojuegoUseCase();
        setVideojuego(result);
    }

    return {
        videojuego,
        getVideojuegos,
    }
}

export default { VideojuegoViewModel };
