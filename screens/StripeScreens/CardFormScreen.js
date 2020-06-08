import React, { PureComponent } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import stripe from 'tipsi-stripe';

import { Platform } from 'react-native';

function testID(id) {
  return Platform.OS === 'android' ?
    { accessible: true, accessibilityLabel: id } :
    { testID: id };
}

stripe.setOptions({
  publishableKey: 'pk_test_ZwMD2Q1YyJKb8OY0DtEEGCuF00XaynXfBY',
  merchantId: 'MERCHANT_ID', // Optional
  androidPayMode: 'test' // Android only
});

export default class CardFormScreen extends PureComponent {
  static title = 'Card Form'

  state = {
    loading: false,
    token: null
  }

  handleCardPayPress = async () => {
    try {
      this.setState({ loading: true, token: null });
      const token = await stripe.paymentRequestWithCardForm({
        // Only iOS support this options
        smsAutofillDisabled: true,
        requiredBillingAddressFields: 'full',
        prefilledInformation: {
          billingAddress: {
            name: 'Gunilla Haugeh',
            line1: 'Canary Place',
            line2: '3',
            city: 'Macon',
            state: 'Georgia',
            country: 'US',
            postalCode: '31217',
            email: 'ghaugeh0@printfriendly.com'
          }
        }
      });

      this.setState({ loading: false, token });
    } catch (error) {
      this.setState({ loading: false });
    }
  }

  render() {
    const { loading, token } = this.state;

    return (
      <View style={styles.container}>
        <Text style={styles.header}>
          Card Form Example
        </Text>
        <Text style={styles.instruction}>
          Click button to show Card Form dialog.
        </Text>
        <Button
          title="Enter you card and pay"
          loading={loading}
          onPress={this.handleCardPayPress}
          {...testID('cardFormButton')}
        />
        <View
          style={styles.token}
          {...testID('cardFormToken')}>
          {token &&
            <Text style={styles.instruction}>
              Token: {token.id}
            </Text>
          }
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  header: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  instruction: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  },
  token: {
    height: 20
  }
});