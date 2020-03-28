import { createStackNavigator } from 'react-navigation-stack';
import React from 'react';
import Header from '../shared/header';
import Helps from '../screens/help/helps.js';

const screens = {
  About: {
    screen: Helps,
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: () => <Header title='Helps' navigation={navigation} />
      }
    },
  },
}

const HelpStack = createStackNavigator(screens, {
  defaultNavigationOptions: {
    headerTintColor: '#444',
    headerStyle: { backgroundColor: '#eee', height: 60 },
  }
});

export default HelpStack;