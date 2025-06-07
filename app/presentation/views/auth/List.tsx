import React, { useEffect, useState } from "react"; // Importa React y hooks
import {
    View,
    ScrollView,
    ActivityIndicator,
    TouchableOpacity,
    TextInput
} from "react-native"; // Importa componentes de React Native
import { AppColors, AppFonts } from "../../theme/AppTheme"; // Importa colores y fuentes de la temática
import ListCard from "../../components/cards/ListCard"; // Importa componente de tarjeta de lista
import { useFocusEffect, useNavigation } from "@react-navigation/native"; // Importa hooks de navegación
import { DrawerNavigationProp } from "@react-navigation/drawer"; // Importa tipos de navegación del drawer
import { useUser } from "../client/context/UserContext"; // Importa contexto de usuario
import { DrawerParamsList } from "./Home"; // Importa tipos de parámetros del drawer
import { ListInterface } from "../../../domain/entities/List"; // Importa interfaz de lista
import { FontAwesome } from "@expo/vector-icons"; // Importa iconos de FontAwesome
import NewListDrawer from "../../components/modals/NewListDrawer"; // Importa componente de modal para nueva lista
import { useAuth } from "../client/context/AuthContext"; // Importa contexto de autenticación
import { ApiDelivery } from "../../../data/sources/remote/api/ApiDelivery"; // Importa API para obtener listas

// Componente principal de la pantalla de listas
export default function ListScreen() {
    const { user: usuario, token, setAuth } = useAuth(); // Obtiene datos del usuario desde el contexto
    const navigation = useNavigation<DrawerNavigationProp<DrawerParamsList>>(); // Inicializa la navegación

    const [listas, setListas] = useState<ListInterface[]>([]); // Estado para las listas
    const [cargando, setCargando] = useState(true); // Estado para el cargando
    const [search, setSearch] = useState(""); // Estado para la búsqueda

    // Efecto para obtener listas al enfocar el componente
    useFocusEffect(
        React.useCallback(() => {
            const fetchLists = async () => {
                if (!usuario) return; // Si el usuario no está definido, no hacemos la petición.

                try {
                    const response = await ApiDelivery.get(`/listas/usuario/${usuario.id}`); // Llama a la API para obtener listas del usuario
                    setListas(response.data); // Establece las listas en el estado
                } catch (error) {
                    console.error("Error al obtener listas:", error); // Manejo de errores
                } finally {
                    setCargando(false); // Cambia el estado de cargando
                }
            };

            fetchLists(); // Llama a la función para obtener listas
        }, [usuario]) // Dependencia en usuario
    );

    return (
        <View style={{ backgroundColor: AppColors.background, width: "100%", height: "100%", padding: 20 }}>

            <TouchableOpacity onPress={() => navigation.openDrawer()} style={{ marginBottom: 20 }}>
                <FontAwesome name="bars" size={28} color="white" />
            </TouchableOpacity>

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
                    style={{ color: AppColors.grey, fontFamily: AppFonts.regular, fontSize: 14 }}
                    placeholder="Buscar juegos..."
                    placeholderTextColor="#777"
                    value={search}
                    onChangeText={setSearch} // Actualiza el estado de búsqueda
                />
            </View>

            <ScrollView style={{ borderRadius: 10 }}>
                {cargando ? ( // Muestra un indicador de carga si está cargando
                    <ActivityIndicator size="large" color={AppColors.yellow} />
                ) : (
                    listas
                        .filter(lista => lista.nombre.toLowerCase().includes(search.toLowerCase())) // Filtra listas según la búsqueda
                        .map((lista) => (
                            <ListCard key={lista.id} lista={lista} /> // Muestra cada tarjeta de lista
                        ))
                )}
            </ScrollView>

            <NewListDrawer />
        </View>
    );
}
