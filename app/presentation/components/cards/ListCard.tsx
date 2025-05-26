import {FlatList, Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import styles from "../../theme/Styles";
import React from "react";
import {AppColors} from "../../theme/AppTheme";
import {VideojuegoInterface} from "../../../domain/entitites/Videojuego";
import {NavigationProp, useNavigation} from "@react-navigation/native";
import {RootStackParamsList} from "../../../../App";


export default function ListCard({lista}: any){
    const navigation = useNavigation<NavigationProp<RootStackParamsList>>();

    console.log(lista);
    return (
        <TouchableOpacity onPress={() => navigation.navigate("ListDescriptionScreen", {lista})}>
            <View key={lista.id} style={listCardStyles.listaContainer}>

                <View style={listCardStyles.textContainer}>
                    <View style={{width: '70%'}}>
                        <Text style={styles.titleText}>{lista.nombre}</Text>
                        <Text style={styles.headerText}>
                            Aqui van las etiquetas
                        </Text>
                        <Text numberOfLines={2} style={styles.normalText}>
                            {lista.descripcion}
                        </Text>
                    </View>

                    <View style={listCardStyles.footer}>
                        <Image source={lista.usuario.avatar} style={{height: 20, width: 20, borderRadius: 50}}/>
                        <Text style={styles.headerText}>{lista.usuario.name}</Text>
                    </View>
                </View>


                <View style={{alignContent: "flex-end"}}>
                    {lista.videojuegos.slice(0, 3).map((game: VideojuegoInterface, index: number) => (
                        <Image
                            key={game.id}
                            source={{ uri: game.portada }}
                            style={{
                                position: "absolute",
                                right: index * 12,
                                height: 150,
                                width: 107,
                                borderTopRightRadius: 12,
                                borderBottomRightRadius: 12,
                                zIndex: lista.videojuegos.length - index,
                            }}
                        />
                    ))}
                </View>

            </View>
        </TouchableOpacity>

    )
}


const listCardStyles = StyleSheet.create({
    listaContainer: {
        backgroundColor: AppColors.cardBackground,
        borderRadius: 12,
        marginTop: 15,
        borderColor: "#24243C",
        flexDirection: "row",
        height: 150
    },
    textContainer: {
        flex: 1,
        paddingRight: 12,
        justifyContent: "space-between",
        margin: 20,
    },
    footer: {
        flexDirection: "row",
        gap: 8,
    },
});