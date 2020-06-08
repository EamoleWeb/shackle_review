import { useNavigation } from '@react-navigation/native';
import PropTypes from 'prop-types';
import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { ParallaxImage } from 'react-native-snap-carousel';
import pick from 'lodash/pick';

import styles from './SliderEntry.style';

const ImageCarousel = (props) => {
  const {
    data,
    parallax,
    parallaxProps,
    even
  } = props;

  return (
    parallax ? (
      <ParallaxImage
        source={{ uri: data.illustration }}
        containerStyle={[styles.imageContainer, even ? styles.imageContainerEven : {}]}
        style={styles.image}
        parallaxFactor={0.35}
        showSpinner={true}
        spinnerColor={even ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.25)'}
        {...parallaxProps}
      />
    ) : (
      <Image
        source={{ uri: data.illustration}}
        style={styles.image}
      />
    )
  );
};

const SliderEntry = (props) => {
  const {
    data,
    even,
    slideTextProps,
    SlideTextComponent
  } = props;

  const navigation = useNavigation();

  return (
    <TouchableOpacity
      activeOpacity={1}
      style={styles.slideInnerContainer}
      onPress={() => {
        navigation.navigate('Activity',  { data });
      }}
    >
      <View style={styles.shadow} />
      <View style={[styles.imageContainer, even ? styles.imageContainerEven : {}]}>
        <ImageCarousel {...props}/>
        <View style={[styles.radiusMask, even ? styles.radiusMaskEven : {}]} />
      </View>
      <View style={styles.textContainer}>
        <SlideTextComponent {...pick(data, slideTextProps)} />
      </View>
    </TouchableOpacity>
  );
};

ImageCarousel.propTypes = {
  data: PropTypes.object.isRequired,
  even: PropTypes.bool,
  parallax: PropTypes.bool,
  parallaxProps: PropTypes.object
};

SliderEntry.propTypes = {
  data: PropTypes.object.isRequired,
  even: PropTypes.bool,
  parallax: PropTypes.bool,
  parallaxProps: PropTypes.object,
  slideTextProps: PropTypes.array.isRequired,
  SlideTextComponent: PropTypes.func.isRequired
};

export default SliderEntry;