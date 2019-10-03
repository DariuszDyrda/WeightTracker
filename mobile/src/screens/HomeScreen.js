import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions, ActivityIndicator, ToastAndroid, Keyboard } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { addWeight } from '../actions/dataActions';
import WeightAddForm from '../components/WeightAddForm';
import { strings } from '../consts/strings'

function HomeScreen(props) {
  const isLoading  = useSelector(state => state.common.isLoading);
  const token = useSelector(state => state.auth.accessToken);
  const dispatch = useDispatch();

  handleButtonPress = (data) => {
      return dispatch(addWeight({token, ...data}))
        .then(res => {
          if(res.status == 201) {
            ToastAndroid.show(strings.ADD_WEIGHT_SUCCESS, ToastAndroid.SHORT)
            Keyboard.dismiss();
            return 'ADD_SUCCESS';
          }
        })
        .catch(err => {
          ToastAndroid.show('error', ToastAndroid.SHORT);
        })
  }

  if(props.isLoading) {
    return (
      <ActivityIndicator size="large" color="#0000ff" />
    );
  }
  return (
    <View style={styles.container}>
      <WeightAddForm navigation={props.navigation} onButtonPress={handleButtonPress}></WeightAddForm>
    </View>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: "center",
    justifyContent: 'flex-start',
  },
});
