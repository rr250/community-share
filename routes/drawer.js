import { createDrawerNavigator } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';

// stacks
import HomeStack from './homeStack';
import AboutStack from './aboutStack';
import RequestStack from './requestStack';
import HelpStack from './helpStack';
import ProfileStack from './profileStack';

// drawer navigation options
const RootDrawerNavigator = createDrawerNavigator({
  Home: {
    screen: HomeStack,
  },
  Request: {
    screen: RequestStack,
  },
  Help: {
    screen: HelpStack,
  },
  Profile: {
    screen: ProfileStack,
  },
  About: {
    screen: AboutStack,
  },
});

export default createAppContainer(RootDrawerNavigator);