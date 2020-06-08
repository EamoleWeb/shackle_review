import propTypes from 'prop-types';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Rating } from 'react-native-elements';
import H5 from '../../Headers/H5';
import CardFooter from './CardFooter';

const Content = (props) => {

  return (
    <View style={[internalStyles.content_container, props.containerStyle]}>
      <H5 style={[internalStyles.text, props.headerStyle]} >{props.title }</H5>

      {props.children}

    </View>
  );
};

Content.propTypes = {
  title: propTypes.string.isRequired,
  headerStyle: propTypes.object,
  containerStyle: propTypes.object,
  subtitle: propTypes.object,
  children: propTypes.oneOfType([
    CardFooter,
    Rating
  ])
};

export default Content;

const internalStyles = StyleSheet.create({
  content_container: {
    flex: 1,
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
    justifyContent: 'space-between',
    alignContent: 'space-between',
    margin: 15
  }

});