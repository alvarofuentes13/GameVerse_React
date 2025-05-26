import React, {useEffect, useState} from "react";
import {View, Text, ScrollView, StyleSheet, Image, FlatList, ActivityIndicator, TouchableOpacity} from "react-native";
import {AppColors} from "../../theme/AppTheme";
import styles from "../../theme/Styles";
import ListCard from "../../components/cards/ListCard";
import {ReviewInterface} from "../../../domain/entitites/Review";
import {useNavigation} from "@react-navigation/native";
import {DrawerNavigationProp} from "@react-navigation/drawer";
import {useUser} from "../client/context/UserContext";
import {DrawerParamsList} from "./Home";
import {ListInterface} from "../../../domain/entitites/List";
import {FontAwesome} from "@expo/vector-icons";
import BottomDrawerExample from "../../components/modals/BottomDrawer";

export default function ListScreen() {
    const usuario = useUser().user;
    const navigation = useNavigation<DrawerNavigationProp<DrawerParamsList>>();

    const [listas, setListas] = useState<ListInterface[]>([]);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        const fetchLists = async () => {
            if (!usuario) return; // Si el usuario no está definido, no hacemos la petición.

            try {
                const response = await fetch(`http://localhost:8080/api/listas`);
                const data = await response.json();
                setListas(data);
            } catch (error) {
                console.error("Error al obtener listas:", error);
            } finally {
                setCargando(false);
            }
        };

        fetchLists();
    }, [usuario]);

    return (
        <ScrollView style={{backgroundColor: AppColors.background, width: "100%", height: "100%", padding: 20}}>

            <TouchableOpacity onPress={() => navigation.openDrawer()} style={{marginBottom: 20}}>
                <FontAwesome name="bars" size={28} color="white"/>
            </TouchableOpacity>

            {cargando ? (
                <ActivityIndicator size="large" color={AppColors.yellow}/>
            ) : (
                listas.map((lista) => (
                    <ListCard lista={lista}/>
                ))
            )}
            <BottomDrawerExample/>
        </ScrollView>

    );
}

