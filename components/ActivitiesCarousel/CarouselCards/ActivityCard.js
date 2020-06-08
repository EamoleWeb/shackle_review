import propTypes from 'prop-types';
import React from 'react';
import { View } from 'react-native';
import { Rating } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';
import useActivityDistance from '../../../hooks/useActivityDistance';
import { Colors } from '../../../styling';
import ColoredHeader from '../../Headers/ColoredHeader';
import H5 from '../../Headers/H5';
import Para from '../../Para';
import styles from '../SliderEntry.style';

const ActivityCard = (props) => {
  const {
    average_rating=0,
    item = 'Default Title',
    lat,
    lon
  } = props;

  return (
    <View>
      <H5>{ item }</H5>
      <View style={styles.rating}>
        <Rating
          // onFinishRating={this.ratingCompleted}
          type="custom"
          ratingColor={Colors.turquoise}
          tintColor={Colors.white}
          ratingBackgroundColor={Colors.lightgray}
          imageSize={12.4}
          readonly={true}
          startingValue={parseFloat(average_rating)}
        />
      </View>

      <View style={styles.bottom}>
        <View style={styles.bottomLeft}>
          <Icon
            style={styles.locationIcon}
            name="location-on"
          />
          <Para>{useActivityDistance({latitude: lat, longitude: lon}, 'miles')} Miles Away</Para>
        </View>
        <View style={styles.bottomRight}>
          <ColoredHeader>BOOK</ColoredHeader>
        </View>
      </View>
    </View>
  );
};

ActivityCard.propTypes = {
  average_rating: propTypes.oneOfType([
    propTypes.string,
    propTypes.number

  ]),
  distance: propTypes.number,
  item: propTypes.string.isRequired,
  lat: propTypes.number,
  lon: propTypes.number
};

export default ActivityCard;
