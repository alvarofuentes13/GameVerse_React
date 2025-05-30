import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, TextInput, FlatList, Image } from 'react-native';
import Modal from 'react-native-modal';
import {AppColors, AppFonts} from "../../theme/AppTheme";
import styles from "../../theme/Styles";
import axios from "axios";
import {VideojuegoInterface} from "../../../domain/entitites/Videojuego";
import {ApiDelivery} from "../../../data/sources/remote/api/ApiDelivery";


interface ModalProps {
    listaId: number;
    visible: boolean;
    onClose: () => void;
}

export default function AddGameDrawer({ listaId, visible, onClose }: ModalProps) {
    const [search, setSearch] = useState("");
    const [gamesFound, setGamesFound] = useState([]);
    const [games, setGames] = useState<VideojuegoInterface[]>([]);


    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            if (search.trim().length > 0) {
                searchGames(search);
            } else {
                setGamesFound([]); // Vaciar resultados si no hay texto
            }
        }, 500); // Espera 500ms antes de hacer fetch

        return () => clearTimeout(delayDebounce); // Cleanup timeout
    }, [search]);

    const searchGames = async (query: string) => {
        try {
            const response = await ApiDelivery.get(`/igdb/videojuegos/search/${query}`);
            setGamesFound(response.data);
        } catch (error) {
            console.error("Error al buscar juegos:", error);
        }
    };

    const addGames = async () => {
        try {
            if (games.length === 0) return;

            const ids = games.map(game => game.id);

            await ApiDelivery.post(`/listas/${listaId}/videojuegos`, ids);

            onClose(); // Cierra el modal
            setGames([]); // Limpia la selección
            setSearch(""); // Limpia búsqueda
            console.log("Juegos añadidos")
        } catch (error) {
            console.error("Error al agregar juegos:", error);
        }
    };

    const handleRemoveGame = (id: number) => {
        setGames(prevGames => prevGames.filter(game => game.id !== id));
    };

    return (
        <View style={modalStyles.container}>

            <Modal
                isVisible={visible}
                onBackdropPress={onClose}
                style={modalStyles.modal}
                swipeDirection="down"
                onSwipeComplete={onClose}
            >
                <View style={modalStyles.modalContent}>

                    <TextInput
                        style={modalStyles.input}
                        placeholder="Buscar juegos..."
                        placeholderTextColor={AppColors.grey}
                        value={search}
                        onChangeText={setSearch}
                    />

                    <FlatList
                        horizontal
                        data={gamesFound}
                        keyExtractor={(item: VideojuegoInterface) => item.id.toString()} // para que el scroll se detenga más rápido
                        renderItem={({item}) => (
                            <TouchableOpacity
                                onPress={async () => {
                                    try {
                                        // Llamar al backend para obtener o crear el juego
                                        const response = await ApiDelivery.get(`/videojuegos/get-or-create/${item.id}`);
                                        const gameFromBackend = response.data;

                                        // Añadir si no está ya en la lista
                                        if (!games.some(game => game.id === gameFromBackend.id)) {
                                            setGames([...games, gameFromBackend]);
                                        }

                                    } catch (error) {
                                        console.error("Error al obtener o crear el videojuego:", error);
                                    }
                                }}
                            >
                                <Image
                                    source={{uri: item.coverUrl}}
                                    style={{width: 100, height: 140, marginRight: 18, borderRadius: 4}}
                                />
                            </TouchableOpacity>
                        )}
                        showsHorizontalScrollIndicator={false}
                        initialNumToRender={10}
                    />

                    <FlatList
                        data={games}
                        keyExtractor={(item: VideojuegoInterface) => item.id.toString()}
                        renderItem={({item}) => (
                            <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between", alignItems:"center", paddingHorizontal: 10 }}>
                                <Text style={styles.headerText}>{item.name || item.titulo}</Text>
                                <TouchableOpacity onPress={() => handleRemoveGame(item.id)}>
                                    <Text style={modalStyles.removeButton}>x</Text>
                                </TouchableOpacity>
                            </View>

                        )}
                        showsHorizontalScrollIndicator={false}
                        initialNumToRender={10}
                    />

                    <TouchableOpacity onPress={addGames} style={modalStyles.inputButton}>
                        <Text style={styles.headerText}>Agregar</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    );
}


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
