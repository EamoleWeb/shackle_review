import propTypes from 'prop-types';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import ColoredHeader from '../../Headers/ColoredHeader';

const CardFooter = (props) => {

  const {
    left,
    right,
    rightAction= () => alert('Not implemented yet')
  } = props;

  return (
    <View style={internalStyles.bottom}>
      <View style={internalStyles.bottomLeft}>
        {left}
      </View>
      <View style={internalStyles.bottomRight}>
        <TouchableOpacity
          onPress={() => {rightAction();}}
        >
          <ColoredHeader style={props.rightTextStyle}>{right}</ColoredHeader>
        </TouchableOpacity>
      </View>
    </View>
  );
};

CardFooter.propTypes = {
  left: propTypes.oneOfType([
    propTypes.object.isRequired,
    propTypes.string.isRequired
  ]),
  right: propTypes.oneOfType([
    propTypes.object.isRequired,
    propTypes.string.isRequired
  ]),
  rightAction: propTypes.func,
  leftTextStyle: propTypes.object,
  rightTextStyle: propTypes.object
};

export default CardFooter;

const internalStyles = StyleSheet.create({
  bottom: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    textAlignVertical: 'center',
    alignItems: 'flex-end'
  },
  bottomLeft: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    textAlignVertical: 'center'
  },
  bottomRight: {
    flex: 1,
    alignItems: 'flex-end',
    //textAlignVertical: 'center',
    justifyContent: 'flex-end'

  }

});