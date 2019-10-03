import React, { useState, useEffect } from 'react';
import ActionTypes from '../consts/ActionTypes';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, View, Picker, ToastAndroid, Keyboard } from 'react-native';
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
      <View style={styles.container}>
        <View style={styles.form}>
          <FormTextInput style={styles.input} keyboardType={"number-pad"} placeholder={strings.ADD_WEIGHT_PLACEHOLDER} value={weight} onChangeText={(text) => setWeight(text)}/>
          <Picker
            selectedValue={unit}
            style={styles.picker}
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
          style={styles.datePicker}
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
        <Button style={styles.button} label={"Submit"} onPress={handleButtonPress}/>
      </View>
    )
}

const styles = StyleSheet.create({
  container: {
    alignItems: "stretch",
    justifyContent: "flex-start",
    width: "80%"
  },
  form: {
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 20,
  },
  input: {
    flex: 1,
  },
  picker: {
    flex: 1,
    height: 50,
  },
  datePicker: {
    marginBottom: 20,
    alignSelf: "center",
  },
  button: {
    width: '80%',
    marginBottom: 20,
  }
});