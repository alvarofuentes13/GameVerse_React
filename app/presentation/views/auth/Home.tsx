import React, {useEffect, useState} from "react";
import {View, Text, Image, ScrollView, FlatList, TouchableOpacity, Button, ActivityIndicator} from "react-native";
import {createDrawerNavigator, DrawerNavigationProp} from "@react-navigation/drawer";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {useNavigation} from "@react-navigation/native";
import {FontAwesome, MaterialIcons} from "@expo/vector-icons";
import {AppColors} from "../../theme/AppTheme";
import styles from "../../theme/Styles";
import {RootStackParamsList} from "../../../../App";
import ProfileScreen from "./Profile";
import SearchScreen from "./Search";
import viewModel from "../client/category/list/ViewModel";
import {VideojuegoCategoryListHome} from "../client/category/list/CategoryList";
import {useUser} from "../client/context/UserContext";
import {ReviewInterface} from "../../../domain/entitites/Review";
import ReviewCard from "../../components/cards/ReviewCard";
import ListScreen from "./List";

export type DrawerParamsList = {
    Inicio: undefined,
    Listas: undefined
}

function HomeScreen() {
    const navigation = useNavigation<DrawerNavigationProp<DrawerParamsList>>();

    const usuario = useUser().user;

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
            } catch (error) {
                console.error("Error al obtener reviews:", error);
            } finally {
                setCargando(false);
            }
        };

        fetchReviews();
    }, [usuario]);


    return (
        <ScrollView style={{backgroundColor: AppColors.background, width: "100%", height: "100%", padding: 20}}>

            <TouchableOpacity onPress={() => navigation.openDrawer()} style={{marginBottom: 20}}>
                <FontAwesome name="bars" size={28} color="white"/>
            </TouchableOpacity>

            <Text style={styles.superText}>Hola, {usuario?.name}!</Text>

            <View>
                <Text style={styles.titleText}>Videojuegos populares de este mes</Text>
                <VideojuegoCategoryListHome/>
            </View>


            <Text style={styles.titleText}>Reviews populares</Text>
            {cargando ? (
                <ActivityIndicator size="large" color={AppColors.yellow} style={{marginTop: 10}}/>
            ) : (
                reviews.map((review) => (
                    <ReviewCard review={review}/>
                ))
            )}


        </ScrollView>

    )
        ;
}

const Drawer = createDrawerNavigator<DrawerParamsList>();
const Tab = createBottomTabNavigator<RootStackParamsList>();

export function HomeTabs() {
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
                drawerActiveTintColor: AppColors.primary,
                drawerInactiveTintColor: AppColors.grey,
            }}>
            <Drawer.Screen name="Inicio" component={HomeTabs}/>
            <Drawer.Screen name="Listas" component={ListScreen}/>
        </Drawer.Navigator>
    );
}
