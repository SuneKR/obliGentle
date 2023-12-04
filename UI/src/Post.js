
// Imports
import React, { useState } from 'react';
import { Button, Text, TextInput, ScrollView, View } from 'react-native';

// Local imports
import styles from '../designs';

// Variables

const baseUrl = "http://127.0.0.1:8000/";

const TaskPost = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const onChangeNameHandler = (name) => {
        setName(name);
    };

    const onChangeDescriptionHandler = (description) => {
        setDescription(description);
    };

    const onSubmitFormHandler = async (event) => {
        if (!name.trim() || !description.trim()) {
            alert("Name or description is invalid");
            return;
        }

        setIsLoading(true);

        try {
            const response = await axios.post(`${ baseURL }/tasks/`, {
                name,
                description
            });

            if (response.status === 201) {
                alert(`You have created: ${ JSON.stringify(response.data) }`);
                setIsLoading(false);
                setName("");
                setDescription("");
            }
            else {
                throw new Error("An error has occurred");
            }
        }
        catch (error) {
            alert("An error has occurred");
            setIsLoading(false);
        }
    };

    return (
        <ScrollView contentContainerStyle={ styles.containerPost }>
            <View>
                <View style={ styles.wrapper }>
                    { isLoading ? (
                        <Text style={ styles.formHeading }> Create ressource </Text>
                    ) : (
                        <Text style={ styles.formHeading }> Create new task </Text>
                    )}
                </View>
                <View style={ styles.wrapper }>
                    <TextInput style={ styles.input }
                        onChangeText={ onChangeNameHandler }
                        value={ name }
                        editable={ !isLoading }
                        placeholder="Name of task"
                        placeholderTextColor='#ffffff'
                    />
                    <TextInput style={ styles.input }
                        onChangeText={ onChangeDescriptionHandler }
                        value={ description }
                        editable={ !isLoading }
                        placeholder="Task description"
                        placeholderTextColor='#ffffff'
                    />
                </View>
                <View>
                    <Button title="submit" onPress={ onSubmitFormHandler } disabled={ isLoading } />
                </View>
            </View>
        </ScrollView>
    
    )
}

export default TaskPost;