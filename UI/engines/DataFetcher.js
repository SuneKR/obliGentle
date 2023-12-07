import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import Tooltip from '@mui/material/Tooltip';

// local imports

import { styles } from '../designs'

const DataFetcher = (URLSpecifier) => {
    const [tasksData,setTasksData] = useState([]);
    const [fetchedState,setFetchedState] = useState(null);

    const url = `http://127.0.0.1:8000/${URLSpecifier}/`;

    async function fetchTasks() {
        try{
            const reponse = await fetch(url, { method: "GET" });
            const tasks = await reponse.json();
            setTasksData(tasks)
        }
        catch(error){   console.log(error);   }
        finally{   setFetchedState(null);   }
    }

    useEffect(() => {
        setFetchedState('loading');
        setTimeout(() => fetchTasks(), 3000);
    }, [])
    
    return (
        <View style={styles.container}>
            {
                fetchedState ? <Text style={styles.loadingtext}>Loading Data...</Text> :
                tasksData.map(_task =>
                    <Tooltip title={`Type: ${_task.type}. Beskrivelse: ${_task.description}`} key={_task.id} arrow>
                        <div>
                            <Text style={styles.text} key={_task.id}>
                                {_task.name}
                            </Text>
                        </div>
                    </Tooltip>
                )
            }
        </View>
    );
}

export default DataFetcher;