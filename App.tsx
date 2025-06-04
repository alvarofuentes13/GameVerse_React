
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import * as React from 'react';
import {NavigationContainer} from "@react-navigation/native";
import {useFonts} from "expo-font";
import {AppColors} from "./app/presentation/theme/AppTheme";
import HomeScreen from "./app/presentation/views/auth/Home";
import LoginScreen from "./app/presentation/views/auth/Login";
import RegisterScreen from "./app/presentation/views/auth/Register";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import ProfileScreen from "./app/presentation/views/auth/Profile";
import DescriptionScreen from "./app/presentation/views/auth/Description";
import ReviewScreen from "./app/presentation/views/auth/Review";
import SearchScreen from "./app/presentation/views/auth/Search";
import {VideojuegoInterface} from "./app/domain/entities/Videojuego";
import {UserProvider} from "./app/presentation/views/client/context/UserContext";
import ListScreen from "./app/presentation/views/auth/List";
import ListDescriptionScreen from "./app/presentation/views/auth/ListDescription";
import GamesScreen from "./app/presentation/views/auth/Games";
import {AuthProvider} from "./app/presentation/views/client/context/AuthContext";
import {UsuarioInterface} from "./app/domain/entities/Usuario";

export type RootStackParamsList = {
    LoginScreen: undefined,
    RegisterScreen: undefined,
    HomeScreen: undefined,
    ProfileScreen: { usuario: UsuarioInterface },
    ListScreen: undefined,
    GamesScreen: undefined,
    ListDescriptionScreen: { lista: any },
    DescriptionScreen: { item: VideojuegoInterface };
    ReviewScreen: { item: VideojuegoInterface };
    SearchScreen: { item: VideojuegoInterface },
}

const Stack = createNativeStackNavigator<RootStackParamsList>();


export default function App() {
    const [fontsLoaded] = useFonts({
        "Roboto-Bold": require('./assets/fonts/Roboto-Bold.ttf'),
        "Roboto-Italic": require('./assets/fonts/Roboto-Italic.ttf'),
        "Roboto-Light": require('./assets/fonts/Roboto-Light.ttf'),
        "Roboto-Regular": require('./assets/fonts/Roboto-Regular.ttf'),
        "Poppins-Regular": require('./assets/fonts/Poppins-Regular.ttf'),
        "Poppins-Medium": require('./assets/fonts/Poppins-Medium.ttf'),
        "Poppins-Bold": require('./assets/fonts/Poppins-Bold.ttf'),
        "Poppins-Italic": require('./assets/fonts/Poppins-Italic.ttf'),
        "Poppins-Light": require('./assets/fonts/Poppins-Light.ttf'),
    });

    if (!fontsLoaded) {
        return <ActivityIndicator size="large" color={AppColors.primary}/>;
    }


    return (
        <AuthProvider>
        <UserProvider>
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false}}>
                <Stack.Screen name={"LoginScreen"} component={LoginScreen}/>
                <Stack.Screen name={"RegisterScreen"} component={RegisterScreen}/>
                <Stack.Screen name={"HomeScreen"} component={HomeScreen}/>
                <Stack.Screen name={"ProfileScreen"} component={ProfileScreen}/>
                <Stack.Screen name={"DescriptionScreen"} component={DescriptionScreen}/>
                <Stack.Screen name={"ReviewScreen"} component={ReviewScreen}/>
                <Stack.Screen name={"SearchScreen"} component={SearchScreen}/>
                <Stack.Screen name={"ListScreen"} component={ListScreen}/>
                <Stack.Screen name={"GamesScreen"} component={GamesScreen}/>
                <Stack.Screen name={"ListDescriptionScreen"} component={ListDescriptionScreen}/>
            </Stack.Navigator>
        </NavigationContainer>
        </UserProvider>
        </AuthProvider>
    );
}
