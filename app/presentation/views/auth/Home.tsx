import React, { useEffect, useState } from "react"; // Importa React y hooks
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    ActivityIndicator,
    StyleSheet
} from "react-native"; // Importa componentes de React Native
import { createDrawerNavigator, DrawerNavigationProp } from "@react-navigation/drawer"; // Importa navegación del drawer
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"; // Importa navegación de tabs
import { useFocusEffect, useNavigation } from "@react-navigation/native"; // Importa hooks de navegación
import { FontAwesome, MaterialIcons } from "@expo/vector-icons"; // Importa iconos de FontAwesome y MaterialIcons
import { AppColors } from "../../theme/AppTheme"; // Importa colores de la temática
import styles from "../../theme/Styles"; // Importa estilos
import { RootStackParamsList } from "../../../../App"; // Importa tipos de navegación
import ProfileScreen from "./Profile"; // Importa pantalla de perfil
import SearchScreen from "./Search"; // Importa pantalla de búsqueda
import { VideojuegoCategoryListHome } from "../client/category/list/CategoryList"; // Importa lista de categorías de videojuegos
import { ReviewInterface } from "../../../domain/entities/Review"; // Importa interfaz de reseña
import ReviewCard from "../../components/cards/ReviewCard"; // Importa componente de tarjeta de reseña
import ListScreen from "./List"; // Importa pantalla de listas
import SmallListCard from "../../components/cards/SmallListCard"; // Importa componente de tarjeta de lista
import { ListInterface } from "../../../domain/entities/List"; // Importa interfaz de lista
import GamesScreen from "./Games"; // Importa pantalla de juegos
import { useAuth } from "../client/context/AuthContext"; // Importa contexto de autenticación
import { ApiDelivery } from "../../../data/sources/remote/api/ApiDelivery"; // Importa API para obtener reseñas

export type DrawerParamsList = {
    Inicio: undefined,
    Listas: undefined,
    Juegos: undefined,
}

// Componente principal de la pantalla de inicio
function HomeScreen() {
    const navigation = useNavigation<DrawerNavigationProp<DrawerParamsList>>(); // Inicializa la navegación

    const { user: usuario, token, setAuth } = useAuth(); // Obtiene datos del usuario desde el contexto
    const [reviews, setReviews] = useState<ReviewInterface[]>([]); // Estado para las reseñas
    const [listas, setListas] = useState<ListInterface[]>([]); // Estado para las listas
    const [cargando, setCargando] = useState(true); // Estado para el cargando

    // Efecto para obtener reseñas y listas al enfocar el componente
    useFocusEffect(
        React.useCallback(() => {
            const fetchReviews = async () => {
                if (!usuario) return; // Si el usuario no está definido, no hacemos la petición.

                try {
                    const response = await ApiDelivery.get(`/reviews`); // Llama a la API para obtener reseñas
                    setReviews(response.data); // Establece las reseñas en el estado
                } catch (error) {
                    console.error("Error al obtener reviews:", error); // Manejo de errores
                } finally {
                    setCargando(false); // Cambia el estado de cargando
                }
            };

            const fetchLists = async () => {
                if (!usuario) return; // Si el usuario no está definido, no hacemos la petición.

                try {
                    const response = await ApiDelivery.get(`/listas`); // Llama a la API para obtener listas
                    setListas(response.data); // Establece las listas en el estado
                } catch (error) {
                    console.error("Error al obtener listas:", error); // Manejo de errores
                } finally {
                    setCargando(false); // Cambia el estado de cargando
                }
            };

            fetchLists(); // Llama a la función para obtener listas
            fetchReviews(); // Llama a la función para obtener reseñas
        }, [usuario]) // Dependencia en usuario
    );

    return (
        <ScrollView style={{ backgroundColor: AppColors.background, width: "100%", height: "100%", padding: 20 }}>
            {/* Botón para abrir el drawer */}
            <TouchableOpacity onPress={() => navigation.openDrawer()} style={{ marginBottom: 20 }}>
                <FontAwesome name="bars" size={28} color="white" />
            </TouchableOpacity>

            <Text style={styles.superText}>Hola, {usuario?.name}!</Text> {/* Saludo al usuario */}

            <View>
                <Text style={styles.titleText}>Videojuegos populares de este mes</Text>
                <VideojuegoCategoryListHome /> {/* Componente que muestra la lista de videojuegos */}
            </View>

            <View style={{ marginVertical: 20 }}>
                <Text style={styles.titleText}>Listas populares</Text>
                <View style={homeStyles.listContainer}>
                    {cargando ? ( // Muestra un indicador de carga si está cargando
                        <ActivityIndicator size="large" color={AppColors.yellow} style={{ marginTop: 10 }} />
                    ) : (
                        listas.slice(0, 3).map((lista) => (
                            <SmallListCard key={lista.id} lista={lista} /> // Muestra cada tarjeta de lista
                        ))
                    )}
                </View>
            </View>

            <View>
                <Text style={styles.titleText}>Reviews populares</Text>
                {cargando ? ( // Muestra un indicador de carga si está cargando
                    <ActivityIndicator size="large" color={AppColors.yellow} style={{ marginTop: 10 }} />
                ) : (
                    reviews.slice(0, 4).map((review) => (
                        <ReviewCard key={review.id} review={review} /> // Muestra cada tarjeta de reseña
                    ))
                )}
            </View>
        </ScrollView>
    );
}

// Configuración del Drawer Navigator
const Drawer = createDrawerNavigator<DrawerParamsList>();
const Tab = createBottomTabNavigator<RootStackParamsList>();

// Componente de navegación por tabs
export function HomeTabs() {
    return (
        <Tab.Navigator screenOptions={{
            headerShown: false,
            tabBarStyle: styles.bottomTab,
            tabBarActiveTintColor: AppColors.primary,
            tabBarInactiveTintColor: AppColors.grey,
        }}>
            <Tab.Screen name="HomeScreen" component={HomeScreen} options={{
                tabBarShowLabel: false,
                tabBarItemStyle: styles.tabItem,
                tabBarIcon: ({ color }) => <FontAwesome name="home" size={35} color={color} />,
            }} />
            <Tab.Screen name="SearchScreen" component={SearchScreen} options={{
                tabBarShowLabel: false,
                tabBarItemStyle: styles.tabItem,
                tabBarIcon: ({ color }) => <MaterialIcons name="search" size={35} color={color} />,
            }} />
            <Tab.Screen name="ProfileScreen" component={ProfileScreen} options={{
                tabBarShowLabel: false,
                tabBarItemStyle: styles.tabItem,
                tabBarIcon: ({ color }) => <MaterialIcons name="person" size={35} color={color} />,
            }} />
        </Tab.Navigator>
    );
}

// Componente principal del Drawer Navigator
export default function DrawerNavigator() {
    return (
        <Drawer.Navigator
            screenOptions={{
                drawerItemStyle: styles.drawerItem,
                drawerStyle: styles.drawerNav,
                headerShown: false,
                drawerActiveTintColor: AppColors.primary,
                drawerInactiveTintColor: AppColors.grey,
            }}>
            <Drawer.Screen name="Inicio" component={HomeTabs} />
            <Drawer.Screen name="Juegos" component={GamesScreen} />
            <Drawer.Screen name="Listas" component={ListScreen} />
        </Drawer.Navigator>
    );
}

// Estilos personalizados para la pantalla de inicio
const homeStyles = StyleSheet.create({
    listContainer: {
        flexDirection: "row",
        height: 170,
        gap: "33%"
    }
});
