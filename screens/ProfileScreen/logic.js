import { useNavigation } from '@react-navigation/native';
import { Auth } from 'aws-amplify';

import useUser from '../../hooks/useUser';

export default () => {
  const navigation = useNavigation();

  const logout = async () => {
    try {
      await Auth.signOut();
    } catch (err) {
      console.log('Error while trying to logout', err);
    }
  };

  const goToDetails = () => {
    return navigation.navigate('My Details');
  };

  const mainMenuItems = [{
    title: 'My Details',
    icon: 'av-timer',
    visible: true,
    handler: goToDetails
  }, {
    title: 'Hotel Details',
    icon: 'flight-takeoff',
    visible: false
  }, {
    title: 'My Interests',
    icon: 'flight-takeoff',
    visible: false
  }, {
    title: 'Past Purchases',
    icon: 'flight-takeoff',
    visible: false
  }, {
    title: 'Change Password',
    icon: 'flight-takeoff',
    visible: false
  }];

  const logOutItems = [{
    title: 'Log Out',
    icon: 'av-timer',
    visible: true,
    handler: logout
  }];

  const deleteAccountItems = [{
    title: 'Delete Account',
    icon: 'av-timer',
    visible: true
  }];

  const user = useUser();

  return {
    user,
    mainMenuItems,
    logOutItems,
    deleteAccountItems
  };
};