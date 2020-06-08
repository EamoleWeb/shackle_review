import PropTypes from 'prop-types';
import React from 'react';
import { ImageBackground, StyleSheet, TouchableOpacity, View } from 'react-native';
import { CardIOModule } from 'react-native-awesome-card-io';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { H2 } from '../../../components/Headers';
import ColoredHeader from '../../../components/Headers/ColoredHeader';
import Subtitle from '../../../components/Headers/Subtitle';
import { Colors } from '../../../styling';
import colors from '../../../styling/colors';
import { translate } from '../../../translations';
import Slide from './Slide';

const SlidePayment = () => {

  /*const {
    next
  } = props;*/

  const scan_config ={
    guideColor: Colors.turquoise,
    hideCardIOLogo: true,
    useCardIOLogo: true,
    suppressManualEntry: true,
    requireCardholderName: true,
    scanExpiry: true
    //noCamera: true
    //requireExpiry: false
    //suppressConfirmation: true
  };

  const manual_config ={
    guideColor: Colors.turquoise,
    hideCardIOLogo: true,
    useCardIOLogo: true,
    suppressManualEntry: true,
    requireCardholderName: true,
    scanExpiry: true,
    noCamera: true
  };

  /*const nav =() => {
    next();
  };*/

  const scanCreditCard = () => {
    CardIOModule
      .scanCard(scan_config)
      .then(card => {
        console.log('Scanned');
        console.log(card);
        //nav();
      })
      .catch(() => {
      // the user cancelled
      });
  };

  const enterCardManually = () => {
    CardIOModule
      .scanCard(manual_config)
      .then(card => {
        console.log('Scanned');
        console.log(card);
      })
      .catch(() => {
      // the user cancelled
      });
  };

  return (
    <View style={styles.container}>
      <Slide>

        <ImageBackground style={styles.headerBackground}  source={require('../../../assets/images/hugo-sousa-1Z7QDZqT2QQ-unsplash.png')}>
          <View style={styles.image_overlay}/>
          <View style={styles.content}>
            <View style={styles.content_header}>
              <ColoredHeader>PAYMENT</ColoredHeader>
            </View>
            <View style={styles.content_center}>
              <H2 style={styles.text}>
                {translate('Payment Details')}
              </H2>
              <View>
                <Subtitle style={styles.subtitle}>
                Please scan the credit or debit card you’d like to use for the advanced check-in process and for any in-app bookings.
                </Subtitle>
                <Subtitle></Subtitle>
                <Subtitle style={styles.subtitle}>
                You can add or remove payment details through your account at any time.
                </Subtitle>

              </View>
              <Button
                buttonStyle={styles.button}
                icon={
                  <Icon

                    name="camera"
                    size={15}
                    color="white"
                  />
                }
                title="  SCAN CARD"
                onPress={() => scanCreditCard()}
              />

              <TouchableOpacity onPress={() => enterCardManually()}>
                <ColoredHeader style={styles.manually}>ENTER MANUALLY</ColoredHeader>
              </TouchableOpacity>
            </View>
            <View style={styles.content_footer}>
              <Icon
                name='question-circle-o'
                size={25}
                color= {Colors.turquoise}
              />
            </View>

          </View>

        </ImageBackground>

      </Slide>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center'
  },
  text: {
    color: colors.white,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  subtitle: {
    opacity: 0.8,
    textAlign: 'center'
  },
  content: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginBottom: 40,
    marginTop: 30,
    marginHorizontal: 32
  },
  content_header: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginHorizontal: 52
  },
  content_center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },
  content_footer: {
    alignItems: 'center'
  },
  headerBackground: {
    width: '100%',
    height: '100%'
  },
  image_overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.darkBlue,
    opacity: 0.85,
    zIndex: 0
  },
  button: {
    width: 290
  },
  manually: {
    color: colors.white,
    opacity: 0.5
  }
});

SlidePayment.propTypes = {
  user: PropTypes.object
};

export default SlidePayment;
