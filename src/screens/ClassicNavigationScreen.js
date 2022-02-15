import React, { useState } from 'react';
import {Text, StyleSheet, Image, View} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import colors from '../config/colors';
//barra di ricerca
import { Searchbar } from 'react-native-paper';

const ClassicNavigationScreen = () => {

    // to search bar for arrival
    const [searchQueryArrival, setSearchQueryArrival] = React.useState('');
    const onChangeArrival = query => setSearchQueryArrival(query);

    const [mapRegion, setmapRegion] = useState({
        latitude: 39.4885718926234,
        longitude: 16.81692955302321,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });  //dove proiettare mappa

   // const [selectedSegment, setSelectedSegment] = useState('1');


    return (
        <View >
           <View style={styles.listOfSegments}>
                
                <Text style = {styles.positionText}> Sei in via Cristoforo colombo n. 14</Text>
                    
                <Searchbar
                    style={styles.searchbar}
                    placeholder="Dove vuoi andare?"
                    onChangeText={onChangeArrival}
                    value={searchQueryArrival}
                />
                </View>

                <MapView
                    style={{height: '100%'}}
                    region={mapRegion}
                    mapType={'standard'}>
                
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

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    positionText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.dark_blue_palette,
        textAlign: 'center'
    },
    searchbar: {
        backgroundColor: 'white',
        borderRadius: 10,
        height: 50,
        marginLeft: 50,
        marginRight: 50,
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
        backgroundColor: colors.beau_blue,
        position: 'absolute',
        top:0,
        right:0,
        left:0,
        zIndex:999,
        height: 160,
        marginBottom: 20,
        borderBottomLeftRadius:100,
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