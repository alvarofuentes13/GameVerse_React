import {Text, View} from "react-native";
import {AppColors} from "../../theme/AppTheme";
import React from "react";


export default function ReviewCard({review}: any){
    return (
        <View key={review.id}
              style={{backgroundColor: "#1C1C3A", padding: 15, borderRadius: 10, marginTop: 10}}>
            <Text style={{color: AppColors.white, fontSize: 16}}>{review.videojuego.titulo}</Text>
            <Text style={{color: "#aaa", fontSize: 14}}>Reseña
                de {review.usuario.name} {"⭐".repeat(review.calificacion)} {review.favorito ? " ❤️" : ""}</Text>
            <Text style={{color: "#fff", fontSize: 12, marginTop: 5}}>{review.comentario}</Text>
        </View>
    )
}