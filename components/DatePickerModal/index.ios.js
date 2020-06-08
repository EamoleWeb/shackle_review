import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Overlay } from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';

import useLogic from './logic';
import { PROP_TYPES } from './constants';

// iOS-specific implementation for DatePickerModal. Displays a styled modal,
// with the native DatePickeriOS component.
const DatePickerModal = props => {
  const { visible } = props;

  const {
    date,
    overlayActions,
    onDateChange
  } = useLogic(props);

  return (
    <Overlay
      isVisible={visible}
      height={'auto'}
    >
      <View>
        <DateTimePicker
          value={date}
          onChange={onDateChange}
          mode='date'
        />
        <View style={styles.buttonsWrapper}>
          <Button
            containerStyle={styles.buttonContainerStyle}
            onPress={overlayActions.close}
            title={'Close'}
          />
          <Button
            containerStyle={styles.buttonContainerStyle}
            onPress={overlayActions.save}
            title={'Save'}
          />
        </View>
      </View>
    </Overlay>
  );
};

const styles = StyleSheet.create({
  buttonsWrapper: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  buttonContainerStyle: {
    padding: 8
  }
});

DatePickerModal.propTypes = PROP_TYPES;

export default DatePickerModal;