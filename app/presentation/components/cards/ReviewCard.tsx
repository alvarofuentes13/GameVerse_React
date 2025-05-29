import {Image, Text, View} from "react-native";
import React from "react";
import styles from "../../theme/Styles";
import {FontAwesome, MaterialIcons} from "@expo/vector-icons";
import {AppColors} from "../../theme/AppTheme";


export default function ReviewCard({review}: any) {
    return (
        <View key={review.id}
              style={styles.reviewCard}>
            <Text style={styles.titleText}>{review.videojuego.titulo}</Text>
            <View style={{flexDirection: "row", gap: 6, marginVertical: 1}}>
                <Image source={review.usuario.avatar} style={{height: 20, width: 20, borderRadius: 50}}/>
                <Text style={styles.headerText}>{review.usuario.name}</Text>
                <Text style={styles.headerText}>
                    <View style={{alignItems: "center", flexDirection: "row", gap: 1}}>
                        {[...Array(review.calificacion)].map((_, index) => (
                            <FontAwesome
                                key={index}
                                name="star"
                                size={14}
                                color={AppColors.yellow}
                            />
                        ))}
                    </View>
                    {review.favorito ?
                        <FontAwesome name="heart" size={14} color={AppColors.alert} style={{marginLeft: 3}}/>
                        :
                        <Text/>}
                </Text>
            </View>
            <Text style={styles.normalText}>{review.comentario}</Text>
        </View>
    )
}