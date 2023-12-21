// Imports
import React, { useEffect, useState } from 'react';
import { Button, ScrollView, View } from 'react-native';

// Local Import
import config from 'config';
import  { ClientController } from 'controllers';
import { ChoreCreator, ChoreDetail, loggedIn } from 'components';
import { styles } from 'designs';

const ChoresScreen = ({ navigation }) => {      
    const [error, setError] = useState({ id: "", name: "", description: ""})
    const [loading, setLoading] = useState(false);
    const [chores, setChores] = useState([]);

    const choreMaster = new ClientController(config);

    const fetchAll = async () => {
        setError(false);
        setLoading(true);
    
        try {
            choreMaster.getChores().then((response) => {
                setChores(response);
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
            choreMaster.getChores().then((response) => {
                const slicedResponse = response.slice(0,5)
                setChores(slicedResponse);
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
                <Button style={ styles.buttonMain } title="Top 5 Chores" onPress={ () => { fetchFive() } } disabled={ loading }></Button>
                    { <ChoreCreator /> }
                <Button style={ styles.buttonMain } title="All Chores" onPress={ () => { fetchAll() } } disabled={ loading }></Button>
            </View>
            <ScrollView contentContainerStyle={ styles.container }>
                <View style={ styles.wrapperStyle }>
                    {
                        chores.map(task => <ChoreDetail key={ `td${ task._id }` } taskObject={ task }/> )
                    }
                </View>
            </ScrollView>
        </View>
    )
}

export default ChoresScreen;