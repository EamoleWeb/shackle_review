import propTypes, { element } from 'prop-types';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Colors } from '../../../styling';

const AbstractMiniCard = ({children, style={} }) => {

  return (
    <View style={[internalStyles.container, style]}>
      {children}
    </View>
  );
};

export default AbstractMiniCard;

AbstractMiniCard.propTypes = {
  children: propTypes.arrayOf(element),
  style: propTypes.object
};

const internalStyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: 12,
    backgroundColor: Colors.white
  }
});
