import React, { useState } from "react"; // Importa React y hooks
import { Alert, Image, Text, TextInput, TouchableOpacity, View } from "react-native"; // Importa componentes de React Native
import styles from "../../theme/Styles"; // Importa estilos
import { AppColors } from "../../theme/AppTheme"; // Importa colores de la temática
import { NavigationProp, useNavigation } from "@react-navigation/native"; // Importa hooks de navegación
import { useUser } from "../client/context/UserContext"; // Importa contexto de usuario
import { RootStackParamsList } from "../../../../App"; // Importa tipos de parámetros de navegación
import { useAuth } from "../client/context/AuthContext"; // Importa contexto de autenticación
import { setAuthToken } from "../../../data/sources/remote/api/ApiDelivery"; // Importa función para establecer el token de autenticación

// Componente principal de la pantalla de inicio de sesión
function LoginScreen() {
    const navigation = useNavigation<NavigationProp<RootStackParamsList>>(); // Inicializa la navegación
    const { setUserData } = useUser(); // Hook para actualizar el contexto de usuario
    const { setAuth } = useAuth(); // Hook para actualizar el estado de autenticación
    const [email, setEmail] = useState(""); // Estado para el email
    const [password, setPassword] = useState(""); // Estado para la contraseña

    // Estados para manejar errores de validación
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    // Función para validar el email
    const validateEmail = (email: string) => {
        const regex = /\S+@\S+\.\S+/; // Expresión regular para validar el formato del email
        return regex.test(email);
    };

    // Manejo del cambio de texto en el input de email
    const handleEmailChange = (text: string) => {
        setEmail(text); // Actualiza el estado del email
        if (!validateEmail(text)) {
            setEmailError("Por favor, ingresa un email válido."); // Establece mensaje de error si el email no es válido
        } else {
            setEmailError(""); // Limpia el mensaje de error si el email es válido
        }
    };

    // Manejo del cambio de texto en el input de contraseña
    const handlePasswordChange = (text: string) => {
        setPassword(text); // Actualiza el estado de la contraseña
        if (!text) {
            setPasswordError("La contraseña es obligatoria."); // Establece mensaje de error si la contraseña está vacía
        } else {
            setPasswordError(""); // Limpia el mensaje de error si la contraseña no está vacía
        }
    };

    // Función para manejar el inicio de sesión
    const handleLogin = async () => {
        // Validar campos
        if (!email || !password) {
            if (!email) setEmailError("El email es obligatorio."); // Mensaje de error para email
            if (!password) setPasswordError("La contraseña es obligatoria."); // Mensaje de error para contraseña
            Alert.alert("Error", "Por favor, completa todos los campos."); // Alerta de error
            return;
        }

        if (!validateEmail(email)) {
            setEmailError("Por favor, ingresa un email válido."); // Mensaje de error para email inválido
            return;
        }

        try {
            // Realiza la solicitud de inicio de sesión
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
                throw new Error("Credenciales inválidas"); // Lanza un error si la respuesta no es correcta
            }

            const data = await response.json(); // Convierte la respuesta a JSON
            console.log(data); // Muestra la respuesta en consola
            const user = data.usuario; // Extrae el usuario de la respuesta
            const token = data.token; // Extrae el token de la respuesta

            setAuthToken(token); // Establece el token de autenticación
            setUserData(user); // Actualiza el contexto de usuario
            setAuth(data.usuario, data.token); // Establece el estado de autenticación
            navigation.navigate("HomeScreen"); // Navega a la pantalla principal
        } catch (error) {
            console.error("Error al iniciar sesión:", error); // Manejo de errores
            Alert.alert("Error", "Hubo un problema con la conexión."); // Alerta de error
        }
    };

    // Deshabilitar el botón si hay errores o los campos están vacíos
    const isFormValid = email && password && !emailError && !passwordError;

    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image source={require("../../../../assets/img/logo.png")} style={styles.image} /> {/* Logo de la aplicación */}
            </View>

            <View style={styles.imageContainer}>
                <Text style={styles.formTitle}>Inicio Sesión</Text> {/* Título de la pantalla */}

                <TextInput
                    value={email}
                    onChangeText={handleEmailChange} // Actualiza email y valida en tiempo real
                    style={[styles.formInput, emailError && { borderColor: 'red' }]} // Muestra borde rojo si hay error
                    placeholderTextColor={AppColors.primary}
                    placeholder={"Correo electrónico"} // Placeholder para el input de email
                    keyboardType={"email-address"} // Tipo de teclado para email
                />

                <TextInput
                    value={password}
                    onChangeText={handlePasswordChange} // Actualiza contraseña y valida en tiempo real
                    style={[styles.formInput, passwordError && { borderColor: 'red' }]} // Muestra borde rojo si hay error
                    placeholderTextColor={AppColors.primary}
                    placeholder={"Contraseña"} // Placeholder para el input de contraseña
                    secureTextEntry={true} // Asegura que la contraseña sea enmascarada
                />

                <TouchableOpacity
                    style={[styles.buttonForm, !isFormValid && { backgroundColor: 'gray' }]} // Deshabilitar el botón si hay errores
                    onPress={handleLogin} // Maneja el evento de presionar el botón
                    disabled={!isFormValid} // Deshabilitar si los campos son inválidos
                >
                    <Text style={styles.buttonFormText}>Entrar</Text> {/* Texto del botón */}
                </TouchableOpacity>

                <Text
                    style={styles.redirectText} // Texto para redirigir a registro
                    onPress={() => {
                        navigation.navigate("RegisterScreen"); // Navega a la pantalla de registro
                    }}
                >
                    ¿No tienes cuenta? Regístrate aquí
                </Text>
            </View>
        </View>
    );
}

export default LoginScreen; // Exporta el componente
