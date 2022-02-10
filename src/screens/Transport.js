import React from "react";
import { StyleSheet, Text, View, ScrollView, Pressable, Dimensions, useColorScheme} from "react-native";
import colors from '../config/colors';
//per navigare tra le schermate si importa useNavigator e
//si dichiara const navigation = useNavigation();
import { useNavigation } from '@react-navigation/native';
//barra di ricerca
import { Searchbar } from 'react-native-paper';

const windowWidth = Dimensions.get('window').width;


const Transport = () => {
  const navigation = useNavigation();

    // to search bar 
    const [searchQuery, setSearchQuery] = React.useState('');
    const onChangeText = query => setSearchQuery(query);
    
  return (   
    <View style={styles.container}>

        <View style = {styles.header}>
            <Text style ={styles.title}>Offerta di trasporto</Text>
            <Text style ={styles.subtitle}>Arriva dove vuoi in modo sicuro</Text>

            <Searchbar
                style={styles.searchbar}
                placeholder="Dove vuoi andare?"
                onChangeText={onChangeText}
                value={searchQuery}
            />

        </View>        
    
        <ScrollView style={styles.body}>
            
            <View style = {styles.card}>

                <View style = {styles.row_container}>
                    <Text style = {styles.enf}>Da: </Text>
                    <Text>Via Cristoforo Colombo n.14</Text>
                </View>

                <View style = {styles.row_container}>
                    <Text style = {styles.enf}>A: </Text>
                    <Text>Via Lamberti n.64</Text>
                </View>

                <View style = {styles.line}></View>

                <View style = {styles.row_container}>

                    <View style = {[styles.column_container]}>
                        <Text style = {styles.mezzoTrasporto1}>BUS</Text>
                        <Text>7.40 - 8:10**</Text>
                        <Text>8:15 - 8:30</Text>
                        <Text>10:30 - 11:00*</Text>
                    </View>
                    
                    <View  style = {[styles.column_container]}>
                    <Text style = {styles.mezzoTrasporto2}>METRO</Text>
                        <Text>7.40 - 7:47</Text>
                        <Text>8:15 - 8:22</Text>
                    </View>

                    <View  style = {[styles.column_container]}>
                    <Text style = {styles.mezzoTrasporto3}>TRENO</Text>
                        <Text>X</Text>
                    </View>
                   
                </View>

                <View style = {styles.line}></View>
                
                <Text> * Transita per Via Vergine </Text>
                <Text> ** Transita per Via Borgogna </Text>
                
            </View>

            {/**SECONDA CARTA */}
            <View style = {styles.card}>

                <View style = {styles.row_container}>
                    <Text style = {styles.enf}>Da: </Text>
                    <Text>Via Cristoforo Colombo n.14</Text>
                </View>

                <View style = {styles.row_container}>
                    <Text style = {styles.enf}>A: </Text>
                    <Text>Via Lamberti n.64</Text>
                </View>

                <View style = {styles.line}></View>

                <View style = {styles.row_container}>

                    <View style = {[styles.column_container]}>
                        <Text style = {styles.mezzoTrasporto1}>BUS</Text>
                        <Text>7.40 - 8:10**</Text>
                        <Text>8:15 - 8:30</Text>
                        <Text>10:30 - 11:00*</Text>
                    </View>
                    
                    <View  style = {[styles.column_container]}>
                    <Text style = {styles.mezzoTrasporto2}>METRO</Text>
                        <Text>7.40 - 7:47</Text>
                        <Text>8:15 - 8:22</Text>
                    </View>

                    <View  style = {[styles.column_container]}>
                    <Text style = {styles.mezzoTrasporto3}>TRENO</Text>
                        <Text>X</Text>
                    </View>
                   
                </View>

                <View style = {styles.line}></View>
                
                <Text> * Transita per Via Vergine </Text>
                <Text> ** Transita per Via Borgogna </Text>
                
            </View>

            <View style = {styles.card}>

                <View style = {styles.row_container}>
                    <Text style = {styles.enf}>Da: </Text>
                    <Text>Via Cristoforo Colombo n.14</Text>
                </View>

                <View style = {styles.row_container}>
                    <Text style = {styles.enf}>A: </Text>
                    <Text>Via Lamberti n.64</Text>
                </View>

                <View style = {styles.line}></View>

                <View style = {styles.row_container}>

                    <View style = {[styles.column_container]}>
                        <Text style = {styles.mezzoTrasporto1}>BUS</Text>
                        <Text>7.40 - 8:10**</Text>
                        <Text>8:15 - 8:30</Text>
                        <Text>10:30 - 11:00*</Text>
                    </View>
                    
                    <View  style = {[styles.column_container]}>
                    <Text style = {styles.mezzoTrasporto2}>METRO</Text>
                        <Text>7.40 - 7:47</Text>
                        <Text>8:15 - 8:22</Text>
                    </View>

                    <View  style = {[styles.column_container]}>
                    <Text style = {styles.mezzoTrasporto3}>TRENO</Text>
                        <Text>X</Text>
                    </View>
                   
                </View>

                <View style = {styles.line}></View>
                
                <Text> * Transita per Via Vergine </Text>
                <Text> ** Transita per Via Borgogna </Text>
                
            </View>

        </ScrollView>

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
        borderRadius: 60,
        //opacity: 0.5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },
    enf : {
        fontWeight:"bold",
    },
    row_container: {
        flexDirection: "row",
        marginTop:5,
    },
    column_container : {
        flexDirection: "column",
        flex:4,
        overflow: "hidden",
        alignItems:"center",
    },
    searchbar: {
        position: 'absolute',
        width: Dimensions.get('window').width / 1.1,
        alignSelf:"center",
        borderRadius: 30,
        marginTop: (Dimensions.get('window').height / 12) * 2.1 ,
        height: 50,
        flexDirection: 'row',
    },
    header:{
        height: (Dimensions.get('window').height / 12) * 2.5 ,
        backgroundColor: colors.dark_blue_palette,
    },
    body: {
        flex: 6,
        marginTop: (Dimensions.get('window').height / 25),
    },
    title: {
        fontSize: 30,
        color: colors.white,
        fontWeight: "bold",
        marginTop: (Dimensions.get('window').height / 12) * 0.7,
        marginLeft: 20
    },
    subtitle:{
        color: colors.grey,
        fontSize: 20,
        marginLeft: 20,
        marginTop:10,
        fontStyle: "italic",
    },
    card: {
        borderColor: colors.grey,
        borderWidth:1,
        width: Dimensions.get('window').width /1.1,
        alignSelf:"center",
        padding: 10,
        borderRadius:20,
        marginBottom: 20,
        backgroundColor: colors.white,
    }, 
    line : {
        borderWidth: 0.5,
        marginRight: 5,
        marginLeft: 5,
        marginTop: 10,
        backgroundColor: colors.grey, //for android
        borderColor: colors.grey,
    }, 
    mezzoTrasporto1 : {
        textAlign:"center",
        fontWeight: "bold",
        color: colors.white,
        width: 70,
        borderWidth:1,
        marginRight: 20,
        marginLeft: 20,
        marginBottom: 5,
        borderRadius: 10,
        overflow:"hidden",
        backgroundColor: colors.green_confirm_operation,
    },
    mezzoTrasporto2 : {
        textAlign:"center",
        fontWeight: "bold",
        color: colors.white,
        width: 70,
        borderWidth:1,
        marginRight: 20,
        marginLeft: 20,
        marginBottom: 5,
        borderRadius: 10,
        overflow:"hidden",
        backgroundColor: colors.light_blue_palette,
    },
    mezzoTrasporto3 : {
        textAlign:"center",
        fontWeight: "bold",
        color: colors.white,
        width: 70,
        borderWidth:1,
        marginRight: 20,
        marginLeft: 20,
        marginBottom: 5,
        borderRadius: 10,
        overflow:"hidden",
        backgroundColor: colors.red_discard_operation,
    }
});

export default Transport;