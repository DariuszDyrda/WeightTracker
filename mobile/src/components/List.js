import {Container, Content, Card, CardItem, Text, Icon } from 'native-base';
import React from 'react';

export const List = (props) => {
    const cards = props.weights.map(weight => {
        return (
            <Card key={weight.id}>
            <CardItem style={styles}>
                <Text>{weight.date.slice(0, 10)}</Text>
                <Text>{weight.amount} {weight.unit}</Text>
            </CardItem>
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