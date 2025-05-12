import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, TextInput, Alert } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios"; // Importar axios
import { AppColors } from "../../theme/AppTheme";
import { RootStackParamsList } from "../../../../App";
import {useUser} from "../client/context/UserContext";

type GameReviewRouteProp = RouteProp<RootStackParamsList, "GameReviewScreen">;

export default function GameReviewScreen() {
    const navigation = useNavigation();
    const route = useRoute<GameReviewRouteProp>();
    const { item } = route.params;
    const usuario = useUser().user;
    console.log(usuario);

    const [rating, setRating] = useState(0);
    const [review, setReview] = useState("");



    // Función para manejar el envío de la reseña
    const handleSubmitReview = async () => {
        if (!rating || !review) {
            Alert.alert("Error", "Por favor, completa la calificación y el comentario.");
            return;
        }

        const reviewData = {
            calificacion: rating,
            comentario: review,
            usuario: {
                id: usuario?.id,
            },
            videojuego: {
                id: item.id
            },
        };

        try {
            // Enviar reseña al backend
            const response = await axios.post("http://localhost:8080/api/reviews", reviewData);

            if (response.status === 200) {
                Alert.alert("Éxito", "Reseña enviada exitosamente.");
                navigation.goBack(); // Regresar a la pantalla anterior
            }
        } catch (error) {
            console.error("Error al enviar la reseña:", error);
            Alert.alert("Error", "Hubo un problema al enviar la reseña.");
        }
    };

    return (
        <View style={{ flex: 1, backgroundColor: "#0D0D25", padding: 20 }}>
            {/* Botón de regreso */}
            <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginBottom: 10 }}>
                <FontAwesome name="arrow-left" size={24} color="#FFF" />
            </TouchableOpacity>

            {/* Imagen y detalles del juego */}
            <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 20 }}>
                <Image source={{ uri: item.portada }} style={{ width: 100, height: 150, borderRadius: 10, marginRight: 15 }} />
                <View>
                    <Text style={{ color: "#FFF", fontSize: 20, fontWeight: "bold" }}>{item.titulo}</Text>
                    <Text style={{ color: "#AAA", fontSize: 16 }}>{item.fechaLanzamiento}</Text>
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
                onPress={handleSubmitReview}
            >
                <Text style={{ color: "#FFF", fontSize: 18 }}>Listo</Text>
            </TouchableOpacity>
        </View>
    );
}
