// imports
//import React from 'react';
import 'react-native-gesture-handler';
import { createAppContainer } from '@react-navigation/native';
//import { createAppContainer, createSwitchNavigator } from '@react-navigation/native';
import { createNativeStackNavigator  } from '@react-navigation/native-stack';


// Local imports
import { HomeScreen, NewTaskScreen } from '../screens';

/*
const AppStack = createStackNavigator  ({
    Home: {
        screen: HomeScreen,
        navigationOptions: ({ navigation }) => ({ title: `Home`})
    },
    NewTask: {
        screen: NewTaskScreen,
        navigationOptions: ({ navigation }) => ({ title: `New task` })
    }
});

const Router = createAppContainer(AppStack);
*/
const Router = () => {
    console.log("test");
}

export default Router;
