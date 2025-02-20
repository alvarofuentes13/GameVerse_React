import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from "@react-navigation/native";
import Login from "../views/auth/Login";
import Register from "../views/auth/Register";

const NavigationDrawer = createDrawerNavigator();

export function Drawer(props: any) {
    return (
        <NavigationContainer>
            <NavigationDrawer.Navigator initialRouteName="Home">
                <NavigationDrawer.Screen name="Login" component={Login} />
                <NavigationDrawer.Screen name="Register" component={Register} />
            </NavigationDrawer.Navigator>
        </NavigationContainer>
    )
}