import React, { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, TouchableOpacity, View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { VideojuegoInterface } from "../../../../../domain/entitites/Videojuego";
import {ApiDelivery} from "../../../../../data/sources/remote/api/ApiDelivery";
import axios from "axios";

export const VideojuegoCategoryListHome = () => {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const [videojuegos, setVideojuegos] = useState<VideojuegoInterface[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchGames = async () => {
            try {
                const response = await axios.post("http://localhost:8080/api/igdb/limited",
                    10,
                    {
                        headers:{
                            "Content-Type": "application/json",
                        }
                    });

                const games = await response.data;

                setVideojuegos(games);
            } catch (error) {
                console.error("Error fetching games from backend:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchGames();
    }, []);

    const renderItem = useCallback(
        ({ item }: { item: VideojuegoInterface }) => (
            <TouchableOpacity
                style={{ margin: 3}}
                onPress={() => navigation.navigate("DescriptionScreen", { item })}
            >

                <Image
                    source={{uri: item.portada || item.coverUrl}}
                    style={{width: 100, height: 140, marginRight: 8, borderRadius: 4}}
                    onError={() => console.log("Error loading image")} // Manejo de errores
                />

                <Text style={{ textAlign: 'center', color:"#FFF" }}>{item.titulo}</Text>
            </TouchableOpacity>
        ),
        [navigation]
    );

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return (
        <FlatList
            data={videojuegos}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            initialNumToRender={10}
            horizontal={true}
            removeClippedSubviews={true}
            showsHorizontalScrollIndicator={false}
        />
    );
};
