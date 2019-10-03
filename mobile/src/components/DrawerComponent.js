import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SafeAreaView, ScrollView, Text } from 'react-native';
import { DrawerNavigatorItems } from 'react-navigation-drawer';
import Button from './Button';
import { strings } from '../consts/strings';
import ActionTypes from '../consts/ActionTypes';
import { StackActions, NavigationActions } from 'react-navigation';

const DrawerComponent = (props) => {
  const dispatch = useDispatch();
  const username = useSelector(state => state.auth.user)

  const resetAction = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: 'LoginStack' })],
});

  handleLogoutButtonPress = () => {
    props.navigation.dispatch(resetAction);
    dispatch({ type: ActionTypes.LOGOUT });
  }

  return (
      <SafeAreaView style={{flex: 1}}>
      <ScrollView>
        <DrawerNavigatorItems {...props}/>
      </ScrollView>
      <Text>Logged in as { username }</Text>
      <Button
        label={strings.LOGOUT}
        onPress={handleLogoutButtonPress}
      />
    </SafeAreaView>
  )
}

export default DrawerComponent;
