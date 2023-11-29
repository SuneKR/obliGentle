import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';

import DataFetcher from '../componets/dataFetcher';

const ProjectsScreen = () => {
    return (
        DataFetcher('projects')
    )
}

export default ProjectsScreen;