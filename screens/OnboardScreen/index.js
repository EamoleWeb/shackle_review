import PropTypes from 'prop-types';
import React from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-elements';
import Swiper from 'react-native-swiper';
import colors from '../../styling/colors';
import { translate } from '../../translations';
import useLogic from './logic';
import SlideAdvancedCheckin from './slides/SlideAdvancedCheckin';
import SlideConfirmDetails from './slides/SlideConfirmDetails';
import SlideHotelDetails from './slides/SlideHotelDetails';
import SlideIdentification from './slides/SlideIdentification';
import SlideIntro from './slides/SlideIntro';
import SlidePayment from './slides/SlidePayment';
import styles from './styles';
//import SlideCreditCard from './slides/SlideCreditCard';

const PROP_TYPES = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  }).isRequired
};

const InterestsScreen = () => {
  const {
    user,
    swiper,
    goBack,
    goNext,
    nextLabel,
    displayBack
  } = useLogic();

  return (
    <View style={styles.wrapper}>
      <Swiper
        ref={swiper}
        containerStyle={styles.content}
        paginationStyle={styles.paginationStyle}
        loop={false}
        showsButtons={false}
        scrollEnabled={ false }
        dotColor={'#C0C2C8'}
        activeDotColor={colors.darkBlue}
        showsPagination={true}
      >
        <SlideIntro user={user} />
        <SlideHotelDetails user={user} />
        <SlideAdvancedCheckin user={user} />
        <SlideIdentification user={user}/>
        <SlideConfirmDetails user={user}/>
        <SlidePayment next={goNext} user={user}/>
        {/*<SlideCreditCard  user={user}/>}
        {/*<SlideInterests user={user} />*/}
      </Swiper>
      <View style={styles.buttonsWrapper}>
        {displayBack &&
          <Button
            onPress={goBack}
            title={translate('BACK')}
            containerStyle={styles.buttonContainer}
            buttonStyle={[styles.buttonStyle, styles.backButtonStyle]}
          />
        }
        <Button
          onPress={goNext}
          title={nextLabel}
          containerStyle={styles.buttonContainer}
          buttonStyle={[styles.buttonStyle, styles.nextButtonStyle]}
        />
      </View>
    </View>
  );
};

InterestsScreen.propTypes = PROP_TYPES;

export default InterestsScreen;
