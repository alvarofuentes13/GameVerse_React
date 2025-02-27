import React, { useState } from "react";
import { View, Text, TextInput, FlatList, Image, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import {useNavigation} from "@react-navigation/native";

const games = [
    { id: "1", title: "The Witcher 3", year: "2015", image: require("../../../../assets/img/witcher_3.png") },
    { id: "2", title: "Red Dead Redemption 2", year: "2019", image: require("../../../../assets/img/red_dead.png") },
    { id: "3", title: "Cyberpunk 2077", year: "2020", image: require("../../../../assets/img/cyberpunk.png") },
    { id: "4", title: "GTA V", year: "2013", image: require("../../../../assets/img/gta_v.png") },
];

export default function SearchScreen() {
    const navigation = useNavigation();
    const [search, setSearch] = useState("");
    const filteredGames = games.filter((game) => game.title.toLowerCase().includes(search.toLowerCase()));

    return (
        <View style={{ flex: 1, backgroundColor: "#0D0D25", padding: 20 }}>
            {/* Barra de búsqueda */}
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

            {/* Lista de resultados */}
            <FlatList
                data={filteredGames}
                keyExtractor={(item) => item.id}
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
                        onPress={() => navigation.navigate("GameDescriptionScreen")} // Pasar datos
                    >
                        <Image source={item.image} style={{ width: 60, height: 80, borderRadius: 8, marginRight: 10 }} />
                        <View>
                            <Text style={{ color: "#FFF", fontSize: 18, fontWeight: "bold" }}>{item.title}</Text>
                            <Text style={{ color: "#777", fontSize: 14 }}>{item.year}</Text>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
}
