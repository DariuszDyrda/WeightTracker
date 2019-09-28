import React, { useState, useEffect } from 'react';
import ActionTypes from '../consts/ActionTypes';
import { useDispatch, useSelector } from 'react-redux';
import { View, Picker, ToastAndroid, Keyboard } from 'react-native';
import FormTextInput from './FormTextInput';
import Button from './Button';
import DatePicker from 'react-native-datepicker'
import { addWeight, editWeight } from '../actions/dataActions';
import { getCurrentDateInISO } from '../utils/dateUtils';
import { strings } from '../consts/strings';

export default WeightAddForm = (props) => {

  const token = useSelector(state => state.auth.accessToken);
  const message = useSelector(state => state.common.message);
  const isLoading = useSelector(state => state.common.isLoading);
  const now = getCurrentDateInISO();
  const [weight, setWeight] = useState(null);
  const [date, setDate] = useState(now);
  const [unit, setUnit] = useState('kilograms');

  const [editId, setEditId] = useState(null);

  const dispatch = useDispatch();

  const handleButtonPress = () => {
    if(editId) {
      dispatch(editWeight({token, editId, weight, unit, date}))
        .then(res => {
          if(res.status = 200) {
            ToastAndroid.show(strings.EDIT_WEIGHT_SUCCESS, ToastAndroid.SHORT);
            props.navigation.goBack();
          }
        })
        .catch(err => {
          ToastAndroid.show(message, ToastAndroid.SHORT);
        })
    }
    else {
      dispatch(addWeight({token, weight, unit, date}))
        .then(res => {
          if(res.status == 201) {
            //setWeight(null);
            Keyboard.dismiss();
          }
        })
        .catch(err => {
          ToastAndroid.show(message, ToastAndroid.SHORT);
        })
    }
  }

  useEffect(() => {
    let oldWeight;
    try {
      oldWeight = props.navigation.getParam('weight');
    }
    catch(e) {
      
    }
    if(oldWeight) {
      setWeight(oldWeight.amount.toString());
      setUnit(oldWeight.unit);
      setDate(oldWeight.date);
      setEditId(oldWeight.id);
    }
  }, [])


    return (
      <View>
        <View>
          <FormTextInput keyboardType={"number-pad"} value={weight} onChangeText={(text) => setWeight(text)}/>
          <Picker
            selectedValue={unit}
            style={{height: 50}}
            onValueChange={(itemValue) =>
              setUnit(itemValue)
            }>
            <Picker.Item label="Kilograms" value="kilograms" />
            <Picker.Item label="Pounds" value="pounds" />
          </Picker>
        </View>
        <DatePicker
          date={date}
          mode="date"
          placeholder="select date"
          format="YYYY-MM-DD"
          minDate="2016-05-01"
          maxDate={now}
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              position: 'absolute',
              left: 0,
              top: 4,
              marginLeft: 0
            },
            dateInput: {
              marginLeft: 36
            }
            // ... You can check the source to find the other keys.
          }}
          onDateChange={(date) => {setDate(date)}}
        />
        <Button label={"Submit"} onPress={handleButtonPress}/>
      </View>
    )
}
