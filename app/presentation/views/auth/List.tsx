import React from "react";
import { View, Text, ScrollView, StyleSheet, Image, FlatList } from "react-native";
import {AppColors} from "../../theme/AppTheme";
import styles from "../../theme/Styles";

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
    return (
        <ScrollView style={listStyles.container}>
            {listasEjemplo.map((lista) => (
                <View key={lista.id} style={listStyles.listaContainer}>
                    <Text style={styles.titleText}>{lista.nombre}</Text>
                    <Text style={styles.normalText}>{lista.descripcion}</Text>
                    <Text style={styles.headerText}>{lista.autor}</Text>
                    <Text style={styles.headerText}>{lista.cantidad} ítems</Text>

                    <FlatList
                        data={lista.juegos}
                        horizontal
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <Image source={item} style={listStyles.portada} />
                        )}
                        showsHorizontalScrollIndicator={false}
                    />
                </View>
            ))}
        </ScrollView>
    );
}

const listStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: AppColors.background,
        padding: 20,
    },
    listaContainer: {
        backgroundColor: AppColors.cardBackground,
        borderRadius: 12,
        padding: 16,
        marginBottom: 20,
    },
    portada: {
        width: 100,
        height: 140,
        borderRadius: 6,
        marginRight: 10,
    },
});
