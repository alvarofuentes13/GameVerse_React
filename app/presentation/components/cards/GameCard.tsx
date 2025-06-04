import {Image, Text, TouchableOpacity, View} from "react-native";
import {NavigationProp, useNavigation} from "@react-navigation/native";
import styles from "../../theme/Styles";
import React from "react";
import {AppColors} from "../../theme/AppTheme";
import {FontAwesome, MaterialIcons} from "@expo/vector-icons";
import {RootStackParamsList} from "../../../../App";


export default function GameCard({reviewedGame}: any){
    const navigation = useNavigation<NavigationProp<RootStackParamsList>>();
    const calificacion = reviewedGame.calificacion ?? 0;

    return(
        <TouchableOpacity style={{height: 140, width: 90, marginVertical: 3}}
        onPress={() => navigation.navigate("DescriptionScreen", {item: reviewedGame.videojuego})}>
            <Image source={reviewedGame.videojuego.portada} style={{height: 126, width: 90, borderRadius: 4}}/>
            <View style={{flexDirection: "row", marginTop: 2, gap: 1}}>
                {[...Array(calificacion)].map((_, index) => (
                    <FontAwesome
                        key={index}
                        name="star"
                        size={14}
                        color={AppColors.grey}
                    />
                ))}
            </View>
        </TouchableOpacity>
    )
}