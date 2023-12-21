// Imports
import React, { useState } from 'react'
import { Button, TextInput, View } from 'react-native';
import Modal from 'react-native-modal';

// Local Import
import { styles } from 'designs';
import  { ClientController } from 'controllers';
import config from 'config';


// Local imports

const ChoreCreator = () => {   
    const [isModalVisible, setIsModalVisible] = React.useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState(0);
    const [interval, setInterval] = useState(14);

    const choreMaster = new ClientController(config);

    const handleModal = () => setIsModalVisible(() => !isModalVisible); 
    
    const onCreateHandler = async () => {
        setError(false);
        setLoading(true);

        if (name <= 0 ) {
            setLoading(false);
            return setError({ name: "please enter name" })
        }
        if (description <= 0 ) {
            setLoading(false);
            return setError({ name: "please enter name" })
        }

        try {
            choreMaster.createChore(name, description, priority, interval)
                .then( () => {
                    setLoading(false);
                    handleModal();
                    setName('');
                    setDescription('');
                    setPriority(0);
                    setInterval(14);
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
            <Button title="New Chore" onPress={ handleModal }/>
            <Modal isVisible={ isModalVisible }>
                <View style={ styles.modal }>
                    <TextInput style={ styles.modalTitle } 
                        editable 
                        onChangeText={ text => setName(text) }
                        value={ name }
                        placeholder="New Chore"
                    />
                    <TextInput style={ styles.modalBody }
                        editable
                        onChangeText={ text => setDescription(text) }
                        value={ description }
                        placeholder="Description of new task"
                    />
                    <TextInput style={ styles.modalBody }
                        editable
                        onChangeText={ text => setPriority(text) }
                        value={ priority }
                    />
                    <TextInput style={ styles.modalBody }
                        editable
                        onChangeText={ text => setInterval(text) }
                        value={ interval }
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

export default ChoreCreator;