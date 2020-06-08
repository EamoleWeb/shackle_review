import React from 'react';
import { StyleSheet, Text } from 'react-native';
import propTypes from 'prop-types';

import { Typography } from '../../styling';

const ColoredHeader = ({ children, style = {} }) => {
  return (
    <Text style={[internalStyles.text, style]}>
      { children }
    </Text>
  );
};

const internalStyles = StyleSheet.create({
  text: Typography.coloredHeader
});

ColoredHeader.propTypes = {
  children: propTypes.oneOfType([
    propTypes.object.isRequired,
    propTypes.string.isRequired,
    propTypes.array.isRequired
  ]),
  style: propTypes.oneOfType([
    propTypes.string,
    propTypes.array,
    propTypes.object
  ])
};

export default ColoredHeader;