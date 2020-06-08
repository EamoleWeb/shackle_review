import React from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

const ProfileMenuContainer = ({ children }) => {
  return (
    <View style={styles.profileWrapper}>
      { children }
    </View>
  );
};

const styles = StyleSheet.create({
  profileWrapper: {
    marginTop: 24,
    width: '80%',
    alignSelf: 'center'
  }
});

ProfileMenuContainer.propTypes = {
  children: PropTypes.array.isRequired
};

export default ProfileMenuContainer;