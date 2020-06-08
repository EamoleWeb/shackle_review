import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import {StyleSheet, Image} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import ProfileStack from '../navigators/ProfileStack';

import MapScreen from '../screens/MapScreen';
import BookingsStack from './BookingsStack';
import ExploreStack from './ExploreStack';
import assets from '../components/assets';

const BottomButtonsNav = () => {

  const homeIcon = assets.icons.shackle;

  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      barStyle={styles.barStyle}
      headerMode={'none'}
      initialRouteName="Home"
      tabBarOptions={{
        showLabel: false,
        style: {height: 80}
      }}
    >
      <Tab.Screen

        name="Map"
        component={MapScreen}
        options={{
          // eslint-disable-next-line react/display-name
          tabBarIcon: () => {
            return (<Icon size={24.45} color={'#D7D9Da'} focused={false} name="compass"/>);
          }
        }}
      />
      <Tab.Screen
        name="My Bookings"
        component={BookingsStack}
        // eslint-disable-next-line react/display-name
        options={{tabBarIcon: () => {
          return (<Icon size={24.45} color={'#D7D9Da'} focused={false} name="ticket"/>);
        }}
        }/>
      <Tab.Screen
        name="Home"
        component={ExploreStack}
        options={{
          // eslint-disable-next-line react/display-name
          tabBarIcon: () => {
            return (<Image style={styles.homeIcon} source={homeIcon}/>);
          }
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={ExploreStack}
        options={{
          // eslint-disable-next-line react/display-name
          tabBarIcon: () => {
            return (<Icon size={24.45} color={'#D7D9Da'} focused={false} name="bell"/>);
          }
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          // eslint-disable-next-line react/display-name
          tabBarIcon: () => {
            return (<Icon size={24.45} color={'#D7D9Da'} focused={false} name="user-circle"/>);
          }
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomButtonsNav;

const styles = StyleSheet.create({
  barStyle: {
    height: 100,
    backgroundColor: 'green'
  },
  homeIcon: {
    width: 41.28,
    height: 46.45
  }
});