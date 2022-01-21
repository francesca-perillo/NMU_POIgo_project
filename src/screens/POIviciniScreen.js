import React from "react";
import { StyleSheet, Text, View, FlatList, SafeAreaView, Dimensions } from "react-native";
import colors from "../config/colors";
//barra di ricerca
import { Searchbar } from 'react-native-paper';

const Item = ({ poiName, distance }) => (
  <SafeAreaView style={styles.container}>
    <View style={styles.poi_list_container}>
      <View style={styles.item}>
        <Text style={styles.poi_item}>{poiName}</Text>
        <View style={styles.container_message_item}>
          <Text style={styles.distance_item}>{distance}</Text>
        </View>
      </View>
    </View>
  </SafeAreaView>
);

const POIviciniScreen = () => {

  // to search bar 
  const [searchQuery, setSearchQuery] = React.useState('');
  const onChangeText = query => setSearchQuery(query);

  const renderItem = ({ item }) => (
    <Item
      poiName={item.name}
      distance={item.distance} />
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>POI vicini</Text>
        <Text style={styles.subtitle}>Cosa c'è intorno a te ?</Text>
      </View>

      <Searchbar
        style={styles.searchbar}
        placeholder="Cerca ..."
        onChangeText={onChangeText}
        value={searchQuery}
      />

      <FlatList
        data={data_items}
        renderItem={renderItem}
        keyExtractor={item => `${item.id}`}
      />
    </View>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.dirty_white_palette,
  },
  header: {
    height: Dimensions.get('window').height / 6,
    backgroundColor: colors.dark_blue_palette,
    borderBottomRightRadius: 200
  },
  title: {
    fontSize: 40,
    color: colors.white,
    fontWeight: "bold",
    marginTop: Dimensions.get('window').height / 16,
    marginLeft: 20
  },
  subtitle: {
    color: colors.grey,
    fontSize: 30,
    marginLeft: 20,
    fontStyle: "italic",
  },
  hidden: {
    color: colors.dirty_white_palette,
    marginVertical: -15,
  },
  searchbar: {
    borderRadius: 10,
    height: 50,
    marginTop: 15,
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 10,
    flexDirection: 'row',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.00,
    elevation: 1,
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
    marginLeft: "4%",
    marginRight: "4%",
    paddingLeft: "5%",
    flexDirection: "column"
  },
  image_item: {
    flex: 1,
    borderTopRightRadius: 50,
    borderBottomRightRadius: 5,
  },
  poi_item: {
    flex: 1,
    fontSize: 20,
    color: colors.black,
    fontWeight: "bold",
    marginVertical: 8,
  },
  distance_item: {
    fontSize: 18,
    color: "white",
    marginRight: "4%",
    marginBottom: "4%",
  },
  container_message_item: {
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
    alignSelf: 'stretch',
    width: 70,
    borderRadius: 50,
    marginRight: 20,
    backgroundColor: colors.dark_blue_palette,
  },
});


//dati per la popolazione statica degli alert
const data_items = [
  {
    id: 1,
    name: 'La tavernetta',
    distance: '52 m',
  },
  {
    id: 2,
    name: 'Il giardino dei Papi',
    distance: '78 m',
  },
  {
    id: 3,
    name: 'Castello',
    distance: '120 m',
  },
  {
    id: 4,
    name: 'Cantina vecchia',
    distance: '1.3 km',
  },
  {
    id: 5,
    name: 'Il vinaio',
    distance: '2.5 km',
  },
  {
    id: 6,
    name: 'Escape Room',
    distance: '2.56 m',
  },
];
export default POIviciniScreen;