import React from "react";
import { StyleSheet, Text, View, Button, SafeAreaView, Pressable} from "react-native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Entypo from 'react-native-vector-icons/Entypo';
import colors from '../config/colors';
import MapScreen from "./MapScreen";
import DetailScreen from "./DetailScreen";
import CityRoamingScreen from './CityRoamingScreen';

const Stack = createNativeStackNavigator();

const HomeScreen = ({ navigation }) => {
  return (
       
    <SafeAreaView style={styles.container}>

        <View style={styles.header}>
                <View style={styles.row_container}>
                    <View style={styles.header_title}/>
                    <View style={styles.header_icon}>
                      <Entypo name='bell' size={40} color={colors.dark_blue_palette}  onPress={() => alert(`Lista delle notifiche`)}/>
                    </View>
                </View>
        </View>

        <View style={styles.body}>
            <Text style ={styles.title}>Benvenuto</Text>
            <Text style ={styles.sub_title}>Scegli la modalità di navigazione</Text>
            <Pressable style={styles.buttonContainer} onPress={() => navigation.navigate('Home')}>
                <Text style ={styles.buttonText}>Classica</Text>    
            </Pressable>
            <Pressable style={styles.buttonContainer} onPress={() => navigation.navigate('CityRoaming')}>
                <Text style ={styles.buttonText}>City Roaming</Text>
            </Pressable>
        </View>

       

        <View style={styles.nav_bar} >
            <Text></Text>
        </View>
    </SafeAreaView>
);
}

const HomeNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Home" screenOptions={{
      headerShown: false
    }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="CityRoaming" component={CityRoamingScreen} />
      <Stack.Screen name="Map" component={MapScreen} /> 
      <Stack.Screen name="DetailPOI" component={DetailScreen} /> 
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.dirty_white_palette,
    justifyContent: 'center',
  },
  row_container: {
      flex: 1,
      padding: 20,
      flexDirection: "row"
  },
  header:{
      flex: 1,
  },
  header_title:{
      flex: 6,
      flexDirection: "row",
  },
  header_icon: {
      flex: 1,
      justifyContent:"center",
      alignItems: "center",
  },
  body: {
      flex: 6,
      marginTop: "35%"
  },
  nav_bar:{
      flex: 1,
      justifyContent:"center",
      alignItems: "center",
  },
  title: {
      fontSize: 40,
      color: colors.dark_blue_palette,
      fontWeight: "bold",
      textAlign: 'center',
      marginVertical: 8,
  },
  sub_title:{
      color: colors.dark_blue_palette,
      textAlign: 'center',
      marginVertical: 8,
  },
  buttonContainer: {
      alignItems:"center",
      backgroundColor: colors.dark_blue_palette,
      borderRadius: 50,
      marginTop:30,
      paddingVertical: 30,
      marginLeft:"5%",
      marginRight:"5%",
      shadowColor: "#000",
        shadowOffset: {
        width: 0,
        height: 2
        },
        shadowOpacity: 0.4,
        shadowRadius: 4,
  },
  buttonText: {
      color: "white",
      fontWeight: 'bold',
      letterSpacing: 0.25,
      textTransform: "uppercase"
  },
  hiddenText:{
      color: "#fff",
  },
  footer: {
      height: 80,
      width: "100%",
      backgroundColor: colors.green_palette,
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "center",
      paddingHorizontal: 10
  },
  icon: {
      width: 40,
      height: 40,
      backgroundColor: "gray"
  },
});

export default HomeNavigator;