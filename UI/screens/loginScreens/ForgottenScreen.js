
// Imports
import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';

// Local imports
import { newStyles } from 'designs';
import { ClientController } from 'controllers';
import config from 'config';


const ForgottenScreen = ({ navigation }) => {
    const [error, setError] = useState("")
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const forgotPasswordClient = new ClientController(config);

    const onforgotten = (event) => {
        event.preventDefault();
        setError(false);
        setLoading(true);

        if(email.length <= 0 )
        {
            setLoading(false);
            return setError({ email: "Please enter email address" });
        }

        forgotPasswordClient.forgottenPassword(email)
            .then( () =>{
                navigation.navigate('LoginScreen')
            })
            .catch( (error) => {
                setLoading(false);
                setError(true);
                console.log(error)
            })
    }

    const onBack = () => {
        navigation.navigate("LoginScreen")
    }

    const onEmailChangeHandler = (email) => {
        setEmail(email);
    }


    return (
        <View style={ newStyles.container }>
            <StatusBar style="auto"/>

            <View>
                <View style={ newStyles.inputView }>
                    <Text>Email:</Text>
                    <TextInput style={ newStyles.textInput }
                        Type={ "text"}
                        name={ "email" }
                        label={ "Email" }
                        error={ error }
                        value={ email }
                        onChangeText={ onEmailChangeHandler }                        
                    />
                    <Text>{ "\n" }</Text>
                </View>
                <View style={ newStyles.buttonView }>
                    <TouchableOpacity  style={ newStyles.priBtn }
                        loading={ loading }
                        onPress={ (event) => onforgotten(event) }
                    >
                        <Text>Request new password</Text>
                    </TouchableOpacity>
                    <TouchableOpacity  style={ newStyles.secBtn }
                        loading={ loading }
                        onPress={ (event) => onBack(event) }
                    >
                        <Text>Back to Login</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default ForgottenScreen;