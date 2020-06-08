import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import ColoredHeader from '../../../components/Headers/ColoredHeader';
import { Colors } from '../../../styling';
import DetailsForm from '../../MyDetailsScreen/DetailsForm';
import Slide from './Slide';

const SlideConfirmDetails = () => {

  return (
    <Slide>
      <ScrollView>
        <View style={styles.content}>
          <LinearGradient colors={[Colors.white, Colors.backgroundGray]} style={styles.header_overlay}/>
          <View style={styles.content_header}>
            <ColoredHeader>CONFIRM DETAILS</ColoredHeader>
          </View>
          <DetailsForm buttonText="CONFIRM DETAILS"/>
        </View>
      </ScrollView>
    </Slide>
  );
};

const styles = StyleSheet.create({
  header_overlay: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.80,
    zIndex: 0
  },
  content: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
    marginTop: 30
  },
  content_header: {
    alignItems: 'center'
  }

});

SlideConfirmDetails.propTypes = {
  user: PropTypes.object
};

export default SlideConfirmDetails;
