import { createStackNavigator } from 'react-navigation-stack';
import React from 'react';
import Header from '../shared/header';
import Home from '../screens/home';
import Login from '../screens/auth/login';
import VerifyOtp from '../screens/auth/verifyOtp';
import SignUp from '../screens/auth/signup';

const screens = {
  Login: {
    screen: Login,
    navigationOptions: {
      title: 'Login',
    }
  },
  VerifyOtp: {
    screen: VerifyOtp,
    navigationOptions: {
      title: 'VerifyOtp',
    }
  },
  SignUp: {
    screen: SignUp,
    navigationOptions: {
      title: 'SignUp',
    }
  },
  Home: {
    screen: Home,
    headerLeft: null,
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: () => <Header title='Community Share' navigation={navigation} />
      }
    },
  },
};

// home stack navigator screens
const HomeStack = createStackNavigator(screens, {
  defaultNavigationOptions: {
    headerTintColor: '#444',
    headerStyle: { backgroundColor: '#eee', height: 60 }
  }
});

export default HomeStack;


