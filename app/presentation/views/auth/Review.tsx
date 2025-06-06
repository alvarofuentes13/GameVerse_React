import React, { useState } from "react"; // Importa React y hooks
import { View, Text, Image, TouchableOpacity, TextInput, Alert } from "react-native"; // Importa componentes de React Native
import { FontAwesome } from "@expo/vector-icons"; // Importa iconos de FontAwesome
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native"; // Importa hooks para la navegación
import { AppColors, AppFonts } from "../../theme/AppTheme"; // Importa colores y fuentes de la temática
import { RootStackParamsList } from "../../../../App"; // Importa tipos de parámetros de navegación
import { useAuth } from "../client/context/AuthContext"; // Importa contexto de autenticación
import styles from "../../theme/Styles"; // Importa estilos
import { ApiDelivery } from "../../../data/sources/remote/api/ApiDelivery"; // Importa la API para operaciones remotas

type ReviewRouteProp = RouteProp<RootStackParamsList, "ReviewScreen">; // Define el tipo de ruta

// Componente principal de la pantalla de reseñas
export default function ReviewScreen() {
    const navigation = useNavigation(); // Inicializa la navegación
    const route = useRoute<ReviewRouteProp>(); // Obtiene la ruta actual
    const { item } = route.params; // Extrae el item de los parámetros de la ruta
    const usuario = useAuth().user; // Obtiene el usuario autenticado
    const [rating, setRating] = useState(0); // Estado para la calificación
    const [review, setReview] = useState(""); // Estado para el comentario
    const [favorite, setFavorite] = useState(false); // Estado para marcar como favorito

    // Función para manejar el envío de la reseña
    const handleSubmitReview = async () => {
        if (!rating) {
            Alert.alert("Error", "La reseña debe tener una calificación."); // Alerta si no hay calificación
            return;
        }

        const reviewData = {
            calificacion: rating,
            comentario: review,
            favorito: favorite,
            usuario: {
                id: usuario?.id, // ID del usuario
            },
            videojuego: {
                id: item.id // ID del videojuego
            },
        };

        try {
            // Enviar reseña al backend
            const response = await ApiDelivery.post("/reviews", reviewData);

            if (response.status === 200) {
                Alert.alert("Éxito", "Reseña enviada exitosamente."); // Alerta de éxito
                navigation.goBack(); // Regresar a la pantalla anterior
            }
        } catch (error) {
            console.error("Error al enviar la reseña:", error); // Manejo de errores
            Alert.alert("Error", "Hubo un problema al enviar la reseña."); // Alerta de error
        }
    };

    return (
        <View style={{ flex: 1, backgroundColor: "#0D0D25", padding: 20 }}>
            {/* Botón para regresar */}
            <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginBottom: 10 }}>
                <FontAwesome name="arrow-left" size={24} color="#FFF" />
            </TouchableOpacity>

            {/* Información del videojuego */}
            <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 20 }}>
                <Image source={{ uri: item.coverUrl || item.portada }} style={{ width: 100, height: 150, borderRadius: 10, marginRight: 15 }} />
                <View>
                    <Text style={styles.titleText}>{item.name || item.titulo}</Text> {/* Título del videojuego */}
                    <Text style={styles.normalText}>{item.releaseDate || item.fechaLanzamiento}</Text> {/* Fecha de lanzamiento */}
                </View>
            </View>

            {/* Sección para calificar */}
            <Text style={styles.headerText}>¿Qué valoración le das?</Text>
            <View style={{ flexDirection: "row", marginBottom: 20 }}>
                {[1, 2, 3, 4, 5].map((star) => (
                    <TouchableOpacity key={star} onPress={() => setRating(star)}>
                        <FontAwesome name="star" size={28} color={star <= rating ? AppColors.yellow : AppColors.grey} style={{ marginRight: 5 }} />
                    </TouchableOpacity>
                ))}
                {/* Botón para marcar como favorito */}
                <TouchableOpacity onPress={() => setFavorite(!favorite)}>
                    <FontAwesome
                        name={favorite ? "heart" : "heart-o"} // "heart" si favorito, "heart-o" si no
                        size={28}
                        color={favorite ? AppColors.alert : AppColors.grey}
                        style={{ marginLeft: 10 }}
                    />
                </TouchableOpacity>
            </View>

            {/* Campo de texto para el comentario */}
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
                placeholder="Escribe aquí" // Placeholder para el comentario
                placeholderTextColor="#777"
                multiline // Permite múltiples líneas
                value={review} // Valor del comentario
                onChangeText={setReview} // Actualiza el estado del comentario
            />

            {/* Botón para enviar la reseña */}
            <TouchableOpacity
                style={styles.buttonForm}
                onPress={handleSubmitReview}
            >
                <Text style={styles.buttonFormText}>Listo</Text> {/* Texto del botón */}
            </TouchableOpacity>
        </View>
    );
}
