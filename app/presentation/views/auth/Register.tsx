import React, { useState } from "react";
import { ActivityIndicator, Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import styles from "../../theme/Styles";
import { AppColors } from "../../theme/AppTheme";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamsList } from "../../../../App";

function RegisterScreen() {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamsList>>();

    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const [emailError, setEmailError] = useState("");
    const [nameError, setNameError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");

    const handleRegister = async () => {
        setEmailError("");
        setNameError("");
        setPasswordError("");
        setConfirmPasswordError("");

        // Validar campos
        let valid = true;

        if (!email) {
            setEmailError("El correo electrónico es obligatorio.");
            valid = false;
        }

        if (!name) {
            setNameError("El nombre de usuario es obligatorio.");
            valid = false;
        }

        if (!password) {
            setPasswordError("La contraseña es obligatoria.");
            valid = false;
        }

        if (!confirmPassword) {
            setConfirmPasswordError("Por favor repite la contraseña.");
            valid = false;
        }

        if (password !== confirmPassword) {
            setConfirmPasswordError("Las contraseñas no coinciden.");
            valid = false;
        }

        if (!valid) {
            return; // Detener la ejecución si hay errores de validación
        }

        const userData = {
            email,
            name,
            password,
        };

        setLoading(true);
        try {
            const response = await fetch("http://localhost:8080/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email,
                    name: name,
                    password: password,
                }),
            });

            const data = await response.json();
            if (response.ok) {
                // Si el registro fue exitoso, navegar a LoginScreen
                navigation.navigate("LoginScreen");
            } else {
                // Si hubo algún error en la respuesta
                setEmailError(data.message || "No se pudo completar el registro.");
            }
        } catch (error) {
            setEmailError("Hubo un problema con la conexión.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image source={require('../../../../assets/img/logo.png')} style={styles.image} />
            </View>

            <View style={styles.imageContainer}>
                <Text style={styles.formTitle}>Registro</Text>

                <TextInput
                    value={name}
                    onChangeText={setName}
                    style={[styles.formInput, nameError && { borderColor: 'red' }]} // Borde rojo si hay error
                    placeholderTextColor={AppColors.primary}
                    placeholder="Usuario"
                />

                <TextInput
                    value={email}
                    onChangeText={setEmail}
                    style={[styles.formInput, emailError && { borderColor: 'red' }]} // Borde rojo si hay error
                    placeholderTextColor={AppColors.primary}
                    placeholder="Correo Electrónico"
                    keyboardType="email-address"
                />

                <TextInput
                    value={password}
                    onChangeText={setPassword}
                    style={[styles.formInput, passwordError && { borderColor: 'red' }]} // Borde rojo si hay error
                    placeholderTextColor={AppColors.primary}
                    placeholder="Contraseña"
                    secureTextEntry={true}
                />

                <TextInput
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    style={[styles.formInput, confirmPasswordError && { borderColor: 'red' }]} // Borde rojo si hay error
                    placeholderTextColor={AppColors.primary}
                    placeholder="Repetir Contraseña"
                    secureTextEntry={true}
                />

                <TouchableOpacity
                    style={styles.buttonForm}
                    onPress={handleRegister}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator color={AppColors.primary} />
                    ) : (
                        <Text style={styles.buttonFormText}>Registrarme</Text>
                    )}
                </TouchableOpacity>

                <Text
                    style={styles.redirectText}
                    onPress={() => {
                        navigation.navigate("LoginScreen");
                    }}
                >
                    Ya tengo cuenta
                </Text>
            </View>
        </View>
    );
}

export default RegisterScreen;
