import React, {useState, useEffect} from "react";
import {View, Text, TextInput, FlatList, Image, TouchableOpacity, ActivityIndicator} from "react-native";
import {FontAwesome} from "@expo/vector-icons";
import {NavigationProp, useNavigation} from "@react-navigation/native";
import {RootStackParamsList} from "../../../../App";
import styles from "../../theme/Styles";
import {AppColors, AppFonts} from "../../theme/AppTheme";
import axios from "axios";
import {VideojuegoInterface} from "../../../domain/entitites/Videojuego";

export default function SearchScreen() {
    const navigation = useNavigation<NavigationProp<RootStackParamsList>>();
    const [search, setSearch] = useState("");
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            if (search.trim().length > 0) {
                searchGames(search);
            } else {
                setGames([]); // Vaciar resultados si no hay texto
            }
        }, 500); // Espera 500ms antes de hacer fetch

        return () => clearTimeout(delayDebounce); // Cleanup timeout
    }, [search]);

    const searchGames = async (query: string) => {
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:8080/api/igdb/videojuegos/search/${query}`);
            setGames(response.data);
        } catch (error) {
            console.error("Error al buscar juegos:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={{backgroundColor: AppColors.background, width: "100%", height: "100%", padding: 20}}>

            <View style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: AppColors.cardBackground,
                borderRadius: 10,
                padding: 10,
                borderWidth: 2,
                borderColor: "#24243C"
            }}>
                <FontAwesome name="search" size={20} color="#FFF" style={{marginRight: 10}}/>
                <TextInput
                    style={{color: AppColors.grey, fontFamily: AppFonts.regular, fontSize: 14,}}
                    placeholder="Buscar juegos..."
                    placeholderTextColor="#777"
                    value={search}
                    onChangeText={setSearch}
                />
            </View>

            {loading && <ActivityIndicator size="large" color="#FFF" style={{marginTop: 20}}/>}

            <FlatList
                showsVerticalScrollIndicator={false}
                data={games}
                keyExtractor={(item: VideojuegoInterface) => item.id.toString()}
                renderItem={({item}) => (
                    <TouchableOpacity
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            backgroundColor: AppColors.cardBackground,
                            padding: 10,
                            borderRadius: 10,
                            marginTop: 15,
                        }}
                        onPress={() => navigation.navigate("DescriptionScreen", {item})}
                    >
                        <Image source={{uri: item.coverUrl || item.portada}}
                               style={{width: 60, height: 80, borderRadius: 8, marginRight: 10}}/>
                        <View style={{flex: 1}}>
                            <Text style={styles.titleText}>{item.name || item.titulo}</Text>
                            <Text style={styles.normalText}>
                                {(item.releaseDate || item.fechaLanzamiento)?.split("/")[2] ?? "Sin año"}
                            </Text>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
}
