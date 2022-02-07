import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import MapView, { Polyline, Marker } from 'react-native-maps';
import colors from '../config/colors';

//TODO: Get user location
const USER_LOCATION = {
    latitude: 39.5593769,
    longitude: 16.7988958
}

const NavigatorScreen = ({ route, navigation }) => {
    const POICoordinate = route.params.params;

    const destination = {
        latitude: POICoordinate.latitude,
        longitude: POICoordinate.longitude
    }

    const coordinates = [
        USER_LOCATION,
        destination,
    ]

    const [mapRegion, setmapRegion] = useState({
        latitude: 39.55892,
        longitude: 16.81692955302321,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });  //dove proiettare mappa

    return (
        <SafeAreaView>
            <TouchableOpacity style={styles.goBack} onPress={() => navigation.goBack()}>
                <Ionicons style={styles.goBackIcon} name="ios-arrow-back" size={32} color="white" />
            </TouchableOpacity>
            <MapView
                style={{ alignSelf: 'stretch', height: '100%' }}
                region={mapRegion}
            >
                <Marker coordinate={coordinates[0]}>
                    <Image source={require('../../assets/red_marker.png')} style={{ width: 20, height: 30 }} />
                </Marker>
                <Marker coordinate={coordinates[1]}>
                    <Image source={require('../../assets/marker.png')} style={{ width: 15, height: 25 }} />
                </Marker>

                <Polyline
                    coordinates={coordinates}
                    strokeColor={colors.dark_blue_palette}
                    strokeWidth={2}
                />

            </MapView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
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
});

export default NavigatorScreen;