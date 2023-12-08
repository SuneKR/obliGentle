// App.js

// Imports
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Local imports
//import { AddTaskScreen, TaskDetailScreen, TaskScreen } from './screens';
import { ForgottenScreen, LoginScreen, RegistrationScreen, TasksScreen,
  ChoresScreen, ProjectsScreen, AppointmentsScreen
} from 'screens';

// Variables
const Stack = createStackNavigator();

// Functions

function MyStack() {
  return (
    <Stack.Navigator
      initialRouteName="LoginScreen"
      screenOption={ {
        headerStyle: { backgroundColor: '#621FF7' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' }
      } }
    >
      <Stack.Screen
        name="ForgottenScreen"
        component={ ForgottenScreen }
        options={ { title: 'Forgotten password' } }
      />
      <Stack.Screen
        name="LoginScreen"
        component={ LoginScreen }
        options={ { title: 'Login' } }
      />
      <Stack.Screen
        name="RegistrationScreen"
        component={ RegistrationScreen }
        options={ { title: 'New user' } }
      />
      <Stack.Screen
        name="AppointmentsScreen"
        component={ AppointmentsScreen }
        option={ { title: 'Appointments' } }
      />
      <Stack.Screen
        name="ChoresScreen"
        component={ ChoresScreen }
        option={ { title: 'Chores' } }
      />
      <Stack.Screen
        name="ProjectsScreen"
        component={ ProjectsScreen }
        option={ { title: 'Projects' } }
      />
      <Stack.Screen
        name="TasksScreen"
        component={ TasksScreen }
        option={ { title: 'Tasks' } }
      />
      { /*
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
      */ } 
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