import { Image, Text, TouchableOpacity, View } from "react-native"; // Importa componentes de React Native para la interfaz de usuario
import { NavigationProp, useNavigation } from "@react-navigation/native"; // Importa tipos y hooks para la navegación
import styles from "../../theme/Styles"; // Importa estilos personalizados
import React from "react"; // Importa React
import { AppColors } from "../../theme/AppTheme"; // Importa colores de la aplicación
import { FontAwesome } from "@expo/vector-icons"; // Importa iconos de FontAwesome
import { RootStackParamsList } from "../../../../App"; // Importa la lista de parámetros de navegación

// Componente funcional que representa una tarjeta de juego
export default function GameCard({ reviewedGame }: any) {
    // Obtiene el objeto de navegación
    const navigation = useNavigation<NavigationProp<RootStackParamsList>>();
    // Obtiene la calificación del juego, o 0 si no está definida
    const calificacion = reviewedGame.calificacion ?? 0;

    return (
        <TouchableOpacity
            style={{ height: 140, width: 90, marginVertical: 3 }} // Estilo de la tarjeta
            onPress={() => navigation.navigate("DescriptionScreen", { item: reviewedGame.videojuego })} // Navega a la pantalla de descripción al presionar
        >
            <Image
                source={reviewedGame.videojuego.portada} // Fuente de la imagen de la portada del videojuego
                style={{ height: 126, width: 90, borderRadius: 4 }} // Estilo de la imagen
            />
            <View style={{ flexDirection: "row", marginTop: 2, gap: 1 }}>
                {[...Array(calificacion)].map((_, index) => ( // Crea un array de estrellas basado en la calificación
                    <FontAwesome
                        key={index} // Clave única para cada estrella
                        name="star" // Nombre del icono de estrella
                        size={14} // Tamaño del icono
                        color={AppColors.grey} // Color de la estrella
                    />
                ))}
            </View>
        </TouchableOpacity>
    );
}
