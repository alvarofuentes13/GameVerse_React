import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, TextInput, Alert } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios"; // Importar axios
import {AppColors, AppFonts} from "../../theme/AppTheme";
import { RootStackParamsList } from "../../../../App";
import {useUser} from "../client/context/UserContext";
import styles from "../../theme/Styles";

type ReviewRouteProp = RouteProp<RootStackParamsList, "ReviewScreen">;

export default function ReviewScreen() {
    const navigation = useNavigation();
    const route = useRoute<ReviewRouteProp>();
    const { item } = route.params;
    const usuario = useUser().user;
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState("");
    const [favorite, setFavorite] = useState(false);
    console.log(item);



    // Función para manejar el envío de la reseña
    const handleSubmitReview = async () => {
        if (!rating || !review) {
            Alert.alert("Error", "Por favor, completa la calificación y el comentario.");
            return;
        }

        const reviewData = {
            calificacion: rating,
            comentario: review,
            favorito: favorite,
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
                    <Text style={styles.titleText}>{item.titulo}</Text>
                    <Text style={styles.normalText}>{item.fechaLanzamiento}</Text>
                </View>
            </View>

            {/* Estrellas y favorito para calificación */}
            <Text style={styles.headerText}>¿Qué valoración le das?</Text>
            <View style={{ flexDirection: "row", marginBottom: 20 }}>
                {[1, 2, 3, 4, 5].map((star) => (
                    <TouchableOpacity key={star} onPress={() => setRating(star)}>
                        <FontAwesome name="star" size={28} color={star <= rating ? AppColors.yellow : AppColors.grey} style={{ marginRight: 5 }} />
                    </TouchableOpacity>
                ))}
                <TouchableOpacity onPress={() => setFavorite(!favorite)}>
                    <FontAwesome
                        name={favorite ? "heart" : "heart-o"} // "heart" si favorito, "heart-o" si no
                        size={28}
                        color={favorite ? AppColors.alert : AppColors.grey}
                        style={{ marginLeft: 10 }}
                    />
                </TouchableOpacity>
            </View>

            {/* Área de texto para la reseña */}
            <TextInput
                style={{
                    backgroundColor: "#1C1C3A",
                    color: "#FFF",
                    fontSize: 16,
                    fontFamily: AppFonts.regular,
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
                style={styles.buttonForm}
                onPress={handleSubmitReview}
            >
                <Text style={styles.buttonFormText}>Listo</Text>
            </TouchableOpacity>
        </View>
    );
}
