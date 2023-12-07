
// Imports
import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Form, useNavigate } from 'react-router-dom';

// Local imprts
import { newStyles } from 'designs';
import { ClientController } from 'controllers';
import config from '../../config';
import { FormInput } from 'components';




const LoginScreen = ({ navigation }) => {
    //const [username, setUsername] = useState("");
    //const [email, setEmail] = useState("");
    //const [password, setPassword] = useState("");
    const [error, setError] = useState({ email: "", password: ""})
    const [loginForm, setLoginForm] = useState({ email: '', password: ''})
    const [loading, setLoading] = useState(false);

    //const navigate = useNavigate();

    const loginer = new ClientController(config);

    const onLogin = (event) => {
        console.log(`Login: Email: ${ loginForm.email } Password: ${ loginForm.password }`);
        event.preventDefault();
        setError(false);
        setLoading(true)

        if(loginForm.email.length <= 0 )
        {
            setLoading(false)
            return setError({ email: "Please enter email address" })
        }
        if(loginForm.password.length <= 0 )
        {
            setLoading(false)
            return setError({ email: "Please enter password" })
        }

        loginer.login(loginForm.email, loginForm.password)
            .then( () =>{
                //navigate('/tasks')
                console.log("success!")
            })
            .catch( (error) => {
                setLoading(false);
                setError(true);
                console.log(error)
            })

    }

    return (
        <View style={ newStyles.container }>
            <Image style={ newStyles.image } source={ require('../../assets/aarhusTechLogo.png') } />

            <StatusBar style="auto"/>

            <form onSubmit={ (event) => onLogin(event) }>
                <View style={ newStyles.inputView }>
                    <FormInput style={ newStyles.inputView }
                        Type={ "text"}
                        name={ "email" }
                        label={ "Email" }
                        error={ error.email }
                        value={ loginForm.email }
                        onChange={ (event) => setLoginForm({ ...loginForm, email: event.target.value }) }                        
                    />
                </View>
                <View style={ newStyles.inputView }>
                    <FormInput style={ newStyles.textInput }
                        Type={ "password"}
                        name={ "password" }
                        label={ "Password" }
                        error={ error.password }
                        value={ loginForm.password }
                        onChange={ (event) => setLoginForm({ ...loginForm, password: event.target.value }) }
                        secureText={ true }
                        placeholder="Password"
                        placeholderTextColor="#003f5c"
                    />
                    <Button style={ newStyles.loginText}
                        title={ "Login" }
                        loading={ loading }
                        error={ error.password }
                        onPress={ (event) => onLogin(event) }
                        />
                </View>
            </form>

            <View>
                <Text>Options:</Text>
            </View>

            <View style={ { flexDirection: 'row', justifyContent: 'center' } }>
                <Button style={ newStyles.registerBtn }
                    onPress={ () => navigation.navigate('RegistrationScreen') }
                    title="Registration"
                />
                <Button style={ newStyles.forgottenBtn }
                    onPress={ () => navigation.navigate('ForgottenScreen') }
                    title="Forgot Password?"
                />
                
                    
                
            </View>
        </View>
    )
}

export default LoginScreen;

/*
onSubmitEditing={ ()=> this.passwordInput.focus() }
ref={ (input) => this.passwordInput = input }

*/