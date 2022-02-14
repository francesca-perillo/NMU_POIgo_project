import React, { useState, useEffect } from "react";

import { ActivityIndicator, StyleSheet, Text, View, FlatList, Image, Modal, Pressable, TextInput, Dimensions, KeyboardAvoidingView, Platform, Keyboard, TouchableWithoutFeedback, ScrollViewBase } from "react-native";
import colors from "../config/colors";
import { useIsFocused } from "@react-navigation/native";
import * as AlertsController from '../controller/AlertController';
import Camera from '../components/Camera';
import * as CloudinaryController from '../controller/CloudinaryController';
import * as Location from "expo-location"
import { Ionicons } from '@expo/vector-icons';
import { ScrollView } from "react-native-gesture-handler";

const INPUT_BORDER_WIDTH = 1;

const AlertList = () => {
  const [alerts, setAlerts] = useState([]);
  const isFocused = useIsFocused();

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {

    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();

    if (!isFocused)
      return

    const loadAlerts = async () => {
      const alerts = await AlertsController.getAllAlertsApproved();
      setAlerts(alerts);
    };

    loadAlerts();
}, [isFocused]);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  console.log(text);

  //to set visibility at body
  const [bodyVisible, setBodyVisible] = useState(true);
  const [bodyVisibleToShowSensors, setBodyVisibleToShowSensors] = useState(true);
  const [buttonVisible, setButtonVisible] = useState(true);
  const [buttonVisibleToShowSensors, setButtonVisibleToShowSensors] = useState(true);
  const [show0, setShow0] = useState(false);
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [show3, setShow3] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [hasErrors, setHasErrors] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [cap, setCap] = useState();
  const addressObject = { city, street, cap };
  const [startCamera, setStartCamera] = useState(false);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);

  const onCapturePhoto = async (photo) => {
    if (!photo)
      return;
    setPreviewVisible(true);
    setCapturedImage(photo);
  }

  const insertAlert = async (image) => {
  const newAlert = await AlertsController.insertAlert(title, description, image, addressObject, location);
  setAlerts(alerts => [...alerts, newAlert]);
    dismissModal();
  };

  const insertPhotoOnCloudinary = async () => {
    if (title === "" || description === "" || capturedImage === "" || city === "" || street === "" || cap === "") {
      setHasErrors(true);
      return;
    }
    
    setIsLoading(true);
    const photoByCloudinary = await CloudinaryController.sendsPhotoToCloudinary(capturedImage);
    insertAlert(photoByCloudinary.msg);
  }

  const dismissModal = () => {
    setBodyVisible(!bodyVisible);
    setButtonVisible(!buttonVisible);
    setIsLoading(false);
    setHasErrors(false);
    setPreviewVisible(false);
    setCapturedImage(null);
    setStartCamera(false);
  } 

  const dismissSensorsModal = () => {
    setBodyVisibleToShowSensors(!bodyVisibleToShowSensors);
    setButtonVisibleToShowSensors(!buttonVisibleToShowSensors);
  } 

  const areas = [
    {"id": "Zona collinare", "air_quality": "Buona", "co_2": "0,08%", "temperature": "25° C", "humidity": "50%", "noise": "Nessun fastidio"},
    {"id": "Zona portuale", "air_quality": "Molto buona", "co_2": "0,03%", "temperature": "22° C", "humidity": "40%", "noise": "Nessun fastidio"},
    {"id": "Zona Parco Europa", "air_quality": "Discreta", "co_2": "0,1%", "temperature": "24° C", "humidity": "30%", "noise": "Rumori da traffico"},
    {"id": "Zona industriale", "air_quality": "Discreta", "co_2": "0,15%", "temperature": "25° C", "humidity": "25%", "noise": "Rumori da traffico"}
  ]

  const showSensors = (key) => {
    if(key==="Zona collinare")
    {
      setShow0(!show0)
    }
    if(key==="Zona portuale")
    {
      setShow1(!show1)
    }
    if(key==="Zona Parco Europa")
    {
      setShow2(!show2)
    }
    if(key==="Zona industriale")
    {
      setShow3(!show3)
    }
  }
  
  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <Text style={styles.title}>Segnalazioni</Text>
        <Text style={styles.subtitle}>Cosa succede in città ?</Text>
      </View>

      {
        !bodyVisibleToShowSensors &&
        <Modal animationType="slide" statusBarTranslucent={true} onRequestClose={() => { setBodyVisibleToShowSensors(!bodyVisibleToShowSensors), setButtonVisibleToShowSensors(!buttonVisibleToShowSensors)}}>
          <View style={styles.header}>
            <Text style={styles.title}>Dati sensori</Text>
            <Text style={styles.subtitle}>in tempo reale</Text>
          </View>
          <KeyboardAvoidingView style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          >
            <ScrollView>
            <View style = {styles.areasContainer}>
                  <View style={styles.itemArea} key={areas[0].id} >
                  <View style={styles.notExpanded}>
                      <Text style={styles.nameArea}>{areas[0].id}</Text>
                      {show0 &&
                      <Pressable style={styles.buttonViewData} key={areas[0].id} onPress={() => showSensors(areas[0].id)}>
                        <Ionicons name="chevron-up" size={24} color="black" />
                      </Pressable>
                      }
                      {!show0 &&
                      <Pressable style={styles.buttonViewData} key={areas[0].id} onPress={() => showSensors(areas[0].id)}>
                        <Ionicons name="chevron-down" size={24} color="black" />
                      </Pressable>
                      }
                  </View>
                      {show0 &&
                        <View style={styles.expandable}>
                          <View style={styles.dataRow}>
                            <Text style={styles.measure}>Qualità dell'aria:</Text>
                            <Text style = {{
                              fontWeight: "bold",
                              color:(areas[0].air_quality==="Buona" || areas[0].air_quality==="Molto buona")?colors.green_confirm_operation: colors.yellow}}>{areas[0].air_quality}</Text>
                          </View>
                          <View style={styles.dataRow}>
                            <Text style={styles.measure}>Percentuale di CO2: </Text>
                            <Text style = {{
                              fontWeight: "bold",
                              color:colors.black}}>{areas[0].co_2}</Text>
                          </View>
                          <View style={styles.dataRow}>
                            <Text style={styles.measure}>Temperatura: </Text>
                            <Text style = {{
                              fontWeight: "bold",
                              color:colors.black}}>{areas[0].temperature}</Text>
                          </View>
                          <View style={styles.dataRow}>
                            <Text style={styles.measure}>Umidità:</Text>
                            <Text style = {{
                              fontWeight: "bold",
                              color:colors.black}}>{areas[0].humidity}</Text>
                          </View>
                          <View style={styles.dataRow}>
                            <Text style={styles.measure}>Rumore:</Text>
                            <Text style = {{
                              fontWeight: "bold",
                              color:colors.black}}>{areas[0].noise}</Text>
                          </View>
                        </View>
                            }
                </View>

                <View style={styles.itemArea} key={areas[1].id} >
                  <View style={styles.notExpanded}>
                      <Text style={styles.nameArea}>{areas[1].id}</Text>
                      {show1 &&
                      <Pressable style={styles.buttonViewData} key={areas[1].id} onPress={() => showSensors(areas[1].id)}>
                        <Ionicons name="chevron-up" size={24} color="black" />
                      </Pressable>
                      }
                      {!show1 &&
                      <Pressable style={styles.buttonViewData} key={areas[1].id} onPress={() => showSensors(areas[1].id)}>
                        <Ionicons name="chevron-down" size={24} color="black" />
                      </Pressable>
                      }
                  </View>
                      {show1 &&
                        <View style={styles.expandable}>
                          <View style={styles.dataRow}>
                            <Text style={styles.measure}>Qualità dell'aria:</Text>
                            <Text style = {{
                              fontWeight: "bold",
                              color:(areas[1].air_quality==="Buona" || areas[1].air_quality==="Molto buona")?colors.green_confirm_operation: colors.yellow}}>{areas[1].air_quality}</Text>
                          </View>
                          <View style={styles.dataRow}>
                            <Text style={styles.measure}>Percentuale di CO2: </Text>
                            <Text style = {{
                              fontWeight: "bold",
                              color:colors.black}}>{areas[1].co_2}</Text>
                          </View>
                          <View style={styles.dataRow}>
                            <Text style={styles.measure}>Temperatura: </Text>
                            <Text style = {{
                              fontWeight: "bold",
                              color:colors.black}}>{areas[1].temperature}</Text>
                          </View>
                          <View style={styles.dataRow}>
                            <Text style={styles.measure}>Umidità:</Text>
                            <Text style = {{
                              fontWeight: "bold",
                              color:colors.black}}>{areas[1].humidity}</Text>
                          </View>
                          <View style={styles.dataRow}>
                            <Text style={styles.measure}>Rumore:</Text>
                            <Text style = {{
                              fontWeight: "bold",
                              color:colors.black}}>{areas[1].noise}</Text>
                          </View>
                        </View>
                            }
                </View>

                <View style={styles.itemArea} key={areas[2].id} >
                  <View style={styles.notExpanded}>
                      <Text style={styles.nameArea}>{areas[2].id}</Text>
                      {show2 &&
                      <Pressable style={styles.buttonViewData} key={areas[2].id} onPress={() => showSensors(areas[2].id)}>
                        <Ionicons name="chevron-up" size={24} color="black" />
                      </Pressable>
                      }
                      {!show2 &&
                      <Pressable style={styles.buttonViewData} key={areas[2].id} onPress={() => showSensors(areas[2].id)}>
                        <Ionicons name="chevron-down" size={24} color="black" />
                      </Pressable>
                      }
                  </View>
                      {show2 &&
                        <View style={styles.expandable}>
                          <View style={styles.dataRow}>
                            <Text style={styles.measure}>Qualità dell'aria:</Text>
                            <Text style = {{
                              fontWeight: "bold",
                              color:(areas[2].air_quality==="Buona" || areas[2].air_quality==="Molto buona")?colors.green_confirm_operation: colors.yellow}}>{areas[2].air_quality}</Text>
                          </View>
                          <View style={styles.dataRow}>
                            <Text style={styles.measure}>Percentuale di CO2: </Text>
                            <Text style = {{
                              fontWeight: "bold",
                              color:colors.black}}>{areas[2].co_2}</Text>
                          </View>
                          <View style={styles.dataRow}>
                            <Text style={styles.measure}>Temperatura: </Text>
                            <Text style = {{
                              fontWeight: "bold",
                              color:colors.black}}>{areas[2].temperature}</Text>
                          </View>
                          <View style={styles.dataRow}>
                            <Text style={styles.measure}>Umidità:</Text>
                            <Text style = {{
                              fontWeight: "bold",
                              color:colors.black}}>{areas[2].humidity}</Text>
                          </View>
                          <View style={styles.dataRow}>
                            <Text style={styles.measure}>Rumore:</Text>
                            <Text style = {{
                              fontWeight: "bold",
                              color:colors.black}}>{areas[2].noise}</Text>
                          </View>
                        </View>
                            }
                </View>

                <View style={styles.itemArea} key={areas[3].id} >
                  <View style={styles.notExpanded}>
                      <Text style={styles.nameArea}>{areas[3].id}</Text>
                      {show3 &&
                      <Pressable style={styles.buttonViewData} key={areas[3].id} onPress={() => showSensors(areas[3].id)}>
                        <Ionicons name="chevron-up" size={24} color="black" />
                      </Pressable>
                      }
                      {!show3 &&
                      <Pressable style={styles.buttonViewData} key={areas[3].id} onPress={() => showSensors(areas[3].id)}>
                        <Ionicons name="chevron-down" size={24} color="black" />
                      </Pressable>
                      }
                  </View>
                      {show3 &&
                        <View style={styles.expandable}>
                          <View style={styles.dataRow}>
                            <Text style={styles.measure}>Qualità dell'aria:</Text>
                            <Text style = {{
                              fontWeight: "bold",
                              color:(areas[3].air_quality==="Buona" || areas[3].air_quality==="Molto buona")?colors.green_confirm_operation: colors.yellow}}>{areas[3].air_quality}</Text>
                          </View>
                          <View style={styles.dataRow}>
                            <Text style={styles.measure}>Percentuale di CO2: </Text>
                            <Text style = {{
                              fontWeight: "bold",
                              color:colors.black}}>{areas[3].co_2}</Text>
                          </View>
                          <View style={styles.dataRow}>
                            <Text style={styles.measure}>Temperatura: </Text>
                            <Text style = {{
                              fontWeight: "bold",
                              color:colors.black}}>{areas[3].temperature}</Text>
                          </View>
                          <View style={styles.dataRow}>
                            <Text style={styles.measure}>Umidità:</Text>
                            <Text style = {{
                              fontWeight: "bold",
                              color:colors.black}}>{areas[3].humidity}</Text>
                          </View>
                          <View style={styles.dataRow}>
                            <Text style={styles.measure}>Rumore:</Text>
                            <Text style = {{
                              fontWeight: "bold",
                              color:colors.black}}>{areas[3].noise}</Text>
                          </View>
                        </View>
                            }
                </View>
            </View>

                        
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View style={styles.containerInsert}>
                <View style={styles.containerButtonSendAlert}>
                  {/* <Pressable style={styles.buttonConfirmNewAlert} onPress={insertPhotoOnCloudinary}>
                    {isLoading && <ActivityIndicator color={colors.white}/>}
                    {!isLoading && <Text style={styles.buttonConfirmNewAlertText}>Invia seffffgnalazione</Text>}
                  </Pressable> */}
                  {!isLoading && <Text style={styles.buttonDiscardNewAlert} onPress={dismissSensorsModal}>Chiudi</Text>}
                </View>
              </View>
            </TouchableWithoutFeedback>
            </ScrollView>

          </KeyboardAvoidingView>
        </Modal>
      }

      <View style={styles.body}>
         {buttonVisible ? (
        <View style={styles.containerSensorsData}>
          <Pressable style={styles.buttonSensorsData} onPress={() => [setBodyVisibleToShowSensors(!bodyVisibleToShowSensors), setButtonVisibleToShowSensors(!buttonVisibleToShowSensors)]}>
            <Text style={styles.buttonTextSensorsData}>Visualizza i dati dei sensori</Text>
          </Pressable>
        </View>
      ) : null}
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
                <Text style={styles.message_item} numberOfLines={3}>{item.description}</Text>
                <Text style={styles.address_item} numberOfLines={1}>
                  <Text style={styles.address_item_enf}> Indirizzo: </Text>
                  {item.address.city}  {item.address.street}
                </Text>
              </View>
            </View>
          }}
          keyExtractor={item => `${item.id}`}
        />
      </View>

      {
        !bodyVisible &&
        <Modal animationType="slide" statusBarTranslucent={true} onRequestClose={() => { setBodyVisible(!bodyVisible), setButtonVisible(!buttonVisible) }}>
          <View style={styles.header}>
            <Text style={styles.title}>Segnalazioni</Text>
            <Text style={styles.subtitle}>Segnala qualcosa</Text>
          </View>
          <KeyboardAvoidingView style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View style={styles.containerInsert}>

                {hasErrors && <Text style={styles.titleError}>Inserisci tutti i campi!</Text>}

                <Text style={styles.titleInsert}>Cosa vuoi segnalare? </Text>

                <TextInput style={[styles.input, ...(hasErrors ? [styles.inputError]: [])]} onChangeText={setTitle} placeholder="Titolo" placeholderTextColor={colors.grey} />

                <TextInput style={[styles.input, ...(hasErrors ? [styles.inputError]: [])]} onChangeText={setDescription} placeholder="Descrizione" placeholderTextColor={colors.grey} />

                <Text style={styles.titleInsert}>Dove avviene ciò? </Text>

                <TextInput style={[styles.input, ...(hasErrors ? [styles.inputError]: [])]} onChangeText={setStreet} placeholder="Via, numero civico" placeholderTextColor={colors.grey} />

                <View style={styles.twoColumns}>
                  <TextInput style={[styles.input, styles.halfSizeInput, ...(hasErrors ? [styles.inputError]: [])]} onChangeText={setCity} placeholder="Città" placeholderTextColor={colors.grey} />
                  <TextInput style={[styles.input, styles.halfSizeInput, ...(hasErrors ? [styles.inputError]: [])]} keyboardType="number-pad" onChangeText={setCap} placeholder="CAP" placeholderTextColor={colors.grey} />
                </View>

                {previewVisible && capturedImage ? (
                  <View style={styles.containerPreview}>
                    <Pressable style={[styles.insertPhoto, styles.insertPhotoComplete]}>
                      <Text style={styles.insertPhotoCompleteText}>Foto inserita!</Text>
                    </Pressable>
                    {
                      // <CameraPreview photo={//capturedImage} /> 
                    }
                  </View>
                ) : (startCamera ? (
                  <Camera onCapturePhoto={onCapturePhoto} />
                ) : (
                  <Pressable onPress={() => setStartCamera(true)} style={styles.insertPhoto}>
                    <Text style={styles.insertPhotoText}>Scatta una foto</Text>
                  </Pressable>
                )
                )}

                <View style={styles.containerButtonSendAlert}>
                  <Pressable style={styles.buttonConfirmNewAlert} onPress={insertPhotoOnCloudinary}>
                    {isLoading && <ActivityIndicator color={colors.white}/>}
                    {!isLoading && <Text style={styles.buttonConfirmNewAlertText}>Invia segnalazione</Text>}
                  </Pressable>
                  {!isLoading && <Text style={styles.buttonDiscardNewAlert} onPress={dismissModal}>Chiudi</Text>}
                </View>
              </View>
            </TouchableWithoutFeedback>
          </KeyboardAvoidingView>
        </Modal>
      }

      {buttonVisible ? (
        <View style={styles.containerButtonNewAlert}>
          <Pressable style={styles.buttonNewAlert} onPress={() => [setBodyVisible(!bodyVisible), setButtonVisible(!buttonVisible)]}>
            <Text style={styles.buttonTextNewAlert}>Avvia nuova segnalazione</Text>
          </Pressable>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  containerSensorsData: {
    height: Dimensions.get('window').height / 15,
    width: "120%",
    alignSelf: "center",
  },
  buttonSensorsData: {
    marginHorizontal: 50,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: colors.dark_blue_palette,
    backgroundColor: colors.light_blue_palette,
    borderRadius: 20,
    alignSelf: 'stretch',
  },
  buttonTextSensorsData: {
    color: colors.white,
    fontSize: 15,
    textAlign: "center",
  },
  areasContainer: {
    flex: 5,
    alignItems: "center",
  },
  itemArea: {
    width: Dimensions.get('window').width / 1.2,
    backgroundColor: colors.dirty_white_palette,
    borderRadius:10,
    marginTop: 10,
    marginBottom: 5,
    alignItems: "center",
    borderWidth: 1,
    flexDirection: "column",
    paddingRight: 10,
    paddingLeft: 10,
  },
  notExpanded: {
    width: Dimensions.get('window').width/1.2,
    flexDirection: "row",
    borderRadius: 20,
    marginTop: 10,
    marginBottom: 5,
    paddingRight: 10,
    paddingLeft: 10,
  },
  nameArea: {
    flex: 1,
    fontWeight: "bold",
    color: colors.black,
  },
  expandable: {
    flexDirection: "column",
    width: Dimensions.get('window').width / 1.3,
    paddingBottom: 10
  },
  dataRow: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  measure: {
    justifyContent: "center"
  },
  container: {
    flex: 1,
    backgroundColor: colors.dirty_white_palette,
    justifyContent: 'center',
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
  item: {
    width: Dimensions.get('window').width / 1.1,
    marginBottom: 5,
    paddingBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    borderTopColor: colors.dirty_white_palette,
    borderLeftColor: colors.dirty_white_palette,
    borderRightColor: colors.dirty_white_palette,
    borderBottomColor: colors.grey,
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

    flexDirection: "row"
  },
  body: {
    flex: 1,
    alignItems: "center",
    marginTop: Dimensions.get('window').height / 40
  },
  containerButtonNewAlert: {
    height: Dimensions.get('window').height / 5,
    width: "90%",
    alignSelf: "center",
  },
  buttonNewAlert: {
    marginHorizontal: 50,
    paddingVertical: 20,
    borderWidth: 1,
    borderColor: colors.dark_blue_palette,
    backgroundColor: colors.dark_blue_palette,
    padding: "3%",
    borderRadius: 50,
    alignSelf: 'stretch',
  },
  buttonTextNewAlert: {
    color: colors.white,
    fontSize: 15,
    textAlign: "center",
  },

  //Stile nuova segnalazione
  keyboardAvoidingView: {
    flex: 1,
    bottom: Dimensions.get('window').height / 10,
  },
  containerInsert: {
    margin: 20,
    flex: 1,
    justifyContent: 'center',
  },
  titleError: {
    fontSize: 20,
    color: colors.red_discard_operation,
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 10,
  },
  titleInsert: {
    fontSize: 20,
    color: colors.dark_blue_palette,
    fontWeight: "bold",
    marginBottom: 10,
  },
  twoColumns: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  input: {
    alignSelf: "center",
    height: 40,
    borderColor: colors.grey,
    borderWidth: INPUT_BORDER_WIDTH,
    marginBottom: 10,
    padding: 5,
    borderRadius: 5,
    width: Dimensions.get('window').width / 1.1,
  },
  inputError: {
    borderColor: colors.red_discard_operation,
  },
  halfSizeInput: {
    width: Dimensions.get('window').width / 2.3,
    marginHorizontal: -(INPUT_BORDER_WIDTH * 2),
  },

  //Stile fotocamera chiusa
  insertPhoto: {
    alignSelf: "center",
    width: Dimensions.get('window').width / 1.1,
    height: 40,
    borderColor: colors.dark_blue_palette,
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },

  insertPhotoComplete: {
    backgroundColor: colors.dark_blue_palette,
  },

  insertPhotoCompleteText: {
    color: colors.white,
    fontSize: 15
  },

  insertPhotoText: {
    color: colors.dark_blue_palette,
    fontSize: 15,
  },

  //Stile foto scattata
  containerPreview: {
  },
  containerButtonSendAlert: {

  },

  buttonConfirmNewAlert: {
    marginHorizontal: 50,
    marginTop: 20,
    paddingVertical: 15,
    borderWidth: 1,
    borderColor: colors.green_confirm_operation,
    backgroundColor: colors.green_confirm_operation,
    padding: "3%",
    borderRadius: 50,
  },
  buttonConfirmNewAlertText: {
    color: colors.white,
    fontSize: 15,
    textAlign: "center",
  },
  buttonDiscardNewAlert: {
    color: colors.dark_blue_palette,
    fontSize: 20,
    textDecorationLine: "underline",
    textAlign: "center",
    fontWeight: "bold",
    marginTop: 20,
    padding: 10,
  },
});

export default AlertList;