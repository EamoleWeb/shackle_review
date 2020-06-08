import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useState, useEffect } from 'react';
import { TouchableOpacity, View } from 'react-native';
import propTypes from 'prop-types';
import H5 from '../Headers/H5';
import Para from '../Para';
import moment from 'moment';

const DateComponent = (props) => {

  const [date, setDate] = useState(new Date());

  const [show, setShow] = useState(false);

  useEffect(() => {
    props.dateCallback(date);
  }, []);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
    props.dateCallback(currentDate);
  };

  const showMode = () => {
    setShow(true);

  };

  const showDatepicker = () => {
    showMode('date');
  };

  return (
    <View>

      <View>

        <Para>
              Pick a Date
        </Para>
        <TouchableOpacity  onPress={showDatepicker}>
          <H5>{moment(date).format('DD | MM | YYYY')}</H5>
        </TouchableOpacity>
      </View>

      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={'date'}
          is24Hour={true}
          display="default"
          onChange={onChange}

        />
      )}
    </View>

  );
};

DateComponent.propTypes = {
  dateCallback: propTypes.func
};

export default DateComponent;

