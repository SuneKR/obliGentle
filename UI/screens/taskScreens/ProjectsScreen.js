// Imports
import React, { useEffect, useState } from 'react';
import { Button, ScrollView, View } from 'react-native';

// Local Import
import config from 'config';
import  { ClientController } from 'controllers';
import { ProjectCreator, ProjectDetail, loggedIn } from 'components';
import { styles } from 'designs';


const ProjectsScreen = ({ navigation }) => {
    const [error, setError] = useState({ id: "", name: "", description: ""})
    const [loading, setLoading] = useState(false);
    const [projects, setProjects] = useState([]);

    const projectMaster = new ClientController(config);

    const fetchAll = async () => {
        setError(false);
        setLoading(true);
    
        try {
            projectMaster.getProjects().then((response) => {
                setProjects(response);
            })
        }
        catch (err) {
            setError(err);
            setLoading(false);
            console.log(error);
        }
        setLoading(false);
    };

    const fetchFive = async () => {
        setError(false);
        setLoading(true);
    
        try {
            projectMaster.getProjects().then((response) => {
                const slicedResponse = response.slice(0,5)
                setProjects(slicedResponse);
            })
        }
        catch (err) {
            setError(err);
            setLoading(false);
            console.log(error);
        }
        setLoading(false);
    };


    useEffect(() => {
        setTimeout(() => fetchFive(), 30);
    }, [])

    loggedIn({ navigation }, true);
    
    return(
        <View style={ styles.container }>
            <View style={ { flexDirection: 'row', justifyContent: 'center' } }>
                <Button style={ styles.buttonMain } title="Top 5 Projects" onPress={ () => { fetchFive() } } disabled={ loading }></Button>
                    { <ProjectCreator /> }
                <Button style={ styles.buttonMain } title="All Projects" onPress={ () => { fetchAll() } } disabled={ loading }></Button>
            </View>
            <ScrollView contentContainerStyle={ styles.container }>
                <View style={ styles.wrapperStyle }>
                    {
                        projects.map(task => <ProjectDetail key={ `td${ task._id }` } taskObject={ task }/> )
                    }
                </View>
            </ScrollView>
        </View>
    )
}

export default ProjectsScreen;