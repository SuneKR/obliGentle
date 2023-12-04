import React, { Component } from 'react';
import { Button, Text, View } from 'react-native';


class TaskScreen extends Component {
    render() {
        return (
            <View style={ { flex: 1, alignItems: 'center', justifyContent: 'center' } }>
                <Button
                    title="Task list"
                    onPress={ () => this.props.navigation.navigate('TaskDetailScreen') }
                    color="#19AC52"
                />
            </View>
        )
    }
}

export default TaskScreen;