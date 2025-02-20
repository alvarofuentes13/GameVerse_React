import {Animated, Button, Image, Text, TextInput, TouchableOpacity, View} from "react-native";
import styles from "./Styles";
import {AppColors} from "../../theme/AppTheme";
import {useRef} from "react";
import {useNavigation} from "@react-navigation/native";
import Register from "./Register";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import ScrollView = Animated.ScrollView;
import {RootStackParamsList} from "../../../../App";



function LoginScreen() {

    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamsList>>();
    return (
        <View style={styles.container}>

            <View style={styles.imageContainer}>
                <Image source={require('../../../../assets/img/logo.png')}
                style={styles.image}></Image>
            </View>

            <View style={styles.imageContainer}>
                <Text style={styles.formTitle}>Inicio Sesión</Text>

                <TextInput style={styles.formInput} placeholderTextColor={AppColors.white} placeholder={"Usuario"}></TextInput>
                <TextInput style={styles.formInput} placeholderTextColor={AppColors.white} placeholder={"Contraseña"}></TextInput>

                <TouchableOpacity style={styles.buttonForm} onPress={() => {
                    navigation.navigate("HomeScreen")}}>
                    <Text style={styles.buttonFormText}>Entrar</Text>
                </TouchableOpacity>
                <Text style={styles.redirectText}
                      onPress={() => {
                          navigation.navigate("RegisterScreen")
                      }}>¿No tienes cuenta? Registrate aquí</Text>
            </View>
        </View>
    );
}

export default LoginScreen;