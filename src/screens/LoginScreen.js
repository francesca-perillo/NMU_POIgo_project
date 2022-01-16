// Import React and Component
import React from "react";
import {Alert, Dimensions, Text, KeyboardAvoidingView, Platform, Keyboard, TouchableWithoutFeedback, StyleSheet, View, TextInput, ImageBackground, Pressable} from 'react-native';
import { SafeAreaView } from "react-navigation";
import colors from "../config/colors";
import Entypo from 'react-native-vector-icons/Entypo';
import isValid from '../config/utils';

const LoginScreen = (navigation) => {
    const [email, onChangeEmail] = React.useState("");
    const [password, onChangePassword] = React.useState("");

    return (
        //container
        <View style={styles.container}>
            <ImageBackground
                source={require('../../assets//wallpaper1.jpg')}
                style={{height: Dimensions.get('window').height/2.5,
                }}>
                    <SafeAreaView style={styles.divLogo}>
                        <ImageBackground
                            source={require('../../assets/logo.png')}
                            style={styles.logo}>
                            
                        </ImageBackground>
                        <Text style={styles.textLogo}>
                            poiGo
                        </Text>
                    </SafeAreaView>
            </ImageBackground>


            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.bottomView}>

                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                
                    <View style={styles.containerLogin}>

                        
                        <Text style={styles.welcomeText}>Benvenuto!</Text>
                        
                       

                        <View style={styles.formInput}>

                            <Text style={styles.labelText}>E-mail:</Text>
                            <View style={styles.row}>
                                <Entypo style={styles.icon} name="user" size={20} color={colors.grey}/>
                                <TextInput 
                                    style={styles.inputText}
                                    placeholder="mariorossi@gmail.com"
                                    onChangeText={onChangeEmail}
                                    value={email}
                                    autoComplete="email"
                                    keyboardType="email-address">
                                </TextInput>
                            </View>

                            <Text style={styles.labelText}>Password:</Text>
                            <View style={styles.row}>
                            <Entypo style={styles.icon} name="key" size={20} color={colors.grey}/>
                                <TextInput 
                                    style={styles.inputText}
                                    onChangeText={onChangePassword}
                                    value={password}
                                    placeholder="********"
                                    autoComplete="password-new">
                                </TextInput>  
                            </View>  

                        </View>

                        <Pressable
                            style={styles.button}
                            onPress={() => {
                                if (email == "") {
                                Alert.alert('Attenzione','Inserisci l\'email prima di continuare')
                                } else if (password==""){
                                    Alert.alert('Attenzione','Inserisci la password prima di continuare')
                                } else if (isValid(email, "email")){
                                    navigation.navigate('Home')
                                } else {
                                    Alert.alert('Email non valida','Assicurati di aver scritto correttamente la tua email!')
                                }
                            }
                        }>
                            <Text style={styles.buttonText}>Login</Text>
                        </Pressable>

                        <Text style={styles.createAccountText}>Non hai ancora un account?
                            <Text style={styles.regText}> Registrati</Text>
                        </Text>

                    </View>

                    </TouchableWithoutFeedback>

                </KeyboardAvoidingView> 

                
                </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'#ffffff'
    },
    divLogo: {
        marginTop: Dimensions.get('window').height/40,
        justifyContent: 'center',
        alignItems:'center',
    },
    logo: {
        marginTop:30,
        height:80,
        width:80,
        textShadowOffset:{width:1,height:10},
        shadowOpacity: 0.4,
        shadowRadius:5,
        elevation:20,
    },
    textLogo: {
        color: colors.white,
        fontSize: 40,
        fontWeight: 'bold',
        textShadowOffset:{width:1,height:10},
        shadowOpacity: 0.4,
        shadowRadius:5,
        elevation:20,
    },
    bottomView: {
        flex: 1,
        backgroundColor: colors.white,
        bottom: Dimensions.get('window').height/8,
        borderTopStartRadius:60, 
        borderTopEndRadius:50,
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: -10 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 10,
    },
    containerLogin:{
        margin: 30,
        flex:1,     
        justifyContent: "space-around"
    },
    welcomeText:{
        color:colors.dark_blue_palette,
        fontSize:34,
        fontWeight:'bold',
    },
    regText: {
        color: colors.pale_blue_palette,
        fontStyle:"italic",
        fontWeight:"bold",
    },
    row: {
        flexDirection:"row",
    },
    icon:{
        flex:1,
        marginTop:15,
    },
    formInput: {
        marginTop:20,
    },
    labelText:{
        marginTop:10,
        marginLeft:10,
        color:colors.grey,
    },
    inputText: {
        flex:10,
        height: 40,
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor:colors.dark_blue_palette,
    },
    button:{
        marginTop:40,
        backgroundColor:colors.dark_blue_palette,
        height:50,
        width: Dimensions.get('window').width/2,
        marginLeft: Dimensions.get('window').width/5,
        justifyContent:'center',
        borderRadius:50,
        alignItems:'center',
        textShadowOffset:{width:1,height:10},
        shadowOpacity: 0.4,
        shadowRadius:5,
        elevation:20,
    },
    buttonText:{
        color:colors.white,
        fontSize:18,
    },
    createAccountText: {
        marginTop:30,
    }
});

export default LoginScreen