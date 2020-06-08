import React from 'react';
import { Text, StyleSheet } from 'react-native';
import propTypes from 'prop-types';

import { Typography } from '../styling';

const Label = ({children, style}) => {
  return (
    <Text style={[internalStyles.text, style]}>
      { children }
    </Text>
  );
};

const internalStyles = StyleSheet.create({
  text: Typography.label
});

Label.propTypes = {
  children: propTypes.oneOfType([
    propTypes.string,
    propTypes.array,
    propTypes.object
  ]),
  style: propTypes.object
};

export default Label;