import React, {useEffect, useState} from "react";
import {View, Text, ScrollView, StyleSheet, Image, FlatList, ActivityIndicator} from "react-native";
import {AppColors} from "../../theme/AppTheme";
import styles from "../../theme/Styles";
import ListCard from "../../components/cards/ListCard";
import {ReviewInterface} from "../../../domain/entitites/Review";
import {useNavigation} from "@react-navigation/native";
import {DrawerNavigationProp} from "@react-navigation/drawer";
import {useUser} from "../client/context/UserContext";
import {DrawerParamsList} from "./Home";
import {ListInterface} from "../../../domain/entitites/List";

const listasEjemplo = [
    {
        id: 1,
        nombre: "El mundo es un infierno",
        descripcion: "Mundos pesimistas. Para cuando quieras revolcarte en la desesperación.",
        autor: "Darren Balsiger",
        juegos: [
            require("../../../../assets/img/gta_v.png"),
            require("../../../../assets/img/cyberpunk.png"),
            require("../../../../assets/img/witcher_3.png"),
            require("../../../../assets/img/red_dead.png"),
        ],
        cantidad: 18
    },
    {
        id: 2,
        nombre: "Oscars 2024",
        descripcion: "Top 150 juegos votados por los críticos. Ordenados por puntuación media.",
        autor: "GameVerse AI",
        juegos: [
            require("../../../../assets/img/gta_v.png"),
            require("../../../../assets/img/cyberpunk.png"),
            require("../../../../assets/img/witcher_3.png"),
            require("../../../../assets/img/red_dead.png"),
        ],
        cantidad: 150
    }
];


export default function ListScreen() {
    const usuario = useUser().user;

    const [listas, setListas] = useState<ListInterface[]>([]);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        const fetchReviews = async () => {
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

        fetchReviews();
    }, [usuario]);

    return (
        <ScrollView style={styles.container}>
            {cargando ? (
                <ActivityIndicator size="large" color={AppColors.yellow}/>
            ) : (
                listas.map((lista) => (
                    <ListCard lista={lista}/>
                ))
            )}

        </ScrollView>
    );
}

