import React from "react";
import { StyleSheet, Text, View, FlatList, SafeAreaView} from "react-native";
import colors from "../config/colors";
import { Ionicons, Entypo } from '@expo/vector-icons';

const Item = ({ poiName, distance}) => (
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

    const renderItem = ({ item }) => (
        <Item
          poiName={item.name}
          distance={item.distance}/>
        );

    return (
        <SafeAreaView style={styles.container}>
          <View style={styles.row_container}>
              <View style={styles.header_title}>
                <Text style={styles.title} >POI vicini</Text>
              </View>
              <View style={styles.header_icon}>
                <Entypo name='bell' size={35} color={colors.dark_blue_palette}  onPress={() => alert(`Lista delle notifiche`)}/>
              </View>
          </View>

          <View style={styles.searchbar}>
            <Text style={styles.searchbar_text}>Cerca tra i POI vicini ...</Text>
            <Ionicons style={styles.searchbar_icon} name="search" size={24} color="grey" />
          </View>

          <FlatList
              data={data_items}
              renderItem={renderItem}
              keyExtractor={item => '${item.id}'}
          />
    </SafeAreaView>
       
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.dirty_white_palette,
    },
    hidden: {
      color: colors.dirty_white_palette,
      marginVertical:-15,
    },
    searchbar: {
      backgroundColor: 'white',
      borderRadius: 10,
      height: 50,
      marginLeft: 15,
      marginRight: 15,
      padding: 15,
      flexDirection: 'row',
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
        marginBottom:"4%",
      },
      container_message_item:{
        justifyContent: "center",
        alignItems: "center",
        padding: 5,
        alignSelf: 'stretch',
        width: 70,
        borderRadius: 50,
        marginRight: 20,
        backgroundColor: colors.dark_blue_palette,
      },
      title: {
        fontSize: 40,
        color: colors.dark_blue_palette,
        fontWeight: "bold",
        marginVertical: 8,
        flex: 5,
        flexDirection: "row",
      },
      row_container: {
        padding: 20,
        flexDirection: "row"
      },
      header_title:{
        flex: 6,
        flexDirection: "row",
      },
      header_icon: {
        fontSize: 40,
        flex: 1,
        justifyContent:"center",
        alignItems: "center",
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