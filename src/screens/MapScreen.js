import React, { useState, useEffect } from 'react';
import { Text, SafeAreaView, StyleSheet, Image, Button, Alert, View, FlatList, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as POIController from '../controller/POIController';
import colors from '../config/colors';

const MapScreen = ({ route, navigation }) => {
    const [mapRegion, setmapRegion] = useState({
        latitude: 39.4885718926234,
        longitude: 16.81692955302321,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });  //dove proiettare mappa

    const [selectedSegments, setSelectedSegments] = useState([]);
    const [POIs, setPOI] = useState([]); 
    const [POIsToShow, setPOIsToShow] = useState([]);
    const { sections } = route.params;

    useEffect(() => {
        const loadPOI = async () => {
            const POIFromApi = await POIController.getAllPOI();
            setPOI(POIFromApi);
        };
        loadPOI();
    }, [])

    const sectionsPressed = (id) => {
        let selectedSections;
        if (selectedSegments.includes(id)) {
            selectedSections = selectedSegments.filter(item => item !== id);
        } else {
            selectedSections = [...selectedSegments, id];
        }

        const poiToShow = POIs.filter(({ sections }) => sections.some( id => selectedSections.includes(id)));
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
        <SafeAreaView style={styles.listOfSegments}>
            <View>
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
                    POIsToShow.map(({_id, location, name}) => {
                        const [latitude, longitude] = location.coordinates;
                        const coordinates = {latitude, longitude};

                        return <Marker key={_id} coordinate={coordinates} title={name} onPress={() => navigation.navigate('DetailPOI', { params: _id })}>
                            <Image onPress={() => Alert.alert('Marker 1 pressed!')} source={require('../../assets/marker.png')} style={{ width: 20, height: 30 }} />
                        </Marker>
                    })
                }

            </MapView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    listOfSegments: {
        width: '100%',
        height: '100%',
        marginTop: 30,
        backgroundColor: '#EFECE7',
    },
    buttonContainer: {
        padding: 10,
        borderRadius: 10,
        width: 150,
        height: 40,
        margin: 5,
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