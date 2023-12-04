// Import
import React, {useState} from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import Modal from 'react-native-modal';
import axios from 'axios';


// Local Import
import { styles } from '../designs'


const TaskDetail = ({ taskObject }) => {
    const [isModalVisible, setIsModalVisible] = React.useState(false);
    const handleModal = () => setIsModalVisible(() => !isModalVisible);
    const [name, setName] = useState(taskObject.name);
    const [description, setDescription] = useState(taskObject.description);
    const [isLoading, setIsLoading] = useState(false);

    const baseUrl = "http://127.0.0.1:8000";

    const onChangeNameHandler = (name) => {
        setName(name);
    };

    const onChangeDescriptionHandler = (description) => {
        setDescription(description);
    };

    const onUpdateHandler = async (event) => {
        if (!name.trim() || !description.trim()) {
            alert("Name or description is invalid");
            return;
        }

        setIsLoading(true);

        try {
            const response = await axios.put(`${ baseUrl }/tasks/${ taskObject.id }`, {
                name,
                description
            });

            if (response.status === 200) {
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

    const onDeleteHandler = async (event) => {
        setIsLoading(true);

        try {
            const reponse = await axios.delete(`${ baseUrl }/tasks/${ taskObject.id }`);

            if (reponse.status === 204) {
                setIsLoading(false);
                handleModal();
            }
            else { throw new Error("An error had been thrown"); }
        }
        catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    };


    return (
        <View style={ styles.container } key={ `t${ taskObject.id }` }>
            <Button title={ taskObject.name } onPress={ handleModal } />
            <Modal isVisible={ isModalVisible }>
                <View style={ styles.modal }>
                    <TextInput style={ styles.modalTitle } 
                        editable 
                        onChangeText={ onChangeNameHandler } 
                        value={ name }
                    />
                    <Text style={ styles.modalSubT }>{ `${ taskObject.type }: ${ taskObject.id }` }</Text>
                    <Text style={ styles.modalSubT }>{ `First created: ${ taskObject.created }.` }</Text>
                    <Text style={ styles.modalSubT }>{ `Last updated: ${ taskObject.updated }.` }</Text>
                    <TextInput style={ styles.modalBody }
                        editable
                        onChangeText={ onChangeDescriptionHandler }
                        value={ description }
                    />
                    <View style={ { flexDirection: 'row', justifyContent: 'center' } }>
                        <Button title="Close" onPress={ handleModal }/>
                        <Button title="Update" onPress={ onUpdateHandler } disabled={ isLoading }/>
                        <Button title="Detele" onPress={ onDeleteHandler } disabled={ isLoading }/>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

export default TaskDetail;

/*
<TouchableWithoutFeedback onPress={ handleModal }>
</TouchableWithoutFeedback>

<View>
    <Text style={ { fontSize: 25 } }>{ taskObject.name }</Text>
    <Text style={ { fontSize: 20 } }>{ taskObject.type }</Text>
    <Text style={ { fontSize: 20 } }>{ taskObject.description }</Text>
</View>


<View>
            <MenuProvider>
                <Menu>
                    <MenuTrigger text={ taskObject.name }/>
                    <MenuOptions>
                        <MenuOption onSelect={ ()=> alert(`edit name of ${ taskObject.id }`) } text={ taskObject.name }>
                        </MenuOption>
                        <MenuOption onSelect={ ()=> alert(`edit description of ${ taskObject.id }`)}>
                            <Text>{ taskObject.description }</Text>
                        </MenuOption>
                        <MenuOption onSelect={ ()=> alert(`delete ${ taskObject.id }`)} text='Delete' />
                    </MenuOptions>
                </Menu>
            </MenuProvider>
        </View>

(() => alert(
                            `
                                Task ${ taskObject.id } updated
                                from: ${ taskObject.name }: ${ taskObject.description }
                                to: ${ name }: ${ description }
                            `                            
                            ))
        
(() => alert(`delete task ${ taskObject.id }`))
        
*/



