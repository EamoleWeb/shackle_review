import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import EntryStack from './EntryStack';

import VerificationScreen from '../screens/VerificationScreen';
import SplashScreen from '../screens/SplashScreen';

const AuthenticationStack = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator headerMode={'none'}>
      <Stack.Screen
        name="SignIn"
        component={SplashScreen}
      />
      <Stack.Screen
        name="Entry"
        component={EntryStack}
      />
      <Stack.Screen
        name="Verification"
        component={VerificationScreen}
      />
    </Stack.Navigator>
  );
};

export default AuthenticationStack;