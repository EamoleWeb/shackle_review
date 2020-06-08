import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Card, Button } from 'react-native-elements';
import RNPickerSelect from 'react-native-picker-select';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';
import pick from 'lodash/pick';
import { Auth } from 'aws-amplify';
import propTypes from 'prop-types';
import useUser from '../../hooks/useUser';
import Label from '../../components/Label';
import DetailsInput from '../../components/DetailsInput';
import DatePickerModal from '../../components/DatePickerModal';

const PROP_TYPES = {
  buttonText: propTypes.string.isRequired
};

const genderItems = [{
  label: 'Male',
  value: 'male'
}, {
  label: 'Female',
  value: 'female'
}, {
  label: 'Other',
  value: 'other'
}];

const placeholder = {
  label: 'Select Gender',
  value: null,
  color: '#c0c2c8'
};

const DetailsForm = (props) => {

  const {
    buttonText ='Default'
  } = props;

  const [ showDatePicker, setShowDatePicker ] = useState(false);

  const [ focusedName, setFocusedName ] = useState(null);

  const user = useUser();

  const [ formUser, setFormUser ] = useState({});

  useEffect(() => {
    setFormUser(user);
  }, [user]);

  const onChangeText = (fieldName, value) => {
    setFormUser({
      ...formUser,
      [fieldName]: value
    });
  };

  const onProfileSave = async () => {
    try {
      const payload = pick(formUser, [
        'given_name',
        'family_name',
        'birthdate',
        'gender'
      ]);

      const cognito_user = await Auth.currentAuthenticatedUser({
        bypassCache: true
      });

      let result = await Auth.updateUserAttributes(cognito_user, payload
      //   {
      //   given_name: 'Takis',
      //   family_name: 'Kirile',
      //   gender: 'male',
      //   birthdate: '12/02/2000'
      // }
      );

    } catch (error) {
      console.log('Error updating the user', error);
    }
  };

  return (
    <Card containerStyle={styles.cardStyle}>
      <DetailsInput
        name='firstName'
        defaultValue={formUser.given_name}
        onChangeText={text => onChangeText('firstName', text)}
        label='FIRST NAME'
        placeholder='Your first name'
        focusedName={focusedName}
        setFocusedName={setFocusedName}
      />
      <DetailsInput
        name='lastName'
        defaultValue={formUser.family_name}
        onChangeText={text => onChangeText('lastName', text)}
        label='LAST NAME'
        placeholder='Your last name'
        focusedName={focusedName}
        setFocusedName={setFocusedName}
      />
      <DetailsInput
        disabled
        name='email'
        defaultValue={formUser.email}
        onChangeText={text => onChangeText('email', text)}
        label='EMAIL ADDRESS'
        placeholder='Your email address'
        focusedName={focusedName}
        setFocusedName={setFocusedName}
      />
      <TouchableOpacity
        onPress={() => {
          setShowDatePicker(true);
        }}
      >
        <DetailsInput
          disabled
          defaultValue={formUser.birthdate && formUser.birthdate}
          onChangeText={text => onChangeText('birthdate', text)}
          name='birthdate'
          label='DATE OF BIRTH'
          placeholder='Select your birthdate'
          focusedName={focusedName}
          setFocusedName={setFocusedName}
          rightIcon={
            <Icon
              name='chevron-down'
              size={24}
              color='gray'
              style={styles.birthDateArrow}
            />
          }
        />
      </TouchableOpacity>
      <View style={styles.genderContainer}>
        <Label>
          GENDER
        </Label>
        <RNPickerSelect
          placeholder={placeholder}
          items={genderItems}
          onValueChange={value => {
            setFormUser({
              ...formUser,
              gender: value
            });
          }}
          style={{
            ...pickerSelectStyles,
            iconContainer: {
              top: 10,
              right: 12
            }
          }}
          value={formUser.gender}
          useNativeAndroidPickerStyle={false}
          textInputProps={{ underlineColor: 'yellow' }}
          Icon={() => {
            return <Icon name='chevron-down' size={24} color='gray' />;
          }}
        />

      </View>
      <DetailsInput
        name='drivingLicense'
        defaultValue={'ABRAHA753116SM9IJ 35'}
        onChangeText={text => onChangeText('drivingLicense', text)}
        label='DRIVING LICENSE NO'
        placeholder='Driving License No'
        focusedName={focusedName}
        setFocusedName={setFocusedName}
      />
      <View style={styles.buttonWrapper}>
        <Button
          onPress={onProfileSave}
          style={styles.button}
          title={buttonText}
        />
      </View>

      <DatePickerModal
        visible={showDatePicker}
        initialDate={formUser.birthdate && moment(formUser.birthdate)}
        onSave={(date) => {
          onChangeText('birthdate', moment(date).format('DD-MM-YYYY'));
          setShowDatePicker(false);
        }}
        onClose={() => {
          setShowDatePicker(false);
        }}
      />
    </Card>
  );
};

const styles = StyleSheet.create({
  cardStyle: {
    borderRadius: 12,
    shadowColor: '#0000000D',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 6
  },
  genderContainer: {
    padding: 10
  },
  birthDateArrow: {
    position: 'relative',
    right: 10
  },
  buttonWrapper: {
    marginTop: 28,
    alignItems: 'center'

  },
  button: {
    minWidth: 170
  }
});

const pickerSelectStyles = StyleSheet.create({
  // eslint-disable-next-line react-native/no-unused-styles
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 2,
    borderBottomWidth: 2,
    borderColor: '#7B8894',
    color: 'black',
    backgroundColor: 'white',
    paddingRight: 30 // to ensure the text is never behind the icon
  },
  // eslint-disable-next-line react-native/no-unused-styles
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: '#7B8894',
    borderRadius: 8,
    color: 'black',
    backgroundColor: 'white',
    paddingRight: 30 // to ensure the text is never behind the icon
  }
});

DetailsForm.propTypes = PROP_TYPES;

export default DetailsForm;