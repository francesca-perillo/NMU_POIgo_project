import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './src/screens/HomeScreen';
import TabBarNavigation from './src/components/TabBarNavigation';
import AlertScreen from './src/screens/AlertScreen';
import CalendarScreen from './src/screens/CalendarScreen';
import POIviciniScreen from './src/screens/POIviciniScreen';

const Tab = createBottomTabNavigator();

const tabs = [
  {
    name: 'Home',
    icon: 'home-outline',
    route: 'Home'
  },
  {
    name: 'Eventi',
    icon: 'ios-calendar-outline',
    route: 'Calendar',
  },
  {
    name: 'Segnalazioni',
    icon: 'megaphone-outline',
    route: 'Alert',
  },
  {
    name: 'Vicino a te',
    icon: 'location-outline',
    route: 'Near',
  },
];



function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        tabBar={(navigationProps) => <TabBarNavigation {...{ navigationProps, tabs }} />}
        screenOptions={{headerShown: false}}
        
      >
        <Tab.Screen name="BackHome" component={HomeScreen}/>
        <Tab.Screen name="Calendar" component={CalendarScreen} />
        <Tab.Screen name="Alert" component={AlertScreen} />
        <Tab.Screen name="Near" component={POIviciniScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;