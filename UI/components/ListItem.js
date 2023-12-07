
//import

import React, { useRef } from 'react';
import { Animated, Text, View } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';

// local import

import { styles } from '../designs';

let colours = ["#ff8e42", "#4F6384"];

const ListItem = ({ item, index, navigation, onDelete, onEdit }) => {
    const inputEl = useRef(null);

    const RightActions = ({ progress, dragX, onPress, item}) => {
        const scale = dragX.interpolate({
            inputRange: [-100, 0],
            outputRange: [1, 0],
            extrapolate: 'clamp'
        });
        return (
            <View style={ styles.listItemsButtons }>
                <RectButton onPress={ () =>  {
                    inputEl.current.close();
                    onEdit(item);
                }}>
                    <View style={ [styles.rightAction, styles.editAction] }>
                        <Animated.Text style={ [styles.actionText, { transform: [{ scale }] }] }>
                            Edit
                        </Animated.Text>
                    </View>
                </RectButton>
                <RectButton onPress={ () => {
                    inputEl.current.close();
                    onDelete(item.id)
                }}>
                    <View style={ [styles.rightAction, styles.deleteAction] }>
                        <Animated.Text style={ [styles.actionText, { transform: [{ scale }] }] }>
                            Delete
                        </Animated.Text>
                    </View>
                </RectButton>
            </View>
        );
    };

    //Returns a colour based on the index
    function random() {
        if (index % 2 === 0) { //check if its an even number
            return colours[0];
        }else{
            return colours[1];
        }
    }

    return (
        <Swipeable  ref={inputEl}
            renderRightActions={(progress, dragX) => (
                <RightActions progress={ progress } dragX={ dragX } item={ item }/>
            )}>
            <View style={ styles.row }>
                <View style={ [styles.container, { backgroundColor: random() }] }>
                    <Text style={ styles.task }>
                        { item.name }
                    </Text>
                    <Text style={ styles.author }>
                        { item.author }
                    </Text>
                </View>
            </View>
        </Swipeable>
    )
};

export default ListItem;