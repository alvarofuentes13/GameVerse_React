import React, {useEffect, useState} from "react";
import {
    View,
    ScrollView,
    ActivityIndicator,
    TouchableOpacity, Text
} from "react-native";
import {AppColors} from "../../theme/AppTheme";
import {useFocusEffect, useNavigation} from "@react-navigation/native";
import {DrawerNavigationProp} from "@react-navigation/drawer";
import {DrawerParamsList} from "./Home";
import {FontAwesome} from "@expo/vector-icons";
import GameCard from "../../components/cards/GameCard";
import {useAuth} from "../client/context/AuthContext";
import {ApiDelivery} from "../../../data/sources/remote/api/ApiDelivery";
import styles from "../../theme/Styles";
import {ReviewInterface} from "../../../domain/entities/Review";

export default function GamesScreen() {
    const {user: usuario, token: token, setAuth} = useAuth();
    const navigation = useNavigation<DrawerNavigationProp<DrawerParamsList>>();
    const [reviews, setReviews] = useState<ReviewInterface[]>([]);
    const [cargando, setCargando] = useState(true);


    useFocusEffect(
        React.useCallback(() => {
        const fetchLists = async () => {
            if (!usuario) return; // Si el usuario no está definido, no hacemos la petición.

            try {
                const response = await ApiDelivery.get(`/reviews/usuario/${usuario.id}`);
                setReviews(response.data);
            } catch (error) {
                console.error("Error al obtener reviews:", error);
            } finally {
                setCargando(false);
            }
        };

        fetchLists();
    }, [usuario]));

    return (
        <ScrollView style={{backgroundColor: AppColors.background, width: "100%", height: "100%", padding: 20}}>

            <TouchableOpacity onPress={() => navigation.openDrawer()} style={{marginBottom: 20}}>
                <FontAwesome name="bars" size={28} color="white"/>
            </TouchableOpacity>
            <View>
                <Text style={styles.titleText}>Juegos que has valorado</Text>
            </View>

            <View style={{flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between"}}>
                {cargando ? (
                <ActivityIndicator size="large" color={AppColors.yellow}/>
            ) : (
                    [
                        ...new Map(reviews.map((review) => [review.videojuego.id, review])).values()
                    ].map((review) => (
                        <GameCard reviewedGame={review} />
                    ))
            )}
            </View>

        </ScrollView>

    );
}