import {Image, StyleSheet, TouchableOpacity, View} from "react-native";
import React from "react";
import {VideojuegoInterface} from "../../../domain/entitites/Videojuego";
import {NavigationProp, useNavigation} from "@react-navigation/native";
import {RootStackParamsList} from "../../../../App";


export default function SmallListCard({lista}: any) {
    const navigation = useNavigation<NavigationProp<RootStackParamsList>>();

    return (
        <TouchableOpacity onPress={() => navigation.navigate("ListDescriptionScreen", {lista})}>
            <View style={{height: "100%", width: "33%", flexDirection: "column"}}>
                <View key={lista.id} style={listCardStyles.listaContainer}>
                    {lista.videojuegos.slice(0, 3).map((game: VideojuegoInterface, index: number) => (
                        <Image
                            key={game.id}
                            source={{uri: game.portada}}
                            style={{
                                position: "absolute",
                                left: index * 12 + 8,
                                height: 150 - (6 * index),
                                width: 107 - (6 * index),
                                zIndex: lista.videojuegos.length - index,
                                borderRadius: 4
                            }}
                        />
                    ))}
                </View>
            </View>
        </TouchableOpacity>

    )
}


const listCardStyles = StyleSheet.create({
    container: {
        flexDirection: "row"
    },
    listaContainer: {
        borderColor: "#24243C",
        height: "100%",
        width: "100%",
        alignContent: "center",
        justifyContent: "center",
    },
});