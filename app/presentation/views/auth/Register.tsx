import {Button, Image, Text, TextInput, TouchableOpacity, View} from "react-native";
import styles from "./Styles";
import {AppColors} from "../../theme/AppTheme";
import {useNavigation} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {RootStackParamsList} from "../../../../App";


function RegisterScreen() {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamsList>>();


    return (
        <View style={styles.container}>

            <View style={styles.imageContainer}>
                <Image source={require('../../../../assets/img/logo.png')}
                       style={styles.image}></Image>
            </View>

            <View style={styles.imageContainer}>
                <Text style={styles.formTitle}>Registro</Text>

                <TextInput style={styles.formInput} placeholderTextColor={AppColors.white} placeholder={"Usuario"}></TextInput>
                <TextInput style={styles.formInput} placeholderTextColor={AppColors.white} placeholder={"Correo Electrónico"}></TextInput>
                <TextInput style={styles.formInput} placeholderTextColor={AppColors.white} placeholder={"Contraseña"}></TextInput>
                <TextInput style={styles.formInput} placeholderTextColor={AppColors.white} placeholder={"Repetir Contraseña"}></TextInput>

                <TouchableOpacity style={styles.buttonForm} onPress={() => {
                    navigation.navigate("HomeScreen")}}>
                    <Text style={styles.buttonFormText}>Registrarme</Text>
                </TouchableOpacity>
                <Text style={styles.redirectText}
                    onPress={() => {
                        navigation.navigate("LoginScreen");
                    }}>Ya tengo cuenta</Text>
            </View>
        </View>
    );
}

export default RegisterScreen;