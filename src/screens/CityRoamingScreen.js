import React from "react";
import { StyleSheet, Text, View, Button, SafeAreaView, Pressable} from "react-native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DetailScreen from './DetailScreen';
import Entypo from 'react-native-vector-icons/Entypo';
import colors from '../config/colors';

const Stack = createNativeStackNavigator();

const HomeScreen = ({ navigation }) => {
    return (
       
        <SafeAreaView style={styles.container}>

            <View style={styles.header}>
                    <View style={styles.row_container}>
                        <View style={styles.header_title}/>
                        <View style={styles.header_icon}>
                            <Entypo name='bell' size='40' color='white'  onPress={() => alert(`Lista delle notifiche`)}/>
                        </View>
                    </View>
            </View>

            <View style={styles.body}>
                <Text style ={styles.title}>City Roaming</Text>
                <Text style ={styles.sub_title}>Scegli il tipo di navigazione City Roaming che preferisci</Text>
                <Pressable style={styles.buttonContainer} onPress={() => Alert.alert('Vai ai percorsi tematici')}>
                    <Text style ={styles.buttonText}>Percorsi tematici</Text>    
                </Pressable>
                <Pressable style={styles.buttonContainer} onPress={() => Alert.alert('Vai ad area di interesse')}>
                    <Text style ={styles.buttonText}>Area di interesse</Text>
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
      <Stack.Screen name="Details" component={DetailScreen} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.blue_prototypes,
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
      color: "#fff",
      fontWeight: "bold",
      textAlign: 'center',
      marginVertical: 8,
  },
  sub_title:{
      color: "#fff",
      textAlign: 'center',
      marginVertical: 8,
  },
  buttonContainer: {
      elevation: 8,
      alignItems:"center",
      backgroundColor: "#fff",
      borderRadius: 30,
      marginTop:30,
      paddingVertical: 30,
      marginLeft:"5%",
      marginRight:"5%",
  },
  buttonText: {
      color: "black",
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