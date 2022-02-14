import React from "react";
import { StyleSheet, Text, View, ScrollView, Dimensions, TouchableOpacity, ImageBackground, Alert} from "react-native";
import colors from '../config/colors';
//barra di ricerca
import { Searchbar } from 'react-native-paper';

const windowWidth = Dimensions.get('window').width;


const CarSharingScreen = () => {

    // to search bar 
    const [searchQuery, setSearchQuery] = React.useState('');
    const onChangeText = query => setSearchQuery(query);
    
  return (   
    <View style={styles.container}>

        <View style = {styles.header}>
            <Text style ={styles.title}>Noleggia un'auto</Text>
            <Text style ={styles.subtitle}>Dipenderai solo da te stesso!</Text>

            <Searchbar
                style={styles.searchbar}
                placeholder="Cerca ..."
                onChangeText={onChangeText}
                value={searchQuery}
            />

        </View> 

        <View style = {styles.information}>
            <Text style = {styles.infoText}>PoiGo! collabora con varie ditte di <Text style = {{fontStyle:'italic'}}>Car Sharing</Text>, scegli quella che più fa per te!</Text>
        </View>   
    
        <View style={styles.body}>

            <ScrollView>

                <TouchableOpacity onPress={() => Alert.alert(
                    'Sei sicuro di voler continuare?',
                    'La ditta Corrente usa auto solo elettriche per il bene dell\'ambiente. \n\nLa nuova tariffa al minuto è di 0,29€ tutto compreso, quella oraria di 15€, mentre quella giornaliera è di 48€. \n\nPremendo ok accetti di essere contattato dalla ditta di CarSharing Corrente.',
                    [
                        {text: 'Non voglio essere contattato', onPress: () => console.log('Yes button is clicked')},
                        {text: 'Ok, contattami', onPress: () => console.log('OK button clicked')},
                    ],
                    { 
                        cancelable: false 
                    }
                    )}>
                    <View style={styles.categoryContainer}>
                        <ImageBackground source={require('../../assets/car_sharing/corrente.jpg')} style={styles.categoryImage}/>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => Alert.alert(
                    'Sei sicuro di voler continuare?',
                    'Il costo del servizio ammonta a 29 centesimi al minuto, cifra che include le spese di assicurazione, manutenzione, energia e parcheggio. La tariffa giornaliera (attiva automaticamente dopo 3 ore di utilizzo), è di 50€. L\'iscrizione al servizio costa invece 10€, ma include 30 minuti gratuiti. \n\nPremendo ok accetti di essere contattato dalla ditta di CarSharing',
                    [
                        {text: 'Non voglio essere contattato', onPress: () => console.log('Yes button is clicked')},
                        {text: 'Ok, contattami', onPress: () => console.log('OK button clicked')},
                    ],
                    { 
                        cancelable: false 
                    }
                    )}>
                    <View style={styles.categoryContainer}>
                        <ImageBackground source={require('../../assets/car_sharing/4usmobile.jpg')} style={styles.categoryImage}/>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => Alert.alert(
                    'Sei sicuro di voler continuare?',
                    'La 500 Enjoy è sempre più flessibile e adatta a te. Con le nuove tariffe giornaliere puoi noleggiarla fino a 15 giorni consecutivi e partire per un viaggio di lavoro, una vacanza, un weekend fuoriporta o muoverti liberamente per la tua città.\n\nPer Fiat 500 tariffa massima giornaliera è di 69€\n\n Per Fiat Doblò la tariffa massima giornaliera è di 89€. \n\n Premendo ok accetti di essere contattato dalla ditta di CarSharing enjoy.',
                    [
                        {text: 'Non voglio essere contattato', onPress: () => console.log('Yes button is clicked')},
                        {text: 'Ok, contattami', onPress: () => console.log('OK button clicked')},
                    ],
                    { 
                        cancelable: false 
                    }
                    )}>
                    <View style={styles.categoryContainer}>
                        <ImageBackground source={require('../../assets/car_sharing/enojoy.jpg')} style={styles.categoryImage}/>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => Alert.alert(
                    'Sei sicuro di voler continuare?',
                    'La tariffa del car sharing elettrico di Sharengo è di 0,28 centesimi di euro al minuto e di 50 euro al giorno, invece in un\'ora di utilizzo il costo è di 12 euro. La prenotazione è gratuita. \n\nPremendo ok accetti di essere contattato dalla ditta di CarSharing',
                    [
                        {text: 'Non voglio essere contattato', onPress: () => console.log('Yes button is clicked')},
                        {text: 'Ok, contattami', onPress: () => console.log('OK button clicked')},
                    ],
                    { 
                        cancelable: false 
                    }
                    )}>
                    <View style={styles.categoryContainer}>
                        <ImageBackground source={require('../../assets/car_sharing/sharengo.jpg')} style={styles.categoryImage}/>
                    </View>
                </TouchableOpacity>
            </ScrollView>   
           
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
        marginBottom: 80,
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
    information : {
        marginBottom: 10,
        marginLeft: 30,
        marginRight: 30,
        marginTop: 30,  
    },
    infoText : {
        fontSize: 16,
    },
    categoryContainer: {
        height: 100,
        width: '90%',
        alignSelf:"center",
        marginBottom: 15,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        overflow: 'hidden',
    },
    darkOverlay: {
        height: '100%',
        width: '100%',
        position: 'absolute',
        backgroundColor: 'black',
        borderRadius: 20,
        opacity: 0.5,
    },
    categoryImage: {
        height: '100%',
        width: '100%',
        borderRadius: 20,
        opacity: 1,
    },
    categoryTextContainer: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        opacity: 1,
        shadowColor: 'black',
    },
    categoryText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        opacity: 1,
    }
});

export default CarSharingScreen;