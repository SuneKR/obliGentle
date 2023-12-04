import React, { Component } from 'react';
import { Button, Text, View } from 'react-native';


class AddTaskScreen extends Component {
    render() {
        return (
            <View style={ { flex: 1, alignItems: 'center', justifyContent: 'center' } }>
                <Button
                    title="Go to task list"
                    onPress={ () => this.props.navigation.navigate('TaskScreen') }
                    color="#19AC52"
                />
            </View>
        )
    }
}

export default AddTaskScreen;