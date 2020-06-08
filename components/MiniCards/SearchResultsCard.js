import propTypes from 'prop-types';
import React from 'react';
import { Rating } from 'react-native-elements';
import { Colors } from '../../styling';
import styles from '../ActivitiesCarousel/SliderEntry.style';
import AbstractMiniCard from './AbstractMiniCard/AbstractMiniCard';
import CardFooter from './AbstractMiniCard/CardFooter';
import Content from './AbstractMiniCard/Content';
import Thumbnail from './AbstractMiniCard/Thumbnail';
import DistanceWidget from './DistanceWidget';

const PROP_TYPES = {
  illustration: propTypes.string.isRequired,
  title: propTypes.string.isRequired,
  rating: propTypes.oneOfType([
    propTypes.string,
    propTypes.number
  ]),
  distance: propTypes.number,
  lowest_price: propTypes.number,
  labelContent: propTypes.oneOfType([
    propTypes.string,
    propTypes.object
  ])
};

const SearchResultsCard = (props) => {
  const {
    illustration = 'https://picsum.photos/700',
    title = 'Default Title',
    rating = 0,
    distance = 1.2
  } = props;

  return (

    <AbstractMiniCard>
      <Thumbnail labelContainerStyle={styles.price_overlay} labelContent={props.labelContent} imageSource={{uri: illustration}}/>
      <Content title={title}>
        <Rating
          style={styles.rating}
          type="custom"
          ratingColor={Colors.turquoise}
          tintColor={Colors.white}
          ratingBackgroundColor={Colors.lightgray}
          imageSize={12.4}
          readonly={true}
          startingValue={rating}
        />
        <CardFooter
          right={'BOOK'}
          left={<DistanceWidget distance={distance}/>}
          rightAction={() => alert('Not implemented yet')}
        />
      </Content>

    </AbstractMiniCard>

  );
};

SearchResultsCard.propTypes = PROP_TYPES;

export default SearchResultsCard;

