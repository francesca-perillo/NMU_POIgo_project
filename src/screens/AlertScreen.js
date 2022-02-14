import React, { useState, useEffect } from "react";

import { ActivityIndicator, StyleSheet, Text, View, FlatList, Image, Modal, Pressable, TextInput, Dimensions, KeyboardAvoidingView, Platform, Keyboard, TouchableWithoutFeedback } from "react-native";
import colors from "../config/colors";
import { useIsFocused } from "@react-navigation/native";
import * as AlertsController from '../controller/AlertController';
import Camera from '../components/Camera';
import * as CloudinaryController from '../controller/CloudinaryController';
import * as Location from 'expo-location';

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
  const [buttonVisible, setButtonVisible] = useState(true);

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


    const newAlert = await AlertsController.insertAlert(title, description, image, addressObject);
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

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <Text style={styles.title}>Segnalazioni</Text>
        <Text style={styles.subtitle}>Cosa succede in città ?</Text>
      </View>

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

                <TextInput style={[styles.input, ...(hasErrors ? [styles.inputError] : [])]} onChangeText={setTitle} placeholder="Titolo" placeholderTextColor={colors.grey} />

                <TextInput style={[styles.input, ...(hasErrors ? [styles.inputError] : [])]} onChangeText={setDescription} placeholder="Descrizione" placeholderTextColor={colors.grey} />

                <Text style={styles.titleInsert}>Dove avviene ciò? </Text>

                <TextInput style={[styles.input, ...(hasErrors ? [styles.inputError] : [])]} onChangeText={setStreet} placeholder="Via" placeholderTextColor={colors.grey} />

                <View style={styles.twoColumns}>
                  <TextInput style={[styles.input, styles.halfSizeInput, ...(hasErrors ? [styles.inputError] : [])]} onChangeText={setCity} placeholder="Città" placeholderTextColor={colors.grey} />
                  <TextInput style={[styles.input, styles.halfSizeInput, ...(hasErrors ? [styles.inputError] : [])]} keyboardType="number-pad" onChangeText={setCap} placeholder="CAP" placeholderTextColor={colors.grey} />
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
                    {isLoading && <ActivityIndicator color={colors.white} />}
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
    padding: 20,
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