import React, { useEffect, useRef } from 'react';
import { Animated, View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

const TabIndicator = ({width, tabWidth, index}) => {
  const marginLeftRef = useRef(new Animated.Value(index ? tabWidth : 0))
    .current;

  useEffect(() => {
    Animated.timing(marginLeftRef, {
      toValue: tabWidth,
      duration: 400
    }).start();
  }, [tabWidth]);

  return (
    <Animated.View style={[styles.tab_wrapper, { width, marginLeft: marginLeftRef }]} >
      <View style={styles.indicator} />
    </Animated.View>
  );
};

TabIndicator.propTypes = {
  width: PropTypes.number.isRequired,
  tabWidth: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired
};

export default TabIndicator;

const styles = StyleSheet.create({
  tab_wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  indicator: {
    marginTop: 28,
    height: 3,
    width: '14%',
    backgroundColor: '#2CABB1',
    borderRadius: 2
  }
});