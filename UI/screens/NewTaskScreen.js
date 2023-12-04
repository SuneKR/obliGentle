
// Imports
import React, { useState } from 'react';
import { KeyboardAvoidingView, SafeAreaView, Text, TextInput, TouchableHighlight, View } from 'react-native';

import { useDispatch } from 'react-redux';
import 'react-native-gesture-handler';
import { Header } from '@react-navigation/stack';

import axios from 'axios';

// Local imports
import { createTask, updateTask } from '../actions';
import styles from '../designs';


const MAX_LENGTH = 250;

const NewTask = (props) => {
    const dispatch = useDispatch();
    const { navigation } = props;

    let url = "http://127.0.0.1:8000/tasks/";

    let task = navigation.getParam('task', null);

    const [isSaving, setIsSaving] = useState(false);
    const [name, setName] = useState(task ? task.name : "");
    const [description, setDescription] = useState(task ? task.description : "");

    const onSave = () => {
        let edit = task !== null;
        let task_ = {};

        if (edit) {
            task_ = task;
            task_['name'] = name;
            task_['description'] = description;
        } else {   task_ = { "name": name, "description": description };   }

        axios.post(url, task_)
            .then(response => response.data)
            .then((data) => {
                dispatch(task ? updateTask(data) : createTask(data));
                navigation.goBack();
            })
            .catch(error => alert(error.message))
    }

    let disabled = (name.length > 0 && description.length > 0) ? false : true;
    return (
        <KeyboardAvoidingView keyboardVerticalOffset={ Header.HEIGHT } styles={ styles.flex } behavior="padding">
            <SafeAreaView styles={ styles.flex }>
                <View style={ styles.flex }>
                    <TextInput style={ [styles.taskText] }
                        onChangeText={ (text) => setName(text) }
                        placeholder={ "Task" }
                        autoFocus={ true }
                        value={ name } />
                    <TextInput style={ [styles.description ]}
                        multiline={ true }
                        onChangeText={ (text) => setDescription(text) }
                        placeholder={ "Task description" }
                        maxLength={ MAX_LENGTH }
                        value={ description } />
                </View>

                <View style={ styles.buttonContainer }>
                    <View style={ { flex: 1, justifyContent: 'center' } }>
                        <Text style={ [styles.count, (MAX_LENGTH - description.length <= 10) && { color: "red" }] }>{ MAX_LENGTH - description.length }</Text>
                    </View>
                    <View style={ { flex: 1, alignItems: "flex-end" } }>
                        <TouchableHighlight style={ [styles.buttonNew] } disabled={ disabled } onPress={ onSave }
                            underlayColor="rgba(0, 0, 0, 0)">
                            <Text styles={ [styles.buttonText, { color: disabled ? "rgba(255,255,255,.5)" : "#FFF" }] }>
                                Save
                            </Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </SafeAreaView>
        </KeyboardAvoidingView>
    );
};

export default NewTask;