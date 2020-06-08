import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { FlatList, ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import ActivitiesCarousel from '../components/ActivitiesCarousel';
import ActivityCard from '../components/ActivitiesCarousel/CarouselCards/ActivityCard';
import ColoredHeader from '../components/Headers/ColoredHeader';
import H5 from '../components/Headers/H5';
import SearchResultsCard from '../components/MiniCards/SearchResultsCard';
import services from '../rezgo/service';
import propTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { setLoadingScreen, finshedLoading } from '../slices/loading';
import { setGlobalMarkers } from '../slices/markers';

const PROP_TYPES ={
  route: propTypes.shape({
    params: propTypes.object.isRequired
  }).isRequired
};

const SearchResultsScreen = ({route}) => {

  const dispatch = useDispatch();

  const [searchResults, setSearchResults] = useState();

  const navigation = useNavigation();

  const search_term = route.params.search_term;

  const tag = route.params.tag;

  dispatch(setLoadingScreen());

  useEffect(() => {

    if (search_term) {
      services.smartSearch([search_term])
        .then(response => {
          setSearchResults(response.data);
          dispatch(finshedLoading());
        })
        .catch(err => console.log('Error', err));
    }

    if (tag) {
      services.tagSearch([tag])
        .then(response => {
          setSearchResults(response.data);
          dispatch(finshedLoading());
        })
        .catch(err => console.log(err));

    }

  }, []);

  useEffect(() => {

    dispatch(setGlobalMarkers(searchResults));

  }, [searchResults]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView >
        <View style={styles.header}>
          <ColoredHeader>SEARCH RESULTS</ColoredHeader>
          <H5>{tag || search_term}</H5>
        </View>

        {searchResults && searchResults.length ===0 && <View style={styles.status}><H5>No results</H5></View>}

        {searchResults &&  searchResults.length >0 &&
        <View style={styles.whole_carousel_container}>

          <View style={styles.carousel_container}>
            <H5 style={styles.top_pick_header}>Top picks near you</H5>
            <ActivitiesCarousel
              slideTextProps={['lat', 'lon', 'item', 'title', 'average_rating', 'distance']}
              SlideTextComponent={ActivityCard}
              data={searchResults}
            />
          </View>

          <View style={styles.result_cards}>
            <FlatList data={searchResults}
              keyExtractor={item => item.uid}
              renderItem={({item}) =>
                <TouchableOpacity
                  onPress={() => {

                    navigation.navigate('Activity',  { data: item });
                  }}
                >
                  <View style={styles.results_card}>
                    <SearchResultsCard
                      title={item.item}
                      illustration={item.illustration}
                      // distance={item.distance}
                      rating={item.average_rating}
                      labelContent={`FROM £${item.starting}`}
                      data = {item}
                    />

                  </View>
                </TouchableOpacity>
              }
            />
          </View>

        </View>
        }

      </ScrollView>
    </SafeAreaView>
  );
};

SearchResultsScreen.propTypes = PROP_TYPES;

export default SearchResultsScreen;

const styles=StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    height: 50,
    marginHorizontal: 32

  },
  carousel_container: {
    marginTop: 35,
    marginLeft: 32
  },

  top_pick_header: {
    marginTop: 35
  },
  result_cards: {
    borderRadius: 12,
    marginHorizontal: 32
  },
  results_card: {
    marginVertical: 16
  },
  status: {
    flex: 1,
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center'
  }
});