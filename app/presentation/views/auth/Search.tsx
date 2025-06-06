import React, { useState, useEffect } from "react"; // Importa React y hooks
import {
    View,
    Text,
    TextInput,
    FlatList,
    Image,
    TouchableOpacity,
    ActivityIndicator,
    ScrollView
} from "react-native"; // Importa componentes de React Native
import { FontAwesome } from "@expo/vector-icons"; // Importa iconos de FontAwesome
import { NavigationProp, useNavigation } from "@react-navigation/native"; // Importa hooks para la navegación
import App, { RootStackParamsList } from "../../../../App"; // Importa tipos de parámetros de navegación
import styles from "../../theme/Styles"; // Importa estilos
import { AppColors, AppFonts } from "../../theme/AppTheme"; // Importa colores y fuentes de la temática
import { VideojuegoInterface } from "../../../domain/entities/Videojuego"; // Importa la interfaz para Videojuego
import ListCard from "../../components/cards/ListCard"; // Importa el componente ListCard
import { ApiDelivery } from "../../../data/sources/remote/api/ApiDelivery"; // Importa la API para operaciones remotas

// Componente principal de la pantalla de búsqueda
export default function SearchScreen() {
    const navigation = useNavigation<NavigationProp<RootStackParamsList>>(); // Inicializa la navegación
    const [search, setSearch] = useState(""); // Estado para la búsqueda
    const [games, setGames] = useState<VideojuegoInterface[]>([]); // Estado para los juegos encontrados
    const [listas, setListas] = useState<any[]>([]); // Estado para las listas encontradas
    const [loading, setLoading] = useState(false); // Estado para indicar si se está cargando
    const [tipoBusqueda, setTipoBusqueda] = useState<"juegos" | "listas">("juegos"); // Tipo de búsqueda

    // Limpiar resultados al cambiar tipo de búsqueda
    useEffect(() => {
        setSearch("");
        setGames([]);
        setListas([]);
    }, [tipoBusqueda]);

    // Realiza la búsqueda con debounce
    useEffect(() => {
        if (search.trim().length === 0) {
            setGames([]);
            setListas([]);
            return;
        }

        const delayDebounce = setTimeout(() => {
            searchContent(search); // Llama a la función de búsqueda después de un retraso
        }, 500);

        return () => clearTimeout(delayDebounce); // Limpia el timeout en caso de que cambie la búsqueda
    }, [search, tipoBusqueda]);

    // Función para buscar contenido
    const searchContent = async (query: string) => {
        setLoading(true); // Indica que se está cargando
        try {
            const endpoint =
                tipoBusqueda === "juegos"
                    ? `http://localhost:8080/api/igdb/videojuegos/search/${query}` // Endpoint para buscar juegos
                    : `http://localhost:8080/api/listas/search/${query}`; // Endpoint para buscar listas

            const response = await ApiDelivery.get(endpoint); // Realiza la petición a la API

            if (tipoBusqueda === "juegos") {
                setGames(response.data); // Establece los juegos encontrados
            } else {
                setListas(response.data); // Establece las listas encontradas
            }
        } catch (error) {
            console.error("Error al buscar:", error); // Manejo de errores
        } finally {
            setLoading(false); // Indica que la carga ha terminado
        }
    };

    return (
        <View style={{ backgroundColor: AppColors.background, flex: 1, padding: 20 }}>
            {/* Campo de búsqueda */}
            <View style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: AppColors.cardBackground,
                borderRadius: 10,
                padding: 10,
                borderWidth: 2,
                borderColor: "#24243C"
            }}>
                <FontAwesome name="search" size={20} color="#FFF" style={{ marginRight: 10 }} />
                <TextInput
                    style={{
                        color: AppColors.grey,
                        fontFamily: AppFonts.regular,
                        fontSize: 14,
                        flex: 1
                    }}
                    placeholder={`Buscar ${tipoBusqueda === "juegos" ? "juegos" : "listas"}...`} // Placeholder dinámico
                    placeholderTextColor="#777"
                    value={search} // Valor del campo de búsqueda
                    onChangeText={setSearch} // Actualiza el estado de búsqueda
                />
            </View>

            {/* Botones para seleccionar tipo de búsqueda */}
            <View style={{ flexDirection: "row", justifyContent: "center", padding: 20 }}>
                <TouchableOpacity
                    onPress={() => setTipoBusqueda("juegos")} // Cambia a búsqueda de juegos
                    style={{
                        padding: 10,
                        backgroundColor: tipoBusqueda === "juegos" ? AppColors.secondary : AppColors.cardBackground,
                        borderTopLeftRadius: 10,
                        borderBottomLeftRadius: 10,
                        borderWidth: 3,
                        borderRightWidth: 0,
                        borderColor: AppColors.primary,
                        width: 80,
                        justifyContent: "center", alignItems: "center"
                    }}
                >
                    <Text style={{ color: AppColors.primary, fontFamily: AppFonts.bold }}>Juegos</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => setTipoBusqueda("listas")} // Cambia a búsqueda de listas
                    style={{
                        padding: 10,
                        backgroundColor: tipoBusqueda === "listas" ? AppColors.secondary : AppColors.cardBackground,
                        borderTopRightRadius: 10,
                        borderBottomRightRadius: 10,
                        borderWidth: 3,
                        borderLeftWidth: 0,
                        borderColor: AppColors.primary,
                        width: 80,
                        justifyContent: "center", alignItems: "center"
                    }}
                >
                    <Text style={{ color: AppColors.primary, fontFamily: AppFonts.bold }}>Listas</Text>
                </TouchableOpacity>
            </View>

            {/* Indicador de carga */}
            {loading && <ActivityIndicator size="large" color="#FFF" style={{ marginTop: 20 }} />}

            {/* Renderiza los resultados de búsqueda */}
            {tipoBusqueda === "juegos" ? (
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={games} // Datos de juegos
                    keyExtractor={(item: VideojuegoInterface) => item.id.toString()} // Llave única para cada juego
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                backgroundColor: AppColors.cardBackground,
                                padding: 10,
                                borderRadius: 10,
                                marginTop: 15,
                            }}
                            onPress={() => navigation.navigate("DescriptionScreen", { item })} // Navega a la pantalla de descripción
                        >
                            <Image source={{ uri: item.coverUrl || item.portada }}
                                   style={{ width: 60, height: 80, borderRadius: 8, marginRight: 10 }} />
                            <View style={{ flex: 1 }}>
                                <Text style={styles.titleText}>{item.name || item.titulo}</Text> {/* Título del juego */}
                                <Text style={styles.normalText}>
                                    {(item.releaseDate || item.fechaLanzamiento)?.split("/")[2] ?? "Sin año"} {/* Año de lanzamiento */}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    )}
                />
            ) : (
                <ScrollView style={{ borderRadius: 10, marginTop: 10 }}>
                    {listas.map((lista) => (
                        lista && lista.id && (
                            <ListCard lista={lista} key={lista.id.toString()} /> // Renderiza cada lista
                        )
                    ))}
                </ScrollView>
            )}
        </View>
    );
}
