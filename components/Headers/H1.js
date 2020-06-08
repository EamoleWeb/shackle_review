import React from 'react';
import { StyleSheet, Text } from 'react-native';
import propTypes from 'prop-types';

import { Typography } from '../../styling';

const H1 = ({ children, style = {} }) => {
  return (
    <Text style={[internalStyles.text, style]}>
      { children }
    </Text>
  );
};

const internalStyles = StyleSheet.create({
  text: Typography.h1
});

H1.propTypes = {
  children: propTypes.oneOfType([
    propTypes.string,
    propTypes.array,
    propTypes.object
  ]),
  style: propTypes.object
};

export default H1;