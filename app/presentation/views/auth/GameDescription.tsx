import React from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import {useNavigation} from "@react-navigation/native";
import {AppColors} from "../../theme/AppTheme";

export default function GameDescriptionScreen() {
    const navigation = useNavigation();

    return (
        <ScrollView style={{ flex: 1, backgroundColor: "#0D0D25", padding: 20 }}>
            {/* Botón de regreso */}
            <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginBottom: 10 }}>
                <FontAwesome name="arrow-left" size={24} color="#FFF" />
            </TouchableOpacity>

            {/* Imagen y detalles del juego */}
            <View style={{ alignItems: "center", marginBottom: 20 }}>
                <Image
                    source={require("../../../../assets/img/red_dead.png")}
                    style={{ width: 150, height: 220, borderRadius: 10 }}
                />
                <Text style={{ color: "#FFF", fontSize: 24, fontWeight: "bold", marginTop: 10 }}>
                    Zelda Skyward Sword <Text style={{ fontSize: 16, color: "#AAA" }}>2011</Text>
                </Text>
                <Text style={{ color: "#AAA", textAlign: "center", marginTop: 10 }}>
                    En el relato más antiguo de la línea temporal de Zelda, Link debe viajar desde un mundo que se halla por encima de las nubes...
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
                        <Text style={{ color: AppColors.yellow }}>Ver todas</Text>
                    </TouchableOpacity>
                </View>

                {[1, 2, 3].map((item) => (
                    <View key={item} style={{ backgroundColor: "#1C1C3A", padding: 15, borderRadius: 10, marginTop: 10 }}>
                        <Text style={{ color: AppColors.yellow, fontSize: 16 }}>Reseña de Pedro ⭐⭐⭐⭐</Text>
                        <Text style={{ color: "#AAA", fontSize: 14, marginTop: 5 }}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...
                        </Text>
                        <TouchableOpacity>
                            <Text style={{ color: AppColors.yellow, marginTop: 5 }}>Leer más</Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </View>
        </ScrollView>
    );
}
