import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import OnboardScreen from '../screens/OnboardScreen';
import BottomButtonsNav from './BottomButtonsNav';

const PostAuthenticationStack = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator headerMode={'none'}>

      {  /*<Stack.Screen
        name="stripe"
        component={CardFormScreen}
    />*/}

      { <Stack.Screen
        name="Interests"
        component={OnboardScreen}
      />}

      <Stack.Screen
        name="Activities"
        component={BottomButtonsNav}
      />
    </Stack.Navigator>
  );
};

export default PostAuthenticationStack;