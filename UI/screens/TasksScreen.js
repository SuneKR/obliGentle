//import React from 'react'
//import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';

import { DataFetcher } from '../engines';

const TasksScreen = () => {
    return (
        DataFetcher('tasks')
    )
}

export default TasksScreen;