import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import Engineer from './Engineer';
import Icon from 'react-native-vector-icons/Ionicons';
import {View} from 'react-native';
import Home from '../../screens/Home';

const AppNavigator = createMaterialTopTabNavigator(
  {
    Engineer: {
      screen: Home,
      navigationOptions: {
        tabBarLabel: 'Engineer',
        tabBarIcon: ({tintColor}) => (
          <View>
            <Icon style={[{color: tintColor}]} size={25} name={'ios-home'} />
          </View>
        ),
      },
    },
    Company: {
      screen: Engineer,
      navigationOptions: {
        tabBarLabel: 'Company',
        tabBarIcon: ({tintColor}) => (
          <View>
            <Icon style={[{color: tintColor}]} size={25} name={'ios-home'} />
          </View>
        ),
      },
    },
  },
  {
    initialRouteName: 'Engineer',
    tabBarOptions: {
      activeTintColor: 'white',
      showIcon: true,
      showLabel: true,
    },
  },
);
export default createAppContainer(AppNavigator);
