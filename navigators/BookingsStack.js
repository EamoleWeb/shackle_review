import { createStackNavigator } from '@react-navigation/stack';
import React, { Component } from 'react';
import BookingsScreen from '../screens/BookingsScreen';

class BookingsStack extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const Stack = createStackNavigator();
    return (
      <Stack.Navigator headerMode={'none'}>
        <Stack.Screen
          name='My Bookings'
          component={BookingsScreen}

        />
      </Stack.Navigator>
    );
  }
}

export default BookingsStack;