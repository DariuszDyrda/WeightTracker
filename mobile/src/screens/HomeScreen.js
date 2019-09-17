import React, { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { connect } from 'react-redux';

function HomeScreen(props) {
  return (
    <View style={styles.container}>
      <Text>HomeScreen { props.user } </Text>
    </View>
  );
}

const mapStateToProps = (state) => {
  const { user } = state.auth;
  return { user };
}

export default connect(mapStateToProps)(HomeScreen)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
