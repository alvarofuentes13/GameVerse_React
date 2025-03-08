import React, {useEffect, useState} from "react";
import { View, Text, TextInput, FlatList, Image, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import {useNavigation} from "@react-navigation/native";
import viewModel from "../client/category/list/ViewModel";


export default function SearchScreen() {
    const navigation = useNavigation();
    const [search, setSearch] = useState("");
    const {videojuego, getVideojuegos} = viewModel.VideojuegoViewModel();

    useEffect(() => {
        getVideojuegos();
    }, []);

    const filteredGames = videojuego.filter((game) => game.titulo.toLowerCase().includes(search.toLowerCase()));

    return (
        <View style={{ flex: 1, backgroundColor: "#0D0D25", padding: 20 }}>
            <View style={{ flexDirection: "row", alignItems: "center", backgroundColor: "#1C1C3A", borderRadius: 10, padding: 10 }}>
                <FontAwesome name="search" size={20} color="#FFF" style={{ marginRight: 10 }} />
                <TextInput
                    style={{ flex: 1, color: "#FFF", fontSize: 16,}}
                    placeholder="Buscar juegos..."
                    placeholderTextColor="#777"
                    value={search}
                    onChangeText={setSearch}
                />
            </View>

            <FlatList
                data={filteredGames}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            backgroundColor: "#1C1C3A",
                            padding: 10,
                            borderRadius: 10,
                            marginTop: 15,
                        }}
                        onPress={() => navigation.navigate("GameDescriptionScreen", {item: item})} // Pasar datos
                    >
                        <Image source={{uri: item.portada}} style={{ width: 60, height: 80, borderRadius: 8, marginRight: 10 }} />
                        <View style={{ flex: 1 }}>
                            <Text style={{ color: "#FFF", fontSize: 18, fontWeight: "bold", width:"70%" }}>{item.titulo}</Text>
                            <Text style={{ color: "#777", fontSize: 14 }}>{item.fechaLanzamiento.split("-")[0]}</Text>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
}
