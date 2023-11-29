import React, { useState, useEffect } from 'react';
//import React.Component from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Tooltip from '@mui/material/Tooltip';

//local imports

import DataFetcher from '../componets/dataFetcher';

const ChoresScreen = () => {    
    return(
        DataFetcher('chores')
    )
}

export default ChoresScreen;