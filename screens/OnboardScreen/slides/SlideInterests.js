import React from 'react';
import { Text } from 'react-native';
import { StyleSheet } from 'react-native';

import Slide from './Slide';

import { translate } from '../../../translations';

const SlideInterests = () => {
  return (
    <Slide>
      <Text style={styles.text}>
        {translate('What are you interested in?')}
      </Text>
    </Slide>
  );
};

const styles = StyleSheet.create({
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
  }
});
export default SlideInterests;
