import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import Slide from './Slide';
import { CreditCardInput } from 'react-native-input-credit-card';

const SlideCreditCard = () => {

  return (
    <View style={styles.container}>
      <Slide>
        <ScrollView>

          <CreditCardInput
            cardFontFamily = 'CircularStdBook'
            requiresName={true}
            allowScroll ={true}
          />
          {/*<CreditCardDetailsForm/>*/}
        </ScrollView>
      </Slide>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
    marginTop: 30
  }
});

SlideCreditCard.propTypes = {
  user: PropTypes.object
};

export default SlideCreditCard;
