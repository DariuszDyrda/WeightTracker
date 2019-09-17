import React from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import { DrawerNavigatorItems } from 'react-navigation-drawer';

export default class DrawerComponent extends React.Component {
    render() {
        return (
            <SafeAreaView style={{flex: 1}}>
            <ScrollView>
              <DrawerNavigatorItems {...this.props}/>
            </ScrollView>
          </SafeAreaView>
        )
    }
}
