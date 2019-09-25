import React, { useState, useEffect } from 'react';
import ActionTypes from '../consts/ActionTypes';
import { useDispatch, useSelector } from 'react-redux';
import { View, Picker, ToastAndroid, Keyboard } from 'react-native';
import FormTextInput from './FormTextInput';
import Button from './Button';
import DatePicker from 'react-native-datepicker'
import { addWeight } from '../actions/dataActions';
import { getCurrentDateInISO } from '../utils/dateUtils';

export default WeightAddForm = (props) => {

  const token = useSelector(state => state.auth.accessToken);
  const message = useSelector(state => state.common.message);
  const now = getCurrentDateInISO();
  const [weight, setWeight] = useState(null);
  const [date, setDate] = useState(now);
  const [unit, setUnit] = useState('kilograms');

  const dispatch = useDispatch();

  useEffect(() => {
    if(message) {
      ToastAndroid.show(message, ToastAndroid.SHORT);
      dispatch({ type: ActionTypes.CLEAR_MESSAGES });

    }
  })

  const handleAddButtonPress = () => {
    dispatch(addWeight({token, weight, unit, date}));
    setWeight(null);
    Keyboard.dismiss();
  }


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
        <Button label={"Add"} onPress={handleAddButtonPress}/>
      </View>
    )
}
