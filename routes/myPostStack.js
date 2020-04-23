import { createStackNavigator } from 'react-navigation-stack';
import React from 'react';
import Header from '../shared/header';
import MyPosts from '../screens/myPost/myPosts.js';
import MyPostDetails from '../screens/myPost/myPostDetails'

const screens = {
  MyPosts: {
    screen: MyPosts,
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: () => <Header title='COGIV' navigation={navigation} />
      }
    },
  },
  MyPostDetails: {
    screen: MyPostDetails,
    navigationOptions: {
      title: 'My Request Details',
    }
  }
}

const MyPostStack = createStackNavigator(screens, {
  defaultNavigationOptions: {
    headerTintColor: '#ffffff',
    headerStyle: { backgroundColor: '#50B9D8', height: 60 },
    headerTitleStyle: { color: '#ffffff'}
  }
});

export default MyPostStack;