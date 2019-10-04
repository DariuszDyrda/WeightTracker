import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, KeyboardAvoidingView, ActivityIndicator, ToastAndroid } from 'react-native';
import Button from "../components/Button";
import FormTextInput from "../components/FormTextInput";
import imageLogo from "../assets/images/logo.png";
import colors from "../consts/colors";
import { strings } from '../consts/strings';
import { StackActions, NavigationActions } from 'react-navigation';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../actions/authActions'

const LoginScreen = (props) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const isLogged  = useSelector(state => state.auth.isLogged);
    const isLoading = useSelector(state => state.common.isLoading);
    const dispatch = useDispatch();

    const resetAction = StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'DrawerNav' })],
    });

    useEffect(() => {
      if(isLogged) {
        props.navigation.dispatch(resetAction);
      }
    })

    handleUsernameChange = (username) => {
        setUsername(username);
    }

    handlePasswordChange = (password) => {
        setPassword(password);
    }

    handleLoginPress = () => {
        dispatch(login({ username, password }))
          .then(res => {
            if(res.status == 201) {
              ToastAndroid.show(strings.LOGIN_SUCCESS, ToastAndroid.SHORT);
            }
            else if(res.response.status == 401) {
              ToastAndroid.show(res.response.data.message, ToastAndroid.SHORT);
            }
            else {
              ToastAndroid.show(strings.CONNECTION_ERROR_MESSAGE, ToastAndroid.SHORT);
            }
          })
          .catch(err => {
            ToastAndroid.show(strings.CONNECTION_ERROR_MESSAGE, ToastAndroid.SHORT);
          })
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
          <Button
            label={strings.LOGIN}
            onPress={this.handleLoginPress}
          />
          <Button
            label={strings.CREATE_NEW_ACCOUNT}
            onPress={() => props.navigation.navigate('SignUp')}
          />
        </View>
      </KeyboardAvoidingView>
    )
}

export default LoginScreen;

// STYLES
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