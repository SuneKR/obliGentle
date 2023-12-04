//import React, { useState, useEffect } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
//import { Text, View, StyleSheet } from 'react-native';


const { width } = Dimensions.get('window')

const styles = StyleSheet.create({
    actionText: {
        color: '#fff',
        fontWeight: '600',
        padding: 20
    },
    activityIndicatorContainer: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    button: {
        alignItems: "center",
        backgroundColor: '#DDDDDD',
        padding: 10,
        marginBottom: 10
    },
    ButtonNew: {
        width: 80,
        height: 44,
        borderRAdius: 8,
        justifyContent: "center",
        alignItems: 'center',
        backgroundColor: "#6B9EFA"
    },
    ButtonText: {
        fontFamily: 'HelveticaNeue-Medium',
        fontSize: 16
    },
    buttonContainer: {
        height: 70,
        flexDirection: "row",
        padding: 12,
        backgroundColor: "white"
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10
    },
    count: {
        fontFamily: 'HelveticaNeue-Medium',
        fontSize: 17,
        color: "#6B9EFA"
    },
    createTaskButton: {
        marginTop: 6,
        MmarginLeft: 15,
        height: 40
    },
    createTaskContainer: {
        flexDirection: 'row'
    },
    createTaskInput: {
        flex: 1,
        height: 38,
        marginBottom: 16,
        BackgroundColor: '#fff',
        fontSize: 14
    },
    description: {
        marginTop: 25,
        marginBottom: 10,
        fontFamily: 'HelveticaNeue-Medium',
        fontSize: 15,
        color: '#FFF',
        textAlign: "right"
    },
    deleteAction: {
        backgroundColor: '#dd2c00'
    },
    editAction: {
        backgroundColor: '#497AFC'
    },
    flex: {
        flex: 1
    },
    flexBetween: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    floatingButton:{
        backgroundColor: '#6B9EFA',
        borderColor: '#6B9EFA',
        height: 55,
        width: 55,
        borderRadius: 55 /2,
        alignItems: 'center',
        position: 'absolute',
        bottom: 60,
        right: 15,
        shadowColor: "#000000",
        shadowOpacity: 0.5,
        shadowRadius: 2,
        shadowOffset: {
            height: 1,
            width: 0
        }
    },
    header: {
        alignItems: 'center',
        Backgroundcolor: '#208AEC',
        paddingTop: 10,
        paddingBottom: 20
    },
    headerLogo: {
        width: 170,
        height: 40,
        marginBottom: 10,
        resize: 'contain'
    },
    headerText: {
        marginTop: 3,
        color: '#fff',
        fontSize: 14
    },
    headerTextBold: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold'
    },
    iconChecked: {
        color: '#4CAF50',
        icon: "check"
    },
    iconClosed: {
        color: '#EF5350',
        icon: "close"
    },
    iconButton: {
        color: '#208AEC',
        size: 24
    },
    listItemsButtons: {
        width: 190,
        flexDirection: 'row'
    },
    loadingtext: {
        fontSize: 28,
        fontWeight: 'bold'
    },
    mainContainer: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 25,
        backgroundColor: '#182028',
        borderRadius: 25,
        marginHorizontal: width*0.1
    },
    mainItemContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
        borderRAdius: 1,
        borderColor: "#333B42"
    },
    rightAction: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        width: 95
    },
    row: {
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: "#ccc",
        backgroundColor: '#FFF',
        padding: 10
    },
    statusBar: {
        backgroundColor: "#208AEC"
    },
    task: {
        marginTop: 5,
        fontFamily: 'HelveticaNeue-Medium',
        fontSize: 17,
        lineHeight: 21,
        color: '#FFF'
    },
    taskItem: {
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0, 0, 0, 0.12'
    },
    taskText: {
        fontSize: 15
    },
    text: {
        fontSize: 24,
        margin: 10
    },
    wrapper: {
        width: '90%',
        alignSelf: 'center'
    }
});

export default styles;