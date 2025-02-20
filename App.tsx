
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import * as React from 'react';
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from '@react-navigation/stack';
import {useFonts} from "expo-font";
import {AppColors, AppFonts} from "./app/presentation/theme/AppTheme";
import {createDrawerNavigator} from "@react-navigation/drawer";
import HomeScreen from "./app/presentation/views/auth/Home";
import LoginScreen from "./app/presentation/views/auth/Login";
import RegisterScreen from "./app/presentation/views/auth/Register";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import ProfileScreen from "./app/presentation/views/auth/Profile";

export type RootStackParamsList = {
    LoginScreen: undefined,
    RegisterScreen: undefined,
    HomeScreen: undefined,
    ProfileScreen: undefined,
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

    const Menu = createDrawerNavigator();

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false}}>
                <Stack.Screen name={"LoginScreen"} component={LoginScreen}/>
                <Stack.Screen name={"RegisterScreen"} component={RegisterScreen}/>
                <Stack.Screen name={"HomeScreen"} component={HomeScreen}/>
                <Stack.Screen name={"ProfileScreen"} component={ProfileScreen}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
