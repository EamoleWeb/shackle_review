import React from 'react';
import PropTypes from 'prop-types';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import SignInScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignupScreen';

import tabStyles from './tabsStyles';
import useTabsLogic from './tabsLogic';

const PROP_TYPES = {
  route: PropTypes.shape({
    params: PropTypes.object.isRequired
  }).isRequired
};

const EntryStack = ({route}) => {
  const {
    setIndex,
    renderIndicator
  } = useTabsLogic(route, {
    initRouteName: 'SignIn',
    initIndex: 1
  });

  const Tab = createMaterialTopTabNavigator();

  return (
    <Tab.Navigator
      initialRouteName={route.params.initialRoute}
      tabBarOptions={{
        renderIndicator,
        ...tabStyles
      }}
    >
      <Tab.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{title: 'SIGN UP'}}
        listeners={{
          focus: () => {
            setIndex(0);
          }
        }}
      />
      <Tab.Screen
        name="SignIn"
        component={SignInScreen}
        options={{title: 'SIGN IN'}}
        listeners={{
          focus: () => {
            setIndex(1);
          }
        }}
      />
    </Tab.Navigator>
  );
};

EntryStack.propTypes = PROP_TYPES;

export default EntryStack;