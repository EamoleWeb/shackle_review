import { Auth } from 'aws-amplify';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableWithoutFeedback
} from 'react-native';
import { useDispatch } from 'react-redux';

import {
  CodeField,
  useBlurOnFulfill,
  useClearByFocusCell
} from 'react-native-confirmation-code-field';
import Icon from 'react-native-vector-icons/FontAwesome';
import get from 'lodash/get';

import { translate } from '../translations';
import Para from '../components/Para';
import { H2, Subtitle } from '../components/Headers';
import Colors from '../styling/colors';
import assets from '../components/assets';

import { setSnackBarError } from '../slices/error';

const PROP_TYPES = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  }).isRequired,
  route: PropTypes.shape({
    params: PropTypes.func.isRequired
  }).isRequired
};

const Verification = ({route}) => {
  const dispatch = useDispatch();

  const homeLogo = assets.logos.shackle;

  const credentials = get(route, 'params.credentials', {});

  const [username] = useState(credentials.username);

  const CELL_COUNT = 6;

  const verify = async () => {
    const code = value;

    const password = credentials.password;

    try {
      await Auth.confirmSignUp(username, code, {
        // Optional. Force user confirmation irrespective
        // of existing alias. By default set to True.
        forceAliasCreation: false
      });

      await Auth.signIn(username, password);

    } catch (err) {
      alert('Wrong verification code!');
      console.log('Wrong verification code!', err);
    }
  };

  const resend = async () => {
    try {
      await Auth.resendSignUp(username);
    } catch (err) {
      dispatch(setSnackBarError(err.message));
    }
  };

  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logo_container}>
        <Image style={styles.logo} source={homeLogo}/>
      </View>

      <View style={styles.text_container}>
        <H2 style={styles.header}>Authentification</H2>
        <Text></Text>
        <Subtitle style={styles.text}>
          {translate('We\'ve just sent a 6 digit authentication')}
        </Subtitle>
        <Subtitle style={styles.text}>
          code to the email address
        </Subtitle>
        <Subtitle style={styles.email_text}>
          {username}
        </Subtitle>
        <Subtitle style={styles.text}>
          Please enter below to continue
        </Subtitle>
      </View>

      <View style={styles.field_container}>
        <CodeField
          ref={ref}
          {...props}
          value={value}
          onChangeText={setValue}
          cellCount={CELL_COUNT}
          rootStyle={styles.codeFiledRoot}
          keyboardType="number-pad"
          onEndEditing={() => verify()}
          renderCell={({index, symbol, isFocused}) => (
            <View style={styles.cell_container}>
              <Text
                key={index}
                style={[styles.cell, isFocused && styles.focus_cell]}
                onLayout={getCellOnLayoutHandler(index)}>
                {symbol || (isFocused ? <Icon name="circle" size={20} color={Colors.turquoise} /> : <Icon name="circle" size={20} color="#D7D9DA" />
                )}
              </Text>
              <View style={styles.cell_bottom}>
              </View>
            </View>
          )}
        />
      </View>

      <View style={styles.bottom_container}>
        <Para style={styles.text}>
          If you did not receive the code
        </Para>
        <Para style={styles.text}>
          <TouchableWithoutFeedback onPress={resend}>
            <Text style={styles.underline}>click here </Text>
          </TouchableWithoutFeedback>
          <Text>to resend.</Text>
        </Para>
      </View>
    </SafeAreaView>
  );

};

Verification.propTypes = PROP_TYPES;

export default Verification;

const styles = StyleSheet.create({
  codeFiledRoot: {marginTop: 5},
  cell_container: {
    width: 30
  },
  cell: {
    height: 40,
    lineHeight: 38,
    fontSize: 24,
    borderBottomWidth: 2,
    borderBottomColor: Colors.lightgrayPlus1,
    textAlign: 'center'
  },
  focus_cell: {
    borderColor: '#000'
  },
  cell_bottom: {
    borderBottomColor: '#D7D9DA',
    borderBottomWidth: 2
  },
  container: {
    flex: 1,
    backgroundColor: '#F7F7FA',
    justifyContent: 'center',
    alignContent: 'center',
    textAlign: 'center',
    paddingRight: 50,
    paddingLeft: 50
  },
  logo: {
    alignSelf: 'center'
  },
  logo_container: {
    flex: 1,
    justifyContent: 'center'
  },
  field_container: {
    flex: 1,
    paddingLeft: 48,
    paddingRight: 48
  },
  text_container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center'
  },
  bottom_container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center'
  },
  header: {
    alignSelf: 'center',
    color: Colors.darkBlue
  },
  text: {
    color: Colors.gray,
    textAlign: 'center'
  },
  email_text: {
    color: Colors.turquoise,
    textAlign: 'center'
  },
  underline: {
    textDecorationLine: 'underline'
  }
});

