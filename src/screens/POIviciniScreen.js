import React, { useState, useEffect, useMemo } from "react";
import { StyleSheet, Text, View, FlatList, SafeAreaView, Dimensions, TouchableOpacity } from "react-native";
import colors from "../config/colors";
import { getNearestPOI } from "../controller/POIController";
//barra di ricerca
import { Searchbar } from 'react-native-paper';

const Item = ({ poiName, distance }) => (
  <SafeAreaView style={styles.container}>
    <View style={styles.poi_list_container}>
      <View style={styles.item}>
        <Text style={styles.poi_item}>{poiName}</Text>
        <View style={styles.container_message_item}>
          <Text style={styles.distance_item}>{distance} m</Text>
        </View>
      </View>
    </View>
  </SafeAreaView>
);

//TODO: Get user location
const USER_LOCATION = {
  lat: 16.7988958,
  lng: 39.5593769
}

const POIviciniScreen = ({ navigation }) => {

  // to search bar 
  const [searchQuery, setSearchQuery] = useState('');
  const [nearPOIs, setNearPOIs] = useState([]);
  const onChangeText = query => setSearchQuery(query);

  useEffect(() => {
    const loadPOI = async () => {
      const nearPOIs = await getNearestPOI(USER_LOCATION.lat, USER_LOCATION.lng);
      setNearPOIs(nearPOIs);
    }

    loadPOI();
  }, [])

  const filteredPOIs = useMemo(() => {
    return nearPOIs.filter(poi => new RegExp(searchQuery, 'i').test(poi.name))
  }, [nearPOIs, searchQuery])

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('DetailPOI', { params: item._id })}>
      <Item
        poiName={item.name}
        distance={item.distance} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <Text style={styles.title}>POI vicini</Text>
        <Searchbar
          style={styles.searchbar}
          placeholder="Cerca ..."
          onChangeText={onChangeText}
          value={searchQuery}
        />
      </View>


      <View style={styles.body}>
        <FlatList
          data={filteredPOIs}
          renderItem={renderItem}
          keyExtractor={item => item._id}
        />
      </View>
    </View>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.dirty_white_palette,
  },
  header: {
    height: (Dimensions.get('window').height / 13) * 2,
    backgroundColor: colors.beau_blue,
    alignItems: 'center',
    borderBottomLeftRadius: 100,
    borderBottomRightRadius: 100,
  },
  title: {
    fontSize: 30,
    color: colors.dark_blue_palette,
    fontWeight: "bold",
    marginTop: (Dimensions.get('window').height / 12) * 0.75,
  },
  searchbar: {
    borderRadius: 50,
    alignSelf: "center",
    width: Dimensions.get('window').width / 2,
    marginTop: Dimensions.get('window').height / 50,
    //per togliere le ombre di default.
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.00,
    elevation: 1,
  },
  body: {
    flex: 6,
    marginTop: Dimensions.get('window').height / 16
  },
  item: {
    flex: 1,
    padding: 20,
    flexDirection: "row",
  },
  poi_list_container: {
    flex: 3,
    borderWidth: 1,
    borderColor: colors.dirty_white_palette,
    borderBottomColor: colors.grey,
    flexDirection: "column",
    marginLeft: 10,
    marginRight: 10,
  },
  poi_item: {
    flex: 0.8,
    fontSize: 18,
    color: colors.black,
    marginVertical: 8,
  },
  distance_item: {
    color: colors.white,
    padding: 5,
  },
  container_message_item: {
    position: 'absolute',
    marginLeft: Dimensions.get('window').width / 1.3,
    top: '60%',
    backgroundColor: colors.dark_blue_palette,
    borderColor: colors.dark_blue_palette,
    borderRadius: 10,
  },
});

export default POIviciniScreen;