import React from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import PropTypes from 'prop-types';

import ProfileHeader from './ProfileHeader';
import ProfileMenuContainer from './ProfileMenuContainer';
import ProfileMenu from './ProfileMenu';
import useLogic from './logic';

const ProfileScreen = () => {
  const {
    user,
    mainMenuItems,
    logOutItems,
    deleteAccountItems
  } = useLogic();

  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic">
      <SafeAreaView>
        <ProfileHeader user={user}/>
        <ProfileMenuContainer>
          <ProfileMenu items={mainMenuItems.filter(item => item.visible)} />
          <ProfileMenu items={logOutItems.filter(item => item.visible)} />
          <ProfileMenu items={deleteAccountItems.filter(item => item.visible)} />
        </ProfileMenuContainer>
      </SafeAreaView>
    </ScrollView>
  );
};

ProfileScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  }).isRequired
};

export default ProfileScreen;
