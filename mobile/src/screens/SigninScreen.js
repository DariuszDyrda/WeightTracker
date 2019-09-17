import React, { useState } from 'react';
import { View, Image, StyleSheet, KeyboardAvoidingView } from 'react-native';
import Button from "../components/Button";
import FormTextInput from "../components/FormTextInput";
import imageLogo from "../assets/images/signin.png";
import colors from "../consts/colors";
import { strings } from '../consts/strings';
import { StackActions, NavigationActions } from 'react-navigation';

export default function SignInScreen(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

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

    handleConfirmPasswordChange = (confirmPassword) => {
        setConfirmPassword(confirmPassword);
    }

    handleButtonPress = () => {
        props.navigation.dispatch(resetAction);
    }

    return (
        <KeyboardAvoidingView style={styles.container} behavior="padding">
        <Image source={imageLogo} style={styles.logo} />
        <View style={styles.form}>
          <FormTextInput
            value={username}
            onChangeText={this.handleUsernameChange}
            placeholder={strings.USERNAME_PLACEHOLDER}
          />
          <FormTextInput
            value={password}
            onChangeText={this.handlePasswordChange}
            placeholder={strings.PASSWORD_PLACEHOLDER}
            secureTextEntry={true}
          />
          <FormTextInput
            value={confirmPassword}
            onChangeText={this.handleConfirmPasswordChange}
            placeholder={strings.CONFIRM_PASSWORD_PLACEHOLDER}
            secureTextEntry={true}
          />
          <Button
            label={strings.SIGNIN}
            onPress={this.handleButtonPress}
          />
        </View>
      </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.WHITE,
      alignItems: "center",
      justifyContent: "space-between"
    },
    logo: {
      flex: 1,
      width: "100%",
      resizeMode: "contain",
      alignSelf: "center"
    },
    form: {
      flex: 1,
      justifyContent: "center",
      width: "80%"
    }
  });