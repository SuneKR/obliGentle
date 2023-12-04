import React, { Component } from 'react';
import { Button, Text, View } from 'react-native';


class TaskDetailScreen extends Component {
    render() {
        return (
            <View style={ { flex: 1, alignItems: 'center', justifyContent: 'center' } }>
                <Button
                    title="Task list"
                    onPress={ () => this.props.navigation.navigate('EditTaskScreen') }
                    color="#19AC52"
                />
            </View>
        )
    }
}

export default TaskDetailScreen;