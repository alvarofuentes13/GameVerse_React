import React, { useEffect, useState } from "react";
import { View, Text, Image, FlatList, ScrollView, ActivityIndicator } from "react-native";
import styles from "../../theme/Styles";
import { AppColors } from "../../theme/AppTheme";
import { useUser } from "../client/context/UserContext";
import {ReviewInterface} from "../../../domain/entitites/Review";
import {useFocusEffect} from "@react-navigation/native";

export default function ProfileScreen() {
    const usuario = useUser().user;
    const [reviews, setReviews] = useState<ReviewInterface[]>([]);
    const [cargando, setCargando] = useState(true);


        const fetchReviews = async () => {
            if (!usuario) return; // Si el usuario no está definido, no hacemos la petición.

            try {
                const response = await fetch(`http://localhost:8080/api/reviews/usuario/${usuario.id}`);
                const data = await response.json();
                setReviews(data);
                console.log(data);
            } catch (error) {
                console.error("Error al obtener reviews:", error);
            } finally {
                setCargando(false);
            }
        };

    useFocusEffect(
        React.useCallback(() => {
            setCargando(true); // Iniciamos el estado de carga cada vez que la pantalla se enfoque
            fetchReviews(); // Cargamos las reseñas
        }, [usuario]) // Dependemos de usuario, ya que si el usuario cambia, queremos que se recargue la data
    );


    return (
        <ScrollView style={{ flex: 1, backgroundColor: "#0D0D25", padding: 20 }}>
            {/* Información del usuario */}
            <View style={{ alignItems: "center", marginBottom: 20 }}>
                <Image
                    source={usuario?.avatar ? usuario.avatar : require("../../../../assets/img/bigahhforehead.png")}
                    style={{ width: 100, height: 100, borderRadius: 50, marginBottom: 10 }}
                />
                <Text style={{ color: "#fff", fontSize: 24, fontWeight: "bold" }}>{usuario?.name}</Text>
            </View>

            {/* Videojuegos favoritos (de las reviews) */}
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 20, marginBottom: 15 }}>
                <Text style={{ color: "#fff", fontSize: 18 }}>Tus videojuegos favoritos</Text>
            </View>
            {cargando ? (
                <ActivityIndicator size="large" color={AppColors.yellow} />
            ) : (
                <FlatList
                    horizontal
                    data={reviews.map(review => review.videojuego)} // Extraemos los videojuegos de las reviews
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <Image source={{ uri: item.portada }} style={{ width: 100, height: 140, marginRight: 10, borderRadius: 8 }} />
                    )}
                    showsHorizontalScrollIndicator={false}
                />
            )}

            {/* Reviews del usuario */}
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 20 }}>
                <Text style={{ color: "#fff", fontSize: 18 }}>Reviews de {usuario?.name}</Text>
            </View>
            {cargando ? (
                <ActivityIndicator size="large" color={AppColors.yellow} style={{ marginTop: 10 }} />
            ) : (
                reviews.map((review) => (
                    <View key={review.id} style={{ backgroundColor: "#1C1C3A", padding: 15, borderRadius: 10, marginTop: 10 }}>
                        <Text style={{ color: AppColors.white, fontSize: 16 }}>{review.videojuego.titulo}</Text>
                        <Text style={{ color: "#aaa", fontSize: 14 }}>Reseña de {usuario?.name} {"⭐".repeat(review.calificacion)}</Text>
                        <Text style={{ color: "#fff", fontSize: 12, marginTop: 5 }}>{review.comentario}</Text>
                    </View>
                ))
            )}
        </ScrollView>
    );
}
