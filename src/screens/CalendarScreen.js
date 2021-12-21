import React, { useState } from 'react';
import {Calendar} from 'react-native-calendars';
import {View, Text, ImageBackground, Image, StyleSheet, TouchableOpacity, Dimensions} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import { Feather } from '@expo/vector-icons';
import colors from '../config/colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import {LocaleConfig} from 'react-native-calendars';

LocaleConfig.locales['it'] = {
  monthNames: ['Gennaio','Febbraio','Marzo','Aprile','Maggio','Giugno','Luglio','Agosto','Settembre','Ottobre','Novembre','Dicembre'],
  monthNamesShort: ['Gen','Feb','Mar','Apr','Mag','Giu','Lug','Ago','Set','Ott','Nov','Dic'],
  dayNames: ['Domenica','Lunedì','Martedì','Mercoledì','Giovedì','Venerdì','Sabato'],
  dayNamesShort: ['Dom','Lun','Mar','Mer','Gio','Ven','Sab'],
  today: 'Domani/',
  
};
LocaleConfig.defaultLocale = 'it';

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  marker: {
    width: 66,
    height: 58,
  },
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: colors.dirty_white_palette,
  },
  item: {
    flex: 1,
    padding: 20,
    flexDirection: "row",
  },
  description_item: {
    flex: 3,
    borderBottomLeftRadius: 50,
    borderTopLeftRadius: 5,
    paddingLeft: "7%",
    flexDirection: "row",
    borderTopRightRadius: 50,
    borderBottomEndRadius: 5,
  },
  wrapper:{
    flex: 1,
    flexDirection: 'column'
  },
  title_item: {
    fontSize: 20,
    color: 'yellow',
    fontWeight: "bold",
    marginVertical: 8,
    fontSize: 18,
  },
  message_item: {
    fontSize: 16,
    color: "white",
    marginRight: "4%",
    marginBottom:"4%"
  },
  title: {
    fontSize: 40,
    color: colors.dark_blue_palette,
    fontWeight: "bold",
    textAlign: 'left',
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
    flex: 3,
    backgroundColor: colors.dirty_white_palette,
    borderBottomLeftRadius: 30, 
    borderBottomRightRadius: 30
  },
  eventContainer: {
    flex: 0,
    marginBottom: "40%",
    flexDirection: "row",
    },
  map_item: {
    borderTopRightRadius: 50,
    borderBottomRightRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    height: 70,
    width: 70,
    borderRadius: 100/2,
    borderWidth: 2,
    borderColor: colors.white,
    backgroundColor: colors.dark_blue_palette,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    flexDirection: 'column',
    flex: 2.5,
    backgroundColor: colors.dark_blue_palette,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30
  },
  buttonImage: {
    width: windowWidth-60,
    height: 100,
    marginBottom: 40,
    borderRadius: 50,
    //opacity: 0.5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  logo: {
    width: 30,
    height: 30,
    overflow: 'visible' 
  },
  day: {
    textAlign: 'center',
  }
});

var dict_src_img = {"blue":(require("../../assets/calendar/marker-calendar-blue.png")),
                    "green":(require("../../assets/calendar/marker-calendar-green.png")),
                    "water":(require("../../assets/calendar/marker-calendar-water.png")),
                    "purple":(require("../../assets/calendar/marker-calendar-purple.png")),
                    "darkpink":(require("../../assets/calendar/marker-calendar-darkpink.png")),
                    "yellow":(require("../../assets/calendar/marker-calendar-yellow.png"))};


//qui andremo a mettere i dati degli eventi presi dal db
const marked_days ={'2021/12/16':'green', '2021/12/25':'blue',
                    '2021/12/1':'blue', '2021/12/24':'water',
                    '2021/12/8':'purple', '2021/12/22':'blue',
                    '2021/12/9':'green', '2021/12/23':'darkpink',
                    '2021/12/11':'darkpink', '2021/12/31':'yellow',
                    '2021/12/15':'yellow', '2021/12/30':'purple'};

function markedDays(day, month, year, state) {
  var full_day = year+"/"+month+"/"+day
  var color = ''
  var src_img = ''
  if(Object.keys(marked_days).includes(full_day)) {
    color = marked_days[full_day]
    src_img = dict_src_img[color] 
    return (
      <View>
        <TouchableOpacity styles>
          <ImageBackground source={(src_img)}  style={styles.logo}>
            <Text style={{
              textAlign: 'center',
              fontWeight: 'bold',
              color: state === "disabled" ? "gray" : "black",
              padding: 5
          }}>{day}</Text>
          </ImageBackground>
        </TouchableOpacity>
      </View>
    );
  }

  else return (
    <View>
      <Text style={{
        textAlign: 'center',
        fontWeight: state === "disabled" ? "normal": "bold",
        color: state === "disabled" ? "gray" : "black",
        padding: 5
        }}>{day}</Text>
</View>
  )
}

const CalendarScreen = ({ navigation }) => {

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.row_container}>
          <View style={styles.header_title}>
            <Text style={styles.title}>Calendario</Text>
          </View>
          <TouchableOpacity style={styles.header_icon}>
            <Entypo name='bell' size={40} color={colors.dark_blue_palette}  onPress={() => alert(`Lista delle notifiche`)}/>
          </TouchableOpacity>
        </View>
      </View>
      <View style = {styles.body}>
        <Calendar
        markingType={'custom'}
        dayComponent={({ date, state }) => {
          return (markedDays(date.day, date.month, date.year, state))
        }}

        style={{
         // borderColor: colors.dark_blue_palette,
          //borderTopWidth: 2,
          //borderBottomWidth: 2,
        }}
        theme={{
          backgroundColor: colors.dirty_white_palette,
          calendarBackground: colors.dirty_white_palette,
          todayTextColor: colors.light_blue_palette,
          arrowColor: colors.dark_blue_palette,
          monthTextColor: colors.dark_blue_palette,
          textMonthFontWeight: 'bold',
          textMonthFontSize: 22,
        }}>
        </Calendar>
      </View>
      <View style={styles.footer}>
        <View style={styles.eventContainer}>
          <View style={styles.item}>
            <View style={styles.description_item}>
              <View style = {styles.wrapper}>
                <Text style={styles.title_item}>Inaugurazione Luci d'artista - 17/12</Text>
                <Text style={styles.message_item}>L'evento natalizio più atteso dell'anno ritorna ad illuminare Calopezzati. </Text>
                </View>
                <View style={styles.map_item}>
                <TouchableOpacity style={styles.circle}>
                <Feather name="map-pin" size={35} color="white" />
              </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}


export default CalendarScreen;