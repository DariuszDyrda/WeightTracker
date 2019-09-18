import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, KeyboardAvoidingView, ToastAndroid } from 'react-native';
import Button from "../components/Button";
import FormTextInput from "../components/FormTextInput";
import imageLogo from "../assets/images/signin.png";
import colors from "../consts/colors";
import { strings } from '../consts/strings';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { signup } from '../actions/authActions'
import { clearMessages } from '../actions/commonActions';

const SignUpScreen = (props) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    useEffect(() => {
      if(props.message) {
        ToastAndroid.show(props.message, ToastAndroid.SHORT);
        props.clearMessages();
      }
      if(props.isSignUpSuccessful) {
        props.navigation.navigate("Login");
      }
      if(props.isLoading) {
        return (<ActivityIndicator size="large" color="#0000ff" />)
      }
    })

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
        props.signup({ username, password });
      } else {
        ToastAndroid.show(strings.PASSWORDS_DONT_MATCH_ERROR, ToastAndroid.SHORT);
      }
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

const mapStateToProps = (state) => {
  const { isSignUpSuccessful, isLoading, message } = state.common;
  return { isLoading, message, isSignUpSuccessful };
}

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    signup,
    clearMessages,
  }, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(SignUpScreen)

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