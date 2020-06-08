import React from 'react';
import { StyleSheet, View, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import ColoredHeader from '../../components/Headers/ColoredHeader';
import H5 from '../../components/Headers/H5';
import Map from './Map';

const MapComponent = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.header_inner}>
          <H5 style={styles.title}>Map View</H5>
        </View>
        <View style={styles.header_inner}>
          <TouchableOpacity onPress={() => navigation.navigate('Map')}>
            <ColoredHeader style={styles.view_full}>VIEW FULL</ColoredHeader>
          </TouchableOpacity>

        </View>
      </View>
      <View style={styles.map}>
        <Map/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 350
  },
  title: {
    textAlign: 'left'
  },
  view_full: {
    textAlign: 'right'

  },
  header: {
    height: 50,
    flexDirection: 'row'
  },
  header_inner: {
    flex: 1
  },
  map: {
    flex: 1
  }
});

export default MapComponent;
