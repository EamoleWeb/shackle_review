import React from 'react';
import { Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import MySnackBar from '../components/MySnackBar';
import AuthenticationStack from './AuthenticationStack';
import useLogic from './logic';
import PostAuthenticationStack from './PostAuthenticationStack';
import StatusBar from './StatusBar';
import LoadingScreen from '../screens/LoadingScreen';

const navigators = () => {
  const { user } = useLogic();

  return (
    <NavigationContainer>
      {Platform.OS === 'ios' && <StatusBar />}
      {user === null ? (
        <AuthenticationStack />
      ) : (
        <PostAuthenticationStack />
      )}
      <MySnackBar />
      <LoadingScreen/>
    </NavigationContainer>
  );
};

export default navigators;
