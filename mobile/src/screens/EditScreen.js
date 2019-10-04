import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, View, ActivityIndicator, Button, ToastAndroid } from 'react-native';
import { editWeight, deleteWeight } from '../actions/dataActions'
import { loading } from '../actions/commonActions';
import WeightAddForm from '../components/WeightAddForm';
import { getCurrentDateInISO } from '../utils/dateUtils';
import { strings } from '../consts/strings';

function EditScreen(props) {
    const token = useSelector(state => state.auth.accessToken);
    const isLoading = useSelector(state => state.common.isLoading);
    const now = getCurrentDateInISO();
    const [weight, setWeight] = useState(null);
    const [date, setDate] = useState(now);
    const [unit, setUnit] = useState('kilograms');

    const [editId, setEditId] = useState(null);

    const dispatch = useDispatch();

    const removeWeight = (editId) => {
        dispatch(deleteWeight({ token, editId }))
            .then(res => {
                if(res.status == 200) {
                    ToastAndroid.show(strings.DELETE_WEIGHT_SUCCESS, ToastAndroid.SHORT);
                    props.navigation.goBack();
                }
            })
            .catch(err => {
              dispatch(loading(false));
              ToastAndroid.show(strings.CONNECTION_ERROR_MESSAGE, ToastAndroid.SHORT);
            })
    }

    const handleButtonPress = (data) => {
    if(editId) {
     return dispatch(editWeight({token, editId, ...data}))
        .then(res => {
          if(res.status == 200) {
            ToastAndroid.show(strings.EDIT_WEIGHT_SUCCESS, ToastAndroid.SHORT);
            return 'EDIT_SUCCESS';
          }
        })
        .catch(err => {
          dispatch(loading(false));
          ToastAndroid.show(strings.CONNECTION_ERROR_MESSAGE, ToastAndroid.SHORT);
        })
    }
  }

  useEffect(() => {
    let oldWeight;
    try {
      oldWeight = props.navigation.getParam('weight');
    }
    catch(e) {
      console.log(e)
    }
    if(oldWeight) {
      setWeight(oldWeight.amount.toString());
      setUnit(oldWeight.unit);
      setDate(oldWeight.date);
      setEditId(oldWeight.id);
      props.navigation.setParams({ removeWeight, editId: oldWeight.id });
    }
  }, [])

  if(isLoading) {
    return (
      <ActivityIndicator size="large" color="#0000ff" />
    );
  }
  return (
    <View style={styles.container}>
      <WeightAddForm navigation={props.navigation} onButtonPress={handleButtonPress} data={{date, weight, unit}}></WeightAddForm>
    </View>
  );
}


EditScreen.navigationOptions = ({ navigation }) => {
  editId = navigation.getParam('editId');
  return {
  title: `Edit`,
  headerRight: (
        <Button
          onPress={() => navigation.getParam('removeWeight')(editId)}
          title="Delete"
          color="#000"
        />
),
}};

export default EditScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
