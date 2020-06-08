import React from 'react';
import { StyleSheet, Text } from 'react-native';
import propTypes from 'prop-types';

import { Typography } from '../styling';

const Para = ({ children, style = {} }) => {

  return (
    <Text style={[internalStyles.text, style]}>
      { children }
    </Text>
  );
};

const internalStyles = StyleSheet.create({
  text: Typography.paragraph
});

Para.propTypes = {
  children: propTypes.oneOfType([
    propTypes.string,
    propTypes.array,
    propTypes.object
  ]),
  style: propTypes.oneOfType([
    propTypes.array,
    propTypes.object
  ])
};

export default Para;