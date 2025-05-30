import React, { useState } from "react";
import { Alert, Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import styles from "../../theme/Styles";
import { AppColors } from "../../theme/AppTheme";
import {NavigationProp, useNavigation} from "@react-navigation/native";
import { useUser } from "../client/context/UserContext";
import {RootStackParamsList} from "../../../../App";
import {useAuth} from "../client/context/AuthContext";
import {setAuthToken} from "../../../data/sources/remote/api/ApiDelivery";

function LoginScreen() {
    const navigation = useNavigation<NavigationProp<RootStackParamsList>>();
    const { setUserData } = useUser(); // Usamos el hook para actualizar el contexto
    const { setAuth } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    //Para los avisos como email no adecuado o campo no completado
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    // Función para validar el email
    const validateEmail = (email: string) => {
        const regex = /\S+@\S+\.\S+/;
        return regex.test(email);
    };

    // Validar email en tiempo real
    const handleEmailChange = (text: string) => {
        setEmail(text);
        if (!validateEmail(text)) {
            setEmailError("Por favor, ingresa un email válido.");
        } else {
            setEmailError("");
        }
    };

    // Validar contraseña en tiempo real
    const handlePasswordChange = (text: string) => {
        setPassword(text);
        if (!text) {
            setPasswordError("La contraseña es obligatoria.");
        } else {
            setPasswordError("");
        }
    };

    const handleLogin = async () => {
        // Validar campos
        if (!email || !password) {
            if (!email) setEmailError("El email es obligatorio.");
            if (!password) setPasswordError("La contraseña es obligatoria.");
            Alert.alert("Error", "Por favor, completa todos los campos.");
            return;
        }

        if (!validateEmail(email)) {
            setEmailError("Por favor, ingresa un email válido.");
            return;
        }

        try {
            /*const response = await fetch('http://localhost:8080/api/usuarios/email/${email}');
            const user = await response.json();

            setUserData(user);
            navigation.navigate("HomeScreen");*/
            const response = await fetch("http://localhost:8080/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
            });

            if (!response.ok) {
                throw new Error("Credenciales inválidas");
            }

            const data = await response.json();
            console.log(data)
            const user = data.usuario;
            const token = data.token;

            // Puedes guardar el token en AsyncStorage si quieres
            // await AsyncStorage.setItem("token", token);

            setAuthToken(token);
            setUserData(user);
            setAuth(data.usuario, data.token);
            navigation.navigate("HomeScreen");
        } catch (error) {
            console.error("Error al iniciar sesión:", error);
            Alert.alert("Error", "Hubo un problema con la conexión.");
        }
    };

    // Deshabilitar el botón si hay errores o los campos están vacíos
    const isFormValid = email && password && !emailError && !passwordError;

    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image source={require("../../../../assets/img/logo.png")} style={styles.image} />
            </View>

            <View style={styles.imageContainer}>
                <Text style={styles.formTitle}>Inicio Sesión</Text>

                <TextInput
                    value={email}
                    onChangeText={handleEmailChange} // Actualiza email y valida en tiempo real
                    style={[styles.formInput, emailError && { borderColor: 'red' }]} // Mostrar borde rojo si hay error
                    placeholderTextColor={AppColors.primary}
                    placeholder={"Correo electrónico"}
                    keyboardType={"email-address"}
                />

                <TextInput
                    value={password}
                    onChangeText={handlePasswordChange} // Actualiza contraseña y valida en tiempo real
                    style={[styles.formInput, passwordError && { borderColor: 'red' }]} // Mostrar borde rojo si hay error
                    placeholderTextColor={AppColors.primary}
                    placeholder={"Contraseña"}
                    secureTextEntry={true} // Aseguramos que la contraseña sea enmascarada
                />

                <TouchableOpacity
                    style={[styles.buttonForm, !isFormValid && { backgroundColor: 'gray' }]} // Deshabilitar el botón si hay errores
                    onPress={handleLogin}
                    disabled={!isFormValid} // Deshabilitar si los campos son inválidos
                >
                    <Text style={styles.buttonFormText}>Entrar</Text>
                </TouchableOpacity>

                <Text
                    style={styles.redirectText}
                    onPress={() => {
                        navigation.navigate("RegisterScreen");
                    }}
                >¿No tienes cuenta? Regístrate aquí</Text>
            </View>
        </View>
    );
}

export default LoginScreen;
