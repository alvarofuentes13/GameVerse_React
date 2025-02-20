import React from "react";
import {View, Text, Image, ScrollView, FlatList, TouchableOpacity, Button} from "react-native";
import {createDrawerNavigator} from "@react-navigation/drawer";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {NavigationContainer, useNavigation} from "@react-navigation/native";
import {FontAwesome, MaterialIcons} from "@expo/vector-icons";
import {AppColors} from "../../theme/AppTheme";
import styles from "./Styles";

const games = [
    {id: "1", title: "GTA V",},
    {id: "2", title: "Cyberpunk 2077",},
];

const reviews = [
    {id: "1", user: "Adrian", rating: 4, game: "GTA V", text: "Lorem ipsum dolor sit amet..."},
    {id: "2", user: "Adrian", rating: 4, game: "GTA V", text: "Lorem ipsum dolor sit amet..."},
];

function HomeScreen() {
    const navigation = useNavigation();

    return (
    <ScrollView style={{backgroundColor: AppColors.background, flex: 1, padding: 20}}>

        <TouchableOpacity onPress={() => navigation.openDrawer()} style={{ marginBottom: 20 }}>
            <FontAwesome name="bars" size={28} color="white" />
        </TouchableOpacity>

        <Text style={{color: "#fff", fontSize: 24, fontWeight: "bold"}}>Hola, Gustavo!</Text>
        <Text style={{color: "#aaa", fontSize: 14}}>Opina sobre los videojuegos que has jugado</Text>

        <Text style={{color: "#fff", fontSize: 18, marginTop: 20}}>Videojuegos populares de este mes</Text>
        <FlatList
            horizontal
            data={games}
            renderItem={({item}) => (
                <Image style={{width: 100, height: 140, margin: 5, borderRadius: 8}}/>
            )}
            keyExtractor={(item) => item.id}
        />

        <Text style={{color: "#fff", fontSize: 18, marginTop: 20}}>Reviews de amigos</Text>
        {reviews.map((review) => (
            <View key={review.id} style={{backgroundColor: "#1C1C3A", padding: 15, borderRadius: 10, marginTop: 10}}>
                <Text style={{color: "#fff", fontWeight: "bold"}}>{review.game}</Text>
                <Text style={{color: "#aaa"}}>Reseña de {review.user} ★★★★☆</Text>
                <Text style={{color: "#ccc", marginTop: 5}}>{review.text}</Text>
            </View>
        ))}


    </ScrollView>

)
    ;
}

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

function HomeTabs() {
    return (
        <Tab.Navigator screenOptions={{headerShown: false, tabBarStyle: {backgroundColor: "#1C1C3A"}}}>
            <Tab.Screen name="Home" component={HomeScreen} options={{
                tabBarIcon: ({color}) => <FontAwesome name="home" size={24} color={color}/>,
            }}/>
            <Tab.Screen name="Profile" component={HomeScreen} options={{
                tabBarIcon: ({color}) => <MaterialIcons name="person" size={24} color={color}/>,
            }}/>
        </Tab.Navigator>
    );
}

export default function DrawerNavigator() {
    return (
        <Drawer.Navigator
            screenOptions={{drawerStyle: {backgroundColor: AppColors.background, width: 220}, headerShown: false}}>
            <Drawer.Screen name="Home" component={HomeScreen}/>
        </Drawer.Navigator>
    );
}
