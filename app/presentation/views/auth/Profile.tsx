import React, {useEffect, useState} from "react";
import {ActivityIndicator, FlatList, Image, ScrollView, Text, TextInput, TouchableOpacity, View} from "react-native";
import {AppColors} from "../../theme/AppTheme";
import {useUser} from "../client/context/UserContext";
import {ReviewInterface} from "../../../domain/entitites/Review";
import {useFocusEffect} from "@react-navigation/native";
import ReviewCard from "../../components/cards/ReviewCard";
import AvatarPickModal from "../../components/modals/AvatarPickModal";
import axios from "axios";
import styles from "../../theme/Styles";
import {MaterialIcons} from "@expo/vector-icons";
import {useAuth} from "../client/context/AuthContext";
import {ApiDelivery} from "../../../data/sources/remote/api/ApiDelivery";

export default function ProfileScreen() {
    const {user: usuario, token: token, setAuth} = useAuth();
    const [reviews, setReviews] = useState<ReviewInterface[]>([]);
    const [cargando, setCargando] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [text, setText] = useState(usuario?.biografia || "");

    useEffect(() => {
        if (usuario?.biografia){
            setText(usuario?.biografia);
        }
    }, [usuario]);

    const toggleEdit = () => {
        if(usuario?.biografia != text){
            if (isEditing && usuario) {
                // Guardar biografía
                ApiDelivery.put(`/usuarios/id/${usuario.id}`, {
                    ...usuario,
                    biografia: text,
                })
                    .then((response) => {
                        setAuth(response.data); // Actualiza el contexto
                        console.log("Biografía actualizada.");
                    })
                    .catch((error) => {
                        console.error("Error al actualizar la biografía:", error);
                    });
            }
        }
        setIsEditing(!isEditing);
    };

    const avatarOptions = [
        require("../../../../assets/img/avatars/KiAdiMundi.png"),
        require("../../../../assets/img/avatars/Androide.png"),
        require("../../../../assets/img/avatars/Ewok.png"),
        require("../../../../assets/img/avatars/Greedo.png"),
        require("../../../../assets/img/avatars/Jarjar.png"),
    ];

    const reviewsFavoritas = reviews.filter((review) => review.favorito);

    const videojuegosUnicos = Array.from(
        new Map(reviewsFavoritas.map((review) => [review.videojuego.id, review.videojuego])).values()
    );

    const fetchReviews = async () => {
        if (!usuario) return;

        try {
            const response = await ApiDelivery.get(`/reviews/usuario/${usuario.id}`);
            setReviews(response.data);
        } catch (error) {
            console.error("Error al obtener reviews:", error);
        } finally {
            setCargando(false);
        }
    };

    useFocusEffect(
        React.useCallback(() => {
            setCargando(true);
            fetchReviews();
        }, [usuario])
    );

    return (
        <ScrollView style={{flex: 1, backgroundColor: AppColors.background, padding: 20}}>
            <AvatarPickModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                onSelect={async (avatar) => {
                    if (!usuario) {
                        console.log("No hay usuario");
                        return;
                    }
                    // @ts-ignore
                    const avatarUri = avatar.uri
                    if(avatarUri != usuario.avatar) {
                        setAuth({...usuario, avatar: avatarUri});

                        ApiDelivery.put(`/usuarios/id/${usuario.id}`, {
                            ...usuario,
                            avatar: avatarUri, // Aquí va el nuevo avatar
                        })
                            .then((response) => {
                                console.log("Usuario actualizado:", response.data);
                            })
                            .catch((error) => {
                                console.error("Error al actualizar usuario:", error);
                            });
                    }



                    setModalVisible(false);
                }}
                avatarOptions={avatarOptions}
            />

            {/* Información del usuario */}
            <View style={{alignItems: "center", marginVertical: 10}}>
                <TouchableOpacity onPress={() => setModalVisible(true)}>
                    <Image
                        source={
                            usuario?.avatar
                                ? {uri: usuario.avatar}
                                : require("../../../../assets/img/avatars/KiAdiMundi.png")
                        }
                        style={{width: 100, height: 100, borderRadius: 50, marginBottom: 10}}
                    />
                </TouchableOpacity>
                <Text style={styles.superText}>{usuario?.name}</Text>
                <View style={{flexDirection: "row", gap: 5 }}>
                    {isEditing ? (
                        <TextInput
                            style={styles.normalText}
                            value={text}
                            onChangeText={setText}
                            onBlur={toggleEdit} // Cuando se pierde el foco, sale del modo edición
                            autoFocus
                        />
                    ) : (
                        <Text style={styles.normalText}>{text}</Text>
                    )}
                    <MaterialIcons name="edit" size={16} color={AppColors.grey} onPress={toggleEdit} />
                </View>
            </View>

            {/* Videojuegos favoritos */}
            <View style={{flexDirection: "row", justifyContent: "space-between", marginTop: 20, marginBottom: 15}}>
                <Text style={styles.titleText}>Tus videojuegos favoritos</Text>
            </View>
            {cargando ? (
                <ActivityIndicator size="large" color={AppColors.yellow}/>
            ) : (
                <FlatList
                    horizontal
                    data={videojuegosUnicos}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({item}) => (
                        <Image
                            source={{uri: item.portada}}
                            style={{width: 100, height: 140, marginRight: 18, borderRadius: 4}}
                        />
                    )}
                    showsHorizontalScrollIndicator={false}
                />
            )}

            {/* Últimas reviews */}
            <View style={{flexDirection: "row", justifyContent: "space-between", marginTop: 20}}>
                <Text style={styles.titleText}>Últimas reseñas de {usuario?.name}</Text>
            </View>
            {cargando ? (
                <ActivityIndicator size="large" color={AppColors.yellow} style={{marginTop: 10}}/>
            ) : (
                reviews.map((review) => <ReviewCard key={review.id} review={review}/>)
            )}
        </ScrollView>
    );
}
