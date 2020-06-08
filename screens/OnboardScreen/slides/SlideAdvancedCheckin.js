import PropTypes from 'prop-types';
import React, {useRef} from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { H2 } from '../../../components/Headers';
import ColoredHeader from '../../../components/Headers/ColoredHeader';
import Subtitle from '../../../components/Headers/Subtitle';
import { Colors } from '../../../styling';
import colors from '../../../styling/colors';
import { translate } from '../../../translations';
import Slide from './Slide';
import t from 'tcomb-form-native';
import CustomForm from '../../../components/CustomForm';

const SlideAdvancedCheckin = () => {
  const formRef = useRef();

  var Agree = t.enums({
    yes: 'Agree',
    no: 'Disagree'
  });

  const CheckinForm = t.struct({
    agree: Agree
  });

  const options = {
    auto: 'placeholders',
    fields: {
      agree: {
        default: 'Yes'
      }
    }

  };

  return (
    <View style={styles.container}>
      <Slide>

        <ImageBackground style={styles.headerBackground}  source={require('../../../assets/images/hugo-sousa-1Z7QDZqT2QQ-unsplash.png')}>
          <View style={styles.image_overlay}/>
          <View style={styles.content}>
            <View style={styles.content_header}>
              <ColoredHeader>ADVANCED CHECK-IN</ColoredHeader>
            </View>
            <View style={styles.content_center}>
              <H2 style={styles.text}>
                {translate('Do you want to do advanced check-in?')}
              </H2>
              <Subtitle style={styles.text}>If you want to utilise our advanced check-in service, click yes. Make sure to have a form of ID to hand, as well as your card details to complete the process over the next couple of screens.</Subtitle>
              <View style={styles.form_container}>
                <CustomForm
                  ref={formRef}
                  type={CheckinForm}
                  options={options} />
              </View>
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
    // backgroundColor: 'red'
  },
  content_header: {
    // flex: 0.5,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginHorizontal: 52
    //backgroundColor: 'red'
  },
  content_center: {
    flex: 1,
    alignItems: 'center',
    //backgroundColor: 'green',
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
  form_container: {
    width: 290,
    zIndex: 5
  }
});

SlideAdvancedCheckin.propTypes = {
  user: PropTypes.object
};

export default SlideAdvancedCheckin;
