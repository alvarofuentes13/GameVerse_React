import React, {useEffect, useState} from "react";
import {View, Text, Image, TouchableOpacity, ScrollView, FlatList, StyleSheet} from "react-native";
import {FontAwesome} from "@expo/vector-icons";
import {NavigationProp, RouteProp, useFocusEffect, useNavigation, useRoute} from "@react-navigation/native";
import {AppColors, AppFonts} from "../../theme/AppTheme";
import {RootStackParamsList} from "../../../../App";
import styles from "../../theme/Styles";
import DeleteModal from "../../components/modals/DeleteModal";
import AddGameDrawer from "../../components/modals/AddGameDrawer";
import {useUser} from "../client/context/UserContext";
import {useAuth} from "../client/context/AuthContext";
import {ApiDelivery} from "../../../data/sources/remote/api/ApiDelivery";


type ListDescriptionRouteProp = RouteProp<RootStackParamsList, "ListDescriptionScreen">;

export default function ListDescriptionScreen() {
    const navigation = useNavigation<NavigationProp<RootStackParamsList>>();
    const route = useRoute<ListDescriptionRouteProp>();
    const {lista} = route.params;
    const {user: usuario, token: token, setAuth} = useAuth();
    const [isModalVisible, setModalVisible] = useState(false);
    const [isDrawerVisible, setDrawerVisible] = useState(false);
    const [siguiendo, setSiguiendo] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const toggleDrawer = () => {
        setDrawerVisible(!isDrawerVisible);
    };

    const eliminarLista = async () => {
        try {
            const response = await ApiDelivery.delete(`/listas/${lista.id}`);

            if (response) {
                console.log("Lista eliminada correctamente");
                setModalVisible(false);
                navigation.goBack(); // Vuelve a la pantalla anterior
            } else {
                console.error("Error al eliminar la lista");
            }
        } catch (error) {
            console.error("Error al conectar con el servidor:", error);
        }
    };

    useFocusEffect(
        React.useCallback(() => {
        const comprobarSiSigue = async () => {
            if (usuario?.id !== lista.usuario.id) {
                try {
                    const response = await ApiDelivery.get(`/usuarios/${usuario?.id}/sigue-a/${lista.usuario.id}`);
                    setSiguiendo(response.data); // true o false
                } catch (error) {
                    console.error("Error comprobando seguimiento:", error);
                }
            }
        };

        comprobarSiSigue();
    }, [lista.usuario.id]));


    return (

        <ScrollView style={{flex: 1, backgroundColor: "#0D0D25", padding: 20}}>

            <TouchableOpacity onPress={() => navigation.goBack()} style={{marginBottom: 10}}>
                <FontAwesome name="arrow-left" size={24} color="#FFF"/>
            </TouchableOpacity>

            <View style={{alignItems: "center"}}>
                <Text style={styles.superText}>
                    {lista.nombre || "nombre"}
                </Text>
                <Text style={styles.normalText}>
                    {lista.descripcion || "Sin Descripción"}
                </Text>
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: 10, margin: 15
                    }}>
                    <Image source={lista.usuario.avatar} style={{height: 40, width: 40, borderRadius: 50}}/>
                    <Text style={styles.titleText}>{lista.usuario.name}</Text>
                </View>

            </View>

            {usuario?.id === lista.usuario.id ? (
                <View style={{flexDirection: "row", justifyContent: "center"}}>
                    <TouchableOpacity onPress={() => toggleDrawer()} style={listDescriptionStyles.button}>
                        <Text style={{color: AppColors.primary, alignSelf: "center", fontFamily: AppFonts.bold}}>
                            Agregar Juego
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => toggleModal()} style={listDescriptionStyles.buttonInversed}>
                        <Text style={{color: AppColors.secondary, alignSelf: "center", fontFamily: AppFonts.bold}}>
                            Borrar Lista
                        </Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <View style={{ alignItems: "center", marginTop: 10 }}>
                    <TouchableOpacity
                        onPress={async () => {
                            try {
                                if (siguiendo) {
                                    // Llamada para dejar de seguir
                                    await ApiDelivery.put(`/usuarios/${usuario?.id}/dejar-de-seguir/${lista.usuario.id}`);
                                } else {
                                    // Llamada para seguir
                                    await ApiDelivery.put(`/usuarios/${usuario?.id}/seguir/${lista.usuario.id}`);
                                }

                                setSiguiendo((prev) => !prev); // Alternar estado local
                            } catch (error) {
                                console.error("Error al seguir/dejar de seguir:", error);
                            }
                        }}
                        style={listDescriptionStyles.button}
                    >
                        <Text style={{ color: AppColors.primary, fontFamily: AppFonts.bold, alignSelf: "center" }}>
                            {siguiendo ? "Dejar de seguir" : "Seguir"}
                        </Text>
                    </TouchableOpacity>
                </View>
            )}

            <View style={{alignItems: "center"}}>
                <FlatList
                    numColumns={3}
                    data={lista.videojuegos}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({item}) => (
                        <TouchableOpacity onPress={() => navigation.navigate("DescriptionScreen", {item})}>
                            <Image
                                source={{uri: item.portada}}
                                style={{
                                    width: 114,
                                    height: 160,
                                    margin: 10,
                                    borderRadius: 4
                                }}
                            />
                        </TouchableOpacity>
                    )}
                />
            </View>

            <DeleteModal visible={isModalVisible} onClose={toggleModal} onDelete={eliminarLista}/>
            <AddGameDrawer listaId={lista.id} visible={isDrawerVisible} onClose={toggleDrawer}/>
        </ScrollView>

    );
}

const listDescriptionStyles = StyleSheet.create({
    button: {
        backgroundColor: AppColors.secondary,
        borderColor: AppColors.primary,
        borderWidth: 3,
        borderRadius: 12,
        padding: 10,
        height: 40,
        width: 135,
        margin: 10,
        marginBottom: 20,
        justifyContent: "center"
    },
    buttonInversed: {
        backgroundColor: AppColors.primary,
        borderColor: AppColors.secondary,
        borderWidth: 3,
        borderRadius: 12,
        padding: 10,
        height: 40,
        width: 135,
        margin: 10,
        marginBottom: 20,
        justifyContent: "center"
    },
})
