import {Image, Text, TouchableOpacity, View} from "react-native";
import {useNavigation} from "@react-navigation/native";
import styles from "../../theme/Styles";
import React from "react";
import {AppColors} from "../../theme/AppTheme";
import {MaterialIcons} from "@expo/vector-icons";


export default function GameCard({reviewedGame}: any){
    const navigation = useNavigation();
    const calificacion = reviewedGame.calificacion ?? 0;

    return(
        <TouchableOpacity style={{height: 140, width: 90, marginVertical: 3}}>
            <Image source={reviewedGame.videojuego.portada} style={{height: 126, width: 90, borderRadius: 4}}/>
            <View style={{flexDirection: "row", marginTop: 2,}}>
                {[...Array(calificacion)].map((_, index) => (
                    <MaterialIcons
                        key={index}
                        name="star-rate"
                        size={14}
                        color={AppColors.grey}
                    />
                ))}
            </View>
        </TouchableOpacity>
    )
}