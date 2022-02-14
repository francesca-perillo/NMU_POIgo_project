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
                        <View style={{flexDirection: 'column', flex:5}}>
                            <Text style={styles.buttonText}>Percorsi</Text>
                            <Text style={styles.buttonText}>tematici</Text>
                        </View>
                        <Ionicons style={styles.button_icon}  name="chevron-forward-outline"></Ionicons>
                    </View>
                </Pressable>
    
                <Pressable onPress={() => navigation.navigate('Category')}>
                    <View style={styles.button}>
                        <View style={{flexDirection: 'column', flex:5}}>
                            <Text style={styles.buttonText}>Area di</Text>
                            <Text style={styles.buttonText}>interesse</Text>
                        </View>
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
        color: colors.dark_blue_palette,
        fontWeight: "bold",
        textAlign: "center",
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

export default CityRoaming;