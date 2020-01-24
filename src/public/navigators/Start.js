import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Login from '../../screens/Login';
import Register from '../../screens/Register';
import Main from './Main';
import SingleSeries from '../../screens/SingleSeries';
import EditEngineer from '../../screens/EditEngineer';

const AppNavigator = createStackNavigator(
  {
    Login: {
      screen: Login,
      navigationOptions: {
        headerShown: false,
      },
    },
    Register: {
      screen: Register,
      navigationOptions: {
        headerShown: false,
      },
    },
    Main: {
      screen: Main,
      navigationOptions: {
        headerTitle: 'Hiring Chanel App',
      },
    },
    SingleSeries: {
      screen: SingleSeries,
    },
    EditEngineer,
  },
  {
    initialRoutname: 'Login',
    defaultNavigatonOption: {
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  },
);
const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;
