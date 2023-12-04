// Import
import React, {useState} from 'react';
import { Button, TextInput, View } from 'react-native';
import Modal from 'react-native-modal';
import axios from 'axios';


// Local Import
import { styles } from '../designs'

const TaskCreator = () => {
    const [isModalVisible, setIsModalVisible] = React.useState(false);
    const handleModal = () => setIsModalVisible(() => !isModalVisible);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const baseUrl = "http://127.0.0.1:8000";

    const onChangeNameHandler = (name) => {
        setName(name);
    };

    const onChangeDescriptionHandler = (description) => {
        setDescription(description);
    };

    const onCreateHandler = async (event) => {
    
        setIsLoading(true);
    
        try {
            const response = await axios.post(`${ baseUrl }/tasks/`, {
                name,
                description
            });


    
            if (response.status === 201) {
                setIsLoading(false);
                handleModal();
            }
            else { throw new Error("An error had been thrown"); }
        }
        catch (error) {
            console.log(error);
            alert("An error was catched");
            setIsLoading(false);
        }
    };

    return (
        <View style={ styles.container }>
            <Button title="New Task" onPress={ handleModal } />
            <Modal isVisible={ isModalVisible }>
                <View style={ styles.modal }>
                    <TextInput style={ styles.modalTitle } 
                        editable 
                        onChangeText={ onChangeNameHandler } 
                        value={ name }
                        placeholder="New Task"
                    />
                    <TextInput style={ styles.modalBody }
                        editable
                        onChangeText={ onChangeDescriptionHandler }
                        value={ description }
                        placeholder="Description of new task"
                    />
                    <View style={ { flexDirection: 'row', justifyContent: 'center' } }>
                        <Button title="Close" onPress={ handleModal }/>
                        <Button title="Create" onPress={ onCreateHandler } disabled={ isLoading }/>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default TaskCreator;