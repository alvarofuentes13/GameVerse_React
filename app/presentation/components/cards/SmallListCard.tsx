import { Image, StyleSheet, TouchableOpacity, View } from "react-native"; // Importa componentes de React Native
import React from "react"; // Importa React
import { VideojuegoInterface } from "../../../domain/entities/Videojuego"; // Importa la interfaz del videojuego
import { NavigationProp, useNavigation } from "@react-navigation/native"; // Importa tipos y hooks para la navegación
import { RootStackParamsList } from "../../../../App"; // Importa la lista de parámetros de navegación

// Componente funcional que representa una tarjeta pequeña de lista
export default function SmallListCard({ lista }: any) {
    // Obtiene el objeto de navegación
    const navigation = useNavigation<NavigationProp<RootStackParamsList>>();

    return (
        <TouchableOpacity onPress={() => navigation.navigate("ListDescriptionScreen", { lista })}>
            <View style={{ height: "100%", width: "33%", flexDirection: "column" }}> // Contenedor principal de la tarjeta
                <View key={lista.id} style={listCardStyles.listaContainer}>
                    {lista.videojuegos.slice(0, 3).map((game: VideojuegoInterface, index: number) => ( // Mapea los primeros 3 videojuegos
                        <Image
                            key={game.id} // Clave única para cada imagen de videojuego
                            source={{ uri: game.portada }} // Fuente de la imagen de la portada del videojuego
                            style={{
                                position: "absolute", // Posiciona las imágenes de manera absoluta
                                left: index * 12 + 8, // Desplaza las imágenes a la izquierda
                                height: 150 - (6 * index), // Ajusta la altura de la imagen
                                width: 107 - (6 * index), // Ajusta el ancho de la imagen
                                zIndex: lista.videojuegos.length - index, // Controla el apilamiento de las imágenes
                                borderRadius: 4 // Bordes redondeados de las imágenes
                            }}
                        />
                    ))}
                </View>
            </View>
        </TouchableOpacity>
    );
}

// Estilos personalizados para el componente SmallListCard
const listCardStyles = StyleSheet.create({
    container: {
        flexDirection: "row" // Dirección de los elementos en fila
    },
    listaContainer: {
        borderColor: "#24243C", // Color del borde
        height: "100%", // Altura del contenedor
        width: "100%", // Ancho del contenedor
        alignContent: "center", // Alineación del contenido en el centro
        justifyContent: "center", // Justificación del contenido en el centro
    },
});
