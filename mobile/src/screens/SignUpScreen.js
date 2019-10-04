import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, KeyboardAvoidingView, ToastAndroid, ActivityIndicator } from 'react-native';
import Button from "../components/Button";
import FormTextInput from "../components/FormTextInput";
import imageLogo from "../assets/images/signin.png";
import colors from "../consts/colors";
import { strings } from '../consts/strings';
import { useSelector, useDispatch } from 'react-redux';
import { signup } from '../actions/authActions'

const SignUpScreen = (props) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const isLoading = useSelector(state => state.common.isLoading);
    const dispatch = useDispatch();

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
      if(password == confirmPassword) {
        dispatch(signup({ username, password }))
          .then(res => {
            if(res.status == 201) {
              ToastAndroid.show(strings.SIGNUP_SUCCESS, ToastAndroid.SHORT);
              props.navigation.navigate("Login");
            }
            else if(res.response.status == 400) {
              ToastAndroid.show(res.response.data.message[0].constraints.minLength, ToastAndroid.SHORT);
            }
            else if(res.response.status == 409) {
              ToastAndroid.show(res.response.data.message, ToastAndroid.SHORT);
            }
            else {
              ToastAndroid.show(strings.CONNECTION_ERROR_MESSAGE, ToastAndroid.SHORT);
            }
          })
          .catch(err => {
            ToastAndroid.show(strings.CONNECTION_ERROR_MESSAGE, ToastAndroid.SHORT);
          });
      } else {
        ToastAndroid.show(strings.PASSWORDS_DONT_MATCH_ERROR, ToastAndroid.SHORT);
      }
    }

    if(isLoading) {
      return (<ActivityIndicator size="large" color="#0000ff" />)
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
            label={strings.SIGNUP}
            onPress={this.handleButtonPress}
          />
        </View>
      </KeyboardAvoidingView>
    )
}

export default SignUpScreen;

//STYLES
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