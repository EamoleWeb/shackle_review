import React from 'react';
import { StyleSheet } from 'react-native';
import { Snackbar } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';

import { closeSnackBarError, errorSelector } from '../slices/error';
import { Colors } from '../styling';

const MySnackBar = () => {
  const dispatch = useDispatch();

  const {
    error,
    hasError
  } = useSelector(errorSelector);

  const onClose = () => {
    dispatch(closeSnackBarError());
  };

  return (
    <Snackbar
      visible={hasError}
      onDismiss={onClose}
      style={styles.snackbar}
      action={{
        label: 'X',
        onPress: onClose
      }}
    >
      { error && error.payload }
    </Snackbar>
  );
};

export default MySnackBar;

const styles = StyleSheet.create({
  snackbar: {
    backgroundColor: Colors.turquoise
  }
});