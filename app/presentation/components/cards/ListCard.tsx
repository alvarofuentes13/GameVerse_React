import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"; // Importa componentes de React Native para la interfaz de usuario
import styles from "../../theme/Styles"; // Importa estilos personalizados
import React from "react"; // Importa React
import { AppColors } from "../../theme/AppTheme"; // Importa colores de la aplicación
import { VideojuegoInterface } from "../../../domain/entities/Videojuego"; // Importa la interfaz del videojuego
import { NavigationProp, useNavigation } from "@react-navigation/native"; // Importa tipos y hooks para la navegación
import { RootStackParamsList } from "../../../../App"; // Importa la lista de parámetros de navegación

// Componente funcional que representa una tarjeta de lista
export default function ListCard({ lista }: any) {
    // Obtiene el objeto de navegación
    const navigation = useNavigation<NavigationProp<RootStackParamsList>>();

    return (
        <TouchableOpacity onPress={() => navigation.navigate("ListDescriptionScreen", { lista })}>
            <View key={lista.id} style={listCardStyles.listaContainer}>

                <View style={listCardStyles.textContainer}>
                    <View style={{ width: '70%' }}>
                        <Text style={styles.titleText}>{lista.nombre}</Text> // Muestra el nombre de la lista
                        <Text style={styles.headerText}>
                            Aquí van las etiquetas // Placeholder para etiquetas
                        </Text>
                        <Text numberOfLines={2} style={styles.normalText}>
                            {lista.descripcion} // Muestra la descripción de la lista
                        </Text>
                    </View>

                    <View style={listCardStyles.footer}>
                        <Image
                            source={lista.usuario.avatar} // Fuente de la imagen del avatar del usuario
                            style={{ height: 20, width: 20, borderRadius: 50 }} // Estilo del avatar
                        />
                        <Text style={styles.headerText}>{lista.usuario.name}</Text> // Muestra el nombre del usuario
                    </View>
                </View>

                <View style={{ alignContent: "flex-end" }}>
                    {lista.videojuegos.slice(0, 3).map((game: VideojuegoInterface, index: number) => (
                        <Image
                            key={game.id} // Clave única para cada imagen de videojuego
                            source={{ uri: game.portada }} // Fuente de la imagen de la portada del videojuego
                            style={{
                                position: "absolute", // Posiciona las imágenes de manera absoluta
                                right: index * 12, // Desplaza las imágenes a la derecha
                                height: 150,
                                width: 107,
                                borderTopRightRadius: 12,
                                borderBottomRightRadius: 12,
                                zIndex: lista.videojuegos.length - index, // Controla el apilamiento de las imágenes
                            }}
                        />
                    ))}
                </View>

            </View>
        </TouchableOpacity>
    );
}

// Estilos personalizados para el componente ListCard
const listCardStyles = StyleSheet.create({
    listaContainer: {
        backgroundColor: AppColors.cardBackground, // Color de fondo de la tarjeta
        borderRadius: 12, // Bordes redondeados
        marginTop: 15, // Margen superior
        borderColor: "#24243C", // Color del borde
        flexDirection: "row", // Dirección de los elementos en fila
        height: 150 // Altura de la tarjeta
    },
    textContainer: {
        flex: 1, // Permite que el contenedor de texto ocupe el espacio restante
        paddingRight: 12, // Espaciado a la derecha
        justifyContent: "space-between", // Espacia los elementos dentro del contenedor
        margin: 20, // Margen alrededor del contenedor de texto
    },
    footer: {
        flexDirection: "row", // Dirección de los elementos en fila
        gap: 8, // Espaciado entre elementos
    },
});
