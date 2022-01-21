import React, { useState, useEffect } from 'react';
import { Calendar, LocaleConfig} from 'react-native-calendars';
import { View, Text, Image, ImageBackground, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import colors from '../config/colors';
import * as CalendarController from '../controller/CalendarController';

LocaleConfig.locales['it'] = {
  monthNames: ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'],
  monthNamesShort: ['Gen', 'Feb', 'Mar', 'Apr', 'Mag', 'Giu', 'Lug', 'Ago', 'Set', 'Ott', 'Nov', 'Dic'],
  dayNames: ['Domenica', 'Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato'],
  dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab'],
  today: 'Domani/',

};
LocaleConfig.defaultLocale = 'it';

const windowWidth = Dimensions.get('window').width;

//qui andremo a mettere i dati degli eventi presi dal db
const marked_days = {
  '2021/12/16':'blue', '2022/1/21':'blue',
};

function markedDays(day, month, year, state) {
  var full_day = year + "/" + month + "/" + day
  var color = ''
  var src_img = ''
  if (Object.keys(marked_days).includes(full_day)) {
    color = marked_days[full_day]
    src_img = dict_src_img[color]
    return (
      <View>
        <TouchableOpacity styles>
          <ImageBackground source={(src_img)} style={styles.logo}>
            <Text style={{
              textAlign: 'center',
              fontWeight: 'bold',
              color: colors.white,
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
        fontWeight: state === "disabled" ? "normal" : "bold",
        color: state === "disabled" ? "gray" : "black",
        padding: 5
      }}>{day}</Text>
    </View>
  )
}

const CalendarScreen = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const loadEvents = async () => {
      const eventsFromApi = await CalendarController.getAllEvents();
      const events = eventsFromApi.map(event => {
        return {
          id: event._id,
          title: event.title,
          description: event.description,
          date: event.date.substring(0, 10),
        }
      })
    
      setEvents(events);
    };

    loadEvents();
  }, [])

  return (
    <View style={styles.container}>
      
      <View style = {styles.header}>
        <Text style ={styles.title}>Calendario</Text>
        <Text style ={styles.subtitle}>Eventi importanti</Text>
      </View>

      <View style={styles.body}>
        <Calendar
          markingType={'custom'}
          dayComponent={({ date, state }) => {
            return (markedDays(date.day, date.month, date.year, state))
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
          
        <View style={styles.item}>
        {
          events.map(event =>
          <View style={styles.description_item}  key={event.id}>

            <View style={styles.map_item}>
              <Image style = {{width:60, height:60}} source={require("../../assets/logo.png")}/>  
            </View>

            <View style={styles.wrapper}>
              <Text style={styles.title_item}>{event.title}</Text>
              <Text style={styles.date_item}>{event.date}</Text>
              <Text style={styles.message_item}>{event.description}</Text>
            </View>

          </View>
        )}
        </View>  
      </View>
    </View>
  )
}




export default CalendarScreen;

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
    padding:2,
  },
  description_item: {
    flexDirection: "row",
  },
  wrapper: {
    flexDirection: 'column',
    marginLeft:10,
    justifyContent: 'center',
  },
  title_item: {
    fontSize: 20,
    color: colors.black,
    fontWeight: "bold",
  },
  message_item: {
    fontSize: 16,
    fontStyle: 'italic',
    color: colors.black,
  },
  title: {
    fontSize: 40,
    color: colors.white,
    fontWeight: "bold",
    marginTop: Dimensions.get('window').height/16,
    marginLeft: 20
},
subtitle:{
    color: colors.grey,
    fontSize: 30,
    marginLeft: 20,
    fontStyle: "italic",
},
  row_container: {
    padding: 20,
    flexDirection: "row"
  },
  header:{
    height: Dimensions.get('window').height/6,
    backgroundColor: colors.dark_blue_palette,
    borderBottomRightRadius:200,
    alignContent: 'center',
  },
  body: {
    flex: 3,
  },
  map_item: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    height: 70,
    width: 70,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: colors.white,
    backgroundColor: colors.dark_blue_palette,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    flex: 3.5,
    borderWidth:1,
    marginRight:10,
    marginLeft:10,
    borderRightColor: colors.dirty_white_palette,
    borderLeftColor: colors.dirty_white_palette,
    borderBottomColor: colors.dirty_white_palette,
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

var dict_src_img = {
  "blue": (require("../../assets/calendar/marker-calendar-blue.png")),
  "green": (require("../../assets/calendar/marker-calendar-green.png")),
  "water": (require("../../assets/calendar/marker-calendar-water.png")),
  "purple": (require("../../assets/calendar/marker-calendar-purple.png")),
  "darkpink": (require("../../assets/calendar/marker-calendar-darkpink.png")),
  "yellow": (require("../../assets/calendar/marker-calendar-yellow.png"))
};
