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
      title: 'Verify Otp',
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
    headerTintColor: '#ffffff',
    headerStyle: { backgroundColor: '#50B9D8', height: 60 },
    headerTitleStyle: { color: '#ffffff'}
  }
});

export default createAppContainer(AuthStack);


