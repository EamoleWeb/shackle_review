import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Counter from 'react-native-counters';
import colors from '../../styling/colors';
import Para from '../Para';
import PropTypes from 'prop-types';

const PROP_TYPES = {
  start: PropTypes.number.isRequired,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  callback: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired
};

const CounterComponent = (props) => {
  const {
    min = 0,
    max = 1000,
    title='Adults'
  } = props;

  const onChange = (number) => {
    props.callback(number);
  };

  return (
    <View style={styles.container}>
      <View style={styles.text}>
        <Para>{title}</Para>
      </View>
      <View style={styles.counter}>
        {
          min === null ?
            (<Text>Not available</Text>)
            :
            (<Counter
              start={min}
              min={min}
              max={max}
              onChange={onChange}
              buttonStyle={styles.button_style}
              buttonTextStyle={styles.button_text_style}
              countTextStyle={styles.count_text_style}
            />)
        }
      </View>

    </View>
  );
};

CounterComponent.propTypes =PROP_TYPES;

export default CounterComponent;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 50
  },
  button_style: {
    borderWidth: 0
  },
  button_text_style: {
    color: colors.darkBlue
  },
  count_text_style: {
    color: colors.darkBlue
  },
  text: {
    flex: 1,
    width: 120,
    justifyContent: 'center',
    alignContent: 'flex-start'
  },
  counter: {
    justifyContent: 'center',
    alignContent: 'flex-end'
  }
});