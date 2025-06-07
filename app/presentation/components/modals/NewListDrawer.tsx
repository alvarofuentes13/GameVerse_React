import React, { useEffect, useState } from 'react'; // Importa React y hooks
import { View, Text, TouchableOpacity, StyleSheet, TextInput, FlatList, Image } from 'react-native'; // Importa componentes de React Native
import Modal from 'react-native-modal'; // Importa el componente Modal
import { AppColors, AppFonts } from "../../theme/AppTheme"; // Importa colores y fuentes de la aplicación
import styles from "../../theme/Styles"; // Importa estilos personalizados
import { useUser } from "../../views/client/context/UserContext"; // Hook para obtener el usuario
import { VideojuegoInterface } from "../../../domain/entities/Videojuego"; // Importa la interfaz del videojuego
import { MaterialIcons } from "@expo/vector-icons"; // Importa íconos
import { ApiDelivery } from "../../../data/sources/remote/api/ApiDelivery"; // Importa la API

// Componente principal para crear una nueva lista de videojuegos
export default function NewListDrawer() {
    const [isModalVisible, setModalVisible] = useState(false); // Estado para controlar la visibilidad del modal
    const user = useUser().user; // Obtiene el usuario actual
    const [description, setDescription] = useState(""); // Estado para la descripción de la lista
    const [name, setName] = useState(""); // Estado para el nombre de la lista
    const [search, setSearch] = useState(""); // Estado para la búsqueda de juegos
    const [gamesFound, setGamesFound] = useState([]); // Estado para los juegos encontrados
    const [games, setGames] = useState<VideojuegoInterface[]>([]); // Estado para los juegos seleccionados

    // Función para enviar la lista al backend
    const handleSubmitList = async () => {
        if (!name) {
            console.warn("La lista debe tener nombre"); // Advertencia si no hay nombre
            return;
        }

        const listData = {
            descripcion: description,
            nombre: name,
            usuario: {
                id: user?.id, // ID del usuario
            },
            videojuegos: games.map(game => ({ id: game.id })) // Mapea los videojuegos seleccionados
        };

        try {
            // Enviar la lista al backend
            await ApiDelivery.post("/listas", listData);
            toggleModal(); // Cierra el modal después de enviar
        } catch (error) {
            console.error("Error al enviar la lista:", error); // Manejo de errores
        }
    };

    // Efecto para buscar juegos al cambiar el texto de búsqueda
    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            if (search.trim().length > 0) {
                searchGames(search); // Llama a la función de búsqueda
            } else {
                setGamesFound([]); // Vacía los resultados si no hay texto
            }
        }, 500); // Espera 500ms antes de hacer la búsqueda

        return () => clearTimeout(delayDebounce); // Limpia el timeout al desmontar
    }, [search]);

    // Función para buscar juegos en la API
    const searchGames = async (query: string) => {
        try {
            const response = await ApiDelivery.get(`/igdb/videojuegos/search/${query}`);
            setGamesFound(response.data); // Actualiza los juegos encontrados
        } catch (error) {
            console.error("Error al buscar juegos:", error); // Manejo de errores
        }
    };

    // Función para eliminar un juego de la lista seleccionada
    const handleRemoveGame = (id: number) => {
        setGames(prevGames => prevGames.filter(game => game.id !== id)); // Filtra los juegos
    };

    // Función para alternar la visibilidad del modal
    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    return (
        <View style={modalStyles.container}>
            <TouchableOpacity style={{ position: 'fixed', bottom: 35 }} onPress={toggleModal}>
                <MaterialIcons name="add-circle" size={60} color={AppColors.primary} />
            </TouchableOpacity>

            <Modal
                isVisible={isModalVisible}
                onBackdropPress={toggleModal} // Cierra el modal al presionar fuera
                style={modalStyles.modal}
                swipeDirection="down" // Permite deslizar hacia abajo para cerrar
                onSwipeComplete={toggleModal}
            >
                <View style={modalStyles.modalContent}>
                    <TextInput
                        style={modalStyles.input}
                        value={name}
                        onChangeText={setName} // Actualiza el nombre de la lista
                        placeholderTextColor={AppColors.grey}
                        placeholder={"Nombre"} // Placeholder para el nombre
                    />

                    <TextInput
                        style={modalStyles.input}
                        value={description}
                        onChangeText={setDescription} // Actualiza la descripción
                        placeholderTextColor={AppColors.grey}
                        placeholder={"Esta lista contiene..."} // Placeholder para la descripción
                    />

                    <TextInput
                        style={modalStyles.input}
                        placeholder="Buscar juegos..."
                        placeholderTextColor={AppColors.grey}
                        value={search}
                        onChangeText={setSearch} // Actualiza el texto de búsqueda
                    />

                    <FlatList
                        horizontal
                        data={gamesFound}
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
                                            setGames([...games, gameFromBackend]);
                                        }
                                    } catch (error) {
                                        console.error("Error al obtener o crear el videojuego:", error); // Manejo de errores
                                    }
                                }}
                            >
                                <Image
                                    source={{ uri: item.coverUrl }} // URL de la portada del juego
                                    style={{ width: 100, height: 140, marginRight: 18, borderRadius: 4 }} // Estilos de la imagen
                                />
                            </TouchableOpacity>
                        )}
                        showsHorizontalScrollIndicator={false}
                        initialNumToRender={10} // Número inicial de elementos a renderizar
                    />

                    <FlatList
                        data={games}
                        keyExtractor={(item: VideojuegoInterface) => item.id.toString()} // Clave única para cada juego
                        renderItem={({ item }) => (
                            <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 10 }}>
                                <Text style={styles.headerText}>{item.name || item.titulo}</Text>
                                <TouchableOpacity onPress={() => handleRemoveGame(item.id)}>
                                    <Text style={modalStyles.removeButton}>x</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                        showsHorizontalScrollIndicator={false}
                        initialNumToRender={10} // Número inicial de elementos a renderizar
                    />

                    <TouchableOpacity
                        onPress={handleSubmitList} // Envía la lista al presionar
                        style={modalStyles.inputButton}
                    >
                        <Text style={styles.headerText}>Crear</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    );
}

// Estilos del modal
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
        justifyContent: 'flex-end',
        margin: 0,
    },
    modalContent: {
        backgroundColor: AppColors.background,
        padding: 20,
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        borderWidth: 2,
        borderColor: "#24243C"
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
        width: '90%',
        borderBottomWidth: 1,
        borderColor: 'white',
        padding: 12,
        color: 'white',
        marginBottom: 16,
        fontSize: 16,
        fontFamily: AppFonts.medium,
    },
    inputButton: {
        width: '30%',
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
        color: AppColors.alert,
        fontSize: 16,
        paddingHorizontal: 10,
        fontFamily: AppFonts.bold,
    }
});
