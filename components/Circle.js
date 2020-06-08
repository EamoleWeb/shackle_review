import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import PropTypes from 'prop-types';

import { Colors } from '../styling';

const fontSize = 24;
const borderWidth = 0;

const Circle = ({ children }) => {
  return (
    <View style = {styles.circle}>
      <Text style = {styles.text}>
        { children }
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  circle: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
    width: 80,
    height: 80,
    borderRadius: 80,
    borderWidth: borderWidth
  },
  text: {
    textAlign: 'center',
    fontSize: fontSize - 2 * borderWidth,
    lineHeight: fontSize - (Platform.OS === 'ios' ? 2 * borderWidth : borderWidth)
  }
});

Circle.propTypes = {
  children: PropTypes.string.isRequired
};

export default Circle;