import { createStackNavigator } from '@react-navigation/stack';
import PropTypes from 'prop-types';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ActivityScreen from '../screens/ActivityScreen';
import SearchResultsScreen from '../screens/SearchResultsScreen';
import { Colors } from '../styling';
import HomeStack from './HomeStack';

const PROP_TYPES = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  }).isRequired
};
const ExploreStack = () => {

  const Stack = createStackNavigator();

  return (
    <Stack.Navigator >
      <Stack.Screen
        name="Home"
        component={HomeStack}
        options={
          {
            headerTitle: null,
            headerTransparent: true,
            headerBackImage: null
          }
        }
      />
      <Stack.Screen
        name="Activity"
        component={ActivityScreen}
        options={
          {
            headerTitle: null,
            headerTransparent: true,
            headerLeftContainerStyle: {marginLeft: 18},
            // eslint-disable-next-line react/display-name
            headerBackImage: () => <><Icon
              name='arrow-back'
              color={Colors.white}
              size={25}
            /></>
          }

        }
      />
      <Stack.Screen
        name="SearchResults"
        component={SearchResultsScreen}
      />
    </Stack.Navigator>

  );

};

ExploreStack.propTypes = PROP_TYPES;

export default ExploreStack;