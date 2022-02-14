import React, { useState, useEffect } from 'react';
import { Text, SafeAreaView, StyleSheet, Image, Alert, View, FlatList, TouchableOpacity, StatusBar } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as POIController from '../controller/POIController';
import * as AlertController from '../controller/AlertController';
import colors from '../config/colors';

const MapScreen = ({ route, navigation }) => {
    const [mapRegion, setmapRegion] = useState({
        latitude: 39.56052,
        longitude: 16.80291,
        latitudeDelta: 0.0050,
        longitudeDelta: 0.0050,
    });  //dove proiettare mappa

    const [selectedSegments, setSelectedSegments] = useState([]);
    const [POIs, setPOI] = useState([]);
    const [alertsCoordinates, setAlertsCoordinates] = useState([]);
    const [POIsToShow, setPOIsToShow] = useState([]);
    const { sections } = route.params;

    useEffect(() => {
        const loadPOIAndAlerts = async () => {
            const POIFromApi = await POIController.getAllPOI();
            setPOI(POIFromApi);
            const alertFromApi = await AlertController.getAllAlertsApproved();
            const alertAddress = alertFromApi.map(element => {
                const id = element.id;
                const address = element.address.street + " " + element.address.city
                return {
                    id,
                    address
                }
            })

            alertAddress.forEach(async element => {
                const coordinateAlert = await AlertController.getCoordinatesByAddress(element.address);
                const alertShow = {
                    id: element.id,
                    coordinate: coordinateAlert
                }
                setAlertsCoordinates(alertsCoordinates => [...alertsCoordinates, alertShow]);
            });
        };
        loadPOIAndAlerts();
    }, [])

    const sectionsPressed = (id) => {
        let selectedSections;
        if (selectedSegments.includes(id)) {
            selectedSections = selectedSegments.filter(item => item !== id);
        } else {
            selectedSections = [...selectedSegments, id];
        }

        const poiToShow = POIs.filter(({ sections }) => sections.some(id => selectedSections.includes(id)));
        setSelectedSegments(selectedSections);
        setPOIsToShow(poiToShow);
    }

    const Item = ({ id, title }) => {
        const isSelected = selectedSegments.includes(id);
        return (
            <TouchableOpacity onPress={() => sectionsPressed(id)}>
                <View
                    style={[
                        styles.buttonContainer,
                        ...(isSelected ? [styles.buttonContainerPress] : [])
                    ]}
                >
                    <Text style={[
                        styles.buttonText,
                        ...(isSelected ? [styles.buttonTextPress] : [])
                    ]}>
                        {title}
                    </Text>
                </View>
            </TouchableOpacity>
        )
    };

    const renderItem = ({ item }) => (
        <Item id={item.id} title={item.title} />
    );

    return (
        <SafeAreaView style={styles.AndroidSafeArea}>
            <SafeAreaView style={styles.listOfSegments}>
                <View>
                    <Text style={styles.listOfSegmentsTitle}>Seleziona una sezione per visualizzare i POI:</Text>
                    <FlatList
                        horizontal={true}
                        data={sections}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id}
                    />
                </View>
                <MapView
                    style={{ alignSelf: 'stretch', height: '100%' }}
                    region={mapRegion}
                >
                    {
                        POIsToShow.map(({ _id, location, name }) => {
                            const [latitude, longitude] = location.coordinates;
                            const coordinates = { latitude, longitude };

                            return <Marker key={_id} coordinate={coordinates} title={name} onPress={() => navigation.navigate('DetailPOI', { params: _id })}>
                                <Image onPress={() => Alert.alert('Marker 1 pressed!')} source={require('../../assets/marker.png')} style={{ width: 20, height: 30 }} />
                            </Marker>
                        })
                    }

                    {
                        alertsCoordinates && alertsCoordinates.map(({ id, coordinate }) => {
                            const lat = coordinate.lat;
                            const lng = coordinate.lng;

                            return <Marker key={id} coordinate={{ latitude: lat, longitude: lng }} title={"Alert"} onPress={() => navigation.navigate('Segnalazioni')}>
                                <Image onPress={() => Alert.alert('Marker 1 pressed!')} source={require('../../assets/alert_marker.png')} />
                            </Marker>
                        })
                    }
                </MapView>
            </SafeAreaView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    AndroidSafeArea: {
        flex: 1,
        backgroundColor: colors.dark_blue_palette,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    },
    listOfSegments: {
        width: '100%',
        height: '100%',
        marginTop: 10,
        backgroundColor: colors.dark_blue_palette,
    },
    listOfSegmentsTitle: {
        fontSize: 20,
        color: colors.grey_palette,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    buttonContainer: {
        padding: 10,
        borderRadius: 10,
        width: 150,
        height: 40,
        margin: 5,
        marginBottom: 10,
        backgroundColor: 'white',
    },
    buttonContainerPress: {
        backgroundColor: colors.pale_blue_palette,
    },
    buttonText: {
        fontSize: 15,
        textAlign: 'center',
        color: colors.dark_blue_palette,
    },
    buttonTextPress: {
        color: 'white',
    },
});

export default MapScreen;