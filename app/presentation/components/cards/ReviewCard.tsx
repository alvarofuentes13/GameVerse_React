import {Image, Text, View} from "react-native";
import React from "react";
import styles from "../../theme/Styles";


export default function ReviewCard({review}: any) {
    return (
        <View key={review.id}
              style={styles.reviewCard}>
            <Text style={styles.titleText}>{review.videojuego.titulo}</Text>
            <View style={{flexDirection: "row", gap: 6, marginVertical: 1}}>
                <Image source={review.usuario.avatar} style={{height: 20, width: 20, borderRadius: 50}}/>
                <Text style={styles.headerText}>{review.usuario.name}</Text>
                <Text style={styles.headerText}>
                    {"⭐".repeat(review.calificacion)} {review.favorito ? " ❤️" : ""}
                </Text>
            </View>
            <Text style={styles.normalText}>{review.comentario}</Text>
        </View>
    )
}