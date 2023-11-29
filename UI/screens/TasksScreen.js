import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';

import DataFetcher from '../componets/dataFetcher';

const TasksScreen = () => {
    return (
        DataFetcher('tasks')
    )
}

export default TasksScreen;