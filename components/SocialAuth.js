import { Auth } from 'aws-amplify';
import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Divider from 'react-native-divider';
import { SocialIcon } from 'react-native-elements';
import { Colors } from '../styling';
import Para from './Para';

const PROP_TYPES = {
  title: PropTypes.string.isRequired
};

const SocialAuth = (props) => {

  return (
    <View>

      <View style={styles.divider_container}>
        <Divider borderColor={Colors.lightgrayPlus1} color={Colors.lightgrayPlus1} orientation="center">
          <Para style={styles.title}>{props.title}</Para>
        </Divider>
      </View>

      <View style={styles.social_butons_container}>
        <SocialIcon
          type='facebook'
          onPress={() => {
            Auth.federatedSignIn({provider: 'Facebook'});
          }}
          style={styles.icon_style}
        />
        <SocialIcon
          type='google'
          onPress={() => {
            Auth.federatedSignIn({provider: 'Google'});
          }}
          style={styles.icon_style}
        />
      </View>
    </View>
  );

};

SocialAuth.propTypes = PROP_TYPES;

export default SocialAuth;

const styles = StyleSheet.create(
  {
    divider_container: {
      flex: 1,
      backgroundColor: 'green',
      marginBottom: 35
    },
    social_butons_container: {
      flexDirection: 'row',
      alignContent: 'center',
      justifyContent: 'center'
    },
    title: {
      fontWeight: 'bold'
    },
    icon_style: {
      height: 44,
      width: 44
    }
  }
);