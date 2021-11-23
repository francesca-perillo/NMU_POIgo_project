import React, { useState } from "react";
import { StyleSheet, Text, View, SafeAreaView, FlatList, Image, Alert, TouchableOpacity, Modal, Pressable, TextInput} from "react-native";
import { color } from "react-native-reanimated";
import Entypo from 'react-native-vector-icons/Entypo';
import colors from "../config/colors";

const Item = ({ title, message, img}) => (
 <SafeAreaView style={styles.container}>
  <Text style={styles.hidden} >{message}</Text>
      <View style={styles.item}>
        <View style={styles.description_item}>
            <Text style={styles.title_item}>{title}</Text>
            <Text style={styles.message_item}>{message}</Text>
        </View>
          <Image
            style={styles.image_item}
            source={{
              uri: img,
            }}
          />
        </View>
  </SafeAreaView>
);



const AlertList = (navigation) => {

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
            <Text style={styles.title}>SEGNALAZIONI</Text>
          </View>
          <TouchableOpacity style={styles.header_icon}>
            <Entypo name='bell' size={40} color={colors.dark_blue_palette}  onPress={() => Alert.alert(`Lista delle notifiche`)}/>
          </TouchableOpacity>
        </View>
      </View>
    
      <View style={styles.body}>
      <FlatList
          data={data_items}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </View>
        

      <View style={styles.centeredView}>
        <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => {setModalVisible(!modalVisible);}}>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Entypo name='new' size={60} color={colors.dark_blue_palette} />
                    <Text style={styles.title_item}>NUOVA SEGNALAZIONE</Text>
                    

                    <Text style={styles.modalText}>Titolo:</Text>
                    <TextInput style={styles.input} placeholder="es. Allerta meteo, disagi da spazzatura ... " placeholderTextColor={colors.grey}/>

                    <Text style={styles.modalText}>Descrizione:</Text>
                    <TextInput style={styles.input} placeholder="es. Attenzione! In via Roma 17 un forte  ... " placeholderTextColor={colors.grey}/>

                    <Pressable style={[styles.button, styles.row_container]} onPress={() => alert(`Vai a galleria/fotocamera`)}>
                        <Entypo name='image' size={30} color={colors.dark_blue_palette} />
                        <Text style={styles.text_take_photo}>Scatta o scegli una foto</Text>
                    </Pressable>
                  

                    

                    <View style={styles.row_container}>
                        <Pressable style={styles.button_discard} onPress={() => setModalVisible(!modalVisible)}>
                            <Text style={styles.textStyle}>Chiudi</Text>
                        </Pressable>

                        <Pressable style={styles.button_confirm} onPress={() => setModalVisible(!modalVisible)}>
                            <Text style={styles.textStyle}>Invia segnalazione</Text>
                        </Pressable>
                    </View>
                    
                  </View>
              </View>
          </Modal>
      </View>

      
      <SafeAreaView>
        <View style={styles.header_title}/>
        <TouchableOpacity style={styles.floatinBtn} >
          <Entypo name='plus' size={60} onPress={() => setModalVisible(true)}/>
        </TouchableOpacity>
      </SafeAreaView>
      

      <View style={styles.nav_bar} >
        <Text></Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.dirty_white_palette,
  },
  hidden: {
    color: colors.dirty_white_palette,
    marginVertical:-15,
  },
  item: {
    flex: 1,
    padding: 20,
    flexDirection: "row",
  },
  description_item: {
    flex: 3,
    backgroundColor: colors.grey_palette,
    borderBottomLeftRadius: 50,
    borderTopLeftRadius: 5,
    paddingLeft: "5%",
    flexDirection: "column"
  },
  image_item: {
    flex: 1,
    borderTopRightRadius: 50,
    borderBottomRightRadius: 5,
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
    fontSize: 40,
    color: colors.dark_blue_palette,
    fontWeight: "bold",
    textAlign: 'center',
    marginVertical: 8,
    flex: 5,
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
    justifyContent:"center",
    alignItems: "center",
  },
  body: {
    flex: 6,
    alignItems: "center",
  },
  floatinBtn: {
    color: colors.dark_blue_palette,
    position: "absolute",
    backgroundColor: colors.grey_palette,
    borderRadius:100,
    bottom: "6%",
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
  }
});

//dati per la popolazione statica degli alert
const data_items = [
    {
        id: 1,
        title: 'Allerta meteo',
        message: 'Attenzione! In Via Roma 17 un forte temporale ha alagato la strada ed è impossibile procedere con il proprio automezzo.',
        img: 'https://static.blitzquotidiano.it/wp/wp-content/uploads/2020/09/maltempo-1-1.jpg',
    },
    {
        id: 2,
        title: 'Pericolo automezzo',
        message: 'Un camion ha perso il proprio carico in Via Antonio Gaudi 34. Si prega di prestare molta attenzione ad eventuali residui.',
        img: 'https://www.padova24ore.it/wp-content/uploads/2016/07/incidenteautostrada.jpg',
    },
    {
        id: 3,
        title: 'Caduta massi',
        message: 'Pericolo caduta massi fra Via Milizia 12 e Via De Gregorio 25. Prudenza alla guida del proprio automezzo.',
        img: 'https://www.geostru.eu/wp-content/uploads/2016/03/Caduta_Massi_Arenzano.jpg',
    },
    {
        id: 4,
        title: 'Disagi da pazzatura',
        message: 'La prolungata mancanza della raccolta della spazzatura inizia a causare ingorghi e conseguente traffico in via Dei Montii 17.',
        img: 'https://www.radiocolonna.it/public/images/2021/06/tuscolano-rifiuti-500x281.jpeg',
    },
];
export default AlertList;