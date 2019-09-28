import {Container, Content, Card, CardItem, Text } from 'native-base';
import React from 'react';
import { TouchableOpacity } from 'react-native';

export const List = (props) => {

    const handleCardPress = (weight) => {
        props.navigation.navigate('Edit', { weight });
    }

    const cards = props.weights.map(weight => {
        return (
            <Card key={weight.id}>
                <TouchableOpacity onPress={handleCardPress.bind(this, weight)}>
                    <CardItem style={styles}>
                        <Text>{weight.date.slice(0, 10)}</Text>
                        <Text>{weight.amount} {weight.unit}</Text>
                    </CardItem>
                </TouchableOpacity>
             </Card>
        )
    })

        return (
                <Content>
                    {cards}
                </Content>
        );
    }
const styles = {
    justifyContent: 'space-around',
}
