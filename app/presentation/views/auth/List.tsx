import React, {useEffect, useState} from "react";
import {
    View,
    ScrollView,
    ActivityIndicator,
    TouchableOpacity,
    TextInput
} from "react-native";
import {AppColors, AppFonts} from "../../theme/AppTheme";
import ListCard from "../../components/cards/ListCard";
import {useNavigation} from "@react-navigation/native";
import {DrawerNavigationProp} from "@react-navigation/drawer";
import {useUser} from "../client/context/UserContext";
import {DrawerParamsList} from "./Home";
import {ListInterface} from "../../../domain/entitites/List";
import {FontAwesome} from "@expo/vector-icons";
import NewListDrawer from "../../components/modals/NewListDrawer";

export default function ListScreen() {
    const usuario = useUser().user;
    const navigation = useNavigation<DrawerNavigationProp<DrawerParamsList>>();

    const [listas, setListas] = useState<ListInterface[]>([]);
    const [cargando, setCargando] = useState(true);
    const [search, setSearch] = useState("");

    useEffect(() => {
        const fetchLists = async () => {
            if (!usuario) return; // Si el usuario no está definido, no hacemos la petición.

            try {
                const response = await fetch(`http://localhost:8080/api/listas`);
                const data = await response.json();
                setListas(data);
            } catch (error) {
                console.error("Error al obtener listas:", error);
            } finally {
                setCargando(false);
            }
        };

        fetchLists();
    }, [usuario]);

    return (
        <View style={{backgroundColor: AppColors.background, width: "100%", height: "100%", padding: 20}}>

            <TouchableOpacity onPress={() => navigation.openDrawer()} style={{marginBottom: 20}}>
                <FontAwesome name="bars" size={28} color="white"/>
            </TouchableOpacity>

            <View style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: AppColors.cardBackground,
                borderRadius: 10,
                padding: 10,
                borderWidth: 2,
                borderColor: "#24243C"
            }}>
                <FontAwesome name="search" size={20} color="#FFF" style={{marginRight: 10}}/>
                <TextInput
                    style={{color: AppColors.grey, fontFamily: AppFonts.regular, fontSize: 14,}}
                    placeholder="Buscar juegos..."
                    placeholderTextColor="#777"
                    value={search}
                    onChangeText={setSearch}
                />
            </View>

            <ScrollView>
                {cargando ? (
                    <ActivityIndicator size="large" color={AppColors.yellow}/>
                ) : (
                    listas
                        .filter(lista => lista.nombre.toLowerCase().includes(search.toLowerCase()))
                        .map((lista) => (
                            <ListCard lista={lista}/>
                        ))
                )}
            </ScrollView>

            <NewListDrawer/>

        </View>

    );
}

