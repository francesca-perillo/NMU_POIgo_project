import React, { useState, useEffect } from 'react';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { View, Text, Image, ImageBackground, StyleSheet, TouchableOpacity, Dimensions, useColorScheme } from 'react-native';
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

function markedDays(events, day, month, year, state) {
  var flag = false;
  var full_day = year + "/" + month + "/" + day

  events.forEach(element => {
    element.data.date === full_day ? flag = true : false;
  });
     
  return (
    <View>
      <TouchableOpacity styles>
        <ImageBackground source={(flag ? require("../../assets/calendar/marker-calendar-blue.png") : "")} style={styles.logo}>
              <Text style={{
                textAlign: 'center',
                fontSize: 15,
                fontWeight: (state === 'disabled') ? 'normal' : 'bold',
                color: (flag) ? colors.white : colors.dark_blue_palette,
                padding: 5
              }}>{day}</Text>
          </ImageBackground>
        </TouchableOpacity>
      </View>
  );
}

const CalendarScreen = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const loadEvents = async () => {
      const eventsFromApi = await CalendarController.getAllEvents();
      const events = eventsFromApi.map(event => {
        return {
          month : event.date[0],
          data : {
            id: event._id,
            title: event.title,
            description: event.description,
            date: event.date
            }
        }
      })
      setEvents(events);
    };

    loadEvents();
  }, [])

  let currentMonth = ""

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <Text style={styles.title}>Calendario</Text>
        <Text style={styles.subtitle}>Eventi importanti</Text>
      </View>

      <View style={styles.body}>
        <Calendar
          style={{backgroundColor: colors.beau_blue}}
          markingType={'custom'}
          dayComponent={({ date, state }) => {
            return (markedDays(events, date.day, date.month, date.year, state))
          }}
          theme={{
            backgroundColor: colors.beau_blue,
            calendarBackground: colors.beau_blue,
            dayTextColor: colors.dark_blue_palette,
            todayTextColor: colors.black,
            arrowColor: colors.dark_blue_palette,
            monthTextColor: colors.dark_blue_palette,
            textMonthFontWeight: 'bold',
            textMonthFontSize: 22,
          }}
          
          onMonthChange={month => {
            currentMonth = month.month;
            console.log('month changed', currentMonth);
          
          }}/>

      </View>
      <View style={styles.footer}>

        <View style={styles.item}>
          {
            events.map(event =>
              <View style={styles.description_item} key={event.data.id}>

                <View style={styles.map_item}>
                  <Image style={{ width: 60, height: 60 }} source={require("../../assets/logo.png")} />
                </View>

                <View style={styles.wrapper}>
                  <Text style={styles.title_item}>{event.data.title}</Text>
                  <Text style={styles.date_item}>{event.data.date}</Text>
                  <Text style={styles.message_item}>{event.data.description}</Text>
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
    padding: 2,
  },
  description_item: {
    flexDirection: "row",
  },
  wrapper: {
    flexDirection: 'column',
    marginLeft: 10,
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
  row_container: {
    padding: 20,
    flexDirection: "row"
  },
  header: {
    height: (Dimensions.get('window').height / 13) * 2,
    backgroundColor: colors.beau_blue,
    //borderBottomLeftRadius: 100,
  },
  body: {
    flex: 3,
    backgroundColor: colors.beau_blue,
    borderBottomRightRadius: 50,
    borderBottomLeftRadius: 50,
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
    marginRight: 10,
    marginLeft: 10,
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