import React, { useState, useEffect } from 'react';
import ActionTypes from '../consts/ActionTypes';
import { useDispatch, useSelector } from 'react-redux';
import { View, Picker, ToastAndroid, Keyboard } from 'react-native';
import FormTextInput from './FormTextInput';
import Button from './Button';
import DatePicker from 'react-native-datepicker'
import { getCurrentDateInISO } from '../utils/dateUtils';
import { strings } from '../consts/strings';

export default WeightAddForm = (props) => {

  const now = getCurrentDateInISO();
  const [weight, setWeight] = useState(null);
  const [date, setDate] = useState(now);
  const [unit, setUnit] = useState('kilograms');


  const dispatch = useDispatch();

  useEffect(() => {
    if(props.data) {
      setWeight(props.data.weight)
      setUnit(props.data.unit);
      setDate(props.data.date);
    }
  }, [props.data])

  const handleButtonPress = () => {
    props.onButtonPress({date, weight, unit})
      .then(res => {
        if(res == 'ADD_SUCCESS') {
          setWeight(null);
        }
        else {
          props.navigation.goBack();
        }
      }
      )
      .catch(err => {
        console.log(err);
      });
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
        <Button label={"Submit"} onPress={handleButtonPress}/>
      </View>
    )
}
