import React, {useEffect, useState} from "react";
import {View, Text, Image, ScrollView, FlatList, TouchableOpacity, Button, ActivityIndicator} from "react-native";
import {createDrawerNavigator, DrawerNavigationProp} from "@react-navigation/drawer";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {NavigationContainer, RouteProp, useNavigation, useRoute} from "@react-navigation/native";
import {FontAwesome, MaterialIcons} from "@expo/vector-icons";
import {AppColors} from "../../theme/AppTheme";
import styles from "../../theme/Styles";
import LoginScreen from "./Login";
import RegisterScreen from "./Register";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {RootStackParamsList} from "../../../../App";
import ProfileScreen from "./Profile";
import SearchScreen from "./Search";
import viewModel from "../client/category/list/ViewModel";
import {VideojuegoCategoryListHome} from "../client/category/list/CategoryList";
import {useUser} from "../client/context/UserContext";
import {ReviewInterface} from "../../../domain/entitites/Review";

export type DrawerParamsList = {
    HomeScreen: undefined,
}

function HomeScreen() {
    const navigation = useNavigation<DrawerNavigationProp<DrawerParamsList>>();

    const usuario = useUser().user;
    console.log(usuario);

    const {videojuego, getVideojuegos} = viewModel.VideojuegoViewModel();

    useEffect(() => {
        getVideojuegos();
    }, []);

    const [reviews, setReviews] = useState<ReviewInterface[]>([]);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        const fetchReviews = async () => {
            if (!usuario) return; // Si el usuario no está definido, no hacemos la petición.

            try {
                const response = await fetch(`http://localhost:8080/api/reviews`);
                const data = await response.json();
                setReviews(data);
                console.log(data);
            } catch (error) {
                console.error("Error al obtener reviews:", error);
            } finally {
                setCargando(false);
            }
        };

        fetchReviews();
    }, [usuario]);

    console.log(videojuego);

    return (
        <ScrollView style={{backgroundColor: AppColors.background, width:"100%", height:"100%", padding: 20}}>

            <TouchableOpacity onPress={() => navigation.openDrawer()} style={{marginBottom: 20}}>
                <FontAwesome name="bars" size={28} color="white"/>
            </TouchableOpacity>

            <Text style={{color: "#fff", fontSize: 24, fontWeight: "bold"}}>Hola, {usuario?.name}!</Text>
            <Text style={{color: "#aaa", fontSize: 14}}>Opina sobre los videojuegos que has jugado</Text>

            <View>
                <Text style={{color: "#fff", fontSize: 18, marginTop: 20}}>Videojuegos populares de este mes</Text>
                <VideojuegoCategoryListHome videojuego={videojuego}/>
            </View>

            <Text style={{color: "#fff", fontSize: 18, marginTop: 20}}>Reviews populares</Text>
            {cargando ? (
                <ActivityIndicator size="large" color={AppColors.yellow} style={{ marginTop: 10 }} />
            ) : (
                reviews.map((review) => (
                    <View key={review.id} style={{ backgroundColor: "#1C1C3A", padding: 15, borderRadius: 10, marginTop: 10 }}>
                        <Text style={{ color: AppColors.white, fontSize: 16 }}>{review.videojuego.titulo}</Text>
                        <Text style={{ color: "#aaa", fontSize: 14 }}>Reseña de {review.usuario.name} {"⭐".repeat(review.calificacion)}</Text>
                        <Text style={{ color: "#fff", fontSize: 12, marginTop: 5 }}>{review.comentario}</Text>
                    </View>
                ))
            )}


        </ScrollView>

    )
        ;
}

const Drawer = createDrawerNavigator<DrawerParamsList>();
const Tab = createBottomTabNavigator<RootStackParamsList>();

function HomeTabs() {
    return (
        <Tab.Navigator screenOptions={{
            headerShown: false, tabBarStyle: styles.bottomTab,
            tabBarActiveTintColor: AppColors.primary, tabBarInactiveTintColor: AppColors.grey,
        }}>
            <Tab.Screen name="HomeScreen" component={HomeScreen} options={{
                tabBarShowLabel: false,
                tabBarItemStyle: styles.tabItem,
                tabBarIcon: ({color}) => <FontAwesome name="home" size={35} color={color}/>,
            }}/>
            <Tab.Screen name="SearchScreen" component={SearchScreen} options={{
                tabBarShowLabel: false,
                tabBarItemStyle: styles.tabItem,
                tabBarIcon: ({color}) => <MaterialIcons name="search" size={35} color={color}/>,
            }}/>
            <Tab.Screen name="ProfileScreen" component={ProfileScreen} options={{
                tabBarShowLabel: false,
                tabBarItemStyle: styles.tabItem,
                tabBarIcon: ({color}) => <MaterialIcons name="person" size={35} color={color}/>,
            }}/>
        </Tab.Navigator>
    );
}

export default function DrawerNavigator() {
    return (
        <Drawer.Navigator
            screenOptions={{
                drawerItemStyle: styles.drawerItem,
                drawerStyle: styles.drawerNav,
                headerShown: false,
                drawerActiveTintColor: AppColors.primary
            }}>
            <Drawer.Screen name={"HomeScreen"} component={HomeTabs}/>
        </Drawer.Navigator>
    );
}
