import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import ContactInfo from "../components/CotactInfo";
import colors from '../config/colors';
import Review from "../components/Review";
import Entypo from 'react-native-vector-icons/Entypo';

const reviews = [
    {
        id: 1,
        userName: "Luca",
        description: "Posto bellissimo, consigliato!"
    },
    {
        id: 2,
        userName: "Maria",
        description: "Una tra le più belle grotte di Pietrapaola!"
    },
];

const contactInfo = [
    {
        id: 1,
        name: "Indirizzo: ",
        detail: "Via Roma, 77, 87060 Pietrapaola CS"
    },
    {
        id: 2,
        name: "Orario: ",
        detail: "9-13"
    },
    {
        id: 3,
        name: "Telefono: ",
        detail: "055-1234567"
    },
];

const DetailScreen = () => {
    return (
        <View style={styles.container}>
            <Image style={styles.image} source={require('../../assets/grottadelprincipe.jpg')} />
            <TouchableOpacity
                style={styles.notification}
            >
                <Entypo name='bell' size={30} color={colors.dark_blue_palette}  onPress={() => alert(`Lista delle notifiche`)}/>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.goMap}
            >
                <Feather name="map-pin" size={30} color="white" />
            </TouchableOpacity>
            <View style={styles.contentContainer}>
                <Text style={styles.title}>Grotta del Principe</Text>
                <Text style={styles.description}>Un esempio estremamente raffinato di architettura rupestre:
                    si tratta di un invaso tricellulare cui si accede attraverso una serie di gradini ricavati in roccia,
                    al cui interno si rinviene un arco a tutto sesto e una serie di colonnine con capitelli a motivi
                    floreali riprodotti nell’arenaria. </Text>
            </View>

            <View style={styles.info}>
                <Text style={styles.infoTitle}>Informazioni di contatto</Text>
                {contactInfo.map(info => (
                    <ContactInfo key={info.id} contactInfo={info} />
                ))}
            </View>

            <View style={styles.contentContainer}>
                <Text style={styles.reviewsTitle}>Recensioni</Text>

                {reviews.map(review => (
                    <Review key={review.id} review={review} />
                ))}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    image: {
        height: '30%',
        width: '100%',
        resizeMode: 'cover',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    notification: {
        position: 'absolute',
        top: 40,
        right: 40,
        padding: 10,
        borderRadius: 50,
        width: 50,
        height: 50,
        backgroundColor: "#D7E5EE",
    },
    goMap: {
        position: "absolute",
        top: '25%',
        right: 30,
        borderRadius: 50,
        width: 70,
        height: 70,
        padding: 20,
        backgroundColor: "#0284C9",
    },
    contentContainer: {
        margin: 10,
    },
    title: {
        fontSize: 30,
        fontWeight: "bold",
        color: '#0A3556'
    },
    description: {
        fontSize: 20,
        textAlign: 'justify',
        lineHeight: 20 * 1.2,
    },
    info: {
        marginTop: 5,
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 10,
    },
    infoTitle: {
        fontSize: 30,
        color: '#0A3556',
        fontWeight: "bold",
    },
    reviewsTitle: {
        fontSize: 30,
        fontWeight: "bold",
        color: '#0A3556'
    },
});

export default DetailScreen;