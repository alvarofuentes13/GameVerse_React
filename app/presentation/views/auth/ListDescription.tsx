import React, {useEffect, useState} from "react";
import {View, Text, Image, TouchableOpacity, ScrollView, ActivityIndicator, FlatList} from "react-native";
import {FontAwesome} from "@expo/vector-icons";
import {NavigationProp, RouteProp, useNavigation, useRoute} from "@react-navigation/native";
import {AppColors, AppFonts} from "../../theme/AppTheme";
import {RootStackParamsList} from "../../../../App";
import {useUser} from "../client/context/UserContext";
import {ReviewInterface} from "../../../domain/entitites/Review";
import ReviewCard from "../../components/cards/ReviewCard";
import styles from "../../theme/Styles";

type ListDescriptionRouteProp = RouteProp<RootStackParamsList, "ListDescriptionScreen">;

export default function ListDescriptionScreen() {
    const navigation = useNavigation<NavigationProp<RootStackParamsList>>();
    const route = useRoute<ListDescriptionRouteProp>();
    const {lista} = route.params;

    console.log(lista);
    return (
        <ScrollView style={{flex: 1, backgroundColor: "#0D0D25", padding: 20}}>

            <TouchableOpacity onPress={() => navigation.goBack()} style={{marginBottom: 10}}>
                <FontAwesome name="arrow-left" size={24} color="#FFF"/>
            </TouchableOpacity>

            <View style={{alignItems: "center", marginBottom: 20}}>
                <Text style={styles.superText}>
                    {lista.nombre || "nombre"}
                </Text>
                <Text style={styles.normalText}>
                    {lista.descripcion || "Sin Descripción"}
                </Text>
            </View>

            <View style={{gap: 10}}>
                <FlatList
                    data={lista.videojuegos}
                    keyExtractor={(item) => item.id.toString()}
                    numColumns={3}
                    contentContainerStyle={{
                        paddingHorizontal: 10,
                        paddingBottom: 20,
                    }}
                    columnWrapperStyle={{
                        justifyContent: "space-between",
                        marginBottom: 15,
                    }}
                    renderItem={({item}) => (
                        <Image
                            source={{uri: item.portada}}
                            style={{
                                width: 114,
                                height: 160,
                            }}
                        />
                    )}
                />
            </View>
        </ScrollView>
    );
}
