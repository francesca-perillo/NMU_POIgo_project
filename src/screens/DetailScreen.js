import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground, Dimensions, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ContactInfo from "../components/CotactInfo";
import colors from '../config/colors';
import * as POIController from '../controller/POIController';

const DetailScreen = ({ route, navigation }) => {
    const [show, setShow] = useState(false);

    const default_poi = {
        contactInfo: [],
        description: "",
    }

    const [poiDetail, setPoiDetail] = useState(default_poi);
    const [readAll, setReadAll] = useState(false);

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
                },
                sections: {
                    id: poiFromApi.sections,
                }
            }

            setPoiDetail(poi);
        };
        loadPoiData();
    }, [])

    return (
        <View style={styles.container}>
            <ImageBackground source={{ uri: poiDetail.photo }} resizeMode="cover" style={styles.imageBackground}>
                <TouchableOpacity style={styles.goBack} onPress={() => navigation.goBack()}>
                    <Ionicons style={styles.goBackIcon} name="ios-arrow-back" size={32} color="white" />
                </TouchableOpacity>

                <View style={styles.info}>
                    <Text style={styles.title}>{poiDetail.name}</Text>

                    {poiDetail.contactInfo.map(info => (
                        <ContactInfo key={info.id} contactInfo={info}/>
                    ))}

                    <ScrollView style={styles.description}>
                        <Text style={styles.descriptionText}>{
                            readAll ? poiDetail.description : poiDetail.description.substring(0, 300) + "..."
                        }</Text>
                        <TouchableOpacity onPress={() => setReadAll(!readAll)}>
                            <Text style={styles.read}>{readAll ? "Chiudi" : "Leggi tutto"}</Text>
                        </TouchableOpacity>
                    </ScrollView>
                    <TouchableOpacity style={styles.goMap} onPress={() => navigation.navigate('Navigator', { poiCoordinates: poiDetail.coordinates })}>
                        <Text style={styles.goMapText}>Naviga</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    imageBackground: {
        flex: 1,
        justifyContent: "center"
    },
    goBack: {
        backgroundColor: colors.white,
        opacity: 0.8,
        width: 50,
        height: 50,
        borderRadius: 50,
        justifyContent: "center",
        position: "absolute",
        top: 40,
        left: 20,
        zIndex: 1,
    },
    goBackIcon: {
        color: colors.dark_blue_palette,
        alignSelf: "center",
    },
    info: {
        marginTop: Dimensions.get('window').width / 1.5,
        maxHeight: 500,
        backgroundColor: colors.white_transparent,
        margin: 20,
        borderRadius: 15,
        padding: 15,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        color: colors.dark_blue_palette,
        borderBottomColor: colors.dark_blue_palette,
        borderBottomWidth: 1,
        marginBottom: 10,
    },
    description: {
        fontSize: 20,
        marginTop: 20,
        lineHeight: 20 * 1.2,
    },
    descriptionText: {
        fontSize: 15,
        textAlign: 'justify',
    },
    read: {
        color: colors.dark_blue_palette,
        fontWeight: "bold",
        textAlign: 'justify',
        textDecorationLine: 'underline',
    },
    goMap: {
        marginTop: 20,
        backgroundColor: colors.dark_blue_palette,
        borderRadius: 15,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    goMapText: {
        color: colors.white,
        fontSize: 20,
    },
});

export default DetailScreen;