import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getWeights } from '../actions/dataActions'
import WeightAddForm from '../components/WeightAddForm';

function HomeScreen(props) {
  let labels = [];
  let data = [];

  useEffect(() => {
    props.getWeights(props.accessToken);
  }, []);
  useEffect(() => {
    if(props.weights && props.weights.length > 0) {
      props.weights.map(obj => {
        labels.push(obj.date);
        data.push(obj.amount);
        return;
      }) 
      labels = labels.map(label => {
        return label.slice(0, 3);
      })
      console.log(labels)
      console.log(data)
    }
  }, [props.weights])

  if(props.weights) {
    return (
      <View style={styles.container}>
        <WeightAddForm></WeightAddForm>
      </View>
    );
  }
  return (
    <ActivityIndicator size="large" color="#0000ff" />
  );
}

const mapStateToProps = (state) => {
  const { isLoading } = state.common;
  const { user, accessToken } = state.auth;
  const { weights } = state.data; 
  return { user, accessToken, weights, isLoading };
}

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    getWeights,
  }, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
