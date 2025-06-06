import React, { useEffect, useState } from "react"; // Importa React y hooks
import {
    ActivityIndicator,
    FlatList,
    Image,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native"; // Importa componentes de React Native
import { AppColors } from "../../theme/AppTheme"; // Importa colores de la temática
import { ReviewInterface } from "../../../domain/entities/Review"; // Importa la interfaz de reseña
import ReviewCard from "../../components/cards/ReviewCard"; // Importa el componente de tarjeta de reseña
import AvatarPickModal from "../../components/modals/AvatarPickModal"; // Importa el modal para seleccionar avatar
import styles from "../../theme/Styles"; // Importa estilos
import { MaterialIcons } from "@expo/vector-icons"; // Importa iconos de MaterialIcons
import { useAuth } from "../client/context/AuthContext"; // Importa contexto de autenticación
import { ApiDelivery } from "../../../data/sources/remote/api/ApiDelivery"; // Importa la API para operaciones remotas
import { useFocusEffect } from "@react-navigation/native"; // Importa hook para manejar el enfoque de la pantalla

// Componente principal de la pantalla de perfil
export default function ProfileScreen() {
    const { user: usuario, setAuth } = useAuth(); // Obtiene el usuario y función para actualizar la autenticación

    const [reviews, setReviews] = useState<ReviewInterface[]>([]); // Estado para las reseñas
    const [cargando, setCargando] = useState(true); // Estado para la carga
    const [modalVisible, setModalVisible] = useState(false); // Estado para controlar la visibilidad del modal
    const [isEditing, setIsEditing] = useState(false); // Estado para controlar si se está editando la biografía
    const [text, setText] = useState(usuario?.biografia || ""); // Estado para la biografía
    const [seguidores, setSeguidores] = useState(""); // Estado para el número de seguidores
    const [seguidos, setSeguidos] = useState(""); // Estado para el número de seguidos

    // Opciones de avatares disponibles
    const avatarOptions = [
        require("../../../../assets/img/avatars/KiAdiMundi.png"),
        require("../../../../assets/img/avatars/Androide.png"),
        require("../../../../assets/img/avatars/Ewok.png"),
        require("../../../../assets/img/avatars/Greedo.png"),
        require("../../../../assets/img/avatars/Jarjar.png"),
    ];

    // Filtra las reseñas favoritas y obtiene los videojuegos únicos
    const reviewsFavoritas = reviews.filter((review) => review.favorito);
    const videojuegosUnicos = Array.from(
        new Map(reviewsFavoritas.map((review) => [review.videojuego.id, review.videojuego])).values()
    );

    // Función para alternar el modo de edición de la biografía
    const toggleEdit = () => {
        if (usuario?.biografia !== text) {
            if (isEditing && usuario) {
                ApiDelivery.put(`/usuarios/id/${usuario.id}`, {
                    ...usuario,
                    biografia: text,
                })
                    .then((response) => {
                        setAuth(response.data); // Actualiza el contexto de autenticación con los nuevos datos
                        console.log("Biografía actualizada.");
                    })
                    .catch((error) => {
                        console.error("Error al actualizar la biografía:", error);
                    });
            }
        }
        setIsEditing(!isEditing); // Cambia el estado de edición
    };

    // Efecto para cargar datos del perfil al enfocar la pantalla
    useFocusEffect(
        React.useCallback(() => {
            const fetchData = async () => {
                if (!usuario) return;
                setCargando(true); // Indica que se está cargando
                try {
                    const [reviewsRes, seguidoresRes, seguidosRes] = await Promise.all([
                        ApiDelivery.get(`/reviews/usuario/${usuario.id}`), // Obtiene las reseñas del usuario
                        ApiDelivery.get(`/usuarios/count_seguidores/${usuario.id}`), // Obtiene el número de seguidores
                        ApiDelivery.get(`/usuarios/count_seguidos/${usuario.id}`), // Obtiene el número de seguidos
                    ]);

                    setReviews(reviewsRes.data); // Actualiza el estado de reseñas
                    setSeguidores(seguidoresRes.data); // Actualiza el número de seguidores
                    setSeguidos(seguidosRes.data); // Actualiza el número de seguidos
                } catch (error) {
                    console.error("Error cargando perfil:", error); // Manejo de errores
                } finally {
                    setCargando(false); // Indica que la carga ha terminado
                }
            };

            setText(usuario?.biografia || ""); // Establece la biografía al cargar
            fetchData(); // Llama a la función para cargar datos
        }, [usuario]) // Dependencia en el usuario
    );

    return (
        <ScrollView style={{ flex: 1, backgroundColor: AppColors.background, padding: 20 }}>
            <AvatarPickModal
                visible={modalVisible} // Controla la visibilidad del modal
                onClose={() => setModalVisible(false)} // Cierra el modal
                onSelect={async (avatar) => { // Maneja la selección de un avatar
                    if (!usuario) return;
                    // @ts-ignore
                    const avatarUri = avatar.uri; // Obtiene la URI del avatar seleccionado
                    if (avatarUri !== usuario.avatar) {
                        setAuth({ ...usuario, avatar: avatarUri }); // Actualiza el contexto de autenticación

                        ApiDelivery.put(`/usuarios/id/${usuario.id}`, {
                            ...usuario,
                            avatar: avatarUri,
                        })
                            .then((response) => {
                                console.log("Usuario actualizado:", response.data); // Confirma la actualización
                            })
                            .catch((error) => {
                                console.error("Error al actualizar avatar:", error); // Manejo de errores
                            });
                    }

                    setModalVisible(false); // Cierra el modal
                }}
                avatarOptions={avatarOptions} // Pasa las opciones de avatar al modal
            />

            {/* Información del usuario */}
            <View style={{ alignItems: "center", marginVertical: 10 }}>
                <TouchableOpacity onPress={() => setModalVisible(true)}> {/* Abre el modal al tocar la imagen */}
                    <Image
                        source={
                            usuario?.avatar
                                ? { uri: usuario.avatar } // Muestra el avatar del usuario
                                : require("../../../../assets/img/avatars/KiAdiMundi.png") // Avatar por defecto
                        }
                        style={{ width: 100, height: 100, borderRadius: 50, marginBottom: 10 }} // Estilo de la imagen
                    />
                </TouchableOpacity>
                <Text style={styles.superText}>{usuario?.name}</Text> {/* Nombre del usuario */}
                <View style={{ flexDirection: "row", gap: 5 }}>
                    {isEditing ? (
                        <TextInput
                            style={styles.normalText} // Estilo del input
                            value={text} // Valor del input
                            onChangeText={setText} // Actualiza el estado del texto
                            onBlur={toggleEdit} // Termina la edición al perder el foco
                            autoFocus // Enfoca automáticamente el input
                        />
                    ) : (
                        <Text style={styles.normalText}>{text}</Text> // Muestra la biografía
                    )}
                    <MaterialIcons name="edit" size={16} color={AppColors.grey} onPress={toggleEdit} /> {/* Icono de editar */}
                </View>
                <View style={{ flexDirection: "row", gap: 20, marginTop: 10 }}>
                    <View style={{ alignItems: "center" }}>
                        <Text style={styles.superNumber}>{seguidores}</Text> {/* Número de seguidores */}
                        <Text style={styles.headerText}>Seguidores</Text> {/* Texto de seguidores */}
                    </View>
                    <View style={{ alignItems: "center" }}>
                        <Text style={styles.superNumber}>{seguidos}</Text> {/* Número de seguidos */}
                        <Text style={styles.headerText}>Seguidos</Text> {/* Texto de seguidos */}
                    </View>
                </View>
            </View>

            {/* Videojuegos favoritos */}
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 20, marginBottom: 15 }}>
                <Text style={styles.titleText}>Tus videojuegos favoritos</Text> {/* Título de videojuegos favoritos */}
            </View>
            {cargando ? (
                <ActivityIndicator size="large" color={AppColors.yellow} /> // Indicador de carga
            ) : (
                <FlatList
                    horizontal // Lista horizontal
                    data={videojuegosUnicos} // Datos de videojuegos únicos
                    keyExtractor={(item) => item.id.toString()} // Clave única para cada item
                    renderItem={({ item }) => (
                        <Image
                            source={{ uri: item.portada }} // Muestra la portada del videojuego
                            style={{ width: 100, height: 140, marginRight: 18, borderRadius: 4 }} // Estilo de la imagen
                        />
                    )}
                    showsHorizontalScrollIndicator={false} // Oculta el indicador de desplazamiento
                />
            )}

            {/* Últimas reviews */}
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 20 }}>
                <Text style={styles.titleText}>Tus últimas reseñas</Text> {/* Título de últimas reseñas */}
            </View>
            {cargando ? (
                <ActivityIndicator size="large" color={AppColors.yellow} style={{ marginTop: 10 }} /> // Indicador de carga
            ) : (
                reviews.map((review) => <ReviewCard key={review.id} review={review} />) // Muestra las reseñas
            )}
        </ScrollView>
    );
}
