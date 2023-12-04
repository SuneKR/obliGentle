// App.js

// Imports
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Local imports
import { AddTaskScreen, TaskDetailScreen, TaskScreen } from './screens';

// Variables
const Stack = createStackNavigator();

// Functions

function MyStack() {
  return (
    <Stack.Navigator
      screenOption={{
        headerStyle: { backgroundColor: '#621FF7' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bolb' }
      }}
    >
      <Stack.Screen
        name="AddTaskScreen"
        component={ AddTaskScreen }
        options={ { title: 'Add Task' } }
      />
      <Stack.Screen
        name="TaskDetailScreen"
        component={ TaskDetailScreen }
        options={ { title: 'Task Detail' } }
      />
      <Stack.Screen
        name="TaskScreen"
        component={ TaskScreen }
        options={ { title: 'Tasks List' } }
      />
    </Stack.Navigator>
  );
}

const App = () => {
  
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}

export default App;