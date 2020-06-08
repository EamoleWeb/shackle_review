import React from 'react';
import { View, TouchableWithoutFeedback, StyleSheet, Image} from 'react-native';
import { Button } from 'react-native-elements';
import PropTypes from 'prop-types';
import SocialAuth from '../components/SocialAuth';
import colors from '../styling/colors';
import assets from '../components/assets';
import Para from '../components/Para';
import LinearGradient from 'react-native-linear-gradient';
import { Colors } from '../styling';

const PROP_TYPES = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  }).isRequired
};

const logo = assets.logos.shackle;

const SplashScreen = ({navigation}) => {

  return (
    <LinearGradient colors={[Colors.white, Colors.backgroundGray]} style={styles.container}>

      <View style={styles.inner}>
        <View style={styles.logo}>
          <Image source={logo} style={styles.image} />
        </View>
        <View style={styles.buttons}>
          <Button
            title="SIGN IN"
            titleStyle={styles.signin_button_title}
            buttonStyle={styles.signin_button}
            onPress={() => navigation.navigate('Entry', {initialRoute: 'SignIn'})}
          />
          <Button
            title="SIGN UP"
            onPress={() => navigation.navigate('Entry', {initialRoute: 'SignUp'})}
          />
        </View>
        <View style={styles.social_auth}>
          <SocialAuth title='SIGN UP WITH'/>
        </View>

        <TouchableWithoutFeedback onPress={() => navigation.navigate('Entry', {initialRoute: 'SignIn'})}>
          <View style={styles.text_container}>
            <Para>Already have an account?</Para>
            <Para style={styles.underline}>Sign in</Para>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </LinearGradient>
  );
};

SplashScreen.propTypes = PROP_TYPES;

export default SplashScreen;

const styles = StyleSheet.create(
  {
    container: {
      flex: 1,
      backgroundColor: '#F7F7FA'

    },
    inner: {
      flex: 1,
      marginHorizontal: 62
    },
    logo: {
      flex: 3,
      justifyContent: 'flex-end',
      alignItems: 'center'
    },
    image: {
      height: 131,
      width: 219
    },
    buttons: {
      marginTop: 75,
      minHeight: 98,
      marginBottom: 35
    },
    signin_button: {
      backgroundColor: 'white',
      marginBottom: 10,
      borderRadius: 12
    },
    signin_button_title: {
      color: colors.lightgrayPlus1
    },
    text_container: {
      flex: 1,
      justifyContent: 'center',
      alignContent: 'flex-end',
      alignItems: 'center',
      textAlignVertical: 'bottom'
    },
    social_auth: {
      flex: 1
    },
    underline: {
      fontWeight: 'bold',
      textDecorationLine: 'underline'
    }
  }
);
