import React, { useState } from 'react';
import { View, Image, StyleSheet, KeyboardAvoidingView } from 'react-native';
import Button from "../components/Button";
import FormTextInput from "../components/FormTextInput";
import imageLogo from "../assets/images/logo.png";
import colors from "../consts/colors";
import { strings } from '../consts/strings';
import { StackActions, NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { login } from '../actions/authActions'

function LoginScreen(props) {
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

    handleLoginPress = () => {
        props.login(username, password);
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
          <Button
            label={strings.LOGIN}
            onPress={this.handleLoginPress}
          />
          <Button
            label={strings.CREATE_NEW_ACCOUNT}
            onPress={() => props.navigation.navigate('SignIn')}
          />
        </View>
      </KeyboardAvoidingView>
    )
}

const mapStateToProps = (state) => {
  const { user } = state;
  return { user };
}

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    login,
  }, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);

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