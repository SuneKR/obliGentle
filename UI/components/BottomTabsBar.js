import React from 'react'
//import { StatusBar } from 'expo-status-bar';
//import { View } from 'react-native';
//import { StyleSheet, Text, View, TouchableOpacity, Button} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
//import { BrowserRouter, Routes, Route } from 'react-router-dom';
//import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
//import NavigationIcon from './navigationIcon';
//import Icon from 'react-native-vector-icons/dist/FontAwesome';

// Local imports

//import { HomeScreen, AppointmentsScreen, CalendarScreen, ChoresScreen, ProfileScreen, ProjectsScreen, SettingsScreen } from './screens';
import {
  HomeScreen,
  AppointmentsScreen,
  CalendarScreen,
  ChoresScreen,
  ProfileScreen,
  ProjectsScreen,
  SettingsScreen,
  TasksScreen
} from '../screens';
import { NavigationTabBar } from '../components';


const BottomTabsBar = () => {
    const Tab = createBottomTabNavigator(); 
    const Stack = createStackNavigator();

    function BottomTabs() {
    return (
        <Tab.Navigator initialRouteName={'home'} NavigationTabBar={props => <NavigationTabBar {...props} />} >
        <Tab.Screen name="home" component={HomeScreen } />
        <Tab.Screen name="appointment" component={AppointmentsScreen } />
        <Tab.Screen name="chores" component={ChoresScreen } />
        <Tab.Screen name="projects" component={ProjectsScreen } />
        <Tab.Screen name="tasks" component={TasksScreen } />
        <Tab.Screen name="calendar" component={CalendarScreen } />
        <Tab.Screen name="profile" component={ProfileScreen } />
        <Tab.Screen name="settings" component={SettingsScreen } />
        {   /* <Tab.Screen name="Placeholder" component={HomeScreen } /> */   }
        </Tab.Navigator>
    );
    }


    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName={"BottomTabs"} screenOptions={{headerShown:false}}>
          <Stack.Screen name="BottomTabs" component={BottomTabs}/>
        </Stack.Navigator>
      </NavigationContainer>
    );
}


export default BottomTabsBar;