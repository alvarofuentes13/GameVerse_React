import {ActivityIndicator, Alert, Button, Image, Text, TextInput, TouchableOpacity, View} from "react-native";
import styles from "./Styles";
import {AppColors} from "../../theme/AppTheme";
import {useNavigation} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {RootStackParamsList} from "../../../../App";
import {useState} from "react";


function RegisterScreen() {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamsList>>();

    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleRegister = async () => {
        if (!email || !name || !password || !confirmPassword) {
            Alert.alert("Error", "Todos los campos son obligatorios.");
            return;
        }

        if (password !== confirmPassword) {
            Alert.alert("Error", "Las contraseñas no coinciden.");
            return;
        }

        const userData = {
            email,
            name,
            password,
            fechaRegistro: new Date().toISOString(),
            avatar: null,
            biografia: "Nuevo usuario en GameVerse",
        };

        setLoading(true);
        try {
            const response = await fetch("http://localhost:8080/api/usuarios", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            });

            const data = await response.json();
            if (response.ok) {
                Alert.alert("Éxito", "Usuario registrado correctamente.");
                navigation.navigate("LoginScreen");
            } else {
                Alert.alert("Error", data.message || "No se pudo completar el registro.");
            }
        } catch (error) {
            Alert.alert("Error", "Hubo un problema con la conexión.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>

            <View style={styles.imageContainer}>
                <Image source={require('../../../../assets/img/logo.png')}
                       style={styles.image}></Image>
            </View>

            <View style={styles.imageContainer}>
                <Text style={styles.formTitle}>Registro</Text>

                <TextInput value={name} onChangeText={setName} style={styles.formInput} placeholderTextColor={AppColors.white} placeholder={"Usuario"}></TextInput>
                <TextInput value={email} onChangeText={setEmail} style={styles.formInput} placeholderTextColor={AppColors.white} placeholder={"Correo Electrónico"} keyboardType={"email-address"} ></TextInput>
                <TextInput value={password} onChangeText={setPassword} style={styles.formInput} placeholderTextColor={AppColors.white} placeholder={"Contraseña"}></TextInput>
                <TextInput value={confirmPassword} onChangeText={setConfirmPassword} style={styles.formInput} placeholderTextColor={AppColors.white} placeholder={"Repetir Contraseña"}></TextInput>

                <TouchableOpacity style={styles.buttonForm} onPress={handleRegister} disabled={loading}>
                    {loading ? <ActivityIndicator color={AppColors.white}/> : <Text style={styles.buttonFormText}>Registrarme</Text>}
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