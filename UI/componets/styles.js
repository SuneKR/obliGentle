import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default StyleSheet.create = ({
    button: {
        alignItems: "center",
        backgroundColor: '#DDDDDD',
        padding: 10,
        marginBottom: 10,
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    loadingtext: {
        fontSize: 28,
        fontWeight: 'bold'
    },
    text: {
        fontSize: 24,
        margin: 10
    }
});