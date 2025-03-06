import React, {useEffect, useState} from "react";
import {View, Text, Image, ScrollView, FlatList, TouchableOpacity, Button} from "react-native";
import {createDrawerNavigator} from "@react-navigation/drawer";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {NavigationContainer, useNavigation} from "@react-navigation/native";
import {FontAwesome, MaterialIcons} from "@expo/vector-icons";
import {AppColors} from "../../theme/AppTheme";
import styles from "./Styles";
import LoginScreen from "./Login";
import RegisterScreen from "./Register";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {RootStackParamsList} from "../../../../App";
import ProfileScreen from "./Profile";
import SearchScreen from "./Search";
import viewModel from "../client/category/list/ViewModel";
import {VideojuegoCategoryListHome} from "../client/category/list/CategoryList";


const reviews = [
    {id: "1", user: "Adrian", rating: 4, game: "GTA V", text: "Lorem ipsum dolor sit amet..."},
    {id: "2", user: "Adrian", rating: 4, game: "GTA V", text: "Lorem ipsum dolor sit amet..."},
    {id: "2", user: "Adrian", rating: 4, game: "GTA V", text: "Lorem ipsum dolor sit amet..."},
];

function HomeScreen() {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamsList>>();

    const {videojuego, getVideojuegos} = viewModel.VideojuegoViewModel();

    useEffect(() => {
        getVideojuegos();
    }, []);

    console.log(videojuego);

    return (
        <View style={{backgroundColor: AppColors.background, width:"100%", height:"100%", padding: 20}}>

            <TouchableOpacity onPress={() => navigation.openDrawer()} style={{marginBottom: 20}}>
                <FontAwesome name="bars" size={28} color="white"/>
            </TouchableOpacity>

            <Text style={{color: "#fff", fontSize: 24, fontWeight: "bold"}}>Hola, Gustavo!</Text>
            <Text style={{color: "#aaa", fontSize: 14}}>Opina sobre los videojuegos que has jugado</Text>

            <View>
                <Text style={{color: "#fff", fontSize: 18, marginTop: 20}}>Videojuegos populares de este mes</Text>
                <VideojuegoCategoryListHome videojuego={videojuego}/>
            </View>

            <Text style={{color: "#fff", fontSize: 18, marginTop: 20}}>Reviews de amigos</Text>
            {reviews.map((review) => (
                <View key={review.id}
                      style={{backgroundColor: "#1C1C3A", padding: 15, borderRadius: 10, marginTop: 10}}>
                    <Text style={{color: "#fff", fontWeight: "bold"}}>{review.game}</Text>
                    <Text style={{color: "#aaa"}}>Reseña de {review.user} ★★★★☆</Text>
                    <Text style={{color: "#ccc", marginTop: 5}}>{review.text}</Text>
                </View>
            ))}


        </View>

    )
        ;
}

const Drawer = createDrawerNavigator<RootStackParamsList>();
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
