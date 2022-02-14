import React from "react";
import { StyleSheet, Text, View, Pressable, Dimensions, ImageBackground} from "react-native";
import colors from '../config/colors';
const windowWidth = Dimensions.get('window').width;
//per navigare tra le schermate si importa useNavigator e
//si dichiara const navigation = useNavigation();
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const CityRoaming = () => {
    const navigation = useNavigation();
    return (   
        <View style={styles.container}>
    
            <ImageBackground
                source={require('../../assets/wallpaper4.png')}
                style={{
                    height: (Dimensions.get('window').height / 12) * 3.9,
                    top:10,
                    zIndex: 999,
                    width: '100%',
                    position: "absolute",
                }}>
            </ImageBackground>
        
            <View style={styles.body}>
    
                <View style={styles.header}>
                    <Text style={styles.title}>Navigazione</Text>
                    <Text style={styles.title}>personalizzata</Text>
                </View>
    
                <Text style ={styles.buttonDescription}>Fidati di noi scegliendo i percorsi tematici che il team di poiGo! ha pensato per te, 
                    oppure inizia scegliendo le tue preferenze per area di interesse.</Text>
                <Pressable onPress={() => navigation.navigate('Routes')}>
    
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>Percorsi tematici</Text>
                        <Ionicons style={styles.button_icon}  name="chevron-forward-outline"></Ionicons>
                    </View>
                </Pressable>
    
                <Pressable onPress={() => navigation.navigate('Category')}>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>Aarea di interesse</Text>
                        <Ionicons style={styles.button_icon}  name="chevron-forward-outline"></Ionicons>
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
        flexDirection: "row",
    },
    header: {
        alignSelf: 'center',
        marginBottom: 30,
    },
    title: {
        overflow: 'visible',
        fontSize: 30,
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
        left: '12%',
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
        backgroundColor: colors.sea_blue,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        marginTop: (Dimensions.get('window').height / 12) * 6.8,
        height: '100%'
    
    },
    buttonDescription: {
        color: colors.white,
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
        backgroundColor: 'rgba(255,255,255,255)',
        flexDirection: 'row',
    },
    buttonText: {
        flex:5,
        color: colors.dark_blue_palette,
        marginLeft: 10,
        fontSize:20,
        fontWeight: 'bold',
        letterSpacing: 0.25,
    },
    button_icon:{
        flex:1,
        fontSize: 40,
        color: colors.dark_blue_palette,
        top:'1%'
    }
    });

export default CityRoaming;