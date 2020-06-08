import React from 'react';
import PropTypes from 'prop-types';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialIcons';

import ProfileScreen from '../screens/ProfileScreen';
import MyDetailsScreen from '../screens/MyDetailsScreen';

import { Colors } from '../styling';

const PROP_TYPES = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  }).isRequired
};
const ProfileStack = () => {

  const Stack = createStackNavigator();

  return (
    <Stack.Navigator >
      <Stack.Screen
        name='Profile'
        component={ProfileScreen}
        options={{
          headerTitle: null,
          headerTransparent: true,
          headerBackImage: null
        }}
      />
      <Stack.Screen
        name="My Details"
        component={MyDetailsScreen}
        options={{
          headerTitle: 'MY DETAILS',
          headerStyle: {
            height: 132
          },
          headerLeftContainerStyle: {
            marginLeft: 18
          },
          // eslint-disable-next-line react/display-name
          headerBackImage: () => <><Icon
            name='arrow-back'
            color={Colors.gray}
            size={25}
          /></>
        }}
      />
    </Stack.Navigator>
  );
};

ProfileStack.propTypes = PROP_TYPES;

export default ProfileStack;