import React from 'react';
import { ScrollView } from 'react-native';
import PropTypes from 'prop-types';

import DetailsForm from './DetailsForm';

const MyDetailsScreen = () => {
  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic">
      <DetailsForm buttonText="SAVE CHANGES"/>
    </ScrollView>
  );
};

MyDetailsScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  }).isRequired
};

export default MyDetailsScreen;
