import React from 'react';
import { View, StyleSheet } from 'react-native';
import get from 'lodash/get';
import PropTypes from 'prop-types';

import Circle from '../../components/Circle';
import { H3 } from '../../components/Headers';
import Para from '../../components/Para';
import colors from '../../styling/colors';

const ProfileHeader = ({ user }) => {
  const firstName = get(user, 'given_name', '');
  const lastName = get(user, 'family_name', '');
  const email = get(user, 'email', '');

  const firstNameLetter = firstName[0];
  const lastNameLetter = lastName[0];

  return (
    <View style={styles.wrapper}>
      <View style={styles.circleWrapper}>
        <Circle>
          {`${firstNameLetter}${lastNameLetter}`}
        </Circle>
      </View>
      <View style={styles.userDetailsWrapper}>
        <H3 style={styles.header}>
          {`${firstName} ${lastName}`}
        </H3>
        <Para>
          { email }
        </Para>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.darkBlue,
    minHeight: 180
  },
  circleWrapper: {
    flex: 1,
    alignItems: 'center',
    padding: 12
  },
  userDetailsWrapper: {
    flex: 1,
    alignItems: 'center'
  },
  header: {
    color: colors.white
  }
});

ProfileHeader.propTypes = {
  user: PropTypes.object
};

export default ProfileHeader;