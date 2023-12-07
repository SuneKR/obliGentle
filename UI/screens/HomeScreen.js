import React from 'react';
//import React, { useState, useEffect } from 'react';
//import { View } from 'react-native';
//import { Text, View, Button, SafeAreaView } from 'react-native';
//import { StyleSheet, Text, View, TouchableOpacity, Button, SafeAreaView } from 'react-native';
//import App from '../App';
//import {name as appName} from '../app.json';
//import Parse from 'parse/react-native.js';
//import AsyncStorage from '@react-native-async-storage/async-storage';
//import EventEmitter from 'react-native/Libraries/vendor/emitter/EventEmitter';
//import type EmitterSubscription from "react-native/Libraries/vendor/emitter/EmitterSubscription";
import { Provider } from 'react-redux';


//import styles from '../designs';
import { InterfaceEngine, TaskEngine } from '../engines';
//import { Router } from '../components';
import { store } from '../misc';

const HomeScreen = () => {
    return (
        //TaskEngine()
        InterfaceEngine()
        
        
        /*
        <Provider store={ store }>
            <Router />
        </Provider>

        
        <View>
            <Text>Hej</Text>
        </View>

        /*
        <SafeAreaView>
            <View>
                <Text>Name: {task.get('name')}</Text>
                <Text>Description: {task.get('name')}</Text>
                <Button title="Add task" onPress={addTask} />
                <Button title="Fetch task" onPress={fetchTask} />
            </View>
        </SafeAreaView>
        */
    );
}

export default HomeScreen;