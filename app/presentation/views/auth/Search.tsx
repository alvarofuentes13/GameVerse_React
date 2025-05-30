import React, {useState, useEffect} from "react";
import {
    View,
    Text,
    TextInput,
    FlatList,
    Image,
    TouchableOpacity,
    ActivityIndicator,
    ScrollView
} from "react-native";
import {FontAwesome} from "@expo/vector-icons";
import {NavigationProp, useNavigation} from "@react-navigation/native";
import App, {RootStackParamsList} from "../../../../App";
import styles from "../../theme/Styles";
import {AppColors, AppFonts} from "../../theme/AppTheme";
import axios from "axios";
import {VideojuegoInterface} from "../../../domain/entitites/Videojuego";
import ListCard from "../../components/cards/ListCard";
import {ApiDelivery} from "../../../data/sources/remote/api/ApiDelivery";

export default function SearchScreen() {
    const navigation = useNavigation<NavigationProp<RootStackParamsList>>();
    const [search, setSearch] = useState("");
    const [games, setGames] = useState<VideojuegoInterface[]>([]);
    const [listas, setListas] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [tipoBusqueda, setTipoBusqueda] = useState<"juegos" | "listas">("juegos");

    // Limpiar resultados al cambiar tipo de búsqueda
    useEffect(() => {
        setSearch("");
        setGames([]);
        setListas([]);
    }, [tipoBusqueda]);

    // Realiza la búsqueda con debounce
    useEffect(() => {
        if (search.trim().length === 0) {
            setGames([]);
            setListas([]);
            return;
        }

        const delayDebounce = setTimeout(() => {
            searchContent(search);
        }, 500);

        return () => clearTimeout(delayDebounce);
    }, [search, tipoBusqueda]);

    const searchContent = async (query: string) => {
        setLoading(true);
        try {
            const endpoint =
                tipoBusqueda === "juegos"
                    ? `http://localhost:8080/api/igdb/videojuegos/search/${query}`
                    : `http://localhost:8080/api/listas/search/${query}`;

            const response = await ApiDelivery.get(endpoint);

            if (tipoBusqueda === "juegos") {
                setGames(response.data);
            } else {
                setListas(response.data);
            }
        } catch (error) {
            console.error("Error al buscar:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={{backgroundColor: AppColors.background, flex: 1, padding: 20}}>


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
                    style={{
                        color: AppColors.grey,
                        fontFamily: AppFonts.regular,
                        fontSize: 14,
                        flex: 1
                    }}
                    placeholder={`Buscar ${tipoBusqueda === "juegos" ? "juegos" : "listas"}...`}
                    placeholderTextColor="#777"
                    value={search}
                    onChangeText={setSearch}
                />
            </View>

            <View style={{flexDirection: "row", justifyContent: "center", padding: 20}}>
                <TouchableOpacity
                    onPress={() => setTipoBusqueda("juegos")}
                    style={{
                        padding: 10,
                        backgroundColor: tipoBusqueda === "juegos" ? AppColors.secondary : AppColors.cardBackground,
                        borderTopLeftRadius: 10,
                        borderBottomLeftRadius: 10,
                        borderWidth: 3,
                        borderRightWidth: 0,
                        borderColor: AppColors.primary,
                        width: 80,
                        justifyContent: "center", alignItems: "center"
                    }}
                >
                    <Text style={{color: AppColors.primary, fontFamily: AppFonts.bold}}>Juegos</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => setTipoBusqueda("listas")}
                    style={{
                        padding: 10,
                        backgroundColor: tipoBusqueda === "listas" ? AppColors.secondary : AppColors.cardBackground,
                        borderTopRightRadius: 10,
                        borderBottomRightRadius: 10,
                        borderWidth: 3,
                        borderLeftWidth: 0,
                        borderColor: AppColors.primary,
                        width: 80,
                        justifyContent: "center", alignItems: "center"
                    }}
                >
                    <Text style={{color: AppColors.primary, fontFamily: AppFonts.bold}}>Listas</Text>
                </TouchableOpacity>
            </View>

            {loading && <ActivityIndicator size="large" color="#FFF" style={{marginTop: 20}}/>}

            {tipoBusqueda === "juegos" ? (
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
            ) : (
                <ScrollView style={{borderRadius: 10, marginTop: 10}}>
                    {listas.map((lista) => (
                        lista && lista.id && (
                            <ListCard lista={lista} key={lista.id.toString()}/>
                        )
                    ))}
                </ScrollView>
            )}
        </View>
    );
}
