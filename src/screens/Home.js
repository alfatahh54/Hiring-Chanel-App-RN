import React from 'react';
import {StatusBar, SafeAreaView} from 'react-native';
import Series from './Engineer';
class HomeScreen extends React.Component {
  render() {
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <Series />
        </SafeAreaView>
      </>
    );
  }
}
export default HomeScreen;
