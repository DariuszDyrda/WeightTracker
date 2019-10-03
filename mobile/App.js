import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack';
import { TouchableHighlight, Image } from 'react-native';
import HomeScreen from './src/screens/HomeScreen';
import EditScreen from './src/screens/EditScreen';
import DrawerComponent from './src/components/DrawerComponent';
import LoginScreen from './src/screens/LoginScreen';
import SignUpScreen from './src/screens/SignUpScreen';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './src/reducers/index'
import HistoryScreen from './src/screens/HistoryScreen';

const store = createStore(reducers, applyMiddleware(thunk));

const DrawerNavigator = createDrawerNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: ({ navigation }) => ({
      drawerLabel: 'Home',
    })
  },
  History: {
    screen: HistoryScreen,
    navigationOptions: ({ navigation }) => ({
      title: 'History',
    })
  },
}, {
  contentComponent: DrawerComponent,
})


const DrawerNavigation = createStackNavigator({
  Drawer: {
    screen: DrawerNavigator,
    navigationOptions: ({ navigation }) => ({
      title: 'WeightTracker',
      headerLeft: (
      <TouchableHighlight onPress={() => navigation.toggleDrawer()}>
        <Image
          source={require('./src/assets/images/drawer.png')}
        />
      </TouchableHighlight>
      )
    })
  },
  Edit: {
    screen: EditScreen,
  },
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
