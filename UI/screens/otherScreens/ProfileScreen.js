// Import
import React, { useEffect, useState } from 'react';
import { Button, Text, View } from 'react-native';
import 'react-native-gesture-handler';

//Local imports
import { ClientController } from 'controllers';
import config from 'config';
import { styles } from 'designs';

const ProfileScreen = ({ navigation }) => {
    const [username, setUsername] = useState('test');
    
    const ProfileMaster = new ClientController(config);
    
    const greetings = async () => {
        ProfileMaster.fetchUser().then((response) => {
            setUsername(response.email);
            console.log(response.email);
        })
    }

    const logoff = async () => {
        ProfileMaster.logout();
        navigation.navigate("LoginScreen");
    }

    useEffect(() => {
        greetings();
    });

    return (
        <View style={ styles.container }>
            <Text>Welcome { username }</Text>
            <Button title="Logout" onPress={ () => logoff() } />
        </View>
    );
}

export default ProfileScreen;