import React, { useEffect, useState } from "react"; // Importa React y hooks
import { View, Text, Image, TouchableOpacity, ScrollView, ActivityIndicator } from "react-native"; // Importa componentes de React Native
import { FontAwesome } from "@expo/vector-icons"; // Importa iconos de FontAwesome
import { NavigationProp, RouteProp, useNavigation, useRoute } from "@react-navigation/native"; // Importa navegación
import { AppColors, AppFonts } from "../../theme/AppTheme"; // Importa colores y fuentes
import { RootStackParamsList } from "../../../../App"; // Importa tipos de navegación
import { ReviewInterface } from "../../../domain/entities/Review"; // Importa interfaz de reseña
import ReviewCard from "../../components/cards/ReviewCard"; // Importa componente de tarjeta de reseña
import styles from "../../theme/Styles"; // Importa estilos
import { ApiDelivery } from "../../../data/sources/remote/api/ApiDelivery"; // Importa API para obtener reseñas

// Define el tipo de la ruta
type DescriptionRouteProp = RouteProp<RootStackParamsList, "DescriptionScreen">;

// Componente principal
export default function DescriptionScreen() {
    const navigation = useNavigation<NavigationProp<RootStackParamsList>>(); // Inicializa la navegación
    const route = useRoute<DescriptionRouteProp>(); // Obtiene la ruta actual
    const { item } = route.params; // Desestructura el item de los parámetros de la ruta
    const [reviews, setReviews] = useState<ReviewInterface[]>([]); // Estado para las reseñas
    const [cargando, setCargando] = useState(true); // Estado para el cargando

    // Efecto para obtener reseñas al montar el componente
    useEffect(() => {
        const fetchReviews = async () => {
            if (!item) return; // Verifica si hay un item

            try {
                const response = await ApiDelivery.get(`http://localhost:8080/api/reviews/videojuego/${item.id}`); // Llama a la API para obtener reseñas
                setReviews(response.data); // Establece las reseñas en el estado
            } catch (error) {
                console.error("Error al obtener reviews:", error); // Manejo de errores
            } finally {
                setCargando(false); // Cambia el estado de cargando
            }
        };

        fetchReviews(); // Llama a la función para obtener reseñas
    }, [item]); // Dependencia en item

    return (
        <ScrollView style={{ flex: 1, backgroundColor: "#0D0D25", padding: 20 }}>
            {/* Botón de retroceso */}
            <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginBottom: 10 }}>
                <FontAwesome name="arrow-left" size={24} color="#FFF" />
            </TouchableOpacity>

            {/* Información del juego */}
            <View style={{ alignItems: "center", marginBottom: 20 }}>
                <Image
                    source={{ uri: item.coverUrl || item.portada }} // Imagen del juego
                    style={{ width: 150, height: 220, borderRadius: 10 }}
                />
                <Text style={styles.superText}>
                    {item.name || item.titulo} {/* Nombre del juego */}
                </Text>
                <Text style={{ fontSize: 16, color: "#AAA", fontFamily: AppFonts.regular }}>
                    {(item.releaseDate || item.fechaLanzamiento)?.split("/")[2] ?? "Sin año"} {/* Fecha de lanzamiento */}
                </Text>
                <Text style={styles.normalText}>
                    {item.descripcion || item.summary} {/* Descripción del juego */}
                </Text>
            </View>

            {/* Botón para valorar */}
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
                    onPress={() => navigation.navigate("ReviewScreen", { item: item })} // Navegar a la pantalla de reseñas
                >
                    <FontAwesome name="star" size={16} color={AppColors.yellow} style={{ marginRight: 5 }} />
                    <Text style={styles.headerText}>Valorar</Text>
                </TouchableOpacity>
            </View>

            {/* Muestra las reseñas o un mensaje si no hay reseñas */}
            {reviews.length !== 0 ? (
                <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 20 }}>
                    <Text style={styles.titleText}>Reviews de {item.titulo}</Text>
                </View>
            ) : (
                <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 20 }}>
                    <Text style={styles.titleText}>Este juego no tiene reseñas, ¡escribe una!</Text>
                </View>
            )}

            {/* Muestra un indicador de carga o las reseñas */}
            {cargando ? (
                <ActivityIndicator size="large" color={AppColors.yellow} style={{ marginTop: 10 }} />
            ) : (
                reviews.map((review) => (
                    <ReviewCard key={review.id} review={review} /> // Muestra cada tarjeta de reseña
                ))
            )}
        </ScrollView>
    );
}
