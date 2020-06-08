import React, { useEffect, useRef, useState } from 'react';
import { ImageBackground, StyleSheet, View, Platform } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import Icon from 'react-native-vector-icons/FontAwesome';
import t from 'tcomb-form-native';
import CustomForm from '../../../components/CustomForm';
import { H2 } from '../../../components/Headers';
import ColoredHeader from '../../../components/Headers/ColoredHeader';
import hotelService from '../../../rezgo/hotelService';
import { Colors } from '../../../styling';
import colors from '../../../styling/colors';
import { translate } from '../../../translations';
import Slide from './Slide';
import propTypes from 'prop-types';

const fontFamily = Platform.OS === 'android' ? 'CircularStdBook' : 'CircularStd-Book';

const PROP_TYPES ={
  user: propTypes.object
};

const SlideHotelDetails = (props) => {

  const formRef = useRef();

  const {
    user
  } = props;

  /*var Hotel = t.enums({
    M: 'Hilton',
    F: 'Xenia'
  });*/

  const HotelForm = t.struct({
    //hotel: Hotel,
    room: t.String
  });

  const options = {
    auto: 'placeholders',
    fields: {
      hotel: {
        error: 'This field cannot be empty',
        placeholder: 'Select Hotel',
        nullOption: {value: '', text: 'Choose hotel'}

      },
      room: {
        error: 'This field cannot be empty',
        placeholder: 'Room Number (Optional)'
      }
    }

  };

  const [hotels, setHotels] = useState(null);

  //const [selectedHotel, setSelectedHotel] = useState(null);

  useEffect(() => {
    hotelService.getAllHotels()
      .then(results => {

        setHotels(results.data);

      })
      .catch(error => {
        console.log(error);

      });
  }, []);

  return (
    <View style={styles.container}>
      <Slide>
        <ImageBackground style={styles.headerBackground}  source={require('../../../assets/images/hugo-sousa-1Z7QDZqT2QQ-unsplash.png')}>
          <View style={styles.image_overlay}/>
          <View style={styles.content}>
            <View style={styles.content_header}>
              <ColoredHeader>LOCATION</ColoredHeader>
            </View>
            <View style={styles.content_center}>
              <H2 style={styles.text}>
                {translate('Which hotel are you staying in?')}
              </H2>
              <View style={styles.form_container}>
                {hotels && <Dropdown
                  rippleInsets={{top: 870, bottom: 500}}
                  //style={{marginHorizontal: 12}}
                  // selectedItemColor= {Colors.turquoise}
                  inputContainerStyle={styles.input_container}
                  itemTextStyle ={styles.item_text}
                  //baseColor={Colors.lightgray}
                  // textColor={Colors.turquoise}
                  // itemColor ={Colors.lightgray}
                  renderAccessory={() => <Icon name={'chevron-down'} color={Colors.lightgray}/>}
                  containerStyle={styles.hotel_container}
                  baseColor={Colors.lightgrayPlus1}
                  //renderBase={() => <Input/>}
                  rippleCentered={true}
                  lineWidth={0}
                  label ='Choose Hotel'
                  data = {hotels}
                  valueExtractor ={(hotel) => {

                    // setSelectedHotel(hotel);

                    return hotel.hotel_name;
                  }}
                  onChangeText ={(value, index, data) => {
                    console.log('SUB ', user.attributes.sub);

                    hotelService.setUserHotel(user, data[index]);
                  }}
                />}
                <H2> </H2>
                <CustomForm
                  ref={formRef}
                  type={HotelForm}
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
    marginTop: 30
  },
  content_header: {
    justifyContent: 'flex-start',
    alignItems: 'center'

  },
  content_center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginHorizontal: 50
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
    zIndex: 5,
    height: 120
  },
  input_container: {
    borderRadius: 12,
    marginHorizontal: 12
  },
  item_text: {
    alignItems: 'center',
    fontFamily: fontFamily
  },
  hotel_container: {
    height: 44,
    justifyContent: 'center',
    backgroundColor: Colors.white,
    borderRadius: 12
  }
});

SlideHotelDetails.propTypes = PROP_TYPES;

export default SlideHotelDetails;
