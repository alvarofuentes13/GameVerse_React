import React from "react";
import { View, Text, Image, FlatList, TouchableOpacity, ScrollView } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import styles from "./Styles";
import {AppColors} from "../../theme/AppTheme";

const games = [
    { id: "1", image: require("../../../../assets/img/gta_v.png") },
    { id: "2", image: require("../../../../assets/img/gta_v.png") },
    { id: "3", image: require("../../../../assets/img/gta_v.png") },
    { id: "4", image: require("../../../../assets/img/gta_v.png") },
];

const recentGames = [
    { id: "1", image: require("../../../../assets/img/cyberpunk.png") },
    { id: "2", image: require("../../../../assets/img/cyberpunk.png") },
    { id: "3", image: require("../../../../assets/img/cyberpunk.png") },
    { id: "4", image: require("../../../../assets/img/cyberpunk.png") },
];

export default function ProfileScreen() {
    return (
        <ScrollView style={{ flex: 1, backgroundColor: "#0D0D25", padding: 20 }}>
            <View style={{ alignItems: "center", marginBottom: 20 }}>
                <Image
                    source={require("../../../../assets/img/bigahhforehead.png")}
                    style={{ width: 100, height: 100, borderRadius: 50, marginBottom: 10 }}
                />
                <Text style={{ color: "#fff", fontSize: 24, fontWeight: "bold" }}>Gustavo</Text>
                <Text style={{ color: "#aaa", fontSize: 14 }}>500 SEGUIDORES   420 Seguidos</Text>
            </View>

            <View style={{ flexDirection: "row", justifyContent: "space-around", marginBottom: 20 }}>
                <View style={{ alignItems: "center" }}>
                    <Text style={styles.headerNumber}>455</Text>
                    <Text style={styles.headerText}>Jugados</Text>
                </View>
                <View style={{ alignItems: "center" }}>
                    <Text style={styles.headerNumber}>33</Text>
                    <Text style={styles.headerText}>Jugado este año</Text>
                </View>
                <View style={{ alignItems: "center" }}>
                    <Text style={styles.headerNumber}>4</Text>
                    <Text style={styles.headerText}>Listas</Text>
                </View>
                <View style={{ alignItems: "center" }}>
                    <Text style={styles.headerNumber}>30</Text>
                    <Text style={styles.headerText}>Reseñas</Text>
                </View>
            </View>

            {/* Videojuegos favoritos */}
            <Text style={{ color: "#fff", fontSize: 18, marginBottom: 10 }}>Videojuegos favoritos de Gustavo</Text>
            <FlatList
                horizontal
                data={games}
                renderItem={({ item }) => (
                    <Image source={item.image} style={{ width: 100, height: 140, marginRight: 10, borderRadius: 8 }} />
                )}
                keyExtractor={(item) => item.id}
                showsHorizontalScrollIndicator={false}
            />

            {/* Videojuegos jugados recientemente */}
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 20, marginBottom: 15 }}>
                <Text style={{ color: "#fff", fontSize: 18 }}>Videojuegos jugados recientemente</Text>
                <TouchableOpacity>
                    <Text style={{ color: AppColors.primary }}>Ver todos</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                horizontal
                data={recentGames}
                renderItem={({ item }) => (
                    <Image source={item.image} style={{ width: 100, height: 140, marginRight: 10, borderRadius: 8 }} />
                )}
                keyExtractor={(item) => item.id}
                showsHorizontalScrollIndicator={false}
            />

            {/* Reseñas */}
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 20 }}>
                <Text style={{ color: "#fff", fontSize: 18 }}>Reviews de Gustavo</Text>
                <TouchableOpacity>
                    <Text style={{ color: AppColors.primary }}>Ver todos</Text>
                </TouchableOpacity>
            </View>
            <View style={{ backgroundColor: "#1C1C3A", padding: 15, borderRadius: 10, marginTop: 10 }}>
                <Text style={{ color: AppColors.white, fontSize: 16 }}>GTA V 2013</Text>
                <Text style={{ color: "#aaa", fontSize: 14 }}>Reseña de Gustavo ⭐⭐⭐⭐</Text>
                <Text style={{ color: "#fff", fontSize: 12, marginTop: 5 }}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean vulputate porta tortor, eget tincidunt elit luctus vel...
                </Text>
            </View>
            <View style={{ backgroundColor: "#1C1C3A", padding: 15, borderRadius: 10, marginTop: 10 }}>
                <Text style={{ color: AppColors.white, fontSize: 16 }}>GTA V 2013</Text>
                <Text style={{ color: "#aaa", fontSize: 14 }}>Reseña de Gustavo ⭐⭐⭐⭐</Text>
                <Text style={{ color: "#fff", fontSize: 12, marginTop: 5 }}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean vulputate porta tortor, eget tincidunt elit luctus vel...
                </Text>
            </View>
        </ScrollView>
    );
}
