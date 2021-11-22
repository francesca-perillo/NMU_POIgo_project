import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './src/screens/HomeScreen';
import TabBarNavigation from './src/components/TabBarNavigation';
import AlertScreen from './src/screens/AlertScreen';

const Tab = createBottomTabNavigator();

const tabs = [
  {
    name: 'Calendario',
    icon: 'ios-calendar-outline',
    route: 'Calendar',
  },
  {
    name: 'Segnalazioni',
    icon: 'megaphone-outline',
    route: 'Alert',
  },
  {
    name: 'Contattaci',
    icon: 'chatbubbles-outline',
    route: 'Help',
  },
];

function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        tabBar={(navigationProps) => <TabBarNavigation {...{ navigationProps, tabs }} />}
        screenOptions={{headerShown: false}}
        
      >
        <Tab.Screen name="Calendar" component={HomeScreen} />
        <Tab.Screen name="Alert" component={AlertScreen} />
        <Tab.Screen name="Help" component={HomeScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;