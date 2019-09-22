import React, { useState } from 'react';
import { View, Picker } from 'react-native';
import FormTextInput from './FormTextInput';
import Button from './Button';
import DatePicker from 'react-native-datepicker'

export default WeightAddForm = (props) => {
  const getCurrentDate = () => {
    const dt = new Date();
    return (dt.getFullYear() + "-" + (dt.getMonth() + 1) + "-" + dt.getDate());
  }

  const now = getCurrentDate();
  const [date, setDate] = useState(now);
  const [unit, setUnit] = useState('kilograms');


    return (
      <View>
        <View>
          <FormTextInput keyboardType={"number-pad"} />
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
        <Button label={"Add"} onPress={() => console.log("click")}/>
      </View>
    )
}
