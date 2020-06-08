import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-elements';
import PropTypes from 'prop-types';

import ColoredHeader from '../../Headers/ColoredHeader';
import H5 from '../../Headers/H5';
import Para from '../../Para';
import moment from 'moment';

const BookingCard = (props) => {
  const {
    overall_total,
    tour_name,
    adult_num,
    child_num,
    senior_num,
    date_iso
  } = props;

  return (
    <View>
      <View style={styles.header}>
        <H5>{tour_name}</H5>
      </View>
      <Para>{moment(date_iso).format('DD MMM YYYY')}</Para>
      <View style={styles.total}>
        <View>
          {adult_num && <Para>{adult_num>1?'Adults':'Adult'} {adult_num}</Para>}
          {senior_num && <Para>{senior_num>1?'Seniors':'Senior'} {senior_num}</Para>}
          {child_num && <Para>{child_num>1?'Children':'Child'} {child_num}</Para>}
        </View>
        <ColoredHeader style={styles.price}>{`£${overall_total}`}</ColoredHeader>
      </View>
      <View style={styles.buttons}>
        <Button buttonStyle={styles.button} title='VIEW TICKET'/>
        <Button buttonStyle={styles.button} title='DIRECTIONS'/>
      </View>

    </View>
  );
};

BookingCard.propTypes = {
  title: PropTypes.string,
  price: PropTypes.number,
  overall_total: PropTypes.number,
  tour_name: PropTypes.number,
  adult_num: PropTypes.number,
  child_num: PropTypes.number,
  senior_num: PropTypes.number,
  date_iso: PropTypes.number
};

export default BookingCard;

const styles = StyleSheet.create({
  header: {
    justifyContent: 'space-between',
    marginBottom: 20
  },
  total: {
    flexDirection: 'row',
    alignContent: 'flex-end',
    alignItems: 'flex-end',
    justifyContent: 'space-between'
  },
  price: {
    fontSize: 16
  },
  buttons: {
    height: 78,
    marginTop: 20,
    justifyContent: 'space-between'
  },
  button: {
    height: 34
  }
});