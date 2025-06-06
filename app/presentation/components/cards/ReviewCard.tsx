import { Image, Text, TouchableOpacity, View } from "react-native"; // Importa componentes de React Native para la interfaz de usuario
import React from "react"; // Importa React
import styles from "../../theme/Styles"; // Importa estilos personalizados
import { FontAwesome } from "@expo/vector-icons"; // Importa iconos de FontAwesome
import { AppColors } from "../../theme/AppTheme"; // Importa colores de la aplicación
import { NavigationProp, useNavigation } from "@react-navigation/native"; // Importa tipos y hooks para la navegación
import { RootStackParamsList } from "../../../../App"; // Importa la lista de parámetros de navegación

// Componente funcional que representa una tarjeta de reseña
export default function ReviewCard({ review }: any) {
    // Obtiene el objeto de navegación
    const navigation = useNavigation<NavigationProp<RootStackParamsList>>();

    return (
        <View key={review.id} style={styles.reviewCard}> // Contenedor principal de la tarjeta de reseña
            <TouchableOpacity onPress={() => navigation.navigate("DescriptionScreen", { item: review.videojuego })}>
                <Text style={styles.titleText}>{review.videojuego.titulo}</Text> // Muestra el título del videojuego
            </TouchableOpacity>
            <View style={{ flexDirection: "row", gap: 6, marginVertical: 1 }}> // Contenedor para el usuario y calificación
                <Image
                    source={review.usuario.avatar} // Fuente de la imagen del avatar del usuario
                    style={{ height: 20, width: 20, borderRadius: 50 }} // Estilo del avatar
                />
                <Text style={styles.headerText}>{review.usuario.name}</Text> // Muestra el nombre del usuario
                <Text style={styles.headerText}>
                    <View style={{ alignItems: "center", flexDirection: "row", gap: 1 }}> // Contenedor para las estrellas de calificación
                        {[...Array(review.calificacion)].map((_, index) => ( // Crea un array de estrellas basado en la calificación
                            <FontAwesome
                                key={index} // Clave única para cada estrella
                                name="star" // Nombre del icono de estrella
                                size={14} // Tamaño del icono
                                color={AppColors.yellow} // Color de la estrella
                            />
                        ))}
                    </View>
                    {review.favorito ? // Condicional para mostrar el icono de corazón si es favorito
                        <FontAwesome name="heart" size={14} color={AppColors.alert} style={{ marginLeft: 3 }} />
                        :
                        <Text /> // Espacio vacío si no es favorito
                    }
                </Text>
            </View>
            <Text style={styles.normalText}>{review.comentario}</Text> // Muestra el comentario de la reseña
        </View>
    );
}
