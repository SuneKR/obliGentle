// Imports
import React, { useEffect, useState } from 'react';
import { Button, ScrollView, View } from 'react-native';

// Local Import
import config from 'config';
import  { ClientController } from 'controllers';
import { AppointmentCreator, AppointmentDetail, loggedIn } from 'components';
import { styles } from 'designs';

const AppointmentsScreen = ({ navigation }) => {
    const [error, setError] = useState({ id: "", name: "", description: ""})
    const [loading, setLoading] = useState(false);
    const [appointments, setappointments] = useState([]);

    const appointMaster = new ClientController(config);

    const fetchAll = async () => {
        setError(false);
        setLoading(true);
    
        try {
            appointMaster.getAppointments().then((response) => {
                setappointments(response);
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
            appointMaster.getAppointments().then((response) => {
                const slicedResponse = response.slice(0,5)
                setappointments(slicedResponse);
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
                <Button style={ styles.buttonMain } title="Top 5 Appointments" onPress={ () => { fetchFive() } } disabled={ loading }></Button>
                    { <AppointmentCreator /> }
                <Button style={ styles.buttonMain } title="All Appointments" onPress={ () => { fetchAll() } } disabled={ loading }></Button>
            </View>
            <ScrollView contentContainerStyle={ styles.container }>
                <View style={ styles.wrapperStyle }>
                    {
                        appointments.map(task => <AppointmentDetail key={ `td${ task._id }` } taskObject={ task }/> )
                    }
                </View>
            </ScrollView>
        </View>
    )
}

export default AppointmentsScreen;