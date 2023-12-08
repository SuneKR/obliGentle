import React, { useState, useEffect } from 'react'
import { Button, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';

// Local Import
import { styles } from 'designs';
import  { ClientController } from 'controllers';
import config from 'config';

const TasksScreen = ({ navigation }) => {
    const [isModalVisible, setIsModalVisible] = React.useState(false);
    const [error, setError] = useState({ id: "", name: "", description: ""})
    const [taskDetails, setTaskDetails] = useState({ id: '', name: '', description: ''})
    const [loading, setLoading] = useState(false);
    const [task, setTask] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const TaskMaster = new ClientController(config);

    const handleModal = () => setIsModalVisible(() => !isModalVisible);
    const onChangeIdHandler = (id) => { setId(id) };
    const onChangeNameHandler = (name) => { setName(name); };
    const onChangeDescriptionHandler = (description) => { setDescription(description); };
    
    
    
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

        TaskMaster.createTask(name, description)
            .then( () => {
                setLoading(false)
                handleModal
            })
            .catch( (error) => {
                setLoading(false);
                setError(true);
                console.log(error)
            })
    };

    const onDeleteHandler = async (event) => {
        loading(true)

        try {
            const response = TaskMaster.deleteTask(id)

            if (response.status === 204) {
                loading(false)
                handleModal()
            }
            else { throw new Error("An error had been thrown"); }
        }
        catch (error) {
            console.log(error);
            setLoading(false)
        }
    };

    const onUpdateHandler = async (event) => {
        if (!name.trim() || !description.trim()) {
            alert("Name or description is invalid");
            return;
        }
        loading(true)

        try {
            const response = TaskMaster.updateTask(name, description)

            if (response.status === 200) {
                loading(false)
                handleModal()
            }
            else { throw new Error("An error had been thrown"); }
        }
        catch (error) {
            console.log(error);
            setLoading(false)
        }
    };

    useEffect(() => {
        const fetchTasks = async () => {
            setError(false);
            setLoading(true);
    
        };
        try {

            const response = TaskMaster.getTasks()
                .then ((response) => response.json())
                    .then((data) => console.log(data))
            //console.log(response)
            //console.log(response.data)
            //console.log(response.data.data)
            //console.log(TaskMaster.getTasks())

            if (response.status === 200) {
                setTasks(response.data.data);
                setLoading(false);

                return;
            }
            else { throw new error("Failed to fetch tasks"); }
        }
        catch (error) {
            setError(true);
            setLoading(false);
        }
        fetchTasks();
        setLoading(false);
    }, []);
    

    /*
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

    const onLogin = (event) => {
        console.log(`Login: Email: ${ loginInfo.email } Password: ${ loginInfo.password }`);
        event.preventDefault();
        setError(false);
        setLoading(true)

        if(loginInfo.email.length <= 0 )
        {
            setLoading(false)
            return setError({ email: "Please enter email address" })
        }
        if(loginInfo.password.length <= 0 )
        {
            setLoading(false)
            return setError({ email: "Please enter password" })
        }

        loginer.login(loginInfo.email, loginInfo.password)
            .then( () =>{
                navigation.navigate('TasksScreen')
                console.log("success!")
            })
            .catch( (error) => {
                setLoading(false);
                setError(true);
                console.log(error)
            })
    }

    const onRegister = () => {
        navigation.navigate("RegistrationScreen");
    }

    const onForget = () => {
        navigation.navigate("ForgottenScreen");
    }

    return (
        <View style={ newStyles.container }>
            <StatusBar style="auto"/>

            <View>
                <View style={ newStyles.inputView }>
                    <Text>Login:</Text>
                    <TextInput style={ newStyles.textInput }
                        Type={ "text"}
                        name={ "email" }
                        label={ "Email" }
                        error={ error.email }
                        value={ loginInfo.email }
                        onChange={ (event) => setLoginInfo({ ...loginInfo, email: event.target.value }) }                        
                    />
                    <Text>{ "\n" }</Text>
                </View>
                <View style={ newStyles.inputView }>
                    <Text>Password:</Text>
                    <TextInput style={ newStyles.textInput }
                        Type={ "password"}
                        name={ "password" }
                        label={ "Password" }
                        error={ error.password }
                        value={ loginInfo.password }
                        onChange={ (event) => setLoginInfo({ ...loginInfo, password: event.target.value }) }
                        secureTextEntry={ true }
                        placeholderTextColor="#003f5c"
                    />
                    <Text>{ "\n" }</Text>
                </View>
                <View style={ newStyles.buttonView }>
                    <TouchableOpacity  style={ newStyles.priBtn }
                        loading={ loading }
                        onPress={ (event) => onLogin(event) }
                    >
                        <Text>Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity  style={ newStyles.secBtn }
                        loading={ loading }
                        onPress={ (event) => onRegister(event) }
                    >
                        <Text>Register</Text>
                    </TouchableOpacity>
                    <TouchableOpacity  style={ newStyles.secBtn }
                        loading={ loading }
                        onPress={ (event) => onForget(event) }
                    >
                        <Text>Forgotten Password</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
    */

    const TaskCreator = () => {               
        //<Button title="New Task" onPress={ () => { handleModal; setId(''); setName(''); setDescription('') } }/>
        return (
            <View style={ styles.container }>
                <Button title="New Task" onPress={ handleModal }/>
                <Modal isVisible={ isModalVisible }>
                    <View style={ styles.modal }>
                        <TextInput style={ styles.modalTitle } 
                            editable 
                            onChangeText={ onChangeNameHandler }
                            value={ name }
                            /*
                            
                            value={ taskDetails.name }
                            Type={ "text"}
                            name={ "name" }
                            label={ "name" }
                            error={ error.name }
                            onChangeText={ (event) => setTaskDetails({ ...taskDetails, name: event.target.value }) }
                            */
                            placeholder="New Task"
                        />
                        <TextInput style={ styles.modalBody }
                            editable
                            onChangeText={ onChangeDescriptionHandler }
                            value={ description }
                            /*
                            value={ taskDetails.description }
                            Type={ "text"}
                            name={ "description" }
                            label={ "description" }
                            error={ error.description }
                            onChange={ (event) => setTaskDetails({ ...taskDetails, description: event.target.value }) }
                            */
                            placeholder="Description of new task"
                        />
                        <View style={ { flexDirection: 'row', justifyContent: 'center' } }>
                            <Button title="Close" onPress={ handleModal }/>
                            <Button title="Create" onPress={ onCreateHandler } disabled={ loading }/>
                        </View>
                    </View>
                </Modal>
            </View>
        )
    }

    const TaskDetail = ({ taskObject }) => {
        //setId(taskObject.id), setName(taskObject.name), setDescription(taskObject.description)
        return (
            <View style={ styles.container } key={ `t${ taskObject.id }` }>
                <Button title={ taskObject.name } onPress={ handleModal } />
                <Modal isVisible={ isModalVisible }>
                    <View style={ styles.modal }>
                        <TextInput style={ styles.modalTitle } 
                            editable
                            onChangeText={ onChangeDescriptionHandler }
                            value={ description }
                            /*
                            value={ taskDetails.description }
                            Type={ "text"}
                            name={ "description" }
                            label={ "description" }
                            error={ error.description }
                            onChange={ (event) => setTaskDetails({ ...taskDetails, description: event.target.value }) }
                            */
                        />
                        <Text style={ styles.modalSubT }>{ `${ taskObject.type }: ${ taskObject.id }` }</Text>
                        <Text style={ styles.modalSubT }>{ `First created: ${ taskObject.created }.` }</Text>
                        <Text style={ styles.modalSubT }>{ `Last updated: ${ taskObject.updated }.` }</Text>
                        <TextInput style={ styles.modalBody }
                            editable
                            onChangeText={ onChangeDescriptionHandler }
                            value={ description }
                            /*
                            value={ taskDetails.description }
                            Type={ "text"}
                            name={ "description" }
                            label={ "description" }
                            error={ error.description }
                            onChange={ (event) => setTaskDetails({ ...taskDetails, description: event.target.value }) }
                            */
                        />
                        <View style={ { flexDirection: 'row', justifyContent: 'center' } }>
                            <Button title="Close" onPress={ handleModal }/>
                            <Button title="Update" onPress={ onUpdateHandler } disabled={ loading }/>
                            <Button title="Detele" onPress={ onDeleteHandler } disabled={ loading }/>
                        </View>
                    </View>
                </Modal>
            </View>   
        )
    }

    return(
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
                        { !loading && !error && task && <TaskDetail taskObject={ task } /> }
                        { loading && <Text> Loading </Text> }
                        { !loading && error && <Text> An error has occurred </Text> }
                        </View>
                    )
                }
            </ScrollView>
        </View>
    )



    
}

export default TasksScreen;

/*



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
