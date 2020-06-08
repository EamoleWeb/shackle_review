import React from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { PROP_TYPES } from './constants';

// Android-specific implementation for DatePickerModal. Shows a native
// DatePickerAndroid modal when `visible` becomes true. Changing `visible`
// to false will not dismiss the modal. It must be dismissed by the user.
const DatePickerModal = props => {
  const {
    visible,
    initialDate,
    onSubmit,
    onClose
  } = props;

  if (!visible) {
    return null;
  }

  return (
    <DateTimePicker
      mode='date'
      display='spinner'
      value={initialDate || new Date()}
      onChange={(_, date) => {
        onClose();
        if (date) {
          onSubmit(date);
        }
      }}
    />
  );
};

DatePickerModal.propTypes = PROP_TYPES;

export default DatePickerModal;