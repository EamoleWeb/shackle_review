import React from 'react';
import { StyleSheet, View } from 'react-native';
import ColoredHeader from '../Headers/ColoredHeader';
import Para from '../Para';
import AbstractMiniCard from './AbstractMiniCard/AbstractMiniCard';
import CardFooter from './AbstractMiniCard/CardFooter';
import Content from './AbstractMiniCard/Content';
import Thumbnail from './AbstractMiniCard/Thumbnail';
import propTypes from 'prop-types';
import moment from 'moment';

const BookingsMiniCard = (props) => {
  const {
    overall_total,
    tour_name,
    adult_num,
    child_num,
    senior_num,
    option_name,
    date_iso,
    illustration
  } = props.booking;

  return (
    <AbstractMiniCard>
      <Thumbnail
        labelContent={props.labelContent}
        imageContainer={styles.imageContainer}
        imageSource={{uri: illustration}}
        labelContainerStyle={styles.labelContainer}
        labelContentStyle={styles.labelContent}
      />
      <Content title={tour_name} subtitle={option_name}>
        <CardFooter
          right={<ColoredHeader>{`£${overall_total}`}</ColoredHeader>}
          left={<View>
            <Para>{moment(date_iso).format('DD MMM YYYY')}</Para>
            {adult_num && <Para>{adult_num>1?'Adults':'Adult'} {adult_num}</Para>}
            {senior_num && <Para>{senior_num>1?'Seniors':'Senior'} {senior_num}</Para>}
            {child_num && <Para>{child_num>1?'Children':'Child'} {child_num}</Para>}
          </View>}
        />
      </Content>
    </AbstractMiniCard>
  );
};

BookingsMiniCard.propTypes = {
  rating: propTypes.number,
  title: propTypes.oneOfType([
    propTypes.string,
    propTypes.func
  ]),
  price: propTypes.number,
  booking: propTypes.object,
  illustration: propTypes.string,
  labelContent: propTypes.oneOfType([
    propTypes.string,
    propTypes.array,
    propTypes.object,
    propTypes.func
  ])
};

export default BookingsMiniCard;

const styles = StyleSheet.create({

});