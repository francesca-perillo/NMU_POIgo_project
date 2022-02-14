import React from "react";
import { StyleSheet, Text, View, Pressable, Dimensions, Image} from "react-native";
import colors from '../config/colors';
const windowWidth = Dimensions.get('window').width;
//per navigare tra le schermate si importa useNavigator e
//si dichiara const navigation = useNavigation();
import { useNavigation } from '@react-navigation/native';

const CityRoaming = () => {
    const navigation = useNavigation();
    return (
       
        <View style={styles.container}>

            <View style = {styles.header}>
                <Text style ={styles.title}>City Roaming</Text>
                <Text style ={styles.subtitle}>Fai la tua scelta!</Text>
            </View>

            <View style={styles.body}>
                <Text style ={styles.buttonDescription}>Fidati di noi, scegli un percorso a tema!</Text>
                <Pressable onPress={() => navigation.navigate('Routes')}>
                    <Image style={styles.buttonImage}
                        source={require("../../assets/ButtonImg/tematic_route.jpg")}>
                    </Image>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>Percorsi tematici</Text>
                    </View>
                </Pressable>

                <Text style ={styles.buttonDescription}>Segui i tuoi interessi!</Text>
                <Pressable onPress={() => navigation.navigate('Category')}>
                    <Image style={styles.buttonImage}
                        source={require("../../assets/ButtonImg/area_interest.jpg")}>
                    </Image>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>Area di interesse</Text>
                    </View>
                </Pressable>
                
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
        padding: 20,
        flexDirection: "row"
    },
    header:{
        height: Dimensions.get('window').height/5,
        backgroundColor: colors.dark_blue_palette,
        borderBottomRightRadius:200
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
        alignItems: "center",
        marginTop: Dimensions.get('window').height /16
    },
    nav_bar:{
        flex: 1,
        justifyContent:"center",
        alignItems: "center",
    },
    title: {
        fontSize: 40,
        color: colors.white,
        fontWeight: "bold",
        marginTop: Dimensions.get('window').height/16,
        marginLeft: 20
    },
    subtitle:{
        color: colors.grey,
        fontSize: 40,
        marginLeft: 20,
        fontStyle: "italic",
    },
    buttonDescription:{
        color: colors.dark_blue_palette,
        textAlign: 'center',
        fontSize: 20,
        marginVertical:20,
        marginLeft: 30, 
        marginRight: 30,
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

export default CityRoaming;