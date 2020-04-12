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
        headerTitle: () => <Header title='MyPosts' navigation={navigation} />
      }
    },
  },
  MyPostDetails: {
    screen: MyPostDetails,
    navigationOptions: {
      title: 'MyPostDetails',
    }
  }
}

const MyPostStack = createStackNavigator(screens, {
  defaultNavigationOptions: {
    headerTintColor: '#444',
    headerStyle: { backgroundColor: '#eee', height: 60 },
  }
});

export default MyPostStack;