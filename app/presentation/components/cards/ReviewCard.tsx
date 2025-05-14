import {Text, View} from "react-native";
import {AppColors, AppFonts} from "../../theme/AppTheme";
import React from "react";
import styles from "../../theme/Styles";


export default function ReviewCard({review}: any){
    return (
        <View key={review.id}
              style={styles.reviewCard}>
            <Text style={styles.titleText}>{review.videojuego.titulo}</Text>
            <Text style={styles.headerText}>Reseña
                de {review.usuario.name} {"⭐".repeat(review.calificacion)} {review.favorito ? " ❤️" : ""}</Text>
            <Text style={styles.normalText}>{review.comentario}</Text>
        </View>
    )
}