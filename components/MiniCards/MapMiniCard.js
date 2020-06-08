import propTypes from 'prop-types';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Rating } from 'react-native-elements';
import { Colors } from '../../styling';
import AbstractMiniCard from './AbstractMiniCard/AbstractMiniCard';
import CardFooter from './AbstractMiniCard/CardFooter';
import Content from './AbstractMiniCard/Content';
import Thumbnail from './AbstractMiniCard/Thumbnail';
import DistanceWidget from './DistanceWidget';

const MapMiniCard = (props) => {

  const {
    illustration = 'https://picsum.photos/700',
    // title = 'Default Title',
    average_rating,
    item
  } = props.data;

  const directions = props.directions;

  return (
    <AbstractMiniCard >

      <Thumbnail
        action = {props.thumbnailAction}
        imageContainer={styles.imageContainer}
        imageSource={{uri: illustration}}
        labelContainerStyle={styles.labelContainer}
        labelContentStyle={styles.labelContent}
        labelContent={props.labelContent}
      />

      <Content title={item} headerStyle={styles.headerStyle} containerStyle={styles.contentContainer}>

        <Rating
          style={styles.rating}
          type="custom"
          ratingColor={Colors.turquoise}
          tintColor={Colors.white}
          ratingBackgroundColor={Colors.lightgray}
          imageSize={12.4}
          readonly={true}
          startingValue={average_rating}
        />
        <CardFooter
          right={'DIRECTIONS'}
          left={<DistanceWidget textStyle={styles.leftTextStyle} distance={props.distance}/>}
          rightAction={() => directions(props.data)}
          rightTextStyle={styles.rightTextStyle}
          leftTextStyle={styles.rightTextStyle}
        />
      </Content>
    </AbstractMiniCard>
  );
};

MapMiniCard.propTypes = {
  thumbnailAction: propTypes.func,
  rating: propTypes.number,
  title: propTypes.string,
  price: propTypes.number,
  illustration: propTypes.string,
  labelContent: propTypes.oneOfType([
    propTypes.func,
    propTypes.string,
    propTypes.array
  ]),
  average_rating: propTypes.number,
  distance: propTypes.number,
  lowest_price: propTypes.number,
  data: propTypes.object,
  directions: propTypes.func
};

export default MapMiniCard;

const styles = StyleSheet.create({
  labelContainer: {
    backgroundColor: 'transparent',
    flex: 1,
    borderTopLeftRadius: 12,
    justifyContent: 'center',
    alignContent: 'center'
  },
  labelContent: {
    fontSize: 10
  },
  rating: {
    paddingVertical: 3,
    alignItems: 'flex-start'
  },
  imageContainer: {
    width: 86
  },
  rightTextStyle: {
    fontSize: 10
  },
  leftTextStyle: {
    fontSize: 10,
    textAlignVertical: 'center'
  },
  contentContainer: {
    margin: 10
  },
  headerStyle: {
    fontSize: 14
  }
});