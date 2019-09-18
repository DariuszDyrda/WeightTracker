import React from 'react';
import { useDispatch } from 'react-redux';
import { SafeAreaView, ScrollView } from 'react-native';
import { DrawerNavigatorItems } from 'react-navigation-drawer';
import Button from './Button';
import { strings } from '../consts/strings';
import ActionTypes from '../consts/ActionTypes';

const DrawerComponent = (props) => {

  let dispatch = useDispatch();

  handleLogoutButtonPress = () => {
    props.navigation.navigate("LoginStack");
    dispatch({ type: ActionTypes.LOGOUT });
  }

  return (
      <SafeAreaView style={{flex: 1}}>
      <ScrollView>
        <DrawerNavigatorItems {...props}/>
      </ScrollView>
      <Button
        label={strings.LOGOUT}
        onPress={handleLogoutButtonPress}
      />
    </SafeAreaView>
  )
}

export default DrawerComponent;
