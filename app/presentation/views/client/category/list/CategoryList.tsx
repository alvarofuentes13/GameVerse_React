import viewModel from "./ViewModel";
import React, {useCallback, useEffect} from "react";
import {ActivityIndicator, Dimensions, FlatList, Image, Text, TouchableOpacity} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {RootStackParamsList} from "../../../../../../App";
import {VideojuegoInterface} from "../../../../../domain/entitites/Videojuego";


interface Props{
    videojuego: VideojuegoInterface[]
}


export const VideojuegoCategoryListHome = ({videojuego}: Props) => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamsList>>();

    if (videojuego.length > 0) {
        const renderItem = useCallback(({item}: {item: VideojuegoInterface}) =>
            <TouchableOpacity onPress={() => navigation.navigate("GameDescriptionScreen", {item: item})}>
                <Image
                    source={{uri: item.portada}}
                    style={{width: 100, height: 140, margin: 5, borderRadius: 8}}
                />
            </TouchableOpacity>, []);

        return (
            <FlatList
                data={videojuego}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
                initialNumToRender={10}
                horizontal={true}
                removeClippedSubviews={true}
                showsHorizontalScrollIndicator={false}
            ></FlatList>
        )
    }
    else {
        <ActivityIndicator size={"large"}></ActivityIndicator>
    }

}

export const VideojuegoCategoryListSearch = ({videojuego}: Props) => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamsList>>();

    if (videojuego.length > 0) {
        const renderItem = useCallback(({item}: {item: VideojuegoInterface}) =>
            <TouchableOpacity onPress={() => navigation.navigate("GameDescriptionScreen", {item: item})}>
                <Image
                    source={{uri: item.portada}}
                    style={{width: 100, height: 140, margin: 5, borderRadius: 8}}
                />
            </TouchableOpacity>, []);

        return (
            <FlatList
                data={videojuego}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
                initialNumToRender={10}
                horizontal={true}
                removeClippedSubviews={true}
                showsHorizontalScrollIndicator={false}
            ></FlatList>
        )
    }
    else {
        <ActivityIndicator size={"large"}></ActivityIndicator>
    }

}