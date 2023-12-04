// Imports
//import React, { useState, useEffect } from 'react';
//import React.Component from 'react';
//import { Text, View, StyleSheet, Alert, SafeAreaView, StatusBar, TouchableOpacity } from 'react-native';
//import Tooltip from '@mui/material/Tooltip';
//import Parse from 'parse/react-native';
//import { List, Title, IconButton, Text as TextPaper, Button as ButtonPaper, TextInput as TextInputPaper} from 'react-native-paper';
//import { Button } from '@mui/material';

//local imports

import { DataFetcher } from '../engines';

const ChoresScreen = () => {    
    
    /*
    const createTask = async function () {
        const newTaskTitleValue = newTaskTitle;
        let task = new Parse.Object('Task');
        task.set('title', newTaskTitleValue);
        task.set('done', false);

        try {
            await task.save();
            Alert.alert('Success!', 'Task created!');
            DataFetcher('chores');
            return true;
        } catch (error) {
            Alert.alert('Error',  error.message);
            return false;
        };
    };
    */
    
    return(
        /*
        <View>
            <View>
                <Button></Button>
            </View>
            <View>
                { DataFetcher('chores') }
            </View>
        </View>
        */
        DataFetcher('chores')
    )
}

export default ChoresScreen;