import React, { useCallback, useEffect, useState } from "react"; // Importa React y hooks
import { ActivityIndicator, FlatList, Image, TouchableOpacity, View, Text } from "react-native"; // Importa componentes de React Native
import { useNavigation } from "@react-navigation/native"; // Importa hook para la navegación
import { NativeStackNavigationProp } from "@react-navigation/native-stack"; // Importa tipos de navegación
import { VideojuegoInterface } from "../../../../../domain/entities/Videojuego"; // Importa la interfaz para Videojuego
import axios from "axios"; // Importa axios para realizar peticiones HTTP

// Componente principal que muestra una lista de videojuegos
export const VideojuegoCategoryListHome = () => {
    const navigation = useNavigation<NativeStackNavigationProp<any>>(); // Inicializa la navegación
    const [videojuegos, setVideojuegos] = useState<VideojuegoInterface[]>([]); // Estado para almacenar los videojuegos
    const [loading, setLoading] = useState(true); // Estado para indicar si se está cargando

    // Efecto para obtener los videojuegos al montar el componente
    useEffect(() => {
        const fetchGames = async () => {
            try {
                // Realiza una petición POST a la API para obtener videojuegos
                const response = await axios.post("http://localhost:8080/api/igdb/limited",
                    10,
                    {
                        headers: {
                            "Content-Type": "application/json",
                        }
                    });

                const games = await response.data; // Extrae los datos de la respuesta

                setVideojuegos(games); // Actualiza el estado con los videojuegos obtenidos
            } catch (error) {
                console.error("Error fetching games from backend:", error); // Manejo de errores
            } finally {
                setLoading(false); // Indica que la carga ha terminado
            }
        };

        fetchGames(); // Llama a la función para obtener los videojuegos
    }, []);

    // Función para renderizar cada item de la lista
    const renderItem = useCallback(
        ({ item }: { item: VideojuegoInterface }) => (
            <TouchableOpacity
                style={{ margin: 3 }} // Estilo del botón
                onPress={() => navigation.navigate("DescriptionScreen", { item })} // Navega a la pantalla de descripción
            >
                <Image
                    source={{ uri: item.portada || item.coverUrl }} // Carga la imagen del videojuego
                    style={{ width: 100, height: 140, marginRight: 8, borderRadius: 4 }} // Estilo de la imagen
                    onError={() => console.log("Error loading image")} // Manejo de errores de carga de imagen
                />
                <Text style={{ textAlign: 'center', color: "#FFF" }}>{item.titulo}</Text>
            </TouchableOpacity>
        ),
        [navigation] // Dependencias de useCallback
    );

    // Si está cargando, muestra un indicador de carga
    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    // Renderiza la lista de videojuegos
    return (
        <FlatList
            data={videojuegos} // Datos de videojuegos
            renderItem={renderItem} // Función para renderizar cada item
            keyExtractor={(item) => item.id.toString()} // Llave única para cada videojuego
            initialNumToRender={10} // Número inicial de items a renderizar
            horizontal={true} // Muestra la lista de forma horizontal
            removeClippedSubviews={true} // Mejora el rendimiento al eliminar vistas fuera de la pantalla
            showsHorizontalScrollIndicator={false} // Oculta el indicador de desplazamiento horizontal
        />
    );
};
