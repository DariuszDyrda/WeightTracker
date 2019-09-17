import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator, DrawerNavigatorItems } from 'react-navigation-drawer';
import HomeScreen from './src/screens/HomeScreen';
import DrawerComponent from './src/components/DrawerComponent';

const DrawerNavigator = createDrawerNavigator({
  Home: HomeScreen,
}, {
  contentComponent: DrawerComponent,
})

const AppNavContainer = createAppContainer(DrawerNavigator);

export default function App() {
  return (
    <AppNavContainer />
  );
}
