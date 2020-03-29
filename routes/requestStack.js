import { createStackNavigator } from 'react-navigation-stack';
import React from 'react';
import Header from '../shared/header';
import Requests from '../screens/request/requests';
import RequestDetails from '../screens/request/requestDetails';

const screens = {
  Requests: {
    screen: Requests,
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: () => <Header title='Requests' navigation={navigation} />
      }
    },
  },
  RequestDetails: {
    screen: RequestDetails,
    navigationOptions: {
      title: 'RequestDetails',
    }
  }
}

const RequestStack = createStackNavigator(screens, {
  defaultNavigationOptions: {
    headerTintColor: '#444',
    headerStyle: { backgroundColor: '#eee', height: 60 },
  }
});

export default RequestStack;