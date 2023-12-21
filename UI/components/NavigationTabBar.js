// Imports
import React from 'react';
import { Pressable, View } from 'react-native';
import 'react-native-gesture-handler';

// local imports

import { styles } from 'designs';

const NavigationTabBar = ({ state, descriptors, navigation }) => {
  return (
    <View style={ styles.mainContainer }>
      {state.routes.map((route: any, index) => {

        const { options } = descriptors[route.key];
        const label = options.NavigationTabBarLabel !== undefined
          ? options.NavigationTabBarLabel : options.title !== undefined
          ? options.title : route.name
        const isFocused = state.index === index;
        const onPress = () => {
          const event = navigation.emit({ type: 'tabPress', target: route.key });
          if (!isFocused && !event.defaultPrevented) { navigation.navigate(route.name); }
        };
      return (
        <View key = { index } style = { [styles.mainItemContainer, { borderRightWidth: label == "notes"? 3:0 }] }>
          <Pressable style = { { backgroundColor: isFocused? "#030D16": "#292028", borderRAdius: 20 } }>
            <View style = { { justifyContent: 'center', alignItems: 'center', flex: 1, padding: 15 } }>
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