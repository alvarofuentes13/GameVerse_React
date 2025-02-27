import React, {useEffect, useState} from "react";
import {View, Text, Image, FlatList, ActivityIndicator, StyleSheet, SafeAreaView} from "react-native";
import {AppColors} from "../../theme/AppTheme";
import axios from "axios";
import {VideojuegoInterface} from "../../../data/sources/remote/api/VideojuegoInterface";

const url = "http://localhost:8080/api/videojuegos";
const baseUrl = "http://localhost:8080/api/videojuegos";

const VideojuegosScreen = () => {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch(url)
            .then(response => response.json())
            .then((json) => setData(json))
            .catch(error => alert(error))
            .finally(() => setLoading(false));
    }, []);

    // Passing configuration object to axios
    const fetchGames = async (): Promise<VideojuegoInterface[]> => {
        const configurationObject = {
            method: 'get',
            url: `${baseUrl}`,
        };
        const response = await axios(configurationObject);
        return Promise.resolve(JSON.parse(JSON.stringify(response.data as VideojuegoInterface[])));
    };

    const videojuegos = fetchGames();

    const fetchGame = async (): Promise<VideojuegoInterface[]> => {
        try {
            const response = await fetch("https://api.igdb.com/v4/games", {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Client-ID": "19mj5nfs06lbn6pmkeasqq0ugdjel6",
                    "Authorization": "Bearer 0ws7zwl52399bgl5ugraloakvb9uj2",
                    "Content-Type": "text/plain"
                },
                body: `fields name, cover.url, genres.name, summary; limit 10;`
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }

            const data = await response.json();
            console.log(data);
            return data;// Aquí ves los juegos en la consola
        } catch (error) {
            console.error("Error al obtener juegos:", error);
            return []
        }
    };

// Llamar a la función
    fetchGame();


    return (

        <View style={styles.container}>
            {isLoading ? <ActivityIndicator/> : <FlatList
                data={data}
                keyExtractor={({id}, index) => id}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Image source={{ uri: item.portada }} style={styles.image} />
                        <Text style={styles.title}>{item.titulo}</Text>
                        <Text style={styles.text}>{item.desarrollador}</Text>
                        <Text style={styles.text}>{item.genero}</Text>
                    </View>
                )}
            />
            }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {flex: 1, backgroundColor: AppColors.background, padding: 10},
    card: {backgroundColor: "#1E1E1E", padding: 10, marginBottom: 10, borderRadius: 10},
    image: {width: "100%", height: 200, borderRadius: 10},
    title: {fontSize: 18, fontWeight: "bold", color: "#FFF", marginTop: 5},
    text: {color: "#BBB"},
});

export default VideojuegosScreen;
