/* eslint-disable react/prop-types */
// Imports
import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';

// Local imprts
import { newStyles } from 'designs';
import { ClientController } from 'controllers';
import config from 'config';


const LoginScreen = ({ navigation }) => {
    const [error, setError] = useState({ email: "", password: ""})
    const [loginInfo, setLoginInfo] = useState({ email: '', password: ''})
    const [loading, setLoading] = useState(false);

    const loginer = new ClientController(config);

    const onLogin = (event) => {
        event.preventDefault();
        setError(false);
        setLoading(true)

        if(loginInfo.email.length <= 0 )
        {
            setLoading(false)
            return setError({ email: "Please enter email address" })
        }
        if(loginInfo.password.length <= 0 )
        {
            setLoading(false)
            return setError({ email: "Please enter password" })
        }

        loginer.login(loginInfo.email, loginInfo.password)
            .then( () =>{
                navigation.navigate('TasksScreen')
            })
            .catch( (error) => {
                setLoading(false);
                setError(true);
                console.log(error)
            })
    }

    const onRegister = () => {
        navigation.navigate("RegistrationScreen");
    }

    const onForget = () => {
        navigation.navigate("ForgottenScreen");
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
                        value={ loginInfo.email }
                        onChange={ (event) => setLoginInfo({ ...loginInfo, email: event.target.value }) }                        
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
                        value={ loginInfo.password }
                        onChange={ (event) => setLoginInfo({ ...loginInfo, password: event.target.value }) }
                        secureTextEntry={ true }
                        placeholderTextColor="#003f5c"
                    />
                    <Text>{ "\n" }</Text>
                </View>
                <View style={ newStyles.buttonView }>
                    <TouchableOpacity  style={ newStyles.priBtn }
                        loading={ loading }
                        onPress={ (event) => onLogin(event) }
                    >
                        <Text>Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity  style={ newStyles.secBtn }
                        loading={ loading }
                        onPress={ (event) => onRegister(event) }
                    >
                        <Text>Register</Text>
                    </TouchableOpacity>
                    <TouchableOpacity  style={ newStyles.secBtn }
                        loading={ loading }
                        onPress={ (event) => onForget(event) }
                    >
                        <Text>Forgotten Password</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default LoginScreen;