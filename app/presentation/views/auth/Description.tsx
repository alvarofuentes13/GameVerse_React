import React, {useEffect, useState} from "react";
import {View, Text, Image, TouchableOpacity, ScrollView, ActivityIndicator} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import {NavigationProp, RouteProp, useNavigation, useRoute} from "@react-navigation/native";
import {AppColors, AppFonts} from "../../theme/AppTheme";
import {RootStackParamsList} from "../../../../App";
import {ReviewInterface} from "../../../domain/entities/Review";
import ReviewCard from "../../components/cards/ReviewCard";
import styles from "../../theme/Styles";
import {ApiDelivery} from "../../../data/sources/remote/api/ApiDelivery";

type DescriptionRouteProp = RouteProp<RootStackParamsList, "DescriptionScreen">;

export default function DescriptionScreen() {
    const navigation = useNavigation<NavigationProp<RootStackParamsList>>();
    const route = useRoute<DescriptionRouteProp>();
    const { item } = route.params;
    const [reviews, setReviews] = useState<ReviewInterface[]>([]);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {

        const fetchReviews = async () => {
            if (!item) return;

            try {
                const response = await ApiDelivery.get(`http://localhost:8080/api/reviews/videojuego/${item.id}`);
                setReviews(response.data);
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

            <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginBottom: 10 }}>
                <FontAwesome name="arrow-left" size={24} color="#FFF" />
            </TouchableOpacity>

            <View style={{ alignItems: "center", marginBottom: 20 }}>
                <Image
                    source={{ uri: item.coverUrl || item.portada }}
                    style={{ width: 150, height: 220, borderRadius: 10 }}
                />
                <Text style={styles.superText}>
                    {item.name || item.titulo}
                </Text>
                <Text style={{ fontSize: 16, color: "#AAA", fontFamily: AppFonts.regular }}>{(item.releaseDate || item.fechaLanzamiento)?.split("/")[2] ?? "Sin año"}</Text>
                <Text style={styles.normalText}>
                    {item.descripcion || item.summary}
                </Text>
            </View>

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
                    onPress={() => navigation.navigate("ReviewScreen", {item: item})}
                >
                    <FontAwesome name="star" size={16} color = {AppColors.yellow} style={{ marginRight: 5 }} />
                    <Text style={styles.headerText}>Valorar</Text>
                </TouchableOpacity>
            </View>

            {reviews.length != 0 ?
                <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 20 }}>
                    <Text style={styles.titleText}>Reviews de {item.titulo}</Text>
                </View>
                :
                <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 20 }}>
                    <Text style={styles.titleText}>Este juego no tiene reseñas, ¡escribe una!</Text>
                </View>}
            {cargando ? (
                <ActivityIndicator size="large" color={AppColors.yellow} style={{ marginTop: 10 }} />
            ) : (
                reviews.map((review) => (
                    <ReviewCard review={review} />
                ))
            )}

        </ScrollView>
    );
}
