import propTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { PermissionsAndroid, Platform, StyleSheet, View } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { useSelector } from 'react-redux';
import { markersSelector } from '../../slices/markers';
import { Colors } from '../../styling';

const Map = (props) => {

  const initialRegion = {
    latitude: 51.507222,
    longitude: -0.1275,
    latitudeDelta: 0.02,
    longitudeDelta: 0.02
  };

  const {
    markers
  } = useSelector(markersSelector);

  const [region, setRegion] = useState(initialRegion);

  const [, setLocationPersmission] = useState(false);
  const [userPosition] = useState(null);

  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const permission = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );

        setLocationPersmission(permission);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    Geolocation.requestAuthorization();

    Geolocation.getCurrentPosition((position) => {
      setRegion({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02
      });
    });

  }, [userPosition]);

  return (
    <View style={styles.container}>
      <MapView
        onMapReady={() => {
          requestLocationPermission();
        }}
        //onRegionChangeComplete = {region => setRegion(region)}
        followsUserLocation={true}
        showsMyLocationButton={true}
        showsCompass={false}
        showsUserLocation
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={styles.map}
        region={region}
      >
        {markers.payload && markers.payload.map(marker => {

          return (<Marker
            key={marker.title}
            coordinate={marker.latlng}
            title={marker.title}
            description={marker.description}
            pinColor= {Colors.turquoise}
            identifier ={marker.uid}
          />);
        }

        )}

        {props.dirs}
      </MapView>

    </View>
  );
};

export default Map;

Map.propTypes = {
  dirs: propTypes.array
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  map: {
    ...StyleSheet.absoluteFillObject
  }
});