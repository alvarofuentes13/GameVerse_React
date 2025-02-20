import {StatusBar} from 'expo-status-bar';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import * as React from 'react';
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from '@react-navigation/stack';
import Login from "./app/presentation/views/auth/Login";
import {useFonts} from "expo-font";
import {AppColors, AppFonts} from "./app/presentation/theme/AppTheme";
import Register from "./app/presentation/views/auth/Register";
import {createDrawerNavigator} from "@react-navigation/drawer";
import HomeScreen from "./app/presentation/views/auth/Home";


const Stack = createStackNavigator();

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
                <Stack.Screen name="Login" component={Login}/>
                <Stack.Screen name="Register" component={Register}/>
                <Stack.Screen name="Home" component={HomeScreen}/>
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
