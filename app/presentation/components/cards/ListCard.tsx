import {FlatList, Image, StyleSheet, Text, View} from "react-native";
import styles from "../../theme/Styles";
import React from "react";
import {AppColors} from "../../theme/AppTheme";
import {ListInterface} from "../../../domain/entitites/List";


export default function ListCard({lista}: any){
    console.log(lista.videojuegos);
    return (
        <View key={lista.id} style={listCardStyles.listaContainer}>
            <Text style={styles.titleText}>{lista.nombre}</Text>
            <Text style={styles.normalText}>{lista.descripcion}</Text>

            <FlatList
                style={{marginVertical: 4}}
                data={lista.videojuegos}
                horizontal
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <Image source={item.portada} style={listCardStyles.portada} />
                )}
                showsHorizontalScrollIndicator={false}
            />

        </View>
    )
}


const listCardStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: AppColors.background,
        padding: 20,
    },
    listaContainer: {
        backgroundColor: AppColors.cardBackground,
        borderRadius: 12,
        padding: 16,
    },
    portada: {
        width: 100,
        height: 140,
        borderRadius: 6,
        marginRight: 10,
    },
});