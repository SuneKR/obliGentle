import { Platform, StyleSheet} from 'react-native';
import Constants from 'expo-constants';

const styles = StyleSheet.create({
    buttonMain: {
        backgroundColor: 'red',
        color: 'black',
        borderWidth: 3,
        borderColor: 'black',
        margin: 10
    },
    buttonStyles: {
        backgroundColor: "dodgerblue",
        borderWidth: 2,
        borderColor: "white"
    },
    container: {
        flex: 1,
        backgroundColor: "lightblue",
        alignItems: "center",
        justifyContent: "center",
        marginTop: Platform.OS === "ios" ? 0 : Constants.statusBarHeight
    },
    containerPost: {
        flex: 1,
        backgroundColor: "#252526",
        alignItems: "center",
        justifyContent: "center",
        marginTop: Platform.OS === "ios" ? 0 : Constants.statusBarHeight
    },
    formHeading: {
        color: "#ffffff",
        fontSize: 20
    },
    input: {
        borderWidth: 2,
        borderColor: "grey",
        minWidth: 200,
        textgAlignVertical: "center",
        paddingLeft: 10,
        borderRadius: 20,
        color: "#ffffff"
    },
    modal: {
        backgroundColor: "dodgerblue",
        padding: 10,
        fontSize: 18,
        fontColor: 'white',
        flex: 1
    },
    modalBody: {
        fontSize: 18,
        fontColor: 'white'
    },
    modalSubT: {
        fontSize: 12,
        color: 'white',
        fontStyle: 'italic'
    },
    modalTitle: {
        backgroundColor: "dodgerblue",
        fontSize: 25,
        fontColor: 'white'
    },
    textStyles: {
      fontSize: 20,
      color: "white",
      padding: 10
    },
    wrapper: {
        marginBottom: 10,
    },
    wrapperStyle: {
      minWidth: '50%',
      minHeight: '10%',
      margin: 5
    }
});

export default styles;