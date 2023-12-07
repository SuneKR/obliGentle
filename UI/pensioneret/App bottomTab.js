import React from 'react';
//import React from 'react'
//import { StatusBar } from 'expo-status-bar';
//import { View } from 'react-native';
//import { StyleSheet, Text, View, TouchableOpacity, Button} from 'react-native';
//import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
//import { BrowserRouter, Routes, Route } from 'react-router-dom';
//import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


import 'react-native-gesture-handler';
//import { NavigationContainer } from '@react-navigation/native';
//import { createStackNavigator } from '@react-navigation/stack';
//import NavigationIcon from './navigationIcon';
//import Icon from 'react-native-vector-icons/dist/FontAwesome';

// Local imports

import { BottomTabsBar } from '../components';

//import { HomeScreen, AppointmentsScreen, CalendarScreen, ChoresScreen, ProfileScreen, ProjectsScreen, SettingsScreen } from './screens';
/*
import {
  HomeScreen,
  AppointmentsScreen,
  CalendarScreen,
  ChoresScreen,
  ProfileScreen,
  ProjectsScreen,
  SettingsScreen,
  TasksScreen
} from './screens';
import styles from './designs';
import { BottomTabsBar, NavigationTabBar } from './componets';

//import { MyTabBar } from './componets';

/*
const { width } = Dimensions.get('window')

const NavigationTabBar = ({ state, decriptors, navigation }: any) => {
  return (
    <View style={styles.mainContainer}>
      {state.routes.map((route: any , index: number) => {
        const { options } = descriptors[route.key];
        const label = options.NavigationTabBarLabel !== undefined
          ? options.NavigationTabBarLabel : options.title !== undefined
          ? options.title : route.name
        const isFocused = state.index === index;
        const onPress = () => {
          const event = navigation.emit({ type: 'tabPress', target: route.key });
          if (!isFocused && !event.defaultPrevented) {   navigation.navigate(route.name);   }
        };
      return (
        <View key = {index} style = {[styles.mainItemContainer, {borderRightWidth: label == "notes"? 3:0}]}>
          <Pressable style = {{backgroundColor: isFocused?"#030D16": "#292028", borderRAdius: 20 }}>
            <View style = {{justifyContent: 'center', alignItems: 'center', flex: 1, padding: 15}}>
              <NavigationIcon route={label} isForcused={isForcused}/>
            </View>
          </Pressable>
        </View>
      );
    })}
    </View>
  );
}

const Tab = createBottomTabNavigator(); 

function BottomTabs() {
  return (
    <Tab.Navigator initialRouteName={'home'} tabBar={props => <NavigationTabBar {...props} />} >
      <Tab.Screen name="home" component={HomeScreen } />
      <Tab.Screen name="appointment" component={AppointmentsScreen } />
      <Tab.Screen name="chores" component={ChoresScreen } />
      <Tab.Screen name="projects" component={ProjectsScreen } />
      <Tab.Screen name="tasks" component={TasksScreen } />
      <Tab.Screen name="calendar" component={CalendarScreen } />
      <Tab.Screen name="profile" component={ProfileScreen } />
      <Tab.Screen name="settings" component={SettingsScreen } />
    </Tab.Navigator>
  );
}


const Stack = createStackNavigator();
*/

class App extends React.Component {
  
  render() {
    return (
      BottomTabsBar()
      
      
      /*
      <NavigationContainer>
        <Stack.Navigator initialRouteName={"BottomTabs"} screenOptions={{headerShown:false}}>
          <Stack.Screen name="BottomTabs" component={BottomTabs}/>
        </Stack.Navigator>
      </NavigationContainer>
      
      /*
      <View>
        <NavigationContainer>
          <Tab.Navigator tabBar={(props) => <MyTabBar {...props} />}>
            <Tab.Screen name="home" component={HomeScreen } />
            <Tab.Screen name="appointment" component={AppointmentsScreen } />
            <Tab.Screen name="chores" component={ChoresScreen } />
            <Tab.Screen name="projects" component={ProjectsScreen } />
            <Tab.Screen name="tasks" component={TasksScreen } />
            <Tab.Screen name="calendar" component={CalendarScreen } />
            <Tab.Screen name="profile" component={ProfileScreen } />
            <Tab.Screen name="settings" component={SettingsScreen } />
          </Tab.Navigator>
        </NavigationContainer>
      </View>
      */
    );
  }
}

export default App;