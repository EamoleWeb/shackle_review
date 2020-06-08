import React from 'react';
import { StyleSheet, Text } from 'react-native';
import propTypes from 'prop-types';

import { Typography } from '../../styling';

const Footnote = ({ children, style = {} }) => {
  return (
    <Text style={[internalStyles.text, style]}>
      { children }
    </Text>
  );
};

const internalStyles = StyleSheet.create({
  text: Typography.footnote
});

Footnote.propTypes = {
  children: propTypes.oneOfType([
    propTypes.string.isRequired,
    propTypes.array.isRequired
  ]),
  style: propTypes.object
};

export default Footnote;