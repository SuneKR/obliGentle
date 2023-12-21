// Imports
import React, { useState } from 'react'
import { Button, TextInput, View } from 'react-native';
import Modal from 'react-native-modal';

// Local Import
import { styles } from 'designs';
import  { ClientController } from 'controllers';
import config from 'config';


// Local imports

const TaskCreator = () => {   
    const [isModalVisible, setIsModalVisible] = React.useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const TaskMaster = new ClientController(config);

    const handleModal = () => setIsModalVisible(() => !isModalVisible); 
    
    const onCreateHandler = async (event) => {
        setError(false);
        setLoading(true);
        event.preventDefault();

        if (name <= 0 ) {
            setLoading(false);
            return setError({ name: "please enter name" })
        }
        if (description <= 0 ) {
            setLoading(false);
            return setError({ name: "please enter name" })
        }

        try {
            TaskMaster.createTask(name, description)
                .then( () => {
                    setLoading(false);
                    handleModal();
                    setName('');
                    setDescription('');
            })
        }
        catch (err) {
            setLoading(false);
            setError(err);
            console.log(error)
        }            
    };


    return (
        <View style={ styles.container }>
            <Button title="New Task" onPress={ handleModal }/>
            <Modal isVisible={ isModalVisible }>
                <View style={ styles.modal }>
                    <TextInput style={ styles.modalTitle } 
                        editable 
                        onChangeText={ text => setName(text) }
                        value={ name }
                        placeholder="New Task"
                    />
                    <TextInput style={ styles.modalBody }
                        editable
                        onChangeText={ text => setDescription(text) }
                        value={ description }
                        placeholder="Description of new task"
                    />
                    <View style={ { flexDirection: 'row', justifyContent: 'center' } }>
                        <Button title="Close" onPress={ () => handleModal() }/>
                        <Button title="Create" onPress={ () => onCreateHandler() } disabled={ loading }/>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

export default TaskCreator;