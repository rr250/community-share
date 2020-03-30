import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
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
  }
};

// home stack navigator screens
const AuthStack = createStackNavigator(screens, {
  defaultNavigationOptions: {
    headerTintColor: '#444',
    headerStyle: { backgroundColor: '#eee', height: 60 }
  }
});

export default createAppContainer(AuthStack);


