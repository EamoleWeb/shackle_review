import moment from 'moment';
import propTypes from 'prop-types';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Rating } from 'react-native-elements';
import { Card } from 'react-native-paper';
import ReadMore from 'react-native-read-more-text';
import Footnote from '../components/Headers/Footnote';
import H5 from '../components/Headers/H5';
import Para from '../components/Para';
import { Colors } from '../styling';

const PROP_TYPES = {
  review: propTypes.object.isRequired
};

const ReviewCard = (props) => {

  const {
    title,
    rating,
    firstname,
    lastname,
    text,
    created_at
  } = props.review;

  return (
    <Card style={styles.container}>
      <Card.Title title={<H5>{title}</H5>}/>
      <Card.Content>
        <ReadMore
          numberOfLines={3}
          // renderTruncatedFooter={() => <Para style={styles.read_more}>Read more</Para>}
        >
          <Para>{text}</Para>
        </ReadMore>
      </Card.Content>
      <Card.Content style={styles.bottom} >

        <View style={styles.bottom_left}>
          <Footnote>{firstname} {lastname[0]}., {moment(created_at).format('Do MMMM YYYY')}</Footnote>
        </View>
        <View style={styles.bottom_right}>
          <Rating
            // onFinishRating={this.ratingCompleted}
            type="custom"
            ratingColor={Colors.turquoise}
            tintColor={Colors.white}
            ratingBackgroundColor={Colors.lightgray}
            imageSize={12.4}
            readonly={true}
            startingValue={rating}
          />
        </View>

      </Card.Content>
    </Card>
  );
};

ReviewCard.propTypes = PROP_TYPES;

export default ReviewCard;

const styles= StyleSheet.create({
  container: {
    borderRadius: 12,
    marginBottom: 20
  },
  bottom: {
    marginTop: 17,
    flexDirection: 'row'
  },
  bottom_left: {
    flex: 1,
    justifyContent: 'flex-end',
    alignContent: 'flex-start'
  },
  bottom_right: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
  }
});