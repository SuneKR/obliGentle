import React from 'react'
import { Text, View } from 'react-native';
import 'react-native-gesture-handler';

import styles from '../designs';

class ProfileScreen extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>Go home!</Text>
            </View>
        );
    }
}

export default ProfileScreen;