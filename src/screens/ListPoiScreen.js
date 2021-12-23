import React, { useState } from "react";
import { StyleSheet, Text, View, SafeAreaView, FlatList, Image, Alert, TouchableOpacity, Modal, Pressable, TextInput} from "react-native";
import { color } from "react-native-reanimated";
import { Ionicons, Entypo } from '@expo/vector-icons';
import colors from "../config/colors";

//dati per la popolazione statica degli alert
const data_items = [
    {
        id: 1,
        title: 'Tavernetta da ciccio',
        message: 'Caratteristica cucina tipica locale, ci troviamo in via roba 56.',
        img: 'https://www.design-italia.it/wp-content/uploads/2018/01/arredare-tavernetta.png',
    },
    {
        id: 2,
        title: 'Faro Capo Trionto ',
        message: 'Angolo suggestivo dello ionio, mare stupendo e pace',
        img: 'https://www.investinitalyrealestate.com/wp-content/uploads/2019/07/FaroCapoTrionto_Corigliano_CS_EST_02-2-700x466.jpg',
    },
    {
        id: 3,
        title: 'Muraglie di Annibale',
        message: 'Le cosiddette “Muraglie di Annibale”...',
        img: 'https://ecodellojonio.b-cdn.net/media/posts/2014/06/muraglie-17.jpg?aspect_ratio=16:9&width=1152',
    },
    {
        id: 4,
        title: 'Fiume Trionto',
        message: 'Il territorio di Pietrapaola, è caratterizzato dalla particolare presenza di grotte e ...',
        img: 'http://www.mobitaly.it/MultimediaFiles/Img/FiumeTrionto_1.JPG',
    },
];

const Item = ({ title, message, img}) => (
 <SafeAreaView style={styles.container}>
  <Text style={styles.hidden} >{message}</Text>
      <View style={styles.item}>
        <Image
          style={styles.image_item}
          source={{
            uri: img,
          }}
        />
        <View style={styles.description_item}>
            <Text style={styles.title_item}>{title}</Text>
            <Text style={styles.message_item}>{message}</Text>
        </View>
          
      </View>
  </SafeAreaView>
);



const ListPoiScreen = (navigation) => {

    const renderItem = ({ item }) => (
    <Item
    title={item.title}
    message={item.message}
    img = {item.img}/>
    );

    //to set visibility at Modal
    const [modalVisible, setModalVisible] = useState(false);

  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.header}>
        <View style={styles.row_container}>
          <View style={styles.header_title}>
            <Text style={styles.title}>Lista POI</Text>
          </View>
          <TouchableOpacity style={styles.header_icon}>
            <Entypo name='bell' size={40} color={colors.dark_blue_palette}  onPress={() => Alert.alert(`Lista delle notifiche`)}/>
          </TouchableOpacity>
        </View>

      </View>
    
      <View style={styles.searchbar}>
        <Text style={styles.searchbar_text}>Cerca un punto d'interesse ...</Text>
        <Ionicons style={styles.searchbar_icon} name="search" size={24} color="grey" />
      </View>

      <View style={styles.body}>
      <FlatList
          data={data_items}
          renderItem={renderItem}
          keyExtractor={item => `${item.id}`}
        />
      </View>

      
   
        
    
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.dirty_white_palette,
    borderWidth: 1,
    borderColor: colors.dirty_white_palette,
    borderBottomColor: colors.grey,
    marginRight:10,
    marginLeft:10,
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
  hidden: {
    color: colors.dirty_white_palette,
    marginVertical:-15,
  },
  item: {
    flex: 1,
    height: 200,
    width: 300,
    flexDirection: "row",
    alignItems:"center",
  },
  description_item: {
    flex: 3,
    paddingLeft: "5%",
    flexDirection: "column",

  },
  image_item: {
    flex: 1,
    borderRadius: 5,
    height:80,
    borderWidth: 1,
    borderColor: colors.dirty_white_palette,
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
    marginRight: "4%",
    marginBottom:"4%"
  },
  title: {
    fontSize: 35,
    color: colors.dark_blue_palette,
    fontWeight: "bold",
    textAlign: 'center',
    flex: 5,
    top:20,
    flexDirection: "row",
  },
  row_container: {
    padding: 20,
    flexDirection: "row"
  },
  header:{
    flex: 1,
  },
  header_title:{
    flex: 6,
    flexDirection: "row",
  },
  header_icon: {
    fontSize: 40,
    flex: 1,
    top: 20,
    justifyContent:"center",
    alignItems: "center",
  },
  body: {
    flex: 6,
    alignItems: "center",
  },
  floatinBtn: {
    position: "absolute",
    backgroundColor: colors.dark_blue_palette,
    borderRadius:100,
    bottom: 95,
    right: "8%",
  },
  nav_bar:{
    flex: 1,
  }, 

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    
  },
  input: {
    height: 40,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: colors.dark_blue_palette,
    marginBottom: "5%",
    backgroundColor: colors.dirty_white_palette,
    padding:"3%",
    alignSelf: 'stretch',
    textAlign: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: "5%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button:{
    borderWidth: 1,
    borderColor: colors.dark_blue_palette,
    backgroundColor: colors.dirty_white_palette,
    justifyContent: "center",
    alignItems: "center",
    padding:"3%",
    borderRadius: 50,
    alignSelf: 'stretch',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  text_take_photo: {
    color: colors.dark_blue_palette,
    marginTop: 8,
    marginLeft: 5,
  },
  button_discard:{
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginRight: 5,
    backgroundColor: colors.red_discard_operation,
    shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
  },
  button_confirm: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor: colors.green_confirm_operation,
    shadowOffset: {
        width: 0,
        height: 2
    },
      shadowOpacity: 0.25,
      shadowRadius: 4,
    },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    fontSize:18,
  },
  buttonGoMap: {
    alignItems: "center",
    backgroundColor: colors.dark_blue_palette,
    borderRadius: 50,
    marginTop: 150,
    marginHorizontal: 50,
    paddingVertical: 20,
},
buttonGoMapText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 15,
},
});


export default ListPoiScreen;