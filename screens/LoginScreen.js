import { Auth } from 'aws-amplify';
import React, { useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-elements';
import t from 'tcomb-form-native';
import { useDispatch } from 'react-redux';
import propTypes from 'prop-types';
import CustomForm from '../components/CustomForm';
import { H2 } from '../components/Headers';
import Para from '../components/Para';
import SocialAuth from '../components/SocialAuth';
import { Colors } from '../styling';
import { setSnackBarError } from '../slices/error';
import { setLoadingScreen, finshedLoading } from '../slices/loading';

const PROP_TYPES = {
  navigation: propTypes.shape({
    navigate: propTypes.func.isRequired
  }).isRequired
};

const LogIn = ({navigation}) => {
  const dispatch = useDispatch();

  const formRef = useRef();

  const Login = t.struct({
    email: t.String,
    password: t.String
  });

  const options = {
    auto: 'placeholders',
    fields: {
      email: {
        textContentType: 'emailAddress',
        keyboardType: 'email-address',
        error: 'Please enter a valid email address',
        autoCapitalize: 'none'
      },
      password: {
        secureTextEntry: true,
        minLength: 6
      }
    },
    order: ['email', 'password']
  };

  const submitLoginForm = async () => {

    dispatch(setLoadingScreen());

    const value = formRef.current.getValue();

    if (value != null) {

      const username = value.email;
      const password = value.password;

      try {
        await Auth.signIn({
          username, // Required, the username
          password // Optional, the password
        });

        dispatch(finshedLoading());
      } catch (err) {
        if (err && err.code === 'UserNotConfirmedException') {
          Auth.resendSignUp(username);

          navigation.navigate('Verification', {
            credentials: {
              username,
              password
            }
          });
        } else {
          dispatch(setSnackBarError(err.message));
        }
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.upper_container}>
        <H2 style={styles.welcome_text}>Welcome Back!</H2>
      </View>
      <View style={styles.form_container}>
        <CustomForm
          ref={formRef}
          type={Login}
          options={options}
        />
      </View>

      <View style={styles.forgot_password_container}>
        <Para style={styles.forgot_text}>FORGOT PASSWORD?</Para>
      </View>
      <View style={styles.button_container}>
        <Button
          title="CONTINUE"
          onPress={() => submitLoginForm()}
        />
      </View>
      <View style={styles.social_signup_container}>
        <SocialAuth title='SIGN IN WITH'/>
      </View>
    </View>
  );

};

LogIn.propTypes = PROP_TYPES;

export default LogIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7FA',
    justifyContent: 'center',
    alignContent: 'center',
    paddingRight: 50,
    paddingLeft: 50
  },
  upper_container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center'

  },
  form_container: {
    flex: 1,
    paddingBottom: 20
  },
  button_container: {
    flex: 0.5
  },
  forgot_password_container: {
    flex: 0.5,
    justifyContent: 'center',
    alignContent: 'center',
    minHeight: 93,
    alignItems: 'center'
  },
  social_signup_container: {
    flex: 1,
    marginTop: 36
  },
  welcome_text: {
    color: Colors.darkBlue,
    textAlign: 'center'
  },
  forgot_text: {
    fontWeight: 'bold'
  }
});