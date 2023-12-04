// imports

import React, { useState, useEffect } from 'react';
import { ActivityIndicator, AsyncStorage, FlatList, SafeAreaView, Text, TouchableHighlight, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';



// local imports
import { createTask, deleteTask } from '../actions';
import { ListItem } from '../components';
//import { FlatList } from 'react-native-gesture-handler';
import styles from '../designs'


const InterfaceEngine = (props) => {
    const dispatch = useDispatch();
    const { navigation } = props;

    const [ isFetching, setIsFetching ] = useState(false);

    const dataReducer = useSelector((state) => state.dataReducer);
    const { tasks } = dataReducer;

    useEffect(() => getData(), []);

    let url = "http://127.0.0.1:8000/tasks/";

    const getData = () => {
        setIsFetching(true);

        axios.get(url)
            .then(response => response.data)
            .then((data) => dispatch(createTask(data)))
            .catch(error => alert(error.mesasge))
            .finally(() => setIsFetching(false));
    };

    const renderItem = ({ item, index }) => {
        return (
            <ListItem item={ item } index={ index } navigation={ navigation } onDelete={ onDelete(item.id) } onEdit={ onEdit(item) } />
        )
    };

    const onEdit = (item) => {
        navigation.navigate('NewTask', { task: item, name: "edit task" })
    };

    const onDelete = (id) => {
        axios.delete(url, { data:{ id:id } })
            .then((response) => dispatch(deleteTask(id)))
            .catch(error => alert(error.message))
            .finally(() => setIsFetching(false));
    };

    if (isFetching) {
        return (
            <View style={ styles.ActivityIndicator }>
                <ActivityIndicator animating={ true }/>
            </View>
        );
    } else{
        return (
            <SafeAreaView style={ styles.container }>
                <FlatList data={ tasks } renderItem={ renderItem } keyExtractor={ (item, index) => `tasks_${index}` }/>
            
                <TouchableHighlight style={ styles.floatingButton }
                    underlayColor='#ff7043'
                    onPress={ () => navigation.navigate('NewTask', { title: "New Task" }) }
                    >
                    <Text style={ { fontSize: 25, color: 'white' } }>+</Text>
                </TouchableHighlight>
            </SafeAreaView>
        );
    }
};

export default InterfaceEngine;