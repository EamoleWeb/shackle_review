import React, { Component } from 'react';
import { View } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import propTypes from 'prop-types';

import { sliderWidth, itemWidth } from './SliderEntry.style';
import SliderEntry from './SliderEntry';
import styles from './index.style';
import colors from '../../styling/colors';

const SLIDER_1_FIRST_ITEM = 0;

export default class ActivitiesCarousel extends Component {
  constructor (props) {
    super(props);
    this.data = props.data;
    this.state = {
      slider1ActiveSlide: SLIDER_1_FIRST_ITEM
    };

  }

  _renderItemWithParallax ({item, index}, parallaxProps) {

    return (
      <SliderEntry
        slideTextProps={this.props.slideTextProps}
        SlideTextComponent={this.props.SlideTextComponent}
        data={item}
        even={(index + 1) % 2 === 0}
        parallax={false}
        parallaxProps={parallaxProps}
      />
    );
  }

  render() {
    const { slider1ActiveSlide } = this.state;

    return (
      <View style={styles.exampleContainer}>
        <Carousel
          ref={c => this._slider1Ref = c}
          data={this.data}
          renderItem={this._renderItemWithParallax.bind(this)}
          sliderWidth={sliderWidth}
          itemWidth={itemWidth}
          hasParallaxImages={true}
          firstItem={SLIDER_1_FIRST_ITEM}
          inactiveSlideScale={0.94}
          inactiveSlideOpacity={0.7}
          removeClippedSubviews={false}
          // inactiveSlideShift={20}
          containerCustomStyle={styles.slider}
          contentContainerCustomStyle={styles.sliderContentContainer}
          loop={true}
          loopClonesPerSide={2}
          onSnapToItem={(index) => this.setState({ slider1ActiveSlide: index }) }
        />
        <Pagination
          dotsLength={this.data.length}
          activeDotIndex={slider1ActiveSlide}
          containerStyle={styles.paginationContainer}
          dotColor={colors.darkBlue}
          dotStyle={styles.paginationDot}
          inactiveDotColor={'#BABCC4'}
          inactiveDotScale={1}
          carouselRef={this._slider1Ref}
          tappableDots={!!this._slider1Ref}
        />
      </View>
    );
  }
}

const PROP_TYPES = {
  data: propTypes.oneOfType([
    propTypes.string,
    propTypes.array,
    propTypes.object
  ]),
  slideTextProps: propTypes.array,
  SlideTextComponent: propTypes.func
};

ActivitiesCarousel.propTypes = PROP_TYPES;

Carousel.propTypes = PROP_TYPES;