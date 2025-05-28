import React, {useEffect, useState} from "react";
import {
    View,
    ScrollView,
    ActivityIndicator,
    TouchableOpacity,
    TextInput
} from "react-native";
import {AppColors, AppFonts} from "../../theme/AppTheme";
import ListCard from "../../components/cards/ListCard";
import {useNavigation} from "@react-navigation/native";
import {DrawerNavigationProp} from "@react-navigation/drawer";
import {useUser} from "../client/context/UserContext";
import {DrawerParamsList} from "./Home";
import {ListInterface} from "../../../domain/entitites/List";
import {FontAwesome} from "@expo/vector-icons";
import GameCard from "../../components/cards/GameCard";

export default function GamesScreen() {
    const usuario = useUser().user;
    const navigation = useNavigation<DrawerNavigationProp<DrawerParamsList>>();
    const [juegos, setJuegos] = useState<ListInterface[]>([]);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        const fetchLists = async () => {
            if (!usuario) return; // Si el usuario no está definido, no hacemos la petición.

            try {
                const response = await fetch('http://localhost:8080/api/reviews');
                const data = await response.json();
                setJuegos(data);
            } catch (error) {
                console.error("Error al obtener juegos:", error);
            } finally {
                setCargando(false);
            }
        };

        fetchLists();
    }, [usuario]);

    return (
        <ScrollView style={{backgroundColor: AppColors.background, width: "100%", height: "100%", padding: 20}}>

            <TouchableOpacity onPress={() => navigation.openDrawer()} style={{marginBottom: 20}}>
                <FontAwesome name="bars" size={28} color="white"/>
            </TouchableOpacity>

            <View style={{flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between"}}>
                {cargando ? (
                <ActivityIndicator size="large" color={AppColors.yellow}/>
            ) : (
                juegos
                    .map((juego) => (
                        <GameCard reviewedGame={juego} />
                    ))
            )}
            </View>


        </ScrollView>

    );
}