import React from "react";
import { StyleSheet, Text, View, Image, SafeAreaView, Pressable, Dimensions, TouchableOpacity } from "react-native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Entypo from 'react-native-vector-icons/Entypo';
import colors from '../config/colors';
import CityRoamingScreen from './CityRoamingScreen';
import MapScreen from "./MapScreen";
import DetailScreen from "./DetailScreen";
import CategoryScreen from "./CategoryScreen";
import ClassicNavigationScreen from "./ClassicNavigationScreen";
import ListPoiScreen from "./ListPoiScreen";
import CategoryRoutesScreen from "./CategoryRoutesScreen";

const Stack = createNativeStackNavigator();
const windowWidth = Dimensions.get('window').width;


const HomeScreen = ({ navigation }) => {
  return (   
    <SafeAreaView style={styles.container}>

<View style={styles.header}>
        <View style={styles.row_container}>
          <View style={styles.header_title}>
            <Text style={styles.title}></Text>
          </View>
          <TouchableOpacity style={styles.header_icon}>
            <Entypo name='bell' size={40} color={colors.dark_blue_palette}  onPress={() => alert(`Lista delle notifiche`)}/>
          </TouchableOpacity>
        </View>
      </View>

        <View style={styles.body}>
            <Text style ={styles.title}>Benvenuto</Text>
            <Text style ={styles.sub_title}>Scegli la modalità di navigazione</Text>
            <Pressable onPress={() => navigation.navigate('ClassicNavigation')}>
                <Image style={styles.buttonImage}
                    source={require("../../assets/ButtonImg/cla_nav.jpg")}>
                </Image>
                <View style={styles.button}>
                    <Text style={styles.buttonText}>Navigazione Classica</Text>
                </View>
            </Pressable>

            <Pressable onPress={() => navigation.navigate('CityRoaming')}>
                <Image style={styles.buttonImage}
                    source={require("../../assets/ButtonImg/sem_nav.jpg")}>
                </Image>
                <View style={styles.button}>
                    <Text style={styles.buttonText}>City Roaming</Text>
                </View>
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
      <Stack.Screen name="Category" component={CategoryScreen}/>
      <Stack.Screen name="ClassicNavigation" component={ClassicNavigationScreen}/>
      <Stack.Screen name="ListPoi" component={ListPoiScreen}/>
      <Stack.Screen name="Routes" component={CategoryRoutesScreen}/>
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.dirty_white_palette,
    justifyContent: 'center',
  },
  buttonImage: {
    width: windowWidth-60,
    height: 100,
    marginBottom: 40,
    borderRadius: 50,
    //opacity: 0.5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  row_container: {
      flex: 1,
      flexDirection: "row"
  },
  header:{
      flex: 1,
      marginTop:40
  },
  header_title:{
      flex: 6,
      flexDirection: "row",
  },
  header_icon: {
      flex: 1,
      top:20,
      justifyContent:"center",
      alignItems: "center",
  },
  body: {
      flex: 6,
      marginTop: "35%",
      alignItems:"center"
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
  button: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 30,
      justifyContent: 'center',
      alignItems: 'center'
  },
  buttonText: {
    //color: colors.dark_blue_palette,
    color: "white",
    fontSize:20,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    textTransform: "uppercase",
    textShadowColor: colors.dark_blue_palette,
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 1
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