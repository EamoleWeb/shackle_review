import get from 'lodash/get';
import PropTypes from 'prop-types';
import React from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';
import H2 from '../../../components/Headers/H2';
import H5 from '../../../components/Headers/H5';
import Subtitle from '../../../components/Headers/Subtitle';
import colors from '../../../styling/colors';
import { translate } from '../../../translations';
import Slide from './Slide';

const SlideIntro = ({ user }) => {
  const firstName = get(user, 'attributes.given_name', null);

  return (

    <View style={styles.container}>
      <Slide>
        <ImageBackground style={styles.headerBackground}  source={require('../../../assets/images/hugo-sousa-1Z7QDZqT2QQ-unsplash.png')}>
          <View style={styles.image_overlay}/>
          <View style={styles.content}>
            <H2 style={styles.title}>
              {translate('Hey {name}!', { name: firstName})}
            </H2>
            <H5></H5>
            <Subtitle style={styles.text}>
              {translate('Onboarding intro')}
            </Subtitle>
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
  title: {
    color: colors.white,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  text: {
    fontWeight: 'bold',
    textAlign: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    opacity: 0.80
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
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
  }
});

SlideIntro.propTypes = {
  user: PropTypes.object
};

export default SlideIntro;
