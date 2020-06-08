import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Input } from 'react-native-elements';
import { Colors } from '../../styling';

const CreditCardDetailsForm = () => {

  return (
    <Card containerStyle={styles.cardStyle}>
      <View style={styles.container}>
        <Input
          labelStyle={styles.labelStyle}
          inputStyle={styles.inputStyle}
          name='name'
          label='NAME'
          defaultValue={'MARK ABRAHAM'}
          placeholder='Name on card'
        />

        <Input
          labelStyle={styles.labelStyle}
          inputStyle={styles.inputStyle}

          name='cardNumber'
          defaultValue={'4242 4242 4242 4242'}
          label='CARD NUMBER'
          placeholder='Card Numer'
        />
        <View style={styles.expiry_date}>
          <Input
            inputContainerStyle={styles.inputContainerStyle}
            labelStyle={styles.labelStyle}
            inputStyle={styles.inputStyle}

            name='expireDate'
            defaultValue={'02/25'}
            //onChangeText={text => onChangeText('firstName', text)}
            label='EXPIRY DATE'
            placeholder='02/25'
            //focusedName={focusedName}
            // setFocusedName={setFocusedName}
          />
          <Input

            labelStyle={styles.labelStyle}
            inputStyle={styles.inputStyle}
            inputContainerStyle={styles.inputContainerStyle}
            name='cvc'
            defaultValue={'111'}
            //onChangeText={text => onChangeText('firstName', text)}
            label='CVC'
            placeholder='111'
          />
        </View>
      </View>
    </Card>
  );

};

export default CreditCardDetailsForm;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  cardStyle: {
    borderRadius: 12,
    shadowColor: '#0000000D',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 6
  },
  expiry_date: {
    flexDirection: 'row'
  },
  labelStyle: {
    color: Colors.turquoise,
    fontSize: 11,
    marginTop: 12
  },
  inputContainerStyle: {
    flex: 1,
    borderBottomWidth: 2,
    backgroundColor: 'red'
  },
  inputStyle: {
    fontSize: 16
  }
});