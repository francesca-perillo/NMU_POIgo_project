import React, { useState, useEffect } from "react";

import { ImageBackground, ActivityIndicator, StyleSheet, Text, View, FlatList, Image, Modal, Pressable, TextInput, Dimensions, KeyboardAvoidingView, Platform, Keyboard, TouchableWithoutFeedback, ScrollViewBase } from "react-native";
import colors from "../config/colors";
import { useIsFocused } from "@react-navigation/native";
import * as AlertsController from '../controller/AlertController';
import Camera from '../components/Camera';
import * as CloudinaryController from '../controller/CloudinaryController';
import * as Location from "expo-location"
import { Ionicons } from '@expo/vector-icons';
import { ScrollView } from "react-native-gesture-handler";
import { color } from "react-native-reanimated";

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

    let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

    if (!isFocused)
      return

    const loadAlerts = async () => {
      const alerts = await AlertsController.getAllAlertsApproved();
      setAlerts(alerts);
    };

    loadAlerts();
}, [isFocused]);

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
  locazione = JSON.stringify(location);
  const newAlert = await AlertsController.insertAlert(title, description, image, addressObject, locazione);
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

  
  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <Text style={styles.title}>Segnalazioni</Text>
        <Text style={styles.subtitle}>Cosa succede in città?</Text>
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
              {areas.map(area=>
                <View style={styles.itemArea} key={area.id} >
                <View style={styles.notExpanded}>
                    <Text style={styles.nameArea}>{area.id}</Text>
                </View>
                      <View style={styles.expandable}>
                        <View style={styles.dataRow}>
                          <Text style={styles.measure}>
                          <Ionicons name="leaf-outline" />
                          Qualità dell'aria: 
                          </Text>
                        <Text style = {{
                          fontWeight: "bold",
                          color:(area.air_quality==="Buona" || area.air_quality==="Molto buona")?colors.green_confirm_operation: colors.yellow}}>{area.air_quality}</Text>
                        </View>
                        <View style={styles.dataRow}>
                          <Text style={styles.measure}>
                          <Ionicons name="radio-outline"/>
                          <Text>Percentuale di CO2: </Text>
                          </Text>
                          <Text style = {{
                            fontWeight: "bold",
                            color:colors.black}}>{area.co_2}</Text>
                        </View>
                        <View style={styles.dataRow}>
                          <Text style={styles.measure}><Ionicons style={styles.iconSensors} name="thermometer-outline"/>Temperatura: </Text>
                          <Text style = {{
                            fontWeight: "bold",
                            color:colors.black}}>{area.temperature}</Text>
                        </View>
                        <View style={styles.dataRow}>
                          <Text style={styles.measure}><Ionicons style={styles.iconSensors} name="water-outline"/>Umidità:</Text>
                          <Text style = {{
                            fontWeight: "bold",
                            color:colors.black}}>{area.humidity}</Text>
                        </View>
                        <View style={styles.dataRow}>
                          <Text style={styles.measure}><Ionicons name="flash-outline"/>Rumore:</Text>
                          <Text style = {{
                            fontWeight: "bold",
                            color:(area.noise==="Nessun fastidio")?colors.green_confirm_operation: colors.yellow}}>{area.noise}</Text>
                        </View>
                      </View>
              </View>
              )}
              </View>
                        
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.containerButtonCloseSensor}>
                  <Text style={styles.textCloseSensor} onPress={dismissSensorsModal}>Chiudi</Text>
              </View>
            </TouchableWithoutFeedback>
            </ScrollView>

          </KeyboardAvoidingView>
        </Modal>
      }

      <View style={styles.body}>
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


      <View style={{flexDirection: 'column'}}> 
        {buttonVisible ? (
            <View style={styles.containerSensorsData}>
              <Pressable style={styles.buttonSensorsData} onPress={() => [setBodyVisibleToShowSensors(!bodyVisibleToShowSensors), setButtonVisibleToShowSensors(!buttonVisibleToShowSensors)]}>
                <Text style={styles.buttonTextSensorsData}>Visualizza i dati dei sensori</Text>
              </Pressable>
            </View>
        ) : null}

        {buttonVisible ? (
          <View style={styles.containerButtonNewAlert}>
            <Pressable style={styles.buttonNewAlert} onPress={() => [setBodyVisible(!bodyVisible), setButtonVisible(!buttonVisible)]}>
              <Text style={styles.buttonTextNewAlert}>Avvia nuova segnalazione</Text>
            </Pressable>
          </View>
        ) : null}
      </View>
      
      
      

        



      

    </View>
  );
};

const styles = StyleSheet.create({
  containerSensorsData: {
    marginLeft: 30,
    marginBottom: 10,
    marginRight: Dimensions.get('window').width/10,
  },
  buttonSensorsData: {
    height: 60,
    width: Dimensions.get('window').width/1.75,
    backgroundColor: colors.dark_blue_palette,
    borderRadius: 10,
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: colors.dark_blue_palette,
    alignItems: "center",
  },
  buttonTextSensorsData: {
    color: colors.white,
    fontSize: 16,
    textAlign: "center",
    paddingTop: "7%"
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
    borderBottomWidth: 1,
    borderBottomColor: colors.black
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
  iconSensors: {
    marginRight: 2,
  },
  measureIcon: {
    alignItems: "stretch"
  },
  containerButtonCloseSensor: {
  },
  textCloseSensor: {
    color: colors.dark_blue_palette,
    fontSize: 20,
    textDecorationLine: "underline",
    textAlign: "center",
    fontWeight: "bold",
    marginTop: 10,
    padding: 5,
  },
  container: {
    flex: 1,
    backgroundColor: colors.dirty_white_palette,
    justifyContent: 'center',
  },
  header: {
    height: (Dimensions.get('window').height / 13) * 2,
    backgroundColor: colors.beau_blue,
    borderBottomLeftRadius: 100,
  },
  title: {
    fontSize: 30,
    color: colors.dark_blue_palette,
    fontWeight: "bold",
    marginTop: Dimensions.get('window').height / 16,
    marginLeft: 20,
    textAlign: 'center'
  },
  subtitle: {
    color: colors.sea_blue,
    fontSize: 18,
    marginLeft: 20,
    fontStyle: "italic",
    textAlign: 'center',
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
    marginLeft: 30,
    marginBottom: 100,
    marginRight: Dimensions.get('window').width/10,
  },
  buttonNewAlert: {
    height: 60,
    width: Dimensions.get('window').width/1.75,
    backgroundColor: colors.dirty_white_palette,
    padding: "3%",
    borderRadius: 10,
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: colors.dark_blue_palette,
  },
  buttonTextNewAlert: {
    color: colors.dark_blue_palette,
    fontSize: 16,
    textAlign: "center",
    paddingTop: 10,
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