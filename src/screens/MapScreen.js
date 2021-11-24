import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Image, Button, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const MapScreen = ({navigation}) => {
    const [mapRegion, setmapRegion] = useState({
        latitude: 39.4885718926234,
        longitude: 16.81692955302321,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });  //dove proiettare mappa


    return (
        <SafeAreaView style={styles.container}>
            <MapView
                style={{ alignSelf: 'stretch', height: '100%' }}
                region={mapRegion}
            >
                <Marker coordinate={mapRegion} title='Grotta dei principi' onPress={() => navigation.navigate('DetailPOI')}>
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
});

export default MapScreen;