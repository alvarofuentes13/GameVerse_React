import React, {useEffect, useState} from "react";
import {View, Text, Image, TouchableOpacity, ScrollView, ActivityIndicator} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import {NavigationProp, RouteProp, useNavigation, useRoute} from "@react-navigation/native";
import {AppColors, AppFonts} from "../../theme/AppTheme";
import {RootStackParamsList} from "../../../../App";
import {useUser} from "../client/context/UserContext";
import {ReviewInterface} from "../../../domain/entitites/Review";

type GameDescriptionRouteProp = RouteProp<RootStackParamsList, "GameDescriptionScreen">;

export default function GameDescriptionScreen() {
    const navigation = useNavigation<NavigationProp<RootStackParamsList>>();
    const route = useRoute<GameDescriptionRouteProp>();
    const usuario = useUser().user;
    console.log(usuario?.name, " ha iniciado sesión");
    const { item } = route.params;
    console.log("Game Description Screen", item);

    const [reviews, setReviews] = useState<ReviewInterface[]>([]);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        const fetchReviews = async () => {
            if (!item) return; // Si el item no está definido, no hacemos la petición.

            try {
                const response = await fetch(`http://localhost:8080/api/reviews/videojuego/${item.id}`);
                const data = await response.json();
                setReviews(data);
                console.log(data);
            } catch (error) {
                console.error("Error al obtener reviews:", error);
            } finally {
                setCargando(false);
            }
        };

        fetchReviews();
    }, []);




    return (
        <ScrollView style={{ flex: 1, backgroundColor: "#0D0D25", padding: 20 }}>
            {/* Botón de regreso */}
            <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginBottom: 10 }}>
                <FontAwesome name="arrow-left" size={24} color="#FFF" />
            </TouchableOpacity>

            {/* Imagen y detalles del juego */}
            <View style={{ alignItems: "center", marginBottom: 20 }}>
                <Image
                    source={{uri: item.portada}}
                    style={{ width: 150, height: 220, borderRadius: 10 }}
                />
                <Text style={{ color: "#FFF", fontSize: 24, fontWeight: "bold", marginTop: 10, fontFamily: AppFonts.bold }}>
                    {item.titulo}
                </Text>
                <Text style={{ fontSize: 16, color: "#AAA", fontFamily: AppFonts.regular }}>{item.fechaLanzamiento.split("-")[0]}</Text>
                <Text style={{ color: "#AAA", textAlign: "center", marginTop: 10 }}>
                    {item.descripcion}
                </Text>
            </View>

            {/* Botones */}
            <View style={{ flexDirection: "row", justifyContent: "center", marginBottom: 20 }}>
                <TouchableOpacity
                    style={{
                        backgroundColor: "#1C1C3A",
                        padding: 10,
                        borderRadius: 8,
                        marginHorizontal: 10,
                        flexDirection: "row",
                        alignItems: "center",
                    }}
                    onPress={() => navigation.navigate("GameReviewScreen", {item: item})} //Si funciona :)
                >
                    <FontAwesome name="star" size={16} color = {AppColors.yellow} style={{ marginRight: 5 }} />
                    <Text style={{ color: "#FFF" }}>Valorar</Text>
                </TouchableOpacity>
            </View>


            {/* Reseñas */}
            {reviews.length != 0 ?
                <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 20 }}>
                    <Text style={{ color: "#fff", fontSize: 18, fontFamily: AppFonts.medium }}>Reviews de {item.titulo}</Text>
                </View>
                :
                <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 20 }}>
                    <Text style={{ color: "#fff", fontSize: 18, fontFamily: AppFonts.medium  }}>Este juego no tiene reseñas,¡escribe una!</Text>
                </View>}
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
