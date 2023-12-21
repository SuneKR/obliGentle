// Imports
import React, { useState } from 'react'
import { Button, Text, TextInput, View } from 'react-native';
import Modal from 'react-native-modal';

// Local Import
import { styles } from 'designs';
import  { ClientController } from 'controllers';
import config from 'config';

const ProjectCreator = () => {   
    const [isModalVisible, setIsModalVisible] = React.useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [progress, setProgress] = useState(0);
    const [isActive, setIsActive] = useState(true);
    const [isActiveText, setIsActiveText] = useState("Active Project")

    const projectMaster = new ClientController(config);

    const handleModal = () => setIsModalVisible(() => !isModalVisible); 
    const handleIsActive = () => {
        setIsActive(() => !isActive);
        if(!isActive) { setIsActiveText("Inactive Project") }
        else { setIsActiveText("Active Project") }
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
            projectMaster.createProject(name, description, progress, isActive)
                .then( () => {
                    setLoading(false);
                    handleModal();
                    setName('');
                    setDescription('');
                    setProgress(0);
                    setIsActive(true);
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
            <Button title="New Project" onPress={ handleModal }/>
            <Modal isVisible={ isModalVisible }>
                <View style={ styles.modal }>
                    <TextInput style={ styles.modalTitle } 
                        editable 
                        onChangeText={ text => setName(text) }
                        value={ name }
                        placeholder="New Project"
                    />
                    <TextInput style={ styles.modalBody }
                        editable
                        onChangeText={ text => setDescription(text) }
                        value={ description }
                        placeholder="Description of new Project"
                    />
                    <View style={ { flexDirection: 'row', justifyContent: 'left' } }>
                        <Text>progress: </Text>
                        <TextInput style={ styles.modalBody }
                            editable
                            onChangeText={ text => setProgress(text) }
                            value={ progress }
                        />
                    </View>
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

export default ProjectCreator;