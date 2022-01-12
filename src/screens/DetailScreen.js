import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity, Pressable } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import ContactInfo from "../components/CotactInfo";
import colors from '../config/colors';
import Review from "../components/Review";
import Entypo from 'react-native-vector-icons/Entypo';
import * as POIController from '../controller/POIController';

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

const DetailScreen = ({ route }) => {
    const [show, setShow] = useState(false);

    const default_poi = {
        contactInfo: [],
        description: "",
    }

    const [poiDetail, setPoiDetail] = useState(default_poi);

    useEffect(() => {
        const loadPoiData = async () => {
            const poiFromApi = await POIController.getPOIById(route.params.params);
            const [latitude, longitude] = poiFromApi.location.coordinates;

            const poi = {
                id: poiFromApi._id,
                name: poiFromApi.name,
                description: poiFromApi.description,
                photo: poiFromApi.photo,
                contactInfo: [
                    {
                        id: 1,
                        name: "Indirizzo: ",
                        detail: poiFromApi.location.address,
                    },
                    {
                        id: 2,
                        name: "Orario: ",
                        detail: poiFromApi.opening_hours,
                    },
                    {
                        id: 3,
                        name: "Telefono: ",
                        detail: poiFromApi.activity.tel_number,
                    },
                ],
                coordinates: {
                    id: poiFromApi.location._id,
                    latitude,
                    longitude,
                }
            }
            setPoiDetail(poi);
        };
        loadPoiData();
    }, [])

    return (
        <View style={styles.container}>
            <Image style={styles.image} source={{ uri: `http://192.168.1.11:3000${poiDetail.photo}` }} />
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
                <Text style={styles.title}>{poiDetail.name}</Text>
                <Text style={styles.description}>{`${poiDetail.description.substring(0, 250)}...`}</Text>
            </View>

            <View style={styles.info}>
                <Text style={styles.infoTitle}>Informazioni di contatto</Text>
                <View style={styles.infoContainer}>
                    {poiDetail.contactInfo.map(info => (
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