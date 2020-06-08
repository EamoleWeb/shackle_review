import PropTypes from 'prop-types';
import React from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { H2 } from '../../../components/Headers';
import ColoredHeader from '../../../components/Headers/ColoredHeader';
import Subtitle from '../../../components/Headers/Subtitle';
import { Colors } from '../../../styling';
import colors from '../../../styling/colors';
import { translate } from '../../../translations';
import Slide from './Slide';

const SlideIdentification = () => {

  return (
    <View style={styles.container}>
      <Slide>

        <ImageBackground style={styles.headerBackground}  source={require('../../../assets/images/hugo-sousa-1Z7QDZqT2QQ-unsplash.png')}>
          <View style={styles.image_overlay}/>
          <View style={styles.content}>
            <View style={styles.content_header}>
              <ColoredHeader>IDENTIFICATION</ColoredHeader>
            </View>
            <View style={styles.content_center}>
              <H2 style={styles.text}>
                {translate('Identification Document')}
              </H2>
              <Subtitle style={styles.text}>
                  Scan one of the following documents to verify your identity for the advanced check-in process.

              </Subtitle>

              <Button
                buttonStyle={styles.button}
                icon={
                  <Icon

                    name="camera"
                    size={15}
                    color="white"
                  />
                }

                title="  SCAN ID"
              />

              <ColoredHeader style={styles.manually}>ENTER MANUALLY</ColoredHeader>

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

SlideIdentification.propTypes = {
  user: PropTypes.object
};

export default SlideIdentification;
