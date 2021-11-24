import React, { useState } from 'react';
import {Text, SafeAreaView, StyleSheet, Image, Button, Alert, View, FlatList, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import colors from '../config/colors';


const segments = [
    {
        id: "1",
        title: "Storici",
    },
    {
        id: "2",
        title: "Etnici",
    },
    {
        id: "3",
        title: "Vegani",
    },
    {
        id: "4",
        title: "Brasserie",
    },
    {
        id: "5",
        title: "Cucina tipica"
    }
];


const MapScreen = ({navigation}) => {
    const [mapRegion, setmapRegion] = useState({
        latitude: 39.4885718926234,
        longitude: 16.81692955302321,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });  //dove proiettare mappa


    const [selectedSegment, setSelectedSegment] = useState('1');

    const Item = ({ id, title }) => {
        const isSelected = selectedSegment === id;

        return (
            <TouchableOpacity onPress={() => setSelectedSegment(id)}>
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
                    data={segments}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                />
            </View>
            <MapView
                style={{ alignSelf: 'stretch', height: '100%' }}
                region={mapRegion}
            >
                <Marker coordinate={mapRegion} title='La tavernetta' onPress={() => navigation.navigate('DetailPOI')}>
                    <Image onPress={() => Alert.alert('Marker 1 pressed!')} source={{ uri: 'https://i.ibb.co/RczRvY5/markqer.png' }} style={{ width: 38, height: 35 }} />
                </Marker>

                <Marker coordinate={{
                    latitude: 39.510824955677506,
                    longitude: 16.838215562173232
                }} title='Deltaplano' onPress={() => Alert.alert('Deltaplano Perillo pressed!')}>
                    <Image source={{ uri: 'https://i.ibb.co/RczRvY5/markqer.png' }} style={{ width: 38, height: 35 }} />
                </Marker>

                <Marker coordinate={{
                    latitude: 39.51877075151211,
                    longitude: 16.84714195310711
                }} title='Bar tabacchi' onPress={() => Alert.alert('Bar Tabacchi title pressed!')} >
                    <Image source={{ uri: 'https://i.ibb.co/RczRvY5/markqer.png' }} style={{ width: 38, height: 35 }} />
                </Marker>

            </MapView>

            <Button
                title="Press me"
                onPress={() => Alert.alert('Simple Button pressed')}
            />


        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    listOfSegments: {
        marginHorizontal: 10,
        marginTop: 50,
    },
    buttonContainer: {
        padding: 10,
        borderRadius: 10,
        width: 90,
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
    }
});

export default MapScreen;