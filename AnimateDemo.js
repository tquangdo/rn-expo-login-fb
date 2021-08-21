import React, { Component } from 'react';
import {
  Animated, Dimensions, Easing, StatusBar, StyleSheet,
  Text, TouchableOpacity,
  View
} from 'react-native';
var { width } = Dimensions.get('window');

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      staXValue: new Animated.Value(0),
      staSpringValue: new Animated.Value(0.5),
      staRotateValue: new Animated.Value(0),
    }
  }
  _moveAnimation = () => {
    const { staXValue } = this.state
    Animated.timing(staXValue, {
      toValue: width - 100,
      duration: 1000,
      // easing: Easing.back(),
      easing: Easing.cubic,
      useNativeDriver: false,
    }).start(() => {
      Animated.timing(staXValue, {
        toValue: 0,
        duration: 1000,
        easing: Easing.cubic,
        useNativeDriver: false,
      }).start(() => {
        this._moveAnimation();
      });
    });
  }
  _rotateAnimation = () => {
    const { staRotateValue } = this.state
    Animated.sequence([
      Animated.timing(staRotateValue, {
        toValue: 100,
        duration: 2000,
        useNativeDriver: false,
      }),
      Animated.timing(staRotateValue, {
        toValue: 0,
        duration: 0,
        useNativeDriver: false,
      }),
    ]).start(() => {
      this._rotateAnimation();
    });
  }
  _moveAndRotateAnimation = () => {
    Animated.parallel([
      this._moveAnimation(),
      this._rotateAnimation()
    ]).start();
  }
  _springAnimation = () => {
    Animated.spring(this.state.staSpringValue, {
      toValue: 1.5,
      friction: 1,
      useNativeDriver: false,
    }).start();
  }

  render() {
    const { staRotateValue, staSpringValue, staXValue } = this.state
    const interpolatedRotateAnimation = staRotateValue.interpolate({
      inputRange: [0, 100],
      outputRange: ['0deg', '360deg'],
    });
    return (
      <>
        <StatusBar barStyle='dark-content' />
        <View style={styles.container}>
          <Animated.Image
            source={require('./assets/images/logo.png')}
            // style={[styles.imageView, // co 2 cach style. C1: array
            // { transform: [{ scale: staSpringValue }], alignSelf: 'center' },
            // ]}>
            style={{  // co 2 cach style. C2: destructuring array
              ...styles.imageView,
              left: staXValue,
              transform: [{ rotate: interpolatedRotateAnimation }],
            }
            }>
          </Animated.Image>
          <TouchableOpacity style={styles.button}
            onPress={this._moveAndRotateAnimation}
          // onPress={this._springAnimation}
          // onPress={this._moveAnimation}
          >
            <Text style={styles.buttonText}>Animate</Text>
          </TouchableOpacity>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  animationView: {
    width: 100,
    height: 100,
    backgroundColor: 'skyblue',
  },
  button: {
    backgroundColor: "steelblue",
    height: 45,
    marginTop: 20,
    alignSelf: "center"
  },
  buttonText: {
    color: 'white',
    padding: 12,
    paddingHorizontal: 20,
    fontWeight: 'bold',
    fontSize: 18
  },
  imageView: {
    width: 100,
    height: 100,
    backgroundColor: 'transparent',
  }
});