import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, StatusBar, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import MapView, { Marker, Polyline } from 'react-native-maps';
import * as RouteController from '../controller/RouteController';

import colors from '../config/colors';
import { View } from 'react-native-animatable';

const RouteScreen = ({ route, navigation }) => {
    const { category } = route.params;

    const [mapRegion, setmapRegion] = useState({
        latitude: 39.4885718926234,
        longitude: 16.81692955302321,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });  //dove proiettare mappa

    const [coordinateRoute, setCoordinateRoute] = useState([]);
    const [coordinatesForPolyline, setCoordinatesForPolyline] = useState([]);
    useEffect(() => {
        const loadCoordinate = async () => {
            const coordinate = await RouteController.getCoordinatesRoute(category);
            setCoordinateRoute(coordinate);

            setCoordinatesForPolyline(...coordinate.map(element => {
                return (
                    element.coordinatesRoute.map(element => {
                        return (
                            { latitude: element.lat, longitude: element.lng }
                        )
                    })
                )
            }))
        }
        loadCoordinate();
    }, [])

    return (
        <View>
            <TouchableOpacity style={styles.goBack} onPress={() => navigation.goBack()}>
                <Ionicons style={styles.goBackIcon} name="ios-arrow-back" size={32} color="white" />
            </TouchableOpacity>
            <MapView
                style={{ alignSelf: 'stretch', height: '100%' }}
                region={mapRegion}
            >
                {
                    coordinateRoute.map(element => {
                        return (
                            element.coordinatesRoute.map(element => {
                                return (

                                    <Marker key={element._id} coordinate={{ latitude: element.lat, longitude: element.lng }} >
                                        {element.typePoint === 'Start' ?
                                            <Image source={require('../../assets/red_marker.png')} style={{ width: 20, height: 30 }} />
                                            : element.typePoint === 'End' ?
                                                <Image source={require('../../assets/red_marker.png')} style={{ width: 20, height: 30 }} />
                                                : element.typePoint === 'Current' ?
                                                    <Image source={require('../../assets/marker.png')} style={{ width: 20, height: 30 }} />
                                                    : null
                                        }
                                    </Marker>
                                )
                            })
                        )
                    })
                }

                <Polyline
                    coordinates={coordinatesForPolyline} //specify our coordinates
                    strokeColor={colors.dark_blue_palette} //specify the colour with hex code
                    strokeWidth={3}
                    lineDashPattern={[1]}
                />

            </MapView>



        </View >
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

export default RouteScreen;