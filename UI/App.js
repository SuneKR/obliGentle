// App.js

// Imports
import React, { useEffect, useState } from 'react';
import { Button, ScrollView, Text, TouchableHighlight, View } from 'react-native';
import axios from 'axios';
import { Modal } from 'react-native-paper';


// Local imports
//import { AddTaskScreen, TaskDetailScreen, TaskScreen } from './screens';
import { styles } from './designs';
import { TaskCreator, TaskDetail } from './models';

// Variables
const baseUrl = "http://127.0.0.1:8000/";

// Functions

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [taskId, setTaskId] = useState("655f46b678209daea31e9047");
  const [task, setTask] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setErrorFlag] = useState(false);

  const changeTaskIdHandler = () => {
    setTaskId((taskId) => (taskId === 3 ? 1 : taskId + 1));
  };

  useEffect(() => {
    const abortController = new AbortController();
    const url = `${ baseUrl }tasks/`;

    const fetchTasks = async () => {
      try {
        setIsLoading(true);

        const response = await axios.get(url, { signal: abortController.signal });

        if (response.status === 200) {
          setTasks(response.data);
          setIsLoading(false);

          return;
        }
        else {
          throw new Error("Failed to fetch tasks");
        }
      }
      catch (error) {
        if (abortController.signal.aborted) {
          console.log("Data fetching cancelled");
        }
        else {
          setErrorFlag(true);
          setIsLoading(false);
        }
      }
    };

    fetchTasks();

    return () => abortController.abort("Data fetching cancelled");
  }, []);
    
  return (
    <View style={ styles.container }>
      <View style={ { flexDirection: 'row', justifyContent: 'center' } }>
        <Button style={ styles.buttonMain } title="Top 5 Task"></Button>
        <TaskCreator />
        <Button style={ styles.buttonMain } title="All Task"></Button>
      </View>
      <ScrollView contentContainerStyle={ styles.container }>
        {
          tasks.map(task =>
            <View style={ styles.wrapperStyle }>
              { !isLoading && !hasError && task && <TaskDetail taskObject={ task } /> }
              { isLoading && <Text> Loading </Text> }
              { !isLoading && hasError && <Text> An error has occurred </Text> }
            </View>
          )
        }
      </ScrollView>
    </View>
  );
}

export default App;

/*
return (
    <ScrollView contentContainerStyle={ styles.container }>
      {
        tasks.map(task =>
          <View style={ styles.wrapperStyle }>
            { !isLoading && !hasError && task && <Task taskObject={ task } /> }
          </View>
          <View style={ styles.wrapperStyle }>
            { isLoading && <Text> Loading </Text> }
            { !isLoading && hasError && <Text> An error has occurred </Text> }
          </View>
          <View>
            <TouchableHighlight style={ styles.buttonStyles }
              onPress={ changeTaskIdHandler }
              disabled={ isLoading }
            >
              <Text style={ styles.textStyles }>Get New Task</Text>
            </TouchableHighlight>
          </View>
        )
      }
    </ScrollView>
  );

  <Button style={ styles.buttonMain } title="Crate new Task"></Button>
*/