import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from './src/screens/HomeScreen';
import DrawerComponent from './src/components/DrawerComponent';
import LoginScreen from './src/screens/LoginScreen';
import SignUpScreen from './src/screens/SignUpScreen';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './src/reducers/index'
import { HistoryScreen } from './src/screens/HistoryScreen';

const store = createStore(reducers, applyMiddleware(thunk));

const DrawerNavigator = createDrawerNavigator({
  Home: HomeScreen,
  History: HistoryScreen,
}, {
  contentComponent: DrawerComponent,
})


const DrawerNavigation = createStackNavigator({
  Drawer: DrawerNavigator
})

const LoginNavigation = createStackNavigator({
  Login: LoginScreen,
  SignUp: SignUpScreen,
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
    <Provider store={store}>
      <AppNavContainer />
    </Provider>
  );
}
