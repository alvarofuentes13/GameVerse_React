import {StyleSheet} from "react-native";
import {AppColors, AppFonts} from "./AppTheme";

const emailError:boolean = false;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: AppColors.background
    },
    superText:{ // Titulos muy grandes
        color: AppColors.primary,
        fontSize: 20,
        fontFamily: AppFonts.bold,
        marginVertical: 10
    },
    titleText:{ // Titulos normales en letra blanca y en negrita
        color: AppColors.primary,
        fontSize: 16,
        fontFamily: AppFonts.medium,
    },
    headerText:{ // Titulos pero mas pequeños
        color: AppColors.primary,
        fontSize: 14,
        fontFamily: AppFonts.regular,
    },
    normalText:{ // Texto normal
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
        backgroundColor: "white",
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
        color: AppColors.white,
        borderTopColor: AppColors.white,
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
        color: AppColors.white,
        backgroundColor: 'rgba(115,115,115,0.55)',
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
        color: AppColors.background,
        textAlign: "center",
        fontSize: 17,
        fontFamily: AppFonts.medium,
    },
    redirectButton: {
        width: "100%",
    },
    redirectButtonText: {
        textAlign: "center",
        color: "darkorange",
        fontWeight: 'bold',
    },
    redirectText: {
        color: AppColors.white,
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
        borderColor: AppColors.background,
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
        borderRadius: 20,
        fontFamily: AppFonts.regular,
    },
    reviewCard:{
        backgroundColor: AppColors.cardBackground,
        padding: 12,
        paddingVertical: 8,
        borderRadius: 7,
        marginTop: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,

        elevation: 4,
    }
});


export default styles;
