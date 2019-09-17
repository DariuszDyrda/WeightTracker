import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import { strings } from '../consts/strings';
import { StackActions, NavigationActions } from 'react-navigation';

export default function LoginScreen(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const resetAction = StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'DrawerNav' })],
      });

    handleUsernameChange = (username) => {
        setUsername(username);
    }

    handlePasswordChange = (password) => {
        setPassword(password);
    }

    handleButtonPress = () => {
        props.navigation.dispatch(resetAction);
    }

    return (
        <View>
            <View>
                <TextInput
                    value={username}
                    onChangeText={this.handleUsernameChange}
                    placeholder={strings.USERNAME_PLACEHOLDER}
                />
                <TextInput
                    value={password}
                    onChangeText={this.handlePasswordChange}
                    placeholder={strings.PASSWORD_PLACEHOLDER}
                />
                <Button
                    onPress={this.handleButtonPress}
                    title={"Log in"}
                />
            </View>
            <View>
                <Button
                    title={'Create new account'}
                    onPress={()=> props.navigation.navigate('SignIn')}
                />
            </View>
        </View>
    )
}