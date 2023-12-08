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
        minWidth: '10%',
        maxHeight: '40%',
        aspectRatio: 1 / 1,
        justifyContent: 'center'
    },
    inputView: {
        flex: 1,
        backgroundColor: '#ffc0cb',
        borderRadius: 30,
        width: '90%',
        height: 45,
        alignItems: 'center',
        margin: 10
    },
    buttonView: {
        flex: 1,
        backgroundColor: '#ffc0cb',
        borderRadius: 30,
        width: '90%',
        height: '100%',
        alignItems: 'center',
    },
    textInput: {
        width: '80%',
        borderRadius: 25,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        backgroundColor: '#ff1493'
    },
    forgottenBtn: {
        height: 30,
        marginBottom: 30
    },
    priBtn: {
        width: '90%',
        borderRadius: 25,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
        backgroundColor: '#ff1493'
    },
    secBtn: {
        width: '70%',
        borderRadius: 25,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ff1493',
        marginHorizontal: 10,
        marginVertical: 5
    },
    registerBtn: {
        height: 30,
        marginBottom: 30
    }
});

export default newStyles;