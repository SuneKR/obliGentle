import React, { useState } from 'react'
import { Button, Text, TextInput, View } from 'react-native';
import Modal from 'react-native-modal';

// Local Import
import config from 'config';
import  { ClientController } from 'controllers';
import { styles } from 'designs';

const AppointmentDetail = ({ taskObject }) => {
    const [isModalVisible, setIsModalVisible] = React.useState(false);
    const [error, setError] = useState({ id: "", name: "", description: ""})
    const [loading, setLoading] = useState(false);
    const id = taskObject._id;
    const [name, setName] = useState(taskObject.name);
    const [description, setDescription] = useState(taskObject.description);
    const [dueDate, setDueDate] = useState(taskObject.dueDate);
    const [isActive, setIsActive] = useState(taskObject.isActive);
    const [isActiveText, setIsActiveText] = useState("Active Appointment")

    const appointMaster = new ClientController(config);

    const handleModal = () => setIsModalVisible(() => !isModalVisible);
    const handleIsActive = () => {
        setIsActive(() => !isActive);
        if(!isActive) { setIsActiveText("Inactive Appointment") }
        else { setIsActiveText("Active Appointment") }
    };

    const onDeleteHandler = async () => {
        setLoading(true);

        try {
            appointMaster.deleteAppointment(id).then((response) => {
                if (response.status === 200) {
                    setLoading(false);
                    handleModal();
                }
                else { throw new Error("An error had been thrown"); }
            })
        }
        catch (err) {
            setError(err);
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
            appointMaster.updateAppointment(id, name, description, dueDate, isActive).then((response) => {
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
            <Button title={ taskObject.name } onPress={ handleModal }/>
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
                        onChangeText={ text => setDueDate(text) }
                        value={ dueDate }
                    />
                    <Button
                        onPress={ () => handleIsActive() }
                        title={ isActiveText }
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

export default AppointmentDetail;