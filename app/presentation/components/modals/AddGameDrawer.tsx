import React, { useEffect, useState } from 'react'; // Importa React y hooks
import { View, Text, TouchableOpacity, StyleSheet, TextInput, FlatList, Image } from 'react-native'; // Importa componentes de React Native
import Modal from 'react-native-modal'; // Importa componente Modal
import { AppColors, AppFonts } from "../../theme/AppTheme"; // Importa colores y fuentes de la aplicación
import styles from "../../theme/Styles"; // Importa estilos personalizados
import axios from "axios"; // Importa axios para hacer solicitudes HTTP
import { VideojuegoInterface } from "../../../domain/entities/Videojuego"; // Importa la interfaz del videojuego
import { ApiDelivery } from "../../../data/sources/remote/api/ApiDelivery"; // Importa la API de entrega

// Define las propiedades del modal
interface ModalProps {
    listaId: number; // ID de la lista
    visible: boolean; // Estado de visibilidad del modal
    onClose: () => void; // Función para cerrar el modal
}

// Componente funcional que representa un modal para agregar juegos
export default function AddGameDrawer({ listaId, visible, onClose }: ModalProps) {
    const [search, setSearch] = useState(""); // Estado para la búsqueda
    const [gamesFound, setGamesFound] = useState([]); // Estado para juegos encontrados
    const [games, setGames] = useState<VideojuegoInterface[]>([]); // Estado para juegos seleccionados

    // Efecto para buscar juegos cuando cambia la búsqueda
    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            if (search.trim().length > 0) {
                searchGames(search); // Llama a la función de búsqueda
            } else {
                setGamesFound([]); // Vacía resultados si no hay texto
            }
        }, 500); // Espera 500ms antes de hacer la búsqueda

        return () => clearTimeout(delayDebounce); // Limpia el timeout
    }, [search]);

    // Función para buscar juegos en la API
    const searchGames = async (query: string) => {
        try {
            const response = await ApiDelivery.get(`/igdb/videojuegos/search/${query}`); // Llama a la API
            setGamesFound(response.data); // Establece los juegos encontrados
        } catch (error) {
            console.error("Error al buscar juegos:", error); // Manejo de errores
        }
    };

    // Función para agregar juegos a la lista
    const addGames = async () => {
        try {
            if (games.length === 0) return; // No hace nada si no hay juegos

            const ids = games.map(game => game.id); // Obtiene los IDs de los juegos

            await ApiDelivery.post(`/listas/${listaId}/videojuegos`, ids); // Envía los IDs a la API

            onClose(); // Cierra el modal
            setGames([]); // Limpia la selección
            setSearch(""); // Limpia la búsqueda
            console.log("Juegos añadidos"); // Mensaje de éxito
        } catch (error) {
            console.error("Error al agregar juegos:", error); // Manejo de errores
        }
    };

    // Función para eliminar un juego de la selección
    const handleRemoveGame = (id: number) => {
        setGames(prevGames => prevGames.filter(game => game.id !== id)); // Filtra el juego a eliminar
    };

    return (
        <View style={modalStyles.container}>
            <Modal
                isVisible={visible} // Controla la visibilidad del modal
                onBackdropPress={onClose} // Cierra el modal al presionar fuera
                style={modalStyles.modal}
                swipeDirection="down" // Permite deslizar hacia abajo para cerrar
                onSwipeComplete={onClose} // Cierra el modal al deslizar
            >
                <View style={modalStyles.modalContent}>
                    <TextInput
                        style={modalStyles.input} // Estilo del campo de búsqueda
                        placeholder="Buscar juegos..." // Texto del placeholder
                        placeholderTextColor={AppColors.grey} // Color del texto del placeholder
                        value={search} // Valor del campo de búsqueda
                        onChangeText={setSearch} // Actualiza el estado de búsqueda
                    />

                    <FlatList
                        horizontal // Lista horizontal
                        data={gamesFound} // Datos a mostrar
                        keyExtractor={(item: VideojuegoInterface) => item.id.toString()} // Clave única para cada juego
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                onPress={async () => {
                                    try {
                                        // Llama al backend para obtener o crear el juego
                                        const response = await ApiDelivery.get(`/videojuegos/get-or-create/${item.id}`);
                                        const gameFromBackend = response.data;

                                        // Añade el juego si no está ya en la lista
                                        if (!games.some(game => game.id === gameFromBackend.id)) {
                                            setGames([...games, gameFromBackend]); // Agrega el juego a la selección
                                        }
                                    } catch (error) {
                                        console.error("Error al obtener o crear el videojuego:", error); // Manejo de errores
                                    }
                                }}
                            >
                                <Image
                                    source={{ uri: item.coverUrl }} // Fuente de la imagen de la portada
                                    style={{ width: 100, height: 140, marginRight: 18, borderRadius: 4 }} // Estilo de la imagen
                                />
                            </TouchableOpacity>
                        )}
                        showsHorizontalScrollIndicator={false} // Oculta el indicador de desplazamiento horizontal
                        initialNumToRender={10} // Número inicial de elementos a renderizar
                    />

                    <FlatList
                        data={games} // Datos de juegos seleccionados
                        keyExtractor={(item: VideojuegoInterface) => item.id.toString()} // Clave única para cada juego
                        renderItem={({ item }) => (
                            <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 10 }}>
                                <Text style={styles.headerText}>{item.name || item.titulo}</Text> // Muestra el nombre del juego
                                <TouchableOpacity onPress={() => handleRemoveGame(item.id)}> // Botón para eliminar el juego
                                    <Text style={modalStyles.removeButton}>x</Text> // Texto para eliminar
                                </TouchableOpacity>
                            </View>
                        )}
                        showsHorizontalScrollIndicator={false} // Oculta el indicador de desplazamiento horizontal
                        initialNumToRender={10} // Número inicial de elementos a renderizar
                    />

                    <TouchableOpacity onPress={addGames} style={modalStyles.inputButton}> // Botón para agregar juegos
                        <Text style={styles.headerText}>Agregar</Text> // Texto del botón
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    );
}

// Estilos personalizados para el modal
const modalStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: "100%",
    },
    button: {
        backgroundColor: AppColors.primary,
        paddingVertical: 9,
        borderRadius: 25,
        textAlign: "center",
        fontFamily: AppFonts.medium,
        margin: 20,
        marginBottom: 7,
        width: '50%',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
    modal: {
        justifyContent: 'flex-end', // Justifica el contenido del modal hacia el final
        margin: 0,
    },
    modalContent: {
        backgroundColor: AppColors.background, // Color de fondo del modal
        padding: 20,
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        borderWidth: 2,
        borderColor: "#24243C" // Color del borde del modal
    },
    modalText: {
        fontSize: 18,
        marginBottom: 10,
    },
    closeText: {
        color: AppColors.primary,
        fontWeight: 'bold',
    },
    input: {
        width: '90%', // Ancho del campo de búsqueda
        borderBottomWidth: 1,
        borderColor: 'white', // Color del borde inferior
        padding: 12,
        color: 'white', // Color del texto
        marginBottom: 16,
        fontSize: 16,
        fontFamily: AppFonts.medium,
    },
    inputButton: {
        width: '30%', // Ancho del botón de agregar
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 25,
        paddingVertical: 12,
        alignItems: 'center',
        backgroundColor: 'transparent',
        fontFamily: AppFonts.medium,
        marginVertical: 10
    },
    removeButton: {
        color: AppColors.alert, // Color del botón de eliminar
        fontSize: 16,
        paddingHorizontal: 10,
        fontFamily: AppFonts.bold,
    }
});
