import React from 'react';
import { StyleSheet, Text, View, Dimensions, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import WeightAddForm from '../components/WeightAddForm';

function HomeScreen(props) {
  if(props.isLoading) {
    return (
      <ActivityIndicator size="large" color="#0000ff" />
    );
  }
  return (
    <View style={styles.container}>
      <WeightAddForm></WeightAddForm>
    </View>
  );
}

const mapStateToProps = (state) => {
  const { isLoading } = state.common;
  const { user, accessToken } = state.auth;
  return { user, accessToken, isLoading };
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
