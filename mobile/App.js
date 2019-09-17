import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from './src/screens/HomeScreen';
import DrawerComponent from './src/components/DrawerComponent';
import LoginScreen from './src/screens/LoginScreen';
import SignInScreen from './src/screens/SigninScreen';

const DrawerNavigator = createDrawerNavigator({
  Home: HomeScreen,
}, {
  contentComponent: DrawerComponent,
})

const DrawerNavigation = createStackNavigator({
  Drawer: DrawerNavigator
})

const LoginNavigation = createStackNavigator({
  Login: LoginScreen,
  SignIn: SignInScreen,
}, {
  headerMode: 'none',
})

const MainNav = createStackNavigator({
  LoginStack: LoginNavigation,
  DrawerNav: DrawerNavigation,
}, {
  initialRouteName: "LoginStack",
  headerMode: 'none',
})

const AppNavContainer = createAppContainer(MainNav);

export default function App() {
  return (
    <AppNavContainer />
  );
}
