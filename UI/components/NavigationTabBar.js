// Imports

import React from 'react';
//import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import 'react-native-gesture-handler';
//import { NavigationContainer } from '@react-navigation/native';
//import { createStackNavigator } from '@react-navigation/stack';
import { Pressable, View } from 'react-native';
//import NavigationIcon from './navigationIcon';
//import Icon from 'react-native-vector-icons';
//import uicons from '@flaticon/flaticon-uicons';
import Icon from 'react-native-ionicons';

// local imports

import styles from '../designs';


//const { width } = Dimensions.get('window')

const NavigationTabBar = ({ state, descriptors, navigation }: any) => {
  return (
    <View style={ styles.mainContainer }>
      {state.routes.map((route: any , index: number) => {
        /*
        if(route.name == "Placeholder"){
            return (
                <View style={ styles.mainItemContainer } key={ index }>
                    <SelectWheel />
                </View>
            );
        }
        */
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
        <View key = { index } style = {   [ styles.mainItemContainer, { borderRightWidth: label == "notes"? 3:0 } ]   }>
          <Pressable style = {{   backgroundColor: isFocused? "#030D16": "#292028", borderRAdius: 20   }}>
            <View style = {{   justifyContent: 'center', alignItems: 'center', flex: 1, padding: 15   }}>
              <Icon name="arrow-forward-outline" route={ label } isFocused={ isFocused }/>
            </View>
          </Pressable>
        </View>
      );
    })}
    </View>
  );
}

export default NavigationTabBar;