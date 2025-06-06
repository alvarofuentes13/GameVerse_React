import { StyleSheet } from "react-native"; // Importa StyleSheet desde React Native
import { AppColors, AppFonts } from "./AppTheme"; // Importa colores y fuentes de la temática de la aplicación

// Definición de estilos utilizando StyleSheet
const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: AppColors.background // Color de fondo de la aplicación
    },
    superText: { // Estilo para títulos grandes
        color: AppColors.primary,
        fontSize: 20,
        fontFamily: AppFonts.bold,
        marginVertical: 10
    },
    superNumber: { // Estilo para números grandes
        color: AppColors.secondary,
        fontSize: 26,
        fontFamily: AppFonts.bold,
        marginTop: 10
    },
    titleText: { // Estilo para títulos normales en blanco y en negrita
        color: AppColors.primary,
        fontSize: 16,
        fontFamily: AppFonts.medium,
    },
    headerText: { // Estilo para encabezados más pequeños
        color: AppColors.primary,
        fontSize: 14,
        fontFamily: AppFonts.regular,
    },
    normalText: { // Estilo para texto normal
        color: AppColors.grey,
        fontSize: 12,
        fontFamily: AppFonts.regular,
    },
    title: {
        color: 'white',
        textAlign: 'center',
        marginTop: "6%",
        fontSize: 20,
        fontWeight: 'bold',
    },
    headerNumber: {
        color: AppColors.primary,
        fontSize: 20,
        fontFamily: AppFonts.medium
    },
    imageContainer: {
        alignSelf: 'center',
        marginTop: 130,
    },
    image: {
        width: 220,
        height: 220,
    },
    formContainer: {
        width: '95%',
        backgroundColor: "white", // Color de fondo del formulario
        paddingVertical: 25,
        paddingHorizontal: 20,
        marginHorizontal: "auto",
        marginTop: 50,
        borderRadius: 10,
    },
    formTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
        borderTopWidth: 1,
        paddingTop: 9,
        color: AppColors.primary,
        borderTopColor: AppColors.primary,
        fontFamily: AppFonts.bold,
    },
    formInputContainer: {
        marginBottom: 20
    },
    formInput: {
        width: 275,
        borderWidth: 1,
        padding: 10,
        paddingStart: 15,
        marginVertical: 7,
        borderRadius: 25,
        color: AppColors.primary,
        backgroundColor: 'rgba(115,115,115,0.55)', // Fondo semi-transparente para el input
        fontFamily: AppFonts.regular,
    },
    buttonForm: {
        backgroundColor: AppColors.primary,
        paddingVertical: 9,
        borderRadius: 25,
        textAlign: "center",
        fontFamily: AppFonts.medium,
        margin: 20,
        marginBottom: 7,
    },
    buttonFormText: {
        color: AppColors.background, // Color del texto del botón
        textAlign: "center",
        fontSize: 17,
        fontFamily: AppFonts.medium,
    },
    redirectButton: {
        width: "100%", // Botón de redirección que ocupa todo el ancho
    },
    redirectButtonText: {
        textAlign: "center",
        color: "darkorange", // Color del texto del botón de redirección
        fontWeight: 'bold',
    },
    redirectText: {
        color: AppColors.primary,
        textAlign: "center",
        fontSize: 12,
        fontFamily: AppFonts.regular,
    },
    bottomTab: {
        backgroundColor: AppColors.background,
        borderTopColor: AppColors.background,
        height: "8%",
        justifyContent: "center",
        paddingTop: 10,
        borderColor: AppColors.background
    },
    tabItem: {
        justifyContent: "center",
        textAlignVertical: "center",
        paddingTop: 10
    },
    drawerNav: {
        backgroundColor: AppColors.background,
        width: 225,
        height: "100%",
    },
    drawerItem: {
        borderRadius: 10,
        marginTop: 10,
        fontFamily: AppFonts.regular,
    },
    reviewCard: {
        backgroundColor: AppColors.cardBackground,
        padding: 12,
        paddingVertical: 8,
        borderRadius: 10,
        marginTop: 10,
        borderWidth: 2,
        borderColor: "#24243C"
    },
    searchBar: {
        backgroundColor: AppColors.cardBackground, // Fondo de la barra de búsqueda
    }
});

// Exporta los estilos para su uso en otros componentes
export default styles;
