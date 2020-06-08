import propTypes from 'prop-types';
import React from 'react';
import { ImageBackground, StyleSheet, View, TouchableOpacity } from 'react-native';
import { Colors } from '../../../styling';
import ColoredHeader from '../../Headers/ColoredHeader';

const Thumbnail = (props) => {

  const {
    action
  } = props;

  function isFunction(functionToCheck) {
    return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
  }

  return (

    <ImageBackground  style={[internalStyles.image_container, props.imageContainer]} imageStyle={internalStyles.image} source={props.imageSource}>

      <View style={[internalStyles.labelContainer, props.labelContainerStyle]}>
        <TouchableOpacity onPress={() => isFunction(action)?action():null}>
          <ColoredHeader style = {[internalStyles.labelContentStyle, props.labelContentStyle]}> {props.labelContent} </ColoredHeader>
        </TouchableOpacity>
      </View>

    </ImageBackground>

  );
};

Thumbnail.propTypes = {
  action: propTypes.func,
  labelContainerStyle: propTypes.oneOfType([
    propTypes.string,
    propTypes.array,
    propTypes.object
  ]),
  labelContentStyle: propTypes.oneOfType([
    propTypes.string,
    propTypes.array,
    propTypes.object
  ]),
  imageContainer: propTypes.oneOfType([
    propTypes.string,
    propTypes.array,
    propTypes.object
  ]),
  textStyle: propTypes.oneOfType([
    propTypes.string,
    propTypes.array,
    propTypes.object
  ]),
  labelContent: propTypes.oneOfType([
    propTypes.string,
    propTypes.array,
    propTypes.object
  ]),
  imageSource: propTypes.oneOfType([
    propTypes.string,
    propTypes.array,
    propTypes.object
  ])

};

export default Thumbnail;

const internalStyles = StyleSheet.create({
  image_container: {
    width: 110,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
    justifyContent: 'flex-end',
    zIndex: 0
  },
  image: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12
  },
  labelContainer: {
    backgroundColor: Colors.turquoise,
    opacity: 0.8,
    zIndex: 1,
    height: 41,
    borderBottomLeftRadius: 12,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row'
  },
  labelContentStyle: {
    color: Colors.white
  }
});