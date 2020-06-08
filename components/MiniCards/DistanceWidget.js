import propTypes from 'prop-types';
import React from 'react';
import { StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Colors } from '../../styling';
import Para from '../Para';

const DistanceWidget = (props) => {

  return (
    <>
      <Icon
        style={styles.locationIcon}
        name="location-on"
        size={19}
      />
      <Para style={[styles.textStyle, props.textStyle]}>{props.distance} Miles Away</Para>
    </>
  );
};

DistanceWidget.propTypes ={
  distance: propTypes.number.isRequired,
  textStyle: propTypes.object
};

export default DistanceWidget;

const styles = StyleSheet.create({
  locationIcon: {
    textAlignVertical: 'center',
    color: Colors.gray
  }
});