import React, {Component, useEffect} from 'react';
import {View, Image, Animated} from 'react-native';
import Login from './Login';
export default class SplashScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timePassed: false,
    };
  }

  ///////////////////////////////////////:

  ///////////////////////////////////////
  render() {
    setTimeout(() => {
      this.setState({timePassed: true});
    }, 4000);
    if (!this.state.timePassed) {
      return (
        <View
          style={{
            backgroundColor: 'white',
            height: '100%',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image
            source={require('../assets/Image/logo.png')}
            style={{height: '13%', width: '45%'}}
          />
        </View>
      );
    } else {
      return <Login />;
    }
  }
}
