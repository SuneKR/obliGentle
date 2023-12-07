import { StyleSheet } from "react-native";

const newStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        marginBottom: 40,
        width: '60%',
        height: undefined,
        aspectRatio: 4 / 3
    },
    inputView: {
        backgroundColor: '#ffc0cb',
        borderRadius: 30,
        width: '70%',
        height: 45,
        marginBottom: 20,
        alignItems: 'center'
    },
    textInput: {
        width: '80%',
        borderRadius: 25,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 40,
        backgroundColor: '#ff1493'
    },
    forgottenBtn: {
        height: 30,
        marginBottom: 30
    },
    loginBtn: {
        width: '80%',
        borderRadius: 25,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 40,
        backgroundColor: '#ff1493'
    },
    registerBtn: {
        height: 30,
        marginBottom: 30
    }
});

export default newStyles;