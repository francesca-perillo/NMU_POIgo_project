// Import React and Component
import React from "react";
import {Alert, Dimensions, KeyboardAvoidingView, Platform, Keyboard, TouchableWithoutFeedback,Text, StyleSheet, View, TextInput, ImageBackground, Pressable} from 'react-native';
import { SafeAreaView } from "react-navigation";
import colors from "../config/colors";
import Entypo from 'react-native-vector-icons/Entypo';
import isValid from '../config/utils';

const RegisterScreen = ({navigation}) => {

    const [email, onChangeEmail] = React.useState("");
    const [passwordOne, onChangePasswordOne] = React.useState("");
    const [passwordTwo, onChangePasswordTwo] = React.useState("");

    return (
        //container
        <View style={styles.container}>
            <ImageBackground
                source={require('../../assets/wallpaper1.jpg')}
                style={{height: Dimensions.get('window').height/2.5, opacity: .9
                }}>
                    <SafeAreaView style={styles.divLogo}>
                        <ImageBackground
                            source={require('../../assets/logo.png')}
                            style={styles.logo}>
                        </ImageBackground>
                    </SafeAreaView>
            </ImageBackground>
            
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.bottomView}>

                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

                    <View style={styles.containerRegister}>

                        <Text style={styles.welcomeText}>Registrati... è gratis!</Text>
                
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
                                    placeholder="********"
                                    onChangeText={onChangePasswordOne}
                                    value={passwordOne}
                                    autoComplete="password-new">
                                </TextInput>  
                            </View>
                            
                            <Text style={styles.labelText}>Conferma password:</Text>
                            <View style={styles.row}>
                                <Entypo style={styles.icon} name="key" size={20} color={colors.grey}/>
                                <TextInput 
                                    style={styles.inputText}
                                    placeholder="********"
                                    onChangeText={onChangePasswordTwo}
                                    value={passwordTwo}
                                    autoComplete="password-new">
                                </TextInput>  
                            </View>

                        </View>
                        
                        <Pressable
                            style={styles.button}
                            onPress={() => {if (email == "") {
                                    Alert.alert('Attenzione','Inserisci l\'email prima di continuare')
                                } else if (passwordOne==""){
                                    Alert.alert('Attenzione','Inserisci la password prima di continuare')
                                }else if (passwordTwo==""){
                                    Alert.alert('Attenzione','Inserisci la conferma della password prima di continuare') 
                                } else if (!isValid(passwordOne, "password")){
                                    Alert.alert('Password debole','Assicurati che la tua password contenga 8-15 caratteri, fra i quali almeno una lettera minuscola, una lettera maiuscola, un numero e un carattere speciale.')
                                } else if (passwordOne!=passwordTwo){
                                    Alert.alert('Attenzione','Le due password non coincidono')
                                } else if (isValid(email, "email")){
                                    navigation.navigate('Login')
                                } else {
                                    Alert.alert('Email non valida','Assicurati di aver scritto correttamente la tua email!')
                                }
                            }
                        }>
                            <Text style={styles.buttonText}>Registrati</Text>
                        </Pressable>

                       
                            <Pressable onPress={()=> navigation.navigate('Login')}>
                                <Text style={styles.alreadyAccountText}> Hai già un account?
                                    <Text style={styles.regText}> Accedi! </Text>
                                </Text>
                            </Pressable> 
                        

                    </View> 

                </TouchableWithoutFeedback>

            </KeyboardAvoidingView>

           

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:colors.white
    },
    divLogo: {
        marginTop: Dimensions.get('window').height/50,
        justifyContent: 'center',
        alignItems:'center',
    },
    logo: {
        height:100,
        width:100,
        textShadowOffset:{width:1,height:10},
        shadowOpacity: 0.4,
        shadowRadius:5,
        elevation:20,
    },
    textLogo: {
        color: colors.white,
        fontSize: 30,
        fontWeight: 'bold',
        textShadowOffset:{width:1,height:10},
        shadowOpacity: 0.4,
        shadowRadius:5,
        elevation:20,
    },
    bottomView: {
        flex: 1,
        backgroundColor:colors.white,
        bottom: Dimensions.get('window').height/5,
        borderTopStartRadius:60, 
        borderTopEndRadius:50,
    },
    containerRegister:{
        margin: 30, 
        flex:1,     
        justifyContent: "space-around"
    },
    welcome: {
        paddingBottom:10,
    },
    welcomeText:{
        color:colors.dark_blue_palette,
        fontSize:34,
        fontWeight:'bold',
        marginBottom: 5,
    },
    regText: {
        color: colors.pale_blue_palette,
        fontStyle:"italic",
        fontWeight:"bold",
    },
    formInput:{
        marginTop:20,
    },
    row: {
        flexDirection:"row",
    },
    icon:{
        flex:1,
        marginTop:15,
    },
    labelText:{
        marginTop:10,
        marginLeft:10,
        color:colors.dark_blue_palette,
    },
    inputText: {
        flex:10,
        height: 40,
        borderWidth: 1,
        padding: 10,
        borderLeftColor:colors.white,
        borderRightColor:colors.white,
        borderTopColor:colors.white,
        borderColor:colors.dark_blue_palette,
    },
    button:{
        backgroundColor:colors.dark_blue_palette,
        height:50,
        width: Dimensions.get('window').width/2,
        marginLeft: Dimensions.get('window').width/5,
        justifyContent:'center',
        borderRadius:50,
        alignItems:'center',
        marginTop:40,
        textShadowOffset:{width:1,height:10},
        shadowOpacity: 0.4,
        shadowRadius:5,
        elevation:20,
    },
    buttonText:{
        color:colors.white,
        fontSize:18,
    },
    alreadyAccountText: {
        alignItems:"center",
        justifyContent: "center",
        marginTop:30,
    }
});

export default RegisterScreen