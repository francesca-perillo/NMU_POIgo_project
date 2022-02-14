import React from "react";
import { StyleSheet, Text, View, Pressable, Dimensions, ImageBackground} from "react-native";
import colors from '../config/colors';
//per navigare tra le schermate si importa useNavigator e
//si dichiara const navigation = useNavigation();
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const windowWidth = Dimensions.get('window').width;


const HomeScreen = () => {
  const navigation = useNavigation();
  return (   
    <View style={styles.container}>

        <ImageBackground
            source={require('../../assets/wallpaper2.png')}
            style={{
                height: (Dimensions.get('window').height / 12) * 3.5,
                top: 45,
                width: '100%',
                position: "absolute",
                zIndex:999,
            }}>
        </ImageBackground>
    
        <View style={styles.body}>

            <View style={styles.header}>
                <Text style={styles.title}>Benvenuto</Text>
                <Text style={styles.subtitle}>in poiGo!</Text>
            </View>

            <Text style ={styles.buttonDescription}>Se conosci già la tua meta, la navigazione classica è quello che fa per te!
                Se non sai dove andare, fatti guidare da poiGo! Troveremo noi per te i luoghi migliori grazie alla navigazione personalizzata!</Text>
            <Pressable onPress={() => navigation.navigate('ClassicNavigation')}>

                <View style={styles.button}>
                <View style={{flexDirection: 'column', flex:5}}>
                            <Text style={styles.buttonText}>Navigazione</Text>
                            <Text style={styles.buttonText}>classica</Text>
                        </View>
                    <Ionicons style={styles.button_icon}  name="chevron-forward-outline"></Ionicons>
                </View>
            </Pressable>

            <Pressable onPress={() => navigation.navigate('CityRoaming')}>
                <View style={styles.button}>
                <View style={{flexDirection: 'column', flex:5}}>
                            <Text style={styles.buttonText}>Navigazione</Text>
                            <Text style={styles.buttonText}>personalizzata</Text>
                        </View>
                    <Ionicons style={styles.button_icon}  name="chevron-forward-outline"></Ionicons>
                </View>
            </Pressable>
        </View>

        <View style={styles.nav_bar} >
                
        </View>
    </View>
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
    height: 120,
    marginBottom: 40,
    borderRadius: 30,
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
    flexDirection: "row",
},
header: {
    alignSelf: 'center',
    marginBottom: 30,
},
title: {
    overflow: 'visible',
    fontSize: 40,
    color: colors.white,
    fontWeight: "bold",
    textAlign: "center",
    textShadowColor: colors.dark_blue_palette,
    textShadowOffset: {width: 2, height: 4},
    textShadowRadius: 1,
},
subtitle: {
    position:'absolute',
    top: '100%',
    left: '15%',
    paddingLeft: 5,
    paddingRight: 5,
    fontSize: 20,
    color: colors.dark_blue_palette,
    fontStyle: "italic",
    borderBottomLeftRadius:10,
    borderBottomRightRadius: 10,
    backgroundColor: colors.white,
    borderRadius: 10,
    overflow: 'hidden',
},
body: {
    paddingTop: 60,
    alignItems: "center",
    backgroundColor: colors.beau_blue,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    marginTop: (Dimensions.get('window').height / 12) * 6.8,
    height: '100%'

},
buttonDescription: {
    color: colors.black,
    textAlign: "justify",
    fontSize: 18,
    marginTop: 10,
    marginLeft: 30, 
    marginRight: 30,
},
button: {
    padding: 10,
    borderRadius: 10,
    marginTop: 30,
    width: Dimensions.get('window').width/2,
    backgroundColor: colors.dark_blue_palette,
    flexDirection: 'row',
},
buttonText: {
    color: colors.white,
    marginLeft: 10,
    fontSize:20,
    fontWeight: 'bold',
    letterSpacing: 0.25,
},
button_icon:{
    flex:1,
    fontSize: 40,
    color: colors.white,
    top:'1%'
}
});

export default HomeScreen;