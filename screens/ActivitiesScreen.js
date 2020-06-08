import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useDispatch } from 'react-redux';
import ActivitiesCarousel from '../components/ActivitiesCarousel';
import ActivityCard from '../components/ActivitiesCarousel/CarouselCards/ActivityCard';
import ActivitiesHeader from '../components/ActivitiesHeader';
import CategoryList from '../components/CategoryList/CategoryList';
import H5 from '../components/Headers/H5';
import MapComponent from '../components/MapComponent/MapComponent';
import services from '../rezgo/service';
import { finshedLoading, setLoadingScreen } from '../slices/loading';
import { setGlobalMarkers } from '../slices/markers';
import { Colors } from '../styling';
import useUser from '../hooks/useUser';
import hotelService from '../rezgo/hotelService';

const PROP_TYPES = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  }).isRequired
};

const backgroundImage = require('../assets/images/background-image-london.png');

const ActivitiesScreen = () => {

  const dispatch = useDispatch();

  const [topPicksNearby, setTopPicksNearby] = useState();

  const [categories, setCategories] = useState([]);

  const scrollViewRef = useRef();

  const goToTop = () => {
    scrollViewRef.current.scrollTo({x: 0, y: 0, animated: true});
  };

  const user = useUser();

  const [currentHotelName, setCurrentHotelName] = useState();

  useEffect(() => {

    hotelService.getCurrentUserHotels(user)
      .then(results => {
        console.log(results.data[0]);
        setCurrentHotelName(results.data[0].hotel_name);
        console.log(results.data[0].hotel_name);

      })
      .catch(error => {
        console.log(error);

      });

  }, [user]);

  useEffect (() => {
    dispatch(setLoadingScreen());

    Promise.all([services.getActivityInterests(), services.getAllActivities()])
      .then(response => {
        setCategories(response[0]);

        setTopPicksNearby(response[1].data);

        dispatch(finshedLoading());
      });
  }, []);

  useEffect(() => {

    dispatch(setGlobalMarkers(topPicksNearby));

  }, [topPicksNearby]);

  return (
    <SafeAreaView>
      <ScrollView ref={scrollViewRef} contentContainerStyle={styles.scrollWrapper}>

        <View style={styles.header_container}>
          <ActivitiesHeader
            search_placeholder="Search Activities"
            coloredHeader="EXPLORE"
            subtitle={`Hey ${user.given_name || ''}! Welcome to the ${currentHotelName || ''}... Below are some of our top picks near you!`}
            backgroundImage = {backgroundImage}
          />
        </View>

        <View style={styles.carousel_container}>

          <H5 style={styles.top_pick_header}>Top picks near you</H5>

          {
            topPicksNearby && <ActivitiesCarousel
              slideTextProps={['lat', 'lon', 'item', 'title', 'average_rating', 'distance']}
              SlideTextComponent={ActivityCard}
              data={topPicksNearby}
            />
          }

        </View>

        <View style={styles.map_container}>
          <MapComponent/>
        </View>

        <View style={styles.inner_container}>
          <CategoryList data = {categories}/>
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

const styles = StyleSheet.create({
  scrollWrapper: {
    flexGrow: 1
  },
  header_container: {
    flex: 1
  },
  inner_container: {
    marginLeft: 32,
    marginTop: 43,
    marginRight: 32
  },
  map_container: {
    marginLeft: 32,
    marginRight: 32,
    marginTop: 35
  },
  carousel_container: {
    marginTop: 35,
    marginLeft: 32,
    marginRight: 32
  },
  top_pick_header: {
    marginTop: 35
  },
  bottom: {
    marginTop: 53,
    marginBottom: 40,
    marginHorizontal: 32
  }

  // TODO: this search box must be abstracted

});

ActivitiesScreen.propTypes = PROP_TYPES;

export default ActivitiesScreen;
