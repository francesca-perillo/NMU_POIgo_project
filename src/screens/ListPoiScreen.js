import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, FlatList, Image, Alert, Dimensions, TouchableOpacity} from "react-native";
import colors from "../config/colors";
import * as POIController from '../controller/POIController';

const ListPoiScreen = ({ route, navigation }) => {
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
    <SafeAreaView style={styles.container}>

      <View style={styles.header}>
        <Text style={styles.title}>Lista POI</Text>
        <Text style={styles.subtitle}>Ecco cosa ho trovato!</Text>
      </View>
   
      <View style={styles.containerSection}>
        <FlatList
          horizontal={true}
          data={sections}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>

      <View style={styles.body}>
      {
        POIsToShow.length > 0 ? (
        <FlatList
          data={POIsToShow}
          renderItem={({ item }) => {

            return <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('DetailPOI', { params: item._id })}>
              <Image
                style={styles.image_item}
                source={{
                  uri: `http://192.168.1.11:3000${item.photo}`,
                }}
              />
              <View style={styles.description_item}>
                <Text style={styles.title_item} numberOfLines={1}>{item.name}</Text>
                <Text style={styles.message_item} numberOfLines={3}>{item.description}</Text>
              
              </View>
            </TouchableOpacity>
          }}
          keyExtractor={item => `${item._id}`}
        />
        ) : (
          <View> 
            <Text>Non ci sono POI da mostrare!</Text>
          </View>
        )
      }
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.dirty_white_palette,
  },
  header: {
    height: Dimensions.get('window').height / 6,
    backgroundColor: colors.dark_blue_palette,
    borderBottomRightRadius: 200,
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
  containerSection:{
    marginTop: Dimensions.get('window').height / 50,
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
  item: {
    width: Dimensions.get('window').width / 1.1,
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderTopColor: colors.dirty_white_palette,
    borderLeftColor: colors.dirty_white_palette,
    borderRightColor: colors.dirty_white_palette,
    borderWidth: 1,
  },
  description_item: {
    flex: 3,
    paddingLeft: "5%",
    flexDirection: "column",
  },
  image_item: {
    flex: 1,
    borderRadius: 5,
    height: 80,
  },
  title_item: {
    fontSize: 20,
    color: colors.dark_blue_palette,
    fontWeight: "bold",
    marginVertical: 8,
  },
  message_item: {
    fontSize: 18,
    color: "black",
  },
  row_container: {
    padding: 20,
    flexDirection: "row"
  },
  body: {
    flex: 6,
    alignItems: "center",
    marginTop: Dimensions.get('window').height / 70,
  },
});

export default ListPoiScreen;