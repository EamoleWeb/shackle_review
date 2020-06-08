import React from 'react';
import { StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import { Input } from 'react-native-elements';

import { Colors } from '../styling';

const DetailsInput = (props) => {
  const {
    name,
    focusedName,
    setFocusedName,
    ...restProps
  } = props;

  const inputContainerStyle = [
    styles.inputContainerStyle,
    focusedName === name && styles.inputFocused
  ];

  return (
    <Input
      labelStyle={styles.labelStyle}
      inputStyle={styles.inputStyle}
      inputContainerStyle={inputContainerStyle}
      onFocus={() => { setFocusedName(name); }}
      onBlur={() => { setFocusedName(name); }}
      {...restProps}
    />

  );
};

const styles = StyleSheet.create({
  labelStyle: {
    color: Colors.turquoise,
    fontSize: 11,
    marginTop: 12
  },
  inputContainerStyle: {
    borderBottomWidth: 2
  },
  inputFocused: {
    borderBottomColor: Colors.turquoise
  },
  inputStyle: {
    fontSize: 16
  }
});

DetailsInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  focusedName: PropTypes.string,
  setFocusedName: PropTypes.func.isRequired
};

export default DetailsInput;