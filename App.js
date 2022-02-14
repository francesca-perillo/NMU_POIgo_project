import React, { useEffect, useRef } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
//Screens to show in tab bar
import HomeScreen from "./src/screens/HomeScreen";
import CalendarScreen from "./src/screens/CalendarScreen";
import AlertList from "./src/screens/AlertScreen";
import POIviciniScreen from "./src/screens/POIviciniScreen";
import TransportScreen from "./src/screens/TransportScreen";
//Screen to show as chindren of HomeScreen in tab bar
import CityRoamingScreen from './src/screens/CityRoamingScreen';
import MapScreen from "./src/screens/MapScreen";
import CategoryScreen from "./src/screens/CategoryScreen";
import ClassicNavigationScreen from "./src/screens/ClassicNavigationScreen";
import ListPoiScreen from "./src/screens/ListPoiScreen";
import CategoryRoutesScreen from "./src/screens/CategoryRoutesScreen";
//Screen to show as children of Transport in tab bar
import CarSharingScreen from "./src/screens/CarSharingScreen";
//Screen to show without bar 
import SplashScreen from "./src/screens/SplashScreen";
import LoginScreen from "./src/screens/LoginScreen";
import RegisterScreen from "./src/screens/RegisterScreen";
import DetailScreen from "./src/screens/DetailScreen";
import NavigatorScreen from "./src/screens/NavigatorScreen";
import RouteScreen from './src/screens/RouteScreen';
//Navbar with style and animation
import * as Animatable from 'react-native-animatable';
import colors from './src/config/colors';
import { StyleSheet, TouchableOpacity } from 'react-native'
import Icon, { Icons } from './src/components/Icons';

//tab style!
const TabButton = (props) => {
    const { item, onPress, accessibilityState } = props;
    const focused = accessibilityState.selected;
    const viewRef = useRef(null);

    useEffect(() => {
        if (focused)
            viewRef.current.animate({ 0: { scale: 1, rotate: '0deg' }, 1: { scale: 1, rotate: '360deg' } });
    }, [focused])

    return (
        <TouchableOpacity
            onPress={onPress}
            style={styles.container}>
            <Animatable.View
                ref={viewRef}
                duration={500}
                style={styles.container}>
                <Icon type={item.type} name={focused ? item.activeIcon : item.inActiveIcon} color={focused ? colors.dark_blue_palette : colors.grey} />
            </Animatable.View>
            {/* <Animatable.Text style={{ color: focused ? colors.dark_blue_palette : colors.grey }}>{item.label}</Animatable.Text> */}
        </TouchableOpacity>
    )
}
const TabArr = [
    { route: 'Home', label: 'Home Page', type: Icons.Ionicons, activeIcon: 'home', inActiveIcon: 'home-outline', component: HomeChild },
    { route: 'Eventi', label: 'Eventi', type: Icons.Ionicons, activeIcon: 'calendar', inActiveIcon: 'calendar-outline', component: CalendarScreen },
    { route: 'Segnalazioni', label: 'Segnalazioni', type: Icons.Ionicons, activeIcon: 'megaphone', inActiveIcon: 'megaphone-outline', component: AlertList },
    { route: 'Near', label: 'Vicino a te', type: Icons.Ionicons, activeIcon: 'location', inActiveIcon: 'location-outline', component: POIviciniScreen },
    { route: 'Transport', label: 'Trasporto', type: Icons.Ionicons, activeIcon: 'ios-car', inActiveIcon: 'ios-car-outline', component: TransportChild },
];

//Navigator per la barra di navigazione
const Tab = createBottomTabNavigator();
function NavigationalBar() {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    height: 80,
                    paddingTop: 10,
                    paddingBottom: 20,
                    position: 'absolute',
                    alignContent: "center",
                    opacity: 0.95,
                    // borderTopLeftRadius:20,
                    // borderTopRightRadius:20, 
                    // shadowColor: "#000",
                    // shadowOffset: {
                    //     width: 0,
                    //     height: 12,
                    // },
                    // shadowOpacity: 0.58,
                    // shadowRadius: 16.00,
                    // elevation: 24,
                }
            }}
        >
            {TabArr.map((item, index) => {
                return (
                    <Tab.Screen key={index} name={item.label} component={item.component}
                        options={{
                            tabBarButton: (props) => <TabButton {...props} item={item} />
                        }}
                    />
                )
            })}
        </Tab.Navigator>
    )
}

//navigator per gli screens iniziali, che non necessitano della barra di navigazione.
const InitialStack = createNativeStackNavigator()
const App = () => {
    return (
        <NavigationContainer>
            <InitialStack.Navigator screenOptions={{ headerShown: false }}>
                <InitialStack.Screen name='Splash' component={SplashScreen} />
                <InitialStack.Screen name='Login' component={LoginScreen} />
                <InitialStack.Screen name='Register' component={RegisterScreen} />
                <InitialStack.Screen name='Home' component={NavigationalBar} />
                <InitialStack.Screen name='Transport' component={TransportScreen} />
                <HomeStack.Screen name='DetailPOI' component={DetailScreen} />
                <HomeStack.Screen name='Route' component={RouteScreen} />
            </InitialStack.Navigator>
        </NavigationContainer>
    )
}

const HomeStack = createNativeStackNavigator();
function HomeChild() {
    return (
        <HomeStack.Navigator screenOptions={{ headerShown: false }}>
            <HomeStack.Screen name='HomeScreen' component={HomeScreen} />
            <HomeStack.Screen name='ClassicNavigation' component={ClassicNavigationScreen} />
            <HomeStack.Screen name='CityRoaming' component={CityRoamingScreen} />
            <HomeStack.Screen name='Routes' component={CategoryRoutesScreen} />
            <HomeStack.Screen name='Category' component={CategoryScreen} />
            <HomeStack.Screen name='ListPoi' component={ListPoiScreen} />
            <HomeStack.Screen name='Map' component={MapScreen} />
            <HomeStack.Screen name='Navigator' component={NavigatorScreen} />
        </HomeStack.Navigator>
    )
}

const TransportStack = createNativeStackNavigator();
function TransportChild() {
    return (
        <TransportStack.Navigator screenOptions={{ headerShown: false }}>
            <TransportStack.Screen name='Transport' component={TransportScreen} />
            <TransportStack.Screen name='CarSharing' component={CarSharingScreen} />
        </TransportStack.Navigator>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default App;

