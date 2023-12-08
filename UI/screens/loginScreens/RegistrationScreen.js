
// Imports
import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';

// Local imports
import { newStyles } from 'designs';
import { ClientController } from 'controllers';
import config from 'config';

const RegistrationScreen = ({ navigation }) => {
    const [error, setError] = useState({ email: "", password: ""})
    const [registration, setRegistration] = useState({ email: '', password: ''})
    const [loading, setLoading] = useState(false);

    const registrationClient = new ClientController(config);

    const onRegister = (event) => {
        event.preventDefault();
        setError(false);
        setLoading(true);

        if(registration.email.length <= 0 )
        {
            setLoading(false);
            return setError({ email: "Please enter email address" });
        }
        if(registration.password.length <= 0 )
        {
            setLoading(false);
            return setError({ email: "Please enter password" });
        }

        registrationClient.register(registration.email, registration.password)
            .then( () =>{
                navigation.navigate('LoginScreen')
                console.log("success!");
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


    return (
        <View style={ newStyles.container }>
            <StatusBar style="auto"/>

            <View>
                <View style={ newStyles.inputView }>
                    <Text>Login:</Text>
                    <TextInput style={ newStyles.textInput }
                        Type={ "text"}
                        name={ "email" }
                        label={ "Email" }
                        error={ error.email }
                        value={ registration.email }
                        onChange={ (event) => setRegistration({ ...registration, email: event.target.value }) }                        
                    />
                    <Text>{ "\n" }</Text>
                </View>
                <View style={ newStyles.inputView }>
                    <Text>Password:</Text>
                    <TextInput style={ newStyles.textInput }
                        Type={ "password"}
                        name={ "password" }
                        label={ "Password" }
                        error={ error.password }
                        value={ registration.password }
                        onChange={ (event) => setRegistration({ ...registration, password: event.target.value }) }
                        secureTextEntry={ true }
                        placeholderTextColor="#003f5c"
                    />
                    <Text>{ "\n" }</Text>
                </View>
                <View style={ newStyles.buttonView }>
                    <TouchableOpacity  style={ newStyles.priBtn }
                        loading={ loading }
                        onPress={ (event) => onRegister(event) }
                    >
                        <Text>Register</Text>
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

export default RegistrationScreen;