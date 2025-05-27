import React, {useState} from "react";
import {View, Text, Image, TouchableOpacity, ScrollView, FlatList, StyleSheet} from "react-native";
import {FontAwesome} from "@expo/vector-icons";
import {NavigationProp, RouteProp, useNavigation, useRoute} from "@react-navigation/native";
import {AppColors, AppFonts} from "../../theme/AppTheme";
import {RootStackParamsList} from "../../../../App";
import styles from "../../theme/Styles";
import DeleteModal from "../../components/modals/DeleteModal";
import AddGameDrawer from "../../components/modals/AddGameDrawer";


type ListDescriptionRouteProp = RouteProp<RootStackParamsList, "ListDescriptionScreen">;

export default function ListDescriptionScreen() {
    const navigation = useNavigation<NavigationProp<RootStackParamsList>>();
    const route = useRoute<ListDescriptionRouteProp>();
    const {lista} = route.params;
    const [isModalVisible, setModalVisible] = useState(false);
    const [isDrawerVisible, setDrawerVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const toggleDrawer = () => {
        setDrawerVisible(!isDrawerVisible);
    };

    const eliminarLista = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/listas/${lista.id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
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


    return (

        <ScrollView style={{flex: 1, backgroundColor: "#0D0D25", padding: 20}}>

            <TouchableOpacity onPress={() => navigation.goBack()} style={{marginBottom: 10}}>
                <FontAwesome name="arrow-left" size={24} color="#FFF"/>
            </TouchableOpacity>

            <View style={{alignItems: "center", marginBottom: 20}}>
                <Text style={styles.superText}>
                    {lista.nombre || "nombre"}
                </Text>
                <Text style={styles.normalText}>
                    {lista.descripcion || "Sin Descripción"}
                </Text>
            </View>

            <View style={{flexDirection: "row", justifyContent: "center"}}>
                <TouchableOpacity onPress={() => toggleDrawer()} style={listDescriptionStyles.button}>
                    <Text style={{color: AppColors.primary, alignSelf: "center", fontFamily: AppFonts.bold}}>Agregar Juego</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => toggleModal()} style={listDescriptionStyles.buttonInversed}>
                    <Text style={{color: AppColors.secondary, alignSelf: "center", fontFamily: AppFonts.bold}}>Borrar Lista</Text>
                </TouchableOpacity>
            </View>

            <View style={{alignItems: "center"}}>
                <FlatList
                    numColumns={3}
                    data={lista.videojuegos}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({item}) => (
                        <Image
                            source={{uri: item.portada}}
                            style={{
                                width: 114,
                                height: 160,
                                margin: 10,
                                borderRadius: 4
                            }}
                        />
                    )}
                />
            </View>

            <DeleteModal visible={isModalVisible} onClose={toggleModal} onDelete={eliminarLista} />
            <AddGameDrawer listaId={lista.id} visible={isDrawerVisible} onClose={toggleDrawer} />
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
