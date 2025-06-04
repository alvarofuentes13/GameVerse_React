import React, {useEffect, useState} from "react";
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    ActivityIndicator,
    StyleSheet
} from "react-native";
import {createDrawerNavigator, DrawerNavigationProp} from "@react-navigation/drawer";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {useNavigation} from "@react-navigation/native";
import {FontAwesome, MaterialIcons} from "@expo/vector-icons";
import {AppColors} from "../../theme/AppTheme";
import styles from "../../theme/Styles";
import {RootStackParamsList} from "../../../../App";
import ProfileScreen from "./Profile";
import SearchScreen from "./Search";
import {VideojuegoCategoryListHome} from "../client/category/list/CategoryList";
import {ReviewInterface} from "../../../domain/entities/Review";
import ReviewCard from "../../components/cards/ReviewCard";
import ListScreen from "./List";
import SmallListCard from "../../components/cards/SmallListCard";
import {ListInterface} from "../../../domain/entities/List";
import GamesScreen from "./Games";
import {useAuth} from "../client/context/AuthContext";
import {ApiDelivery} from "../../../data/sources/remote/api/ApiDelivery";

export type DrawerParamsList = {
    Inicio: undefined,
    Listas: undefined,
    Juegos: undefined,
}

function HomeScreen() {
    const navigation = useNavigation<DrawerNavigationProp<DrawerParamsList>>();

    const {user: usuario, token: token, setAuth} = useAuth();
    const [reviews, setReviews] = useState<ReviewInterface[]>([]);
    const [listas, setListas] = useState<ListInterface[]>([]);
    const [cargando, setCargando] = useState(true);


    useEffect(() => {

        const fetchReviews = async () => {
            if (!usuario) return; // Si el usuario no está definido, no hacemos la petición.

            try {
                const response = await ApiDelivery.get(`/reviews`);
                console.log(response);
                setReviews(response.data);
            } catch (error) {
                console.error("Error al obtener reviews:", error);
            } finally {
                setCargando(false);
            }
        };

        const fetchLists = async () => {
            if (!usuario) return; // Si el usuario no está definido, no hacemos la petición.

            try {
                const response = await ApiDelivery.get(`/listas`);
                setListas(response.data);
            } catch (error) {
                console.error("Error al obtener listas:", error);
            } finally {
                setCargando(false);
            }
        };

        fetchLists();
        fetchReviews();
    }, [usuario]);


    return (
        <ScrollView style={{backgroundColor: AppColors.background, width: "100%", height: "100%", padding: 20}}>

            <TouchableOpacity onPress={() => navigation.openDrawer()} style={{marginBottom: 20}}>
                <FontAwesome name="bars" size={28} color="white"/>
            </TouchableOpacity>

            <Text style={styles.superText}>Hola, {usuario?.name}!</Text>

            <View>
                <Text style={styles.titleText}>Videojuegos populares de este mes</Text>
                <VideojuegoCategoryListHome/>
            </View>

            <View style={{marginVertical: 20}}>
                <Text style={styles.titleText}>Listas populares</Text>
                <View style={homeStyles.listContainer}>
                    {cargando ? (
                        <ActivityIndicator size="large" color={AppColors.yellow} style={{marginTop: 10}}/>
                    ) : (
                        listas.slice(0,3).map((lista) => (
                            <SmallListCard lista={lista}/>
                        ))
                    )}
                </View>
            </View>

            <View>
                <Text style={styles.titleText}>Reviews populares</Text>
                {cargando ? (
                    <ActivityIndicator size="large" color={AppColors.yellow} style={{marginTop: 10}}/>
                ) : (
                    reviews.slice(0,4).map((review) => (
                        <ReviewCard review={review}/>
                    ))
                )}
            </View>

        </ScrollView>

    )
}

const Drawer = createDrawerNavigator<DrawerParamsList>();
const Tab = createBottomTabNavigator<RootStackParamsList>();

export function HomeTabs() {
   /* const {user: usuario, token: token, setAuth} = useAuth();*/

    return (
        <Tab.Navigator screenOptions={{
            headerShown: false, tabBarStyle: styles.bottomTab,
            tabBarActiveTintColor: AppColors.primary, tabBarInactiveTintColor: AppColors.grey,
        }}>
            <Tab.Screen name="HomeScreen" component={HomeScreen} options={{
                tabBarShowLabel: false,
                tabBarItemStyle: styles.tabItem,
                tabBarIcon: ({color}) => <FontAwesome name="home" size={35} color={color}/>,
            }}/>
            <Tab.Screen name="SearchScreen" component={SearchScreen} options={{
                tabBarShowLabel: false,
                tabBarItemStyle: styles.tabItem,
                tabBarIcon: ({color}) => <MaterialIcons name="search" size={35} color={color}/>,
            }}/>
            <Tab.Screen name="ProfileScreen" component={ProfileScreen}  options={{
                tabBarShowLabel: false,
                tabBarItemStyle: styles.tabItem,
                tabBarIcon: ({color}) => <MaterialIcons name="person" size={35} color={color}/>,
            }}/>
            {/*<Tab.Screen name="ProfileScreen"  options={{
                tabBarShowLabel: false,
                tabBarItemStyle: styles.tabItem,
                tabBarIcon: ({color}) => <MaterialIcons name="person" size={35} color={color}/>,
            }}>
                {() => <ProfileScreen props={usuario}/>}
            </Tab.Screen>*/}
        </Tab.Navigator>
    );
}

export default function DrawerNavigator() {
    return (
        <Drawer.Navigator
            screenOptions={{
                drawerItemStyle: styles.drawerItem,
                drawerStyle: styles.drawerNav,
                headerShown: false,
                drawerActiveTintColor: AppColors.primary,
                drawerInactiveTintColor: AppColors.grey,
            }}>
            <Drawer.Screen name="Inicio" component={HomeTabs}/>
            <Drawer.Screen name="Juegos" component={GamesScreen}/>
            <Drawer.Screen name="Listas" component={ListScreen}/>
        </Drawer.Navigator>
    );
}

const homeStyles = StyleSheet.create({
    listContainer: {
        flexDirection: "row",
        height: 170,
        gap: "33%"
    }
})