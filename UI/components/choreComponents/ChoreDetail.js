import React, { useState } from 'react'
import { Button, Text, TextInput, View } from 'react-native';
import Modal from 'react-native-modal';

// Local Import
import  { ClientController } from 'controllers';
import config from 'config';
import { styles } from 'designs';

const ChoreDetail = ({ taskObject }) => {
    const [isModalVisible, setIsModalVisible] = React.useState(false);
    const [error, setError] = useState({ id: "", name: "", description: ""})
    const [loading, setLoading] = useState(false);
    const id = taskObject._id;
    const [name, setName] = useState(taskObject.name);
    const [description, setDescription] = useState(taskObject.description);
    const [priority, setPriority] = React.useState(taskObject.priority);
    const [interval, setInterval] = useState(taskObject.interval);

    const choreMaster = new ClientController(config);

    const handleModal = () => setIsModalVisible(() => !isModalVisible);

    const onDeleteHandler = async () => {
        setLoading(true);
        try {
            choreMaster.deleteChore(id).then((response) => {
                if (response.status === 200) {
                    loading(false);
                    handleModal();
                }
                else { throw new Error("An error had been thrown"); }
            })
        }
        catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    const onUpdateHandler = async () => {
        if (!name.trim() || !description.trim()) {
            alert("Name or description is invalid");
            return;
        }
        setLoading(true)

        try {
            choreMaster.updateChore(id, name, description, priority, interval).then((response) => {
                if (response.status === 200) {
                    setLoading(false);
                    handleModal();
                }
                else { throw new Error("An error had been thrown"); }
            })
        }
        catch (err) {
            setError(err);
            setLoading(false);
            console.log(error);
        }
    };

    return (
        <View style={ styles.container }>
            <Button title={ taskObject.name } onPress={ () => handleModal() }/>
            <Modal isVisible={ isModalVisible }>
                <View style={ styles.modal }>
                    <TextInput style={ styles.modalTitle } 
                        editable
                        onChangeText={ text => setName(text) }
                        value={ name }
                    />
                    <Text style={ styles.modalSubT }>{ `${ taskObject.type }: ${ id }` }</Text>
                    <Text style={ styles.modalSubT }>{ `First created: ${ taskObject.created }.` }</Text>
                    <Text style={ styles.modalSubT }>{ `Last updated: ${ taskObject.updated }.` }</Text>
                    <TextInput style={ styles.modalBody }
                        editable
                        onChangeText={ text => setDescription(text) }
                        value={ description }
                    />
                    <TextInput style={ styles.modalBody }
                        editable
                        onChangeText={ num => setPriority(num) }
                        value={ priority }
                    />
                    <TextInput style={ styles.modalBody }
                        editable
                        onChangeText={ text => setInterval(text) }
                        value={ interval }
                    />
                    <View style={ { flexDirection: 'row', justifyContent: 'center' } }>
                        <Button title="Close" onPress={ () => handleModal() }/>
                        <Button title="Update" onPress={ () => onUpdateHandler() } disabled={ loading }/>
                        <Button title="Detele" onPress={ () => onDeleteHandler() } disabled={ loading }/>
                    </View>
                </View>
            </Modal>
        </View>   
    )
}

export default ChoreDetail;