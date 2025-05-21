import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, TextInput, FlatList, Image} from 'react-native';
import Modal from 'react-native-modal';
import {AppColors, AppFonts} from "../../theme/AppTheme";
import styles from "../../theme/Styles";
import {useUser} from "../../views/client/context/UserContext";
import axios from "axios";
import {VideojuegoInterface} from "../../../domain/entitites/Videojuego";

export default function BottomDrawerExample() {
    const [isModalVisible, setModalVisible] = useState(false);
    const user = useUser().user;
    const [description, setDescription] = useState("");
    const [name, setName] = useState("");
    const [search, setSearch] = useState("");
    const [gamesFound, setGamesFound] = useState([]);
    const [games, setGames] = useState<VideojuegoInterface[]>([]);

    const handleSubmitList = async () => {
        if (!name) {
            console.log("no hay bombre")
            return;
        }

        console.log(name);
        console.log(description);
        console.log(user);

        const listData = {
            descripcion: description,
            nombre: name,
            usuario: {
                id: user?.id,
            },
            videojuegos: games?.map(game => ({id: game.id}))
        }

        try {
            // Enviar lista al backend
            await axios.post("http://localhost:8080/api/listas", listData);
            toggleModal();

        } catch (error) {
            console.error("Error al enviar la reseña:", error);
        }
    };

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
            const response = await axios.get(`http://localhost:8080/api/igdb/videojuegos/search/${query}`);
            setGamesFound(response.data);
        } catch (error) {
            console.error("Error al buscar juegos:", error);
        }
    };

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    return (
        <View style={modalStyles.container}>
            <TouchableOpacity style={modalStyles.button} onPress={toggleModal}>
                <Text style={styles.buttonFormText}>Crear Lista</Text>
            </TouchableOpacity>

            <Modal
                isVisible={isModalVisible}
                onBackdropPress={toggleModal}
                style={modalStyles.modal}
                swipeDirection="down"
                onSwipeComplete={toggleModal}
            >
                <View style={modalStyles.modalContent}>
                    <TextInput
                        style={modalStyles.input}
                        value={name}
                        onChangeText={setName}
                        placeholderTextColor={AppColors.white}
                        placeholder={"Nombre"}
                    />

                    <TextInput
                        style={modalStyles.input}
                        value={description}
                        onChangeText={setDescription}
                        placeholderTextColor={AppColors.white}
                        placeholder={"Esta lista contiene..."}
                    />

                    <TextInput
                        style={modalStyles.input}
                        placeholder="Buscar juegos..."
                        placeholderTextColor="#777"
                        value={search}
                        onChangeText={setSearch}
                    />

                    <FlatList
                        horizontal
                        data={gamesFound}
                        keyExtractor={(item: VideojuegoInterface) => item.id.toString()}
                        renderItem={({item}) => (
                            <TouchableOpacity
                                onPress={() => {
                                    if (!games) {
                                        setGames([item]);
                                    } if (!(games?.some(game => game.id === item.id))) {
                                        setGames([...games, item]);
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
                            <Text style={styles.headerText}>{item.name || item.titulo}</Text>
                        )}
                        showsHorizontalScrollIndicator={false}
                        initialNumToRender={10}
                    />

                    <TouchableOpacity// Deshabilitar el botón si hay errores
                        onPress={handleSubmitList}
                        style={modalStyles.inputButton}
                    >
                        <Text style={styles.headerText}>Crear</Text>
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
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
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
    }
});
