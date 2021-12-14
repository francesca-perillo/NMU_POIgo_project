import React, { useState } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity, Pressable } from 'react-native';
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
        description: "Ci andavo coi miei amici del liceo, questo ristorante è la storia di Calopezzati!"
    },
];

const contactInfo = [
    {
        id: 1,
        name: "Indirizzo: ",
        detail: "Via Roma, 77, 87060 Calopezzati CS"
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
    const [show, setShow] = useState(false);
    return (
        <View style={styles.container}>
            <Image style={styles.image} source={require('../../assets/latavernetta.jpg')} />
            <TouchableOpacity
                style={styles.notification}
            >
                <Entypo name='bell' size={30} color={colors.dark_blue_palette} onPress={() => alert(`Lista delle notifiche`)} />
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.goMap}
            >
                <Feather name="map-pin" size={30} color="white" />
            </TouchableOpacity>
            <View style={styles.contentContainer}>
                <Text style={styles.title}>La tavernetta</Text>
                <Text style={styles.description}>Esclusiva taverna rustica con prosciutti a vista, nota per la pasta servita in padelle di acciaio.
                    Conserviamo tradizioni, piatti, ricette e sapori di una volta.  </Text>
            </View>

            <View style={styles.info}>
                <Text style={styles.infoTitle}>Informazioni di contatto</Text>
                <View style={styles.infoContainer}>
                    {contactInfo.map(info => (
                        <ContactInfo key={info.id} contactInfo={info} />
                    ))}
                </View>
            </View>

            <Pressable style={styles.buttonViewReviews} onPress={() => setShow(!show)}>
                <Text style={styles.buttonGoToReviews}>Visualizza recensioni</Text>
                {show && <Ionicons name="chevron-down" size={24} color="white" />}
                {!show && <Ionicons name="chevron-up" size={24} color="white" />}
            </Pressable>

            <View style={styles.reviewsContainer}>
                {show && reviews.map(review => (
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
    infoContainer: {
        backgroundColor: "#F5F5F5",
        borderRadius: 10,
        padding: 10,
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
    buttonViewReviews: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: colors.dark_blue_palette,
        borderRadius: 5,
        marginTop: 20,
        marginHorizontal: 10,
        paddingVertical: 10,
        paddingHorizontal: 25,
    },
    buttonGoToReviews: {
        color: 'white',
        textAlign: 'center',
        fontSize: 20,
    },
    reviewsContainer: {
        backgroundColor: '#F5F5F5',
        marginHorizontal: 10,
        borderBottomEndRadius: 10,
        borderBottomLeftRadius: 10,
    }
});

export default DetailScreen;