import React from 'react';
import { StyleSheet, Text } from 'react-native';
import PropTypes from 'prop-types';

import { Typography } from '../../styling';

const Subtitle = ({ children, style = {} }) => {
  return (
    <Text style={[internalStyles.text, style]}>
      { children }
    </Text>
  );
};

const internalStyles = StyleSheet.create({
  text: Typography.subtitle
});

Subtitle.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    PropTypes.object
  ]),
  style: PropTypes.object
};

export default Subtitle;