// Imports
import React, { useState, useEffect } from 'react';
import { Button, ScrollView, View } from 'react-native';

// Local Import
import config from 'config';
import  { ClientController } from 'controllers';
import { loggedIn, TaskCreator, TaskDetail } from 'components';
import { styles } from 'designs';

const TasksScreen = ({ navigation }) => {
    const [error, setError] = useState({ id: "", name: "", description: ""})
    const [loading, setLoading] = useState(false);
    const [tasks, setTasks] = useState([]);

    const TaskMaster = new ClientController(config);

    const fetchAll = async () => {
        setError(false);
        setLoading(true);
    
        try {
            TaskMaster.getTasks().then((response) => {
                setTasks(response);
            })
        }
        catch (err) {
            setError(err);
            setLoading(false);
            console.log(error);
        }
        setLoading(false);
    };

    const fetchFive = async () => {
        setError(false);
        setLoading(true);
    
        try {
            TaskMaster.getTasks().then((response) => {
                const slicedResponse = response.slice(0,5)
                setTasks(slicedResponse);
            })
        }
        catch (err) {
            setError(err);
            setLoading(false);
            console.log(error);
        }
        setLoading(false);
    };

    useEffect(() => {
        setTimeout(() => fetchFive(), 30);
    }, [])

    loggedIn({ navigation }, false);
    
    return(
        <View style={ styles.container }>
            <View style={ { flexDirection: 'row', justifyContent: 'center' } }>
                <Button style={ styles.buttonMain } title="Top 5 Task" onPress={ () => { fetchFive() } } disabled={ loading }></Button>
                    { <TaskCreator /> }
                <Button style={ styles.buttonMain } title="All Task" onPress={ () => { fetchAll() } } disabled={ loading }></Button>
            </View>
            <ScrollView contentContainerStyle={ styles.container }>
                <View style={ styles.wrapperStyle }>
                    {
                        tasks.map(task => <TaskDetail key={ `td${ task._id }` } taskObject={ task }/> )
                    }
                </View>
            </ScrollView>
        </View>
    )
}

export default TasksScreen;