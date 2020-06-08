import React from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';

const Slide = ({ children }) => {
  return (
    <View style={styles.wrapper}>
      { children }
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center'
    //alignItems: 'center'
  }
});

Slide.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object
  ]).isRequired
};

export default Slide;
