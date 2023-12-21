// Imports
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Local imports
import { NavigationTabBar } from 'components';
import {
  AppointmentsScreen,
  CalendarScreen,
  ChoresScreen,
  ProfileScreen,
  ProjectsScreen,
  SettingsScreen,
  TasksScreen,
  ForgottenScreen,
  LoginScreen,
  RegistrationScreen,
} from 'screens';


const BottomTabsBar = () => {
    const Tab = createBottomTabNavigator(); 
    const Stack = createStackNavigator();

    function BottomTabs() {
    return (
        <Tab.Navigator initialRouteName={ 'TasksScreen' } NavigationTabBar={ props => <NavigationTabBar { ...props } /> } >
        <Tab.Screen name="AppointmentsScreen" component={ AppointmentsScreen } />
        <Tab.Screen name="ChoresScreen" component={ ChoresScreen } />
        <Tab.Screen name="ProjectsScreen" component={ ProjectsScreen } />
        <Tab.Screen name="TasksScreen" component={ TasksScreen } />
        <Tab.Screen name="CalendarScreen" component={ CalendarScreen } />
        <Tab.Screen name="ProfileScreen" component={ ProfileScreen } />
        <Tab.Screen name="SettingsScreen" component={ SettingsScreen } />        
        </Tab.Navigator>
    );
    }


    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName={ "BottomTabs"}  screenOptions={{ headerShown:false }}>
          <Stack.Screen name="BottomTabs" component={ BottomTabs }/>
          <Stack.Screen name="ForgottenScreen" component={ ForgottenScreen } />
          <Stack.Screen name="LoginScreen" component={ LoginScreen } />
          <Stack.Screen name="RegistrationScreen" component={ RegistrationScreen } />
        </Stack.Navigator>
      </NavigationContainer>
    );
}


export default BottomTabsBar;