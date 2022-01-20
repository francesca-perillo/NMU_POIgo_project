import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, SafeAreaView, FlatList, Image, Alert, TouchableOpacity, Modal, Pressable, TextInput, Dimensions } from "react-native";
import colors from "../config/colors";
import { useIsFocused } from "@react-navigation/native";
import * as AlertsController from '../controller/AlertController';

const AlertList = () => {
  const [alerts, setAlerts] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (!isFocused)
      return

    const loadAlerts = async () => {
      const alertsFromApi = await AlertsController.getAllAlertsApproved();
      const alerts = alertsFromApi.map(alert => {
        return {
          id: alert._id,
          title: alert.title,
          message: alert.description,
          img: `http://192.168.1.11:3000${alert.photo}`,
          address: alert.address,
          createBy: alert.createdBy,
        }
      });

      setAlerts(alerts);
    };

    loadAlerts();
  }, [isFocused])

  //to set visibility at body
  const [bodyVisible, setBodyVisible] = useState(true);
  const [buttonVisible, setButtonVisible] = useState(true);

  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.header}>
        <Text style={styles.title}>Segnalazioni</Text>
        <Text style={styles.subtitle}>Cosa succede in città ?</Text>
      </View>

      <View style={styles.body}>{
        bodyVisible ? (
          <FlatList
            data={alerts}
            renderItem={({ item, id }) => {

              return <View style={styles.item}>
                <Image
                  style={styles.image_item}
                  source={{
                    uri: item.img,
                  }}
                />
                <View style={styles.description_item}>
                  <Text style={styles.title_item} numberOfLines={1}>{item.title}</Text>
                  <Text style={styles.message_item} numberOfLines={3}>{item.message}</Text>
                  <Text style={styles.address_item} numberOfLines={1}>
                    <Text style={styles.address_item_enf}> Indirizzo: </Text>
                    {item.address.city}  {item.address.street} 
                  </Text>
                </View>
              </View>
            }}
            keyExtractor={item => `${item.id}`}
          />
        ) : (
          <Modal animationType="slide" transparent={true} onRequestClose={() => { setBodyVisible(!bodyVisible), setButtonVisible(!buttonVisible) }}>
            <View style={styles.modalView}>
              <Text style={styles.title_item}>Inserisci i dati per la nuova segnalazione:</Text>

              <TextInput style={styles.input} placeholder="Titolo" placeholderTextColor={colors.grey} />

              <TextInput style={styles.input} placeholder="Descrizione" placeholderTextColor={colors.grey} />

              <TextInput style={styles.input} placeholder="Città" placeholderTextColor={colors.grey} />

              <TextInput style={styles.input} placeholder="Via" placeholderTextColor={colors.grey} />

              <TextInput style={styles.input} placeholder="CAP" placeholderTextColor={colors.grey} />

              <View style={styles.containerInsertPhoto}>
                  <Pressable style={styles.insertPhoto}>
                    <Text style={styles.insertPhotoText}>Scegli o scatta una foto</Text>
                  </Pressable>
              </View>

              <View style={styles.button_send_alert}>
                <Pressable style={styles.button_confirm} onPress={() => [setBodyVisible(!bodyVisible), setButtonVisible(!buttonVisible)]}>
                  <Text style={styles.textStyle}>Invia segnalazione</Text>
                </Pressable>
                  <Text style={styles.button_discard} onPress={() => [setBodyVisible(!bodyVisible), setButtonVisible(!buttonVisible)]}>Chiudi</Text>
              </View>

            </View>
          </Modal>
        )
      }
      </View>

      {buttonVisible ? (
      <View style={styles.buttonContainer}>
        <Pressable style={styles.button} onPress={() => [setBodyVisible(!bodyVisible), setButtonVisible(!buttonVisible)]}>
          <Text style={styles.buttonText}>Avvia nuova segnalazione</Text>
        </Pressable>
      </View>
      ) : null}

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.dirty_white_palette,
    justifyContent: 'center',
  },
  header: {
    height: Dimensions.get('window').height / 5,
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
  address_item: {
    marginTop: 5,
    fontSize: 16,
    fontStyle: "italic",
    color: colors.dark_blue_palette,
  },
  address_item_enf: {
    fontStyle: "normal",
    fontWeight: "bold",
    color: colors.black,
  },
  row_container: {
    padding: 20,
    flexDirection: "row"
  },
  body: {
    flex: 6,
    alignItems: "center",
    marginTop: Dimensions.get('window').height /16
  },
  floatinBtn: {
    position: "absolute",
    backgroundColor: colors.dark_blue_palette,
    borderRadius: 100,
    bottom: 120,
    right: "8%",
  },
  nav_bar: {
    flex: 1,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",

  },
  input: {
    width: Dimensions.get('window').width / 1.3,
    height: 50,
    fontSize: 20,
    borderBottomWidth: 1,
    borderColor: colors.dark_blue_palette,
    marginBottom: "5%",
    padding: "3%",
    alignSelf: 'stretch',
  },
  modalView: {
    flex: 6,
    marginTop: Dimensions.get('window').height / 6,
    margin: 20,
    padding: "5%",
  },
  buttonContainer: {
    height: Dimensions.get('window').height / 5,
    width: "90%",
    alignSelf: "center",
  },
  button: {
    borderWidth: 1,
    borderColor: colors.dark_blue_palette,
    backgroundColor: colors.dark_blue_palette,
    justifyContent: "center",
    alignItems: "center",
    padding: "3%",
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
  buttonText: {
    color: colors.white,
  },
  containerInsertPhoto: {
    flexDirection: "row",
    marginTop: "5%",
  },
  insertPhoto: {
    width: Dimensions.get('window').width / 1.3,
    height: 50,
    borderWidth: 1,
    borderColor: colors.dark_blue_palette,
    justifyContent: "center",
    alignItems: "center",
    padding: "3%",
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
  insertPhotoText:{
    color: colors.dark_blue_palette,
    fontSize: 15,
  },
  text_take_photo: {
    color: colors.dark_blue_palette,
    marginTop: 8,
    marginLeft: 5,
  },
  button_discard: {
    fontWeight: "bold",
    alignSelf: "center",
    color: colors.dark_blue_palette,
    marginTop: 10,
    
  },
  button_send_alert:{
    position: "absolute",
    bottom: "15%",
    width: "100%",
    alignSelf: "center",
  },
  button_confirm: {
    justifyContent: "center",
    alignItems: "center",
    padding: "3%",
    borderRadius: 50,
    alignSelf: 'stretch',
    backgroundColor: colors.green_confirm_operation,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    fontSize: 18,
  }
});

export default AlertList;