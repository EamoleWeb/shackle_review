import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import propTypes from 'prop-types';
import H5 from '../Headers/H5';
import Para from '../Para';

const TimeComponent = (props) => {
  const [start, setStart] = useState(new Date());

  const [end, setEnd] = useState(new Date());

  const [showStart, setShowStart] = useState(false);

  const [showEnd, setShowEnd] = useState(false);

  useEffect(() => {

    props.timeCallback(start, end);

  }, [start, end]);

  const onStartChange = (event, selectedDate) => {
    const currentDate = selectedDate || start;

    if (currentDate.getHours() > end.getHours()) {
      setStart(end);
    } else {
      setEnd(currentDate);
    }
    props.timeCallback(start, end);
    setShowStart(false);

  };

  const onEndChange = (event, selectedDate) => {
    const currentDate = selectedDate || end;

    if (currentDate.getHours() < start.getHours()) {
      setEnd(start);
    } else {
      setEnd(currentDate);
    }
    props.timeCallback(start, end);
    setShowEnd(false);

  };

  const showStartPicker = () => {
    setShowStart(!showStart);
  };

  const showEndPicker = () => {
    setShowEnd(true);
  };

  return (
    <View>

      <Para>
        Pick a Time
      </Para>
      <View style={styles.hours}>

        <TouchableOpacity onPress={showStartPicker}>
          <H5>{start.getHours()<12 ?`${start.getHours()}am`:`${start.getHours()}pm`}</H5>
        </TouchableOpacity>
        <H5> - </H5>
        <TouchableOpacity onPress={showEndPicker}>
          <H5>{end.getHours()<12 ?`${end.getHours()}am`:`${end.getHours()}pm`}</H5>
        </TouchableOpacity>
      </View>
      {showStart && (
        <DateTimePicker
          testID="startTimePicker"
          value={start}
          mode={'time'}
          is24Hour={false}
          display="spinner"
          onChange={onStartChange}
        />
      )}
      {showEnd && (
        <DateTimePicker
          testID="endTimePicker"
          value={start}
          mode={'time'}
          is24Hour={false}
          display="spinner"
          onChange={onEndChange}
        />
      )}

    </View>
  );
};

export default TimeComponent;

TimeComponent.propTypes = {
  timeCallback: propTypes.func
};

const styles = StyleSheet.create({
  hours: {
    flexDirection: 'row'
  }
});
