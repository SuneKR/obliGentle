import React from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

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
} from './screens';

import styles from './componets/styles';

//const Tab = createBottomTabNavigator(); 

const App = () => {
  return (
    <View style = {styles.container}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route exact path="/appointments" element={<AppointmentsScreen />} />
          <Route exact path="/chores" element={<ChoresScreen />} />
          <Route exact path="/projects" element={<ProjectsScreen />} />
          <Route exact path="/tasks" element={<TasksScreen />} />
          <Route exact path="/calendar" element={<CalendarScreen />} />
          <Route exact path="/profile" element={<ProfileScreen />} />
          <Route exact path="/settings" element={<SettingsScreen />} />
        </Routes>
      </BrowserRouter>
    </View>
  );
}



/*
function myTabs() {
  return (
    <Tab.Navigator
      initualRouteName="chores"
    >
      <Tab.Screen name = "Appointments" />
      <Tab.Screen
        name = "Chores"
        component={choresScreen}
        options={{
          tabBarLabel: "Chores",
          tabBarIcon: ({color, size}) => ( <MaterialCommunityIcons name="addTask" color={color} size={size} /> ),
        }}
      />
      <Tab.Screen name = "Projects" />
      <Tab.Screen name = "Calendar" />
      <Tab.Screen name = "Profile" />
      <Tab.Screen name = "Settings" />
    </Tab.Navigator>
  );
}


function MyTabBar({ navigation }) {
  return (
    <Button
      title="chrores"
      onPress={() => {
        // Navigate using the `navigation` prop that you received
        navigation.navigate('choreScreen');
      }}
    />
  );
}
*/

export default App;