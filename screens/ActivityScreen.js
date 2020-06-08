import { useNavigation } from '@react-navigation/native';
import _ from 'lodash';
import propTypes from 'prop-types';
import { default as React, useEffect, useRef, useState } from 'react';
import { ImageBackground, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Button, Rating } from 'react-native-elements';
import { FlatList } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useSelector } from 'react-redux';
import AvailabilityAccordion from '../components/AvailabilityAccordion/AvailabilityAccordion';
import ColoredHeader from '../components/Headers/ColoredHeader';
import H2 from '../components/Headers/H2';
import H4 from '../components/Headers/H4';
import H5 from '../components/Headers/H5';
import Para from '../components/Para';
import ReviewCard from '../components/ReviewCard';
import useActivityDistance from '../hooks/useActivityDistance';
import services from '../rezgo/service';
import { positionSelector } from '../slices/position';
import { Colors } from '../styling';
import colors from '../styling/colors';

const PROP_TYPES = {
  route: propTypes.oneOfType([
    propTypes.object.isRequired,
    propTypes.func.isRequired
  ])
};

const Activity = ({route}) => {

  const  {
    //TODO: Must add the real distance , duration, category, age
    com,
    illustration,
    item,
    details: {
      overview
    },
    starting,
    average_rating,
    lat,
    lon,
    duration,
    tags
  } = route.params.data;

  const data = route.params.data;

  const scrollViewRef = useRef();
  const [ bookingOptions, setBookingOptions ] = useState([]);

  const navigation = useNavigation();

  const goToTop = () => {
    scrollViewRef.current.scrollTo({x: 0, y: 0, animated: true});
  };

  // @TODO: fire a request to get with COM
  useEffect(() => {
    services.getByCom(com, '2020-06-25')
      .then(results => {
        setBookingOptions(results.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, [com]);

  return (
    <SafeAreaView >
      <ScrollView ref={scrollViewRef} contentContainerStyle={styles.scrollWrapper}>
        <View style={styles.header_container}>

          <ImageBackground
            source={{uri: illustration }}
            style={styles.headerBackground}
          >

            <View style={styles.innerContainer}>
              <H2 style={styles.heading}>{item}</H2>
            </View>

            { typeof starting === 'string' &&
              <View style={styles.sign}>
                <Para style={styles.paraOverride}>FROM</Para>
                <H4 style={styles.h4Override}>£{starting}</H4>
              </View>
            }

            <View style={styles.header_overlay} />

          </ImageBackground>
        </View>
        <View style={styles.availability}>
          <AvailabilityAccordion activity={data}/>
        </View>

        {/* <View>
          {bookingOptions.map((option, index) => {
            return (
              <H4 key={index}>
                {option.option} = {option.time}
              </H4>
            );
          })}
        </View>
        */}

        <View style={styles.details_container}>
          <View style={styles.details_header}>
            <H5>Full Details</H5>
          </View>
          <View>
            <Para>{overview}</Para>
          </View>
          <View style={styles.rating}>
            <Rating
              type="custom"
              ratingColor="#2CABB1"
              ratingBackgroundColor={colors.lightgray}
              imageSize={17}
              tintColor= {'#FAFAFA'}
              fractions={1}
              startingValue={parseFloat(average_rating)}
              readonly={true}
            />
          </View>
        </View>
        <View style={styles.details_info}>
          <View style={styles.details_info_left}>
            <View style={styles.details_info_left_Component}>
              <Icon style={styles.icon} name="location-on"/>
              <Para>{useActivityDistance({ latitude: lat, longitude: lon }
                , 'miles')} Miles Away</Para>
            </View>
            {!_.isEmpty(duration) && duration &&<View style={styles.details_info_left_Component}>
              <Icon style={styles.icon} name="location-on"/>
              <Para>{duration} duration</Para>
            </View>}
            {!_.isEmpty(tags) &&
            <View style={styles.details_info_left_Component}>
              <Icon style={styles.icon} name="location-on"/>
              <Para>{data.tags}</Para>
            </View>}
          </View>
          <View style={styles.details_info_right}>
            <TouchableOpacity onPress={() => navigation.navigate('Map', {data: data})}>
              <ColoredHeader style={styles.directions}>GET DIRECTIONS</ColoredHeader>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.reviews_container}>
          <View style={styles.reviews_header}>
            <H5>Reviews ({data.reviews.length} Ratings)</H5>
          </View>
          <View style={styles.top_reviews}>
            <ColoredHeader style={styles.reviewsTitle}>TOP REVIEWS</ColoredHeader>
          </View>
          <View>
            <FlatList
              data={data.reviews}
              keyExtractor = {review => review.id}
              renderItem = {({item}) => <ReviewCard review = {item}/>}
            >

            </FlatList>
          </View>
        </View>
        <View style={styles.button}>
          <Button
            title="LEAVE REVIEW"
          />
        </View>

        <View style={styles.bottom}>
          <TouchableOpacity
            onPress={ () => goToTop()}
          >
            <><Icon
              name='arrow-upward'
              color={Colors.gray}
              size={25}

            /></>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );

};

Activity.propTypes = PROP_TYPES;

export default Activity;

const styles = StyleSheet.create({
  scrollWrapper: {
    flexGrow: 1,
    backgroundColor: '#FAFAFA'
  },
  header_container: {
    flex: 1,
    height: 329
  },
  innerContainer: {
    marginLeft: 32,
    marginTop: 80,
    marginRight: 32,
    zIndex: 2
  },
  header_overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.darkBlue,
    opacity: 0.40,
    zIndex: 0

  },
  availability: {
    marginHorizontal: 32,
    marginTop: -50
  },
  sign: {
    backgroundColor: colors.turquoise,
    opacity: 0.80,
    zIndex: 5,
    marginTop: 20,
    height: 44,
    width: 142,
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    textAlignVertical: 'center',
    justifyContent: 'space-evenly'

  },
  headerBackground: {
    width: '100%',
    height: '100%'
  },
  details_container: {
    flex: 1,
    marginTop: 158,
    marginLeft: 32,
    marginRight: 32
  },
  details_header: {
    height: 46
  },
  details_info: {
    height: 108,
    marginLeft: 32,
    marginRight: 32,
    flexDirection: 'row'
  },
  details_info_right: {
    flex: 1
  },
  details_info_left: {
    flex: 1,
    alignContent: 'flex-start',
    alignItems: 'flex-start',
    justifyContent: 'space-between'
  },
  details_info_left_Component: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    textAlignVertical: 'center'
  },
  icon: {
    textAlignVertical: 'center',
    color: colors.gray
  },
  paraOverride: {
    color: 'white'
  },
  h4Override: {
    color: 'white'
  },
  directions: {
    textAlign: 'right'
  },
  reviewsTitle: {
    fontSize: 16
  },
  rating: {
    marginTop: 23.5,
    marginBottom: 28.6,
    alignItems: 'flex-start'
  },
  reviews_container: {
    marginTop: 50,
    marginLeft: 32,
    marginRight: 32
  },
  reviews_header: {
    height: 58
  },
  top_reviews: {
    height: 46
  },
  button: {
    marginTop: 45,
    marginLeft: 32,
    marginRight: 32,
    marginBottom: 200
  },
  bottom: {
    marginTop: 53,
    marginBottom: 40,
    marginHorizontal: 32
  },
  heading: {
    color: Colors.white
  }
});