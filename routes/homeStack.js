import { createStackNavigator } from 'react-navigation-stack';
import React from 'react';
import Header from '../shared/header';
import Home from '../screens/home';
import PostDetails from '../screens/post/postDetails'

const screens = {
  Home: {
    screen: Home,
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: () => <Header title='COGIV' navigation={navigation} />
      }
    },
  },
  PostDetails: {
    screen: PostDetails,
    navigationOptions: {
      title: 'Request Details',
    }
  },
};

// home stack navigator screens
const HomeStack = createStackNavigator(screens, {
  defaultNavigationOptions: {
    headerTintColor: '#ffffff',
    headerStyle: { backgroundColor: '#50B9D8', height: 60 },
    headerTitleStyle: { color: '#ffffff'},
  }
});

export default HomeStack;


