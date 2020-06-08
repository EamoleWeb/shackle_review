import { useNavigation } from '@react-navigation/native';
import propTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import MapViewDirections from 'react-native-maps-directions';
import { Searchbar } from 'react-native-paper';
import ChevronIcon from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useDispatch, useSelector } from 'react-redux';
import ColoredHeader from '../components/Headers/ColoredHeader';
import H5 from '../components/Headers/H5';
import Map from '../components/MapComponent/Map';
import MapMiniCard from '../components/MiniCards/MapMiniCard';
import Para from '../components/Para';
import services from '../rezgo/service';
import { hideMapComponents, mapSelector, revealMapComponents } from '../slices/map';
import { setGlobalMarkers } from '../slices/markers';
import { positionSelector } from '../slices/position';
import { Colors } from '../styling';
import getActivityDistance from '../utils/getActivityDistance';

const MapScreen = ({route}) => {

  const dispatch = useDispatch();

  const searchActivityRef = useRef();

  const {
    params
  } =route;

  const {
    position
  } = useSelector(positionSelector);

  const navigation = useNavigation();

  const directionsCalback = (data) => {

    const dirs =<MapViewDirections
      origin={{latitude: position.payload.coords.latitude, longitude: position.payload.coords.longitude}}
      destination={{latitude: data.lat, longitude: data.lon}}
      apikey="AIzaSyBRkuSsXnqviMSJvdVrvxM1tY-6aL5eNCo"
      strokeWidth={3}
      strokeColor= {Colors.turquoise}
      mode='WALKING'
      precision='high'
    />;

    setDirections(dirs);
    dispatch(hideMapComponents());

  };

  useEffect(() => {

    if (route.params) {
      directionsCalback(route.params.data);
    }

  }, [route.params]);

  const  {
    hideComponents
  } = useSelector(mapSelector);

  const [nearbyActivities, setNearbyActivities] = useState([]);

  const [iconName, setIcon] = useState('chevron-up');
  const [expanded, setExpanded] = useState(false);
  const [directions, setDirections] = useState();

  const searchActivities =() => {
    if (searchActivityRef.current.root._lastNativeText != null || '') {
      const search_term = searchActivityRef.current.root._lastNativeText;

      console.log('Search ', search_term);

      if (search_term) {
        services.smartSearch([search_term])
          .then(response => {
            setNearbyActivities(response.data);
            dispatch(setGlobalMarkers(response.data));
          })
          .catch(err => console.log('Error', err));
      }

    }
  };

  const hideAll = () => {
    dispatch(hideMapComponents());
  };

  const expand = () => {
    setExpanded(!expanded);
    expanded ? setIcon('chevron-up'):setIcon('chevron-down');
  };

  const cancel = () => {
    setDirections(null);
    dispatch(revealMapComponents());
  };

  useEffect(() => {

    services.getAllActivities()
      .then(response => {
        setNearbyActivities(response.data);
      })
      .catch(err => console.log(err));

  }, []);

  return (

    <View style={styles.container}>
      {!hideComponents && <LinearGradient colors={[Colors.darkBlue, '#2A2E43A8', '#FFFFFF00']} style={styles.header_overlay}/> }
      {!hideComponents && <View style={styles.inputs_container}>
        <Searchbar
          placeholder="Search Activities"
          style={styles.search_input}
          inputStyle={styles.search_bar_container}
          icon ={() => {
            return (<Icon size={18} color={Colors.darkBlue} focused={false} name="my-location"/>);
          }}
        />
        <Searchbar
          placeholder="Search Activities"
          style={styles.search_input}
          inputStyle={styles.search_bar_container}
          // cancelButtonTitle={null}
          ref={searchActivityRef}
          iconColor ={Colors.darkBlue}
          onSubmitEditing = { () => searchActivities() }
        />

      </View>
      }

      <View style={styles.middle}/>
      { hideComponents &&
      <View style={styles.cancel_container}>
        <TouchableOpacity onPress={() => cancel()} style={styles.cancel_button}>
          <Icon color={Colors.white} size={25} name='clear'/>
        </TouchableOpacity>
      </View>
      }
      {!hideComponents && <View style={styles.snack_header}>
        <View style={styles.snack_inner}>
          <TouchableOpacity onPress={() => expand()}>
            <View style={styles.chevron_container}>

              <ChevronIcon name={iconName} color={Colors.white} size={16}/>

            </View>
            <View style={styles.text_container}>
              <View>
                <H5 style={styles.nearby}>Nearby ({nearbyActivities.length})</H5>
              </View>

              <View style={styles.activities}>
                <Para style={styles.para}>
                  Activities, Drinks, Places
                </Para>
                <TouchableOpacity style={styles.view_Touchable} onPress={() => hideAll()}>
                  <ColoredHeader style={styles.colored_header}>VIEW ON MAP</ColoredHeader>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>

          { expanded && <View style={styles.snack_content}>

            <FlatList
              data={nearbyActivities}
              keyExtractor={item => item.uid}
              horizontal={true}
              renderItem={({item}) =>

                <View style={styles.card_container}>

                  <MapMiniCard
                    thumbnailAction={() => navigation.navigate('Activity', {data: item})}
                    data={item}
                    directions={directionsCalback}
                    labelContent={'MORE DETAILS'}
                    //TODO: Must add getActivityDistance({latitude: item.lat, longitude: item.lon}, 'miles')
                    distance={getActivityDistance(position, {latitude: item.lat, longitude: item.lon}, 'miles')}
                  />
                </View>

              }
            />
          </View>}
        </View>
      </View>
      }

      <Map dirs={directions}/>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: -1

  },
  header_overlay: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.80,
    zIndex: 1,
    height: 240
  },
  inputs_container: {
    marginTop: 40,
    marginHorizontal: 32,
    zIndex: 2,
    height: 100,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    opacity: 1

  },
  search_input: {

    borderRadius: 12,
    backgroundColor: 'white',
    margin: 0,
    opacity: 1,
    zIndex: 2
  },
  search_bar_container: {
    backgroundColor: 'transparent',
    zIndex: 2,
    padding: 0
  },
  middle: {
    flex: 1
  },
  snack_header: {
    minHeight: 110,
    backgroundColor: Colors.darkBlue,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    zIndex: 2
  },
  snack_inner: {
    marginHorizontal: 32
  },
  chevron_container: {
    height: 39,
    justifyContent: 'center'
  },
  text_container: {
    height: 44,
    justifyContent: 'space-between',
    alignContent: 'space-between'

  },
  nearby: {
    color: Colors.white
  },
  activities: {
    flexDirection: 'row'
  },
  para: {
    flex: 1,
    color: Colors.white,
    opacity: 0.60,
    alignItems: 'flex-end'
  },
  colored_header: {
    flex: 1,
    fontSize: 10,
    justifyContent: 'flex-end',
    alignContent: 'flex-end',
    alignItems: 'baseline',
    textAlign: 'right'
  },
  view_Touchable: {
    height: 15
  },
  snack_content: {
    minHeight: 162,
    justifyContent: 'center',
    alignContent: 'center'
  },
  cancel_container: {
    maxHeight: 73,
    marginBottom: 23,
    marginRight: 17,
    zIndex: 5,
    alignContent: 'flex-end',
    alignItems: 'flex-end'
  },
  cancel_button: {
    height: 50,
    width: 50,
    backgroundColor: Colors.darkBlue,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center'
  },
  card_container: {
    //flex: 1,
    //backgroundColor: 'red',
    marginTop: 34,
    marginEnd: 16,
    height: 86,
    width: 290
  }

});

MapScreen.propTypes = {
  nearby: propTypes.number,
  route: propTypes.object
};

export default MapScreen;
