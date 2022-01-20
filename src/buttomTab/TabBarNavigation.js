import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useEffect, useRef } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import Icon, { Icons } from '../components/Icons.js';
import HomeScreen from '../screens/HomeScreen.js';
import CalendarScreen from '../screens/CalendarScreen.js';
import AlertScreen from '../screens/AlertScreen';
import POIviciniScreen from '../screens/POIviciniScreen';
import * as Animatable from 'react-native-animatable';
import colors from '../config/colors.js';

const TabArr = [
  { route: 'Home', label: 'Home', type: Icons.Ionicons, activeIcon: 'home', inActiveIcon: 'home-outline', component: HomeScreen },
  { route: 'Eventi', label: 'Eventi', type: Icons.Ionicons, activeIcon: 'calendar', inActiveIcon: 'calendar-outline', component: CalendarScreen },
  { route: 'Segnalazioni', label: 'Segnalazioni', type: Icons.Ionicons, activeIcon: 'megaphone', inActiveIcon: 'megaphone-outline', component: AlertScreen },
  { route: 'Near', label: 'Vicino a te', type: Icons.Ionicons, activeIcon: 'location', inActiveIcon: 'location-outline', component: POIviciniScreen },
];

const Tab = createBottomTabNavigator();

const TabButton = (props) => {
  const { item, onPress, accessibilityState } = props;
  const focused = accessibilityState.selected;
  const viewRef = useRef(null);

  useEffect(() => {
    if (focused) 
      viewRef.current.animate({0: {scale: 1, rotate: '0deg'}, 1: {scale: 1, rotate: '360deg'}});
  }, [focused])

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={1}
      style={styles.container}>
        <Animatable.View
          ref={viewRef}
          duration={500}
          style={styles.container}>
          <Icon type={item.type} name={focused ? item.activeIcon : item.inActiveIcon} color={focused ? colors.dark_blue_palette : colors.light_blue_palette} />
        </Animatable.View>
    </TouchableOpacity>
  )
}

export default function AnimTab1() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 70,
          position: 'absolute',
          borderTopLeftRadius:20,
          borderTopRightRadius:20, 
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 12,
          },
          shadowOpacity: 0.58,
          shadowRadius: 16.00,
          elevation: 24,
        }
      }}
    >
      {TabArr.map((item, index) => {
        return (
          <Tab.Screen key={index} name={item.route} component={item.component}
            options={{
              tabBarShowLabel: false,
              tabBarButton: (props) => <TabButton {...props} item={item} />
            }}
          />
        )
      })}
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})