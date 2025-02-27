import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, TextInput } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import {RouteProp, useNavigation, useRoute} from "@react-navigation/native";
import {AppColors} from "../../theme/AppTheme";
import {RootStackParamsList} from "../../../../App";

type GameReviewRouteProp = RouteProp<RootStackParamsList, "GameReviewScreen">;


export default function GameReviewScreen() {
    const navigation = useNavigation();
    const route = useRoute<GameReviewRouteProp>();
    const { game } = route.params;
    console.log(game)// Recibir datos del juego seleccionado

    const [rating, setRating] = useState(0);
    const [review, setReview] = useState("");

    const [isFavorite, setIsFavorite] = useState(false); // Estado para el corazón

    const toggleFavorite = () => {
        setIsFavorite(!isFavorite); // Cambia entre true/false al presionar
    };

    return (
        <View style={{ flex: 1, backgroundColor: "#0D0D25", padding: 20 }}>
            {/* Botón de regreso */}
            <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginBottom: 10 }}>
                <FontAwesome name="arrow-left" size={24} color="#FFF" />
            </TouchableOpacity>

            {/* Imagen y detalles del juego */}
            <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 20 }}>
                <Image source={game.portada} style={{ width: 100, height: 150, borderRadius: 10, marginRight: 15 }} />
                <View>
                    <Text style={{ color: "#FFF", fontSize: 20, fontWeight: "bold" }}>{game.titulo}</Text>
                    <Text style={{ color: "#AAA", fontSize: 16 }}>{game.fechaLanzamiento}</Text>
                </View>
            </View>

            {/* Estrellas para calificación */}
            <Text style={{ color: "#FFF", fontSize: 16, marginBottom: 10 }}>¿Qué valoración le das?</Text>
            <View style={{ flexDirection: "row", marginBottom: 20 }}>
                {[1, 2, 3, 4, 5].map((star) => (
                    <TouchableOpacity key={star} onPress={() => setRating(star)}>
                        <FontAwesome name="star" size={28} color={star <= rating ? AppColors.yellow : AppColors.grey} style={{ marginRight: 5 }} />
                    </TouchableOpacity>
                ))}
                <TouchableOpacity onPress={toggleFavorite} style={{ marginLeft: 10 }}>
                    <FontAwesome name="heart" size={28} color={isFavorite ? AppColors.alert : AppColors.grey} />
                </TouchableOpacity>
            </View>

            {/* Área de texto para la reseña */}
            <TextInput
                style={{
                    backgroundColor: "#1C1C3A",
                    color: "#FFF",
                    fontSize: 16,
                    padding: 15,
                    borderRadius: 10,
                    height: 150,
                    textAlignVertical: "top",
                }}
                placeholder="Escribe aquí"
                placeholderTextColor="#777"
                multiline
                value={review}
                onChangeText={setReview}
            />

            {/* Botón de enviar */}
            <TouchableOpacity
                style={{
                    backgroundColor: "#3498db",
                    padding: 12,
                    borderRadius: 10,
                    alignItems: "center",
                    marginTop: 20,
                }}
                onPress={() => console.log("Reseña enviada:", review)}
            >
                <Text style={{ color: "#FFF", fontSize: 18 }}>Listo</Text>
            </TouchableOpacity>
        </View>
    );
}
