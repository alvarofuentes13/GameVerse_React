import React, { useEffect, useState } from "react"; // Importa React y hooks
import {
    View,
    ScrollView,
    ActivityIndicator,
    TouchableOpacity,
    Text
} from "react-native"; // Importa componentes de React Native
import { AppColors } from "../../theme/AppTheme"; // Importa colores de la temática
import { useFocusEffect, useNavigation } from "@react-navigation/native"; // Importa hooks de navegación
import { DrawerNavigationProp } from "@react-navigation/drawer"; // Importa tipos de navegación del drawer
import { DrawerParamsList } from "./Home"; // Importa tipos de parámetros del drawer
import { FontAwesome } from "@expo/vector-icons"; // Importa iconos de FontAwesome
import GameCard from "../../components/cards/GameCard"; // Importa componente de tarjeta de juego
import { useAuth } from "../client/context/AuthContext"; // Importa contexto de autenticación
import { ApiDelivery } from "../../../data/sources/remote/api/ApiDelivery"; // Importa API para obtener reseñas
import styles from "../../theme/Styles"; // Importa estilos
import { ReviewInterface } from "../../../domain/entities/Review"; // Importa interfaz de reseña

// Componente principal
export default function GamesScreen() {
    const { user: usuario, token, setAuth } = useAuth(); // Obtiene datos del usuario desde el contexto
    const navigation = useNavigation<DrawerNavigationProp<DrawerParamsList>>(); // Inicializa la navegación
    const [reviews, setReviews] = useState<ReviewInterface[]>([]); // Estado para las reseñas
    const [cargando, setCargando] = useState(true); // Estado para el cargando

    // Efecto para obtener reseñas al enfocar el componente
    useFocusEffect(
        React.useCallback(() => {
            const fetchLists = async () => {
                if (!usuario) return; // Si el usuario no está definido, no hacemos la petición.

                try {
                    const response = await ApiDelivery.get(`/reviews/usuario/${usuario.id}`); // Llama a la API para obtener reseñas del usuario
                    setReviews(response.data); // Establece las reseñas en el estado
                } catch (error) {
                    console.error("Error al obtener reviews:", error); // Manejo de errores
                } finally {
                    setCargando(false); // Cambia el estado de cargando
                }
            };

            fetchLists(); // Llama a la función para obtener reseñas
        }, [usuario]) // Dependencia en usuario
    );

    return (
        <ScrollView style={{ backgroundColor: AppColors.background, width: "100%", height: "100%", padding: 20 }}>
            {/* Botón para abrir el drawer */}
            <TouchableOpacity onPress={() => navigation.openDrawer()} style={{ marginBottom: 20 }}>
                <FontAwesome name="bars" size={28} color="white" />
            </TouchableOpacity>
            <View>
                <Text style={styles.titleText}>Juegos que has valorado</Text> {/* Título de la sección */}
            </View>

            {/* Contenedor para las tarjetas de juegos */}
            <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" }}>
                {cargando ? ( // Muestra un indicador de carga si está cargando
                    <ActivityIndicator size="large" color={AppColors.yellow} />
                ) : (
                    // Muestra las tarjetas de juegos revisados
                    [
                        ...new Map(reviews.map((review) => [review.videojuego.id, review])).values() // Filtra reseñas duplicadas
                    ].map((review) => (
                        <GameCard key={review.videojuego.id} reviewedGame={review} /> // Muestra cada tarjeta de juego
                    ))
                )}
            </View>
        </ScrollView>
    );
}
