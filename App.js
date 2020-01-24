/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import StartNavigator from './src/public/navigators/Start';
import {Provider} from 'react-redux';
import store from './src/public/redux/store/index';

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <StartNavigator />
      </Provider>
    );
  }
}
