import React, {useEffect, useState} from 'react';
import { ScrollView, StyleSheet, View, TouchableOpacity } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ActivitiesCarousel from '../components/ActivitiesCarousel';
import BookingCard from '../components/ActivitiesCarousel/CarouselCards/BookingCard';
import ColoredHeader from '../components/Headers/ColoredHeader';
import H0 from '../components/Headers/H0';
import H5 from '../components/Headers/H5';
import MapComponent from '../components/MapComponent/MapComponent';
import BookingsMiniCard from '../components/MiniCards/BookingsMiniCard';
import { Colors } from '../styling';
import moment from 'moment';
import useUser from '../hooks/useUser';
import services from '../rezgo/service';
import { useDispatch } from 'react-redux';
import { setLoadingScreen, finshedLoading } from '../slices/loading';
import { Auth } from 'aws-amplify';

const BookingsScreen = () => {

  const dispatch = useDispatch();

  const [user, setUser] = useState(useUser());
  const [today] = useState(new Date());
  const [bookings, setBookings] = useState();
  const [previous, setPrevious] = useState();

  useEffect(() => {
    Auth.currentAuthenticatedUser({
      // Optional, By default is false. If set to true, this call will send
      // a request to Cognito to get the latest user data
      bypassCache: true
    }).then(data => {
      setUser(data.attributes);
    }).catch(err => {
      console.log(err);
    });
  }, []);

  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    dispatch(setLoadingScreen());

    switch (selectedIndex) {
      case 0:
        services.getBookingsByEmail(user.email, moment(today).format('YYYY-MM-DD'))
          .then(results => {
            setBookings(null);

            setBookings(results.data);

            dispatch(finshedLoading());
          }).catch(error => {
            console.log(error);
          });
        break;

      case 1:

        services.getBookingsUpcoming(user.email)
          .then(results => {
            setBookings(null);

            setBookings(results.data);

            dispatch(finshedLoading());

          }).catch(error => console.log(error));
        break;

      case 2:
        services.getBookingsAll(user.email)
          .then(results => {
            setBookings(null);

            setBookings(results.data);

            dispatch(finshedLoading());

          }).catch(error => console.log(error));

        break;

      default:
        break;
    }

  }, [selectedIndex, user]);

  useEffect(() => {
    services.getBookingsPrevious(user.email)
      .then(results => {
        console.log(results.data);

        setPrevious(results.data);

        console.log(bookings);

      }).catch(error => console.log(error));

  }, [user]);

  return (

    <ScrollView style={styles.container}>
      <View style={styles.inner}>
        <View style={styles.header}>
          <H0>My Bookings!</H0>
        </View>
        <View>
          {selectedIndex === 0?
            <H5 style={styles.subheader}>Hey {user.given_name}! You have {bookings?bookings.length:0} bookings today!</H5>:
            <H5 style={styles.subheader}>You have {bookings?bookings.length:0} bookings</H5>
          }

        </View>
      </View>

      <View style={styles.uprow}>
        <View style={styles.days}>
          <TouchableOpacity
            onPress={() => setSelectedIndex(0)}
          >
            <ColoredHeader style={selectedIndex ===0?styles.selected:styles.unselected}>TODAY</ColoredHeader>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setSelectedIndex(1)}
          >
            <ColoredHeader style={selectedIndex ===1?styles.selected:styles.unselected} >UPCOMING</ColoredHeader>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setSelectedIndex(2)}
          >
            <View style={styles.calendar}>
              <ColoredHeader style={selectedIndex ===2?styles.selected:styles.unselected}>ALL</ColoredHeader>
              <Icon style={selectedIndex ===2?styles.selected:styles.unselected} size={20} name='event'/>
            </View>
          </TouchableOpacity>
        </View>

      </View>

      <View style={styles.carousel}>

        {bookings && <ActivitiesCarousel
          slideTextProps={['date_iso', 'date', 'adult_num', 'child_num', 'senior_num', 'tour_name', 'overall_total', 'date_formatted']}
          SlideTextComponent={BookingCard}
          data={bookings}
        />}
      </View>

      <View style={styles.map}>
        <MapComponent/>
      </View>
      <View style={styles.list}>
        <FlatList
          ListHeaderComponent={() => {
            return (
              <View style={styles.listHeader}>
                <H5>Previous Purchases</H5>
              </View>);

          }}
          data={previous}
          keyExtractor={item => item.trans_num}
          renderItem={({item}) =>
            <View style={styles.card}>
              <BookingsMiniCard
                booking={item}
                labelContent={'REVIEW'}
              />
            </View>
          }
        />
      </View>

    </ScrollView>

  );
};

export default BookingsScreen;

const styles = StyleSheet.create({
  container: {
    //flex: 1
  },
  inner: {
    flex: 1,
    marginHorizontal: 32,
    //  backgroundColor: 'red',
    marginTop: 100,
    height: 100,
    alignContent: 'space-between'
  },
  header: {
    marginBottom: 15
  },
  subheader: {
    color: Colors.gray,
    alignItems: 'flex-end'
  },
  carousel: {
    marginRight: 32
  },
  map: {
    marginHorizontal: 32
  },
  card: {
    height: 110,
    marginBottom: 10
  },
  list: {
    marginHorizontal: 32
  },
  listHeader: {
    marginTop: 70,
    marginBottom: 37
  },
  uprow: {
    flexDirection: 'row',
    marginHorizontal: 32,
    marginTop: 20
  },
  days: {
    flex: 2,
    flexDirection: 'row',
    alignContent: 'space-between',
    justifyContent: 'space-between'
  },
  calendar: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignContent: 'center',
    alignItems: 'center'
  },
  selected: {
    color: Colors.turquoise
  },
  unselected: {
    color: Colors.gray,
    opacity: 0.3
  }
});