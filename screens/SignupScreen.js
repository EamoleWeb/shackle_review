import { Auth } from 'aws-amplify';
import { validate as validateEmail } from 'email-validator';
import PropTypes from 'prop-types';
import React, { useRef } from 'react';
import { ScrollView, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { Button } from 'react-native-elements';
import t from 'tcomb-form-native';
import { useDispatch } from 'react-redux';

import CustomForm from '../components/CustomForm';
import { H2 } from '../components/Headers';
import Para from '../components/Para';
import SocialAuth from '../components/SocialAuth';
import { Colors } from '../styling';
import { setSnackBarError } from '../slices/error';

const PROP_TYPES = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  }).isRequired
};

const SignUp = ({navigation}) => {
  const dispatch = useDispatch();

  const formRef = useRef();

  const Email = t.refinement(t.String, validateEmail);

  const Signup = t.struct({
    firstname: t.String,
    lastname: t.String,
    email: Email,
    password: t.String
  });

  const options = {
    auto: 'placeholders',
    fields: {
      firstname: {
        error: 'This field cannot be empty',
        placeholder: 'First Name'
      },
      lastname: {
        error: 'This field cannot be empty',
        placeholder: 'Last Name'
      },
      email: {
        textContentType: 'emailAddress',
        keyboardType: 'email-address',
        autoCapitalize: 'none',
        error: 'Please enter a valid email address'
      },
      password: {
        secureTextEntry: true,
        minLength: 6,
        error: 'This field cannot be empty'
      },
      verifyPassword: {
        error: 'Passwords doesnt match',
        secureTextEntry: true,
        minLength: 6
      }
    },
    order: [
      'firstname',
      'lastname',
      'email',
      'password'
    ]
  };

  const submitForm = async () => {
    const value = formRef.current.getValue();

    if (value != null) {
      const credentials = {username: value.email, password: value.password};

      try {
        await Auth.signUp({
          username: value.email,
          password: value.password,
          attributes: {
            email: value.email,
            given_name: value.firstname,
            family_name: value.lastname
          }
        });
        navigation.navigate('Verification', {credentials});
      } catch (err) {
        dispatch(setSnackBarError(err.message));
      }
    }
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
    >
      <View style={styles.upper_container}>
        <H2 style={styles.welcome_text}>Welcome!</H2>
      </View>
      <View style={styles.form_container}>
        <CustomForm
          ref={formRef}
          type={Signup}
          options={options} />
      </View>

      <View style={styles.button_container}>
        <Button
          title="CONTINUE"
          onPress={() => submitForm()}
        />
      </View>

      <View style={styles.social_signup_container}>
        <SocialAuth title="SIGN UP WITH"/>
        <Para style={styles.terms_text}>
          By using Shackle, you agree
          <TouchableWithoutFeedback>
            <Para style={styles.underline}> to our terms</Para>
          </TouchableWithoutFeedback>
        </Para>
      </View>
    </ScrollView>
  );
};

SignUp.propTypes = PROP_TYPES;

export default SignUp;

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
    flex: 3,
    paddingBottom: 60
  },
  button_container: {
    flex: 1
  },
  social_signup_container: {
    flex: 2,
    justifyContent: 'space-around'
  },
  welcome_text: {
    color: Colors.darkBlue,
    textAlign: 'center'
  },
  underline: {
    textDecorationLine: 'underline'
  },
  terms_text: {
    textAlign: 'center'
  }
});
