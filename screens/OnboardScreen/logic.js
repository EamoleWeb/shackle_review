import { useRef, useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Auth } from 'aws-amplify';

import { translate } from '../../translations';

export default () => {
  const navigation = useNavigation();

  const swiper = useRef(null);
  const [ user, setUser ] = useState(null);

  const [ nextLabel, setNextLabel] = useState('NEXT');
  const [ displayBack, setDisplayBack ] = useState(false);
  useEffect(() => {
    Auth.currentAuthenticatedUser({
      // Optional, By default is false. If set to true, this call will send
      // a request to Cognito to get the latest user data
      // bypassCache: false
    }).then(data => {
      setUser(data);
    }).catch(err => {
      console.log(err);
    });
  }, []);

  const goBack = () => {
    const { index } = swiper.current.state;

    const nextIndex = index - 1;

    // We are on the first slide, make sure that we hide the button
    if (nextIndex === 0) {
      setDisplayBack(false);
    }

    // As soon as the user goes back, change the label of the
    // next button to be 'NEXT'
    setNextLabel(translate('NEXT'));

    swiper.current.scrollBy(-1);
  };

  const goNext = () => {
    const { total, index } = swiper.current.state;

    //
    const nextIndex = index + 2;

    if (nextIndex === total) {
      // Set the next label to 'EXPLORE' when the user is reaching the
      // last slide
      setNextLabel(translate('EXPLORE'));
    } else if (nextIndex > total) {
      // Transfer the user to the homepage when everything is done
      return navigation.navigate('Activities', {user: user});
    }

    // Back button is always on as soon as the user start sliding forward
    setDisplayBack(true);

    swiper.current.scrollBy(1);
  };

  return {
    user,
    swiper,
    nextLabel,
    goBack,
    goNext,
    displayBack
  };
};