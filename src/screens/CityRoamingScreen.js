import React from "react";
import { StyleSheet, Text, View, Alert, SafeAreaView, Pressable, Dimensions, Image} from "react-native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DetailScreen from './DetailScreen';
import Entypo from 'react-native-vector-icons/Entypo';
import colors from '../config/colors';

const Stack = createNativeStackNavigator();
const windowWidth = Dimensions.get('window').width;

const HomeScreen = ({ navigation }) => {
    return (
       
        <SafeAreaView style={styles.container}>

            <View style={styles.header}>
                    <View style={styles.row_container}>
                        <View style={styles.header_title}/>
                        <View style={styles.header_icon}>
                            <Entypo name='bell' size={35} color={colors.dark_blue_palette}  onPress={() => Alert.alert(`Lista delle notifiche`)}/>
                        </View>
                    </View>
            </View>

            <View style={styles.body}>
                <Text style ={styles.title}>City Roaming</Text>
                <Text style ={styles.sub_title}>Scegli il tipo di navigazione City Roaming che preferisci</Text>
                <Pressable onPress={() => Alert.alert('Vai ai percorsi tematici')}>
                    <Image style={styles.buttonImage}
                        source={{uri: "https://cdn.motor1.com/images/mgl/Op20o/s3/porsche-classic-communication-management.jpg"}}>
                    </Image>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>Percorsi tematici</Text>
                    </View>
                </Pressable>

                <Pressable onPress={() => Alert.alert('Vai a area di interesse')}>
                    <Image style={styles.buttonImage}
                        source={{uri: "https://cdn.motor1.com/images/mgl/Op20o/s3/porsche-classic-communication-management.jpg"}}>
                    </Image>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>Area di interesse</Text>
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
      <Stack.Screen name="Details" component={DetailScreen} />
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
        alignItems: 'center',
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