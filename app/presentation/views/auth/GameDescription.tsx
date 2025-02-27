import React from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import {RouteProp, useNavigation, useRoute} from "@react-navigation/native";
import {AppColors, AppFonts} from "../../theme/AppTheme";
import {RootStackParamsList} from "../../../../App";

type GameDescriptionRouteProp = RouteProp<RootStackParamsList, "GameDescriptionScreen">;

export default function GameDescriptionScreen() {
    const navigation = useNavigation();
    const route = useRoute<GameDescriptionRouteProp>();

    const { item } = route.params;
    console.log("Game Description Screen", item);

    return (
        <ScrollView style={{ flex: 1, backgroundColor: "#0D0D25", padding: 20 }}>
            {/* Botón de regreso */}
            <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginBottom: 10 }}>
                <FontAwesome name="arrow-left" size={24} color="#FFF" />
            </TouchableOpacity>

            {/* Imagen y detalles del juego */}
            <View style={{ alignItems: "center", marginBottom: 20 }}>
                <Image
                    source={{uri: item.portada}}
                    style={{ width: 150, height: 220, borderRadius: 10 }}
                />
                <Text style={{ color: "#FFF", fontSize: 24, fontWeight: "bold", marginTop: 10, fontFamily: AppFonts.bold }}>
                    {item.titulo}
                </Text>
                <Text style={{ fontSize: 16, color: "#AAA", fontFamily: AppFonts.regular }}>{item.fechaLanzamiento.split("-")[0]}</Text>
                <Text style={{ color: "#AAA", textAlign: "center", marginTop: 10 }}>
                    {item.descripcion}
                </Text>
            </View>

            {/* Botones */}
            <View style={{ flexDirection: "row", justifyContent: "center", marginBottom: 20 }}>
                <TouchableOpacity
                    style={{
                        backgroundColor: "#1C1C3A",
                        padding: 10,
                        borderRadius: 8,
                        marginHorizontal: 10,
                        flexDirection: "row",
                        alignItems: "center",
                    }}
                    onPress={() => navigation.navigate("GameReviewScreen", {item})} //No funciona :(
                >
                    <FontAwesome name="star" size={16} color = {AppColors.yellow} style={{ marginRight: 5 }} />
                    <Text style={{ color: "#FFF" }}>Valorar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        backgroundColor: "#1C1C3A",
                        padding: 10,
                        borderRadius: 8,
                        marginHorizontal: 10,
                        flexDirection: "row",
                        alignItems: "center",
                    }}
                >
                    <FontAwesome name="list" size={16} color="#FFF" style={{ marginRight: 5 }} />
                    <Text style={{ color: "#FFF" }}>Añadir a lista</Text>
                </TouchableOpacity>
            </View>

            {/* Valoraciones */}
            <View style={{ marginBottom: 20 }}>
                <Text style={{ color: "#FFF", fontSize: 18, marginBottom: 10 }}>Valoraciones</Text>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <View style={{ flex: 1, height: 50, backgroundColor: "#333", borderRadius: 8 }} />
                    <Text style={{ color: "#FFF", fontSize: 24, marginLeft: 10 }}>4.4</Text>
                    <FontAwesome name="star" size={16} color={AppColors.yellow} style={{ marginLeft: 5 }} />
                </View>
            </View>

            {/* Reseñas */}
            <View style={{ marginBottom: 20 }}>
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <Text style={{ color: "#FFF", fontSize: 18 }}>All Reviews</Text>
                    <TouchableOpacity>
                        <Text style={{ color: AppColors.primary }}>Ver todas</Text>
                    </TouchableOpacity>
                </View>

                {[1, 2, 3].map((item) => (
                    <View key={item} style={{ backgroundColor: "#1C1C3A", padding: 15, borderRadius: 10, marginTop: 10 }}>
                        <Text style={{ color: AppColors.grey, fontSize: 16 }}>Reseña de Pedro ⭐⭐⭐⭐</Text>
                        <Text style={{ color: "#AAA", fontSize: 14, marginTop: 5 }}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...
                        </Text>
                        <TouchableOpacity>
                            <Text style={{ color: AppColors.primary, marginTop: 5 }}>Leer más</Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </View>
        </ScrollView>
    );
}
