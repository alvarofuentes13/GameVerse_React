import {Button, Text, TextInput, TouchableOpacity, View} from "react-native";
import styles from "./StylesLogin";
import {AppColors} from "../../theme/AppTheme";


const Login = () => {
    return (
        <View style={styles.container}>

            <View style={styles.imageContainer}>
                <Text style={styles.title}></Text>
            </View>

            <View style={styles.imageContainer}>
                <Text style={styles.formTitle}>Inicio Sesión</Text>

                <TextInput style={styles.formInput} placeholderTextColor={AppColors.white} placeholder={"Usuario"}></TextInput>
                <TextInput style={styles.formInput} placeholderTextColor={AppColors.white} placeholder={"Contraseña"}></TextInput>

                <TouchableOpacity style={styles.buttonForm}>Entrar</TouchableOpacity>
            </View>
        </View>
    );
}

export default Login;