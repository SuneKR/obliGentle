// Imports
import React, { useState } from 'react'
import { Button, TextInput, View } from 'react-native';
import Modal from 'react-native-modal';

// Local Import
import { styles } from 'designs';
import  { ClientController } from 'controllers';
import config from 'config';


// Local imports

const AppointmentCreator = () => {   
    const [isModalVisible, setIsModalVisible] = React.useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState(new Date());
    const [isActive, setIsActive] = useState(true);
    const [isActiveText, setIsActiveText] = useState("Active Appointment")

    const appointMaster = new ClientController(config);

    const handleModal = () => setIsModalVisible(() => !isModalVisible);
    const handleIsActive = () => {
        setIsActive(() => !isActive);
        if(!isActive) { setIsActiveText("Inactive Appointment") }
        else { setIsActiveText("Active Appointment") }
    };
    
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
            appointMaster.createAppointment(name, description, isActive)
                .then( () => {
                    setLoading(false);
                    handleModal();
                    setName('');
                    setDescription('');
                    setDueDate('');
                    setIsActive(true);
            })
        }
        catch (err) {
            setLoading(false);
            setError(err);
            console.log(error);
        }            
    };

    return (
        <View style={ styles.container }>
            <Button title="New Appontment" onPress={ handleModal }/>
            <Modal isVisible={ isModalVisible }>
                <View style={ styles.modal }>
                    <TextInput style={ styles.modalTitle } 
                        editable 
                        onChangeText={ text => setName(text) }
                        value={ name }
                        placeholder="New Appontment"
                    />
                    <TextInput style={ styles.modalBody }
                        editable
                        onChangeText={ text => setDescription(text) }
                        value={ description }
                        placeholder="Description of new task"
                    />
                    <TextInput style={ styles.modalBody }
                        editable
                        onChangeText={ text => setDueDate(text) }
                        value={ dueDate }
                        placeholder='Write the appointments due date'
                    />
                    <Button
                        onPress={ () => handleIsActive() }
                        title={ isActiveText }
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

export default AppointmentCreator;