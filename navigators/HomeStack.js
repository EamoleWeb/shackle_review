import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import PropTypes from 'prop-types';

import useTabsLogic from './tabsLogic';
import tabStyles from './tabsStyles';

import ActivitiesScreen from '../screens/ActivitiesScreen';
import FoodScreen from '../screens/FoodScreen';

const PROP_TYPES = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  }).isRequired
};

const HomeStack = () => {
  const {
    setIndex,
    renderIndicator
  } = useTabsLogic();

  const Tab = createMaterialTopTabNavigator();

  return (
    <Tab.Navigator
      tabBarOptions={{
        renderIndicator,
        ...tabStyles
      }}>
      <Tab.Screen
        name='Activities'
        component={ActivitiesScreen}
        options={{title: 'ACTIVITIES'}}
        listeners={{
          focus: () => {
            setIndex(0);
          }
        }}
      />
      <Tab.Screen
        name='Food'
        component={FoodScreen}
        options={{title: 'FOOD & DRINK'}}
        listeners={{
          focus: () => {
            setIndex(1);
          }
        }}
      />
    </Tab.Navigator>
  );
};

HomeStack.propTypes = PROP_TYPES;

export default HomeStack;