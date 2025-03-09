import React, { useState } from "react";
import { Alert, Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import styles from "./Styles";
import { AppColors } from "../../theme/AppTheme";
import { useNavigation } from "@react-navigation/native";
import { useUser } from "../client/context/UserContext"; // Importa el contexto para manejar el usuario

function LoginScreen() {
    const navigation = useNavigation();
    const { setUserData } = useUser(); // Usamos el hook para actualizar el contexto
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert("Error", "Por favor, completa todos los campos.");
            return;
        }

        try {
            const response = await fetch(`http://localhost:8080/api/usuarios/email/${email}`);
            const user = await response.json();
            console.log(user);

            if (!user) {
                Alert.alert("Error", "Usuario no encontrado.");
                return;
            }

            if (user.password !== password) {
                Alert.alert("Error", "Contraseña incorrecta.");
                return;
            }

            Alert.alert("Éxito", "Inicio de sesión exitoso.");

            // Guardamos los datos del usuario en el contexto
            setUserData(user);

            // Navegamos a la pantalla principal, pasando los datos del usuario
            navigation.navigate("HomeScreen");
        } catch (error) {
            console.error("Error al iniciar sesión:", error);
            Alert.alert("Error", "Hubo un problema con la conexión.");
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image source={require("../../../../assets/img/logo.png")} style={styles.image} />
            </View>

            <View style={styles.imageContainer}>
                <Text style={styles.formTitle}>Inicio Sesión</Text>

                <TextInput
                    value={email}
                    onChangeText={setEmail}
                    style={styles.formInput}
                    placeholderTextColor={AppColors.white}
                    placeholder={"Usuario"}
                    keyboardType={"email-address"}
                />
                <TextInput
                    value={password}
                    onChangeText={setPassword}
                    style={styles.formInput}
                    placeholderTextColor={AppColors.white}
                    placeholder={"Contraseña"}
                    secureTextEntry={true} // Aseguramos que la contraseña sea enmascarada
                />

                <TouchableOpacity style={styles.buttonForm} onPress={handleLogin}>
                    <Text style={styles.buttonFormText}>Entrar</Text>
                </TouchableOpacity>

                <Text
                    style={styles.redirectText}
                    onPress={() => {
                        navigation.navigate("RegisterScreen");
                    }}
                >
                    ¿No tienes cuenta? Regístrate aquí
                </Text>
            </View>
        </View>
    );
}

export default LoginScreen;
