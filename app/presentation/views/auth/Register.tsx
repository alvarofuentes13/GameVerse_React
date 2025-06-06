import React, { useState } from "react"; // Importa React y hooks
import { ActivityIndicator, Image, Text, TextInput, TouchableOpacity, View } from "react-native"; // Importa componentes de React Native
import styles from "../../theme/Styles"; // Importa estilos
import { AppColors } from "../../theme/AppTheme"; // Importa colores de la temática
import { useNavigation } from "@react-navigation/native"; // Importa hook para navegación
import { NativeStackNavigationProp } from "@react-navigation/native-stack"; // Importa tipos de navegación
import { RootStackParamsList } from "../../../../App"; // Importa tipos de parámetros de navegación

// Componente principal de la pantalla de registro
function RegisterScreen() {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamsList>>(); // Inicializa la navegación

    // Estados para los campos de entrada
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false); // Estado para manejar la carga

    // Estados para los errores de validación
    const [emailError, setEmailError] = useState("");
    const [nameError, setNameError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");

    // Función para manejar el registro
    const handleRegister = async () => {
        // Limpia los errores previos
        setEmailError("");
        setNameError("");
        setPasswordError("");
        setConfirmPasswordError("");

        // Validar campos
        let valid = true;

        if (!email) {
            setEmailError("El correo electrónico es obligatorio."); // Error si el email está vacío
            valid = false;
        }

        if (!name) {
            setNameError("El nombre de usuario es obligatorio."); // Error si el nombre está vacío
            valid = false;
        }

        if (!password) {
            setPasswordError("La contraseña es obligatoria."); // Error si la contraseña está vacía
            valid = false;
        }

        if (!confirmPassword) {
            setConfirmPasswordError("Por favor repite la contraseña."); // Error si la confirmación de contraseña está vacía
            valid = false;
        }

        if (password !== confirmPassword) {
            setConfirmPasswordError("Las contraseñas no coinciden."); // Error si las contraseñas no coinciden
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

        setLoading(true); // Indica que se está procesando el registro
        try {
            const response = await fetch("http://localhost:8080/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData), // Envía los datos del usuario como JSON
            });

            const data = await response.json(); // Convierte la respuesta a JSON
            if (response.ok) {
                // Si el registro fue exitoso, navegar a LoginScreen
                navigation.navigate("LoginScreen");
            } else {
                // Si hubo algún error en la respuesta
                setEmailError(data.message || "No se pudo completar el registro."); // Muestra el mensaje de error
            }
        } catch (error) {
            setEmailError("Hubo un problema con la conexión."); // Manejo de errores de conexión
        } finally {
            setLoading(false); // Indica que la carga ha terminado
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image source={require('../../../../assets/img/logo.png')} style={styles.image} /> {/* Logo de la aplicación */}
            </View>

            <View style={styles.imageContainer}>
                <Text style={styles.formTitle}>Registro</Text> {/* Título de la pantalla */}

                <TextInput
                    value={name}
                    onChangeText={setName} // Actualiza el estado del nombre
                    style={[styles.formInput, nameError && { borderColor: 'red' }]} // Borde rojo si hay error
                    placeholderTextColor={AppColors.primary}
                    placeholder="Usuario" // Placeholder para el nombre
                />

                <TextInput
                    value={email}
                    onChangeText={setEmail} // Actualiza el estado del email
                    style={[styles.formInput, emailError && { borderColor: 'red' }]} // Borde rojo si hay error
                    placeholderTextColor={AppColors.primary}
                    placeholder="Correo Electrónico" // Placeholder para el email
                    keyboardType="email-address" // Tipo de teclado para email
                />

                <TextInput
                    value={password}
                    onChangeText={setPassword} // Actualiza el estado de la contraseña
                    style={[styles.formInput, passwordError && { borderColor: 'red' }]} // Borde rojo si hay error
                    placeholderTextColor={AppColors.primary}
                    placeholder="Contraseña" // Placeholder para la contraseña
                    secureTextEntry={true} // Enmascara la contraseña
                />

                <TextInput
                    value={confirmPassword}
                    onChangeText={setConfirmPassword} // Actualiza el estado de la confirmación de contraseña
                    style={[styles.formInput, confirmPasswordError && { borderColor: 'red' }]} // Borde rojo si hay error
                    placeholderTextColor={AppColors.primary}
                    placeholder="Repetir Contraseña" // Placeholder para la confirmación de contraseña
                    secureTextEntry={true} // Enmascara la confirmación de contraseña
                />

                <TouchableOpacity
                    style={styles.buttonForm} // Estilo del botón
                    onPress={handleRegister} // Maneja el evento de presionar el botón
                    disabled={loading} // Deshabilitar el botón si se está cargando
                >
                    {loading ? (
                        <ActivityIndicator color={AppColors.primary} /> // Muestra un indicador de carga
                    ) : (
                        <Text style={styles.buttonFormText}>Registrarme</Text> // Texto del botón
                    )}
                </TouchableOpacity>

                <Text
                    style={styles.redirectText} // Estilo del texto para redirigir a inicio de sesión
                    onPress={() => {
                        navigation.navigate("LoginScreen"); // Navega a la pantalla de inicio de sesión
                    }}
                >
                    Ya tengo cuenta
                </Text>
            </View>
        </View>
    );
}

export default RegisterScreen; // Exporta el componente
