import React, { useState } from 'react';
import {Text, SafeAreaView, StyleSheet, Image, Button, Alert, View, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Ionicons, Entypo } from '@expo/vector-icons';
import colors from '../config/colors';
import { color } from 'react-native-reanimated';

const ClassicNavigationScreen = ({navigation}) => {
    const [mapRegion, setmapRegion] = useState({
        latitude: 39.4885718926234,
        longitude: 16.81692955302321,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });  //dove proiettare mappa


   // const [selectedSegment, setSelectedSegment] = useState('1');


    return (
        <View >
           
            <MapView
                style={{ alignSelf: 'stretch', height: '100%' }}
                region={mapRegion}
            >
                <View style={styles.listOfSegments}>
                    <View style={[styles.searchbar, styles.row_container]}>
                        <Text style={styles.searchbar_text}>Calcolo della posizione attuale in corso...</Text>
                        <Ionicons style={styles.searchbar_icon} name="map" size={24} color="grey" />
                    </View>
                    
                    <View style={[styles.searchbar, styles.row_container]}>
                        <Text style={styles.searchbar_text}>Inserisci destinazione di arrivo</Text>
                        <Ionicons style={styles.searchbar_icon} name="map" size={24} color="grey" />
                    </View>
                </View>

                <Marker coordinate={{
                    latitude: 39.510824955677506,
                    longitude: 16.838215562173232
                }} title='PARTENZA'>
                    <Image source={{ uri: 'https://i.ibb.co/RczRvY5/markqer.png' }} style={{ width: 38, height: 35 }} />
                </Marker>

                <Marker coordinate={{
                    latitude: 39.51877075151211,
                    longitude: 16.84714195310711
                }} title='ARRIVO'>
                    <Image source={{ uri: 'https://i.ibb.co/RczRvY5/markqer.png' }} style={{ width: 38, height: 35 }} />
                </Marker>

            </MapView>

            <Button
                title="Press me"
                onPress={() => Alert.alert('Simple Button pressed')}
            />


        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    searchbar: {
        backgroundColor: 'white',
        borderRadius: 10,
        height: 50,
        marginLeft: 15,
        marginRight: 15,
        padding: 15,
        marginTop:10,
        flexDirection: 'row',
      },
      row_container: {
          marginBottom:5,
        flexDirection: "row"
      },
      searchbar_text: {
          fontSize: 15,
          color: colors.grey,
          left: 10,
      },
      searchbar_icon: {
          position: 'absolute',
          top: 10,
          right: 30,
      },
    listOfSegments: {
        paddingHorizontal: 10,
        paddingTop: 50,
        backgroundColor: colors.dark_blue_palette,
        paddingBottom:20,
        borderBottomLeftRadius:30,
        borderBottomRightRadius:30,
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

export default ClassicNavigationScreen;