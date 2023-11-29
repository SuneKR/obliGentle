import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';

import DataFetcher from '../componets/dataFetcher';

const AppointmentsScreen = () => {
    return (
        DataFetcher('appointments')
    )
}

export default AppointmentsScreen;