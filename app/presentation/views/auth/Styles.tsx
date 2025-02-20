import {StyleSheet} from "react-native";
import {AppColors, AppFonts} from "../../theme/AppTheme";


const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: AppColors.background
    },
    title: {
        color: 'white',
        textAlign: 'center',
        marginTop: "6%",
        fontSize: 20,
        fontWeight: 'bold',
    },
    headerText: {
      color: AppColors.white,
      textAlign: 'center',
      fontSize: 15,
      fontFamily: AppFonts.regular
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
        borderWidth: 0,
        height: "8%",
        justifyContent: "center",
        paddingTop: 10,
    },
    drawerNav: {
        backgroundColor: AppColors.background,
        width: 225,
        height: "100%",
    },
    drawerItem: {
        borderRadius: 20
    }
});


export default styles;
