import React, { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, TouchableOpacity, View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { VideojuegoInterface } from "../../../../../domain/entitites/Videojuego";

export const VideojuegoCategoryListHome = () => {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const [videojuegos, setVideojuegos] = useState<VideojuegoInterface[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchGames = async () => {
            try {
                const response = await fetch("http://localhost:8080/api/igdb/limited", {
                    method: 'POST', // Cambiar a POST
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(7) // Enviar el límite como cuerpo de la solicitud
                });

                if (!response.ok) throw new Error('Network response was not ok');

                const games = await response.json();
/*
                const mappedGames: VideojuegoInterface[] = games.map((game: any) => ({
                    id: game.id,
                    titulo: game.name,
                    desarrollador: game.involved_companies?.[0]?.company?.name || "Desconocido",
                    fechaLanzamiento: game.first_release_date
                        ? new Date(game.first_release_date * 1000).toLocaleDateString()
                        : "Sin fecha",
                    genero: game.genres?.[0]?.name || "Sin género",
                    descripcion: game.summary || "Sin descripción",
                    portada: game.cover?.url
                        ? game.cover.url.replace("t_thumb", "t_cover_big") // Asegúrate de que esta URL sea válida
                        : "",
                }));*/

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
                    //source={{ uri: "https://api.igdb.com//images.igdb.com/igdb/image/upload/t_thumb/co9d8y.jpg" }}
                    style={{width: 100, height: 140, marginRight: 10, borderRadius: 8}}
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
