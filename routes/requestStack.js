import { createStackNavigator } from 'react-navigation-stack';
import React from 'react';
import Header from '../shared/header';
import Requests from '../screens/request/requests';

const screens = {
  About: {
    screen: Requests,
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: () => <Header title='Requests' navigation={navigation} />
      }
    },
  },
}

const RequestStack = createStackNavigator(screens, {
  defaultNavigationOptions: {
    headerTintColor: '#444',
    headerStyle: { backgroundColor: '#eee', height: 60 },
  }
});

export default RequestStack;