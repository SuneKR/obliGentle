
//imports
import React, { useState, useEffect } from 'react';
import { Alert, Image, SafeAreaView, StatusBar, TouchableOpacity, View } from 'react-native';
//import { Alert, Button, Image, SafeAreaView, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { Button as ButtonPaper, IconButton, List, Text as TextPaper, TextInput as TextInputPaper, Title } from 'react-native-paper';
//import { StyleSheet, Text, View, TouchableOpacity, Button, SafeAreaView } from 'react-native';
//import App from '../App';
//import {name as appName} from '../app.json';
import AsyncStorage from '@react-native-async-storage/async-storage';
//import EventEmitter from 'react-native/Libraries/vendor/emitter/EventEmitter';
//import type EmitterSubscription from "react-native/Libraries/vendor/emitter/EmitterSubscription";
import { ScrollView } from 'react-native-gesture-handler';
import axios from 'axios';

// local imports
import { styles } from '../designs';



const TaskEngine = (URLSpecifier) => {    
    const url = `http://127.0.0.1:8000/${URLSpecifier}/`;


    //const [task, setTask] = useState(new Parse.Object('task'));
    //const [fetchedState,setFetchedState] = useState(null);
    const [ readResults, setReadResults ] = useState([]);
    const [ newTaskTitle, setNewTaskTitle ] = useState('');

    async function createTask() {
        const newTaskTitleValue = newTaskTitle;
        let task = new Parse.Object('task');
        task.set('name', newTaskTitleValue);
        task.set('description', 'Added from app');
        try {
            await task.save();
            Alert.alert('Success!', 'task created!');
            readAllTasks();
            return true;
        }
        catch (error) {
            Alert.alert('Error!', error.message);
            return false;
        }
    }

    /*

    async function readTask() {
        let query = new Parse.Query('task');
        let queryResult = await query.findAll();
        const currentTask = queryResult[0];
        console.log('task id: ', currentTask.get('id'));
        console.log('task name: ', currentTask.get('name'));
        console.log('task description: ', currentTask.get('description'));
        setTask(currentTask);
    }
    */

    async function readAllTasks() {
        /*
        this.setSTate({
            fromFetch: false,
            loading: true
        })
        axios.get("http://127.0.0.1:8000/task/")
            .then(response => {
                console.log('getting data from axios', response.data);
                setTimeout(() => {
                    this.setState({
                        loading: false,
                        axiosData: response.data
                    })
                }, 2000)
            })
            .catch(error => {
                console.log(error);
            });
        /*
        */
        const parseQuery = new Parse.Query('task');
        console.log(parseQuery);
        try {
            let tasks = await parseQuery.find();
            console.log(tasks);
            setReadResults(tasks);
            return true;
        }
        catch (error) {
            Alert.alert('Error!', error.message);
            return false;
        }
    }

    async function updateTask(taskId, name, description) {
        let task = new Parse.Object('task');
        task.set('id', taskId);
        task.set('name', name);
        task.set('description', description);
        try {
            await task.save();
            Alert.alert('Success!', 'task updated!');
            readAllTasks();
            return true;
        }
        catch (error) {
            Alert.alert('Error!', error.message);
            return false;
        }
    }

    async function deleteTask(taskId) {
        const task = new Parse.Object('task');
        task.set('id', taskId);
        try {
            await task.destroy();
            Alert.alert('Success!', 'task deleted!');
            readAllTasks();
            return true;
        }
        catch (error) {
            Alert.alert('Error!', error.message);
            return false;
        }
    }

    /*
    useEffect(() => {
        readAllTasks();
    }, [])
    */

    return (
        <>
            <StatusBar styles={styles.statusBar} />
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <TextPaper styles={styles.headerTextBold}>{'ObliGentle'}</TextPaper>
                    <TextPaper styles={styles.headerText}>{'Friendly Calendar App'}</TextPaper>
                </View>
                <View style={styles.flexBetween}>
                    <Title>Tasks</Title>
                    <IconButton styles={styles.iconButton}
                        icon="refresh"
                        onPress={   () => readAllTasks()   }
                        />
                </View>
                <View style={styles.createTaskContainer}>
                    <TextInputPaper styles={styles.createTaskInput}
                        value={ newTaskTitle }
                        onChangeText={   text => setNewTaskTitle(text)   }
                        label="New task"                        
                        mode="outlined"
                        />
                    <ButtonPaper style={styles.createTaskButton}
                        onPress={   () => createTask()   }
                        icon="plus"
                        mode="contained">
                            {'Add'}
                        </ButtonPaper>
                </View>
                <ScrollView>
                    {readResults !== null && readResults !== undefined && readResults.map((task) => (
                        <List.Item style={ styles.taskItem }
                            key={ task.id }
                            title={ task.get('name') } titleStyle={ styles.taskText }
                            right={ props => (
                                <>
                                    <TouchableOpacity onPress={   () => updateTask(task.id, task.name, task.description)   }>
                                        <List.Icon {...props} style={ styles.iconChecked } />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={   () => deleteTask(task.id)   }>
                                        <List.Icon {...props} style={ styles.iconClosed } />
                                    </TouchableOpacity>
                                </>
                            )}
                        />
                    ))}
                </ScrollView>
            </SafeAreaView>
        </>
        
        /*
        <View style={styles.container}>
            {
            fetchedState ? <Text style={styles.loadingtext}>Loading Data...</Text> :
            <SafeAreaView>
                <View>
                    <Text>Name: {task.get('name')}</Text>
                    <Text>Description: {task.get('name')}</Text>
                    <Button title="Add task" onPress={createTask} />
                    <Button title="Fetch task" onPress={readTask} />
                </View>
            </SafeAreaView>
            }
        </View>
        */
    );
};

export default TaskEngine;