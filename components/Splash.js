import React, { Component } from 'react';
import {
  Animated, Dimensions, StyleSheet, View
} from 'react-native';
//colors 
import { COLOR_PINK_LIGHT, COLOR_PINK_MEDIUM } from './myColors';

const { height } = Dimensions.get('window')
export default class Splash extends Component {
  static navigationOptions = {
    headerShown: false,
  }
  state = {
    staLogoOpacity: new Animated.Value(0),
    staTitleMarginTop: new Animated.Value(height / 2)
  }
  async componentDidMount() {
    const { staLogoOpacity, staTitleMarginTop } = this.state
    //Add animations here
    Animated.sequence([
      Animated.timing(staLogoOpacity, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      }),
      Animated.timing(staTitleMarginTop, {
        toValue: 10,
        duration: 1000,
        useNativeDriver: false,
      })
    ]).start(() => {
      //End of animations
      this.props.navigation.navigate("Login")
    })
  }
  render() {
    const { staLogoOpacity, staTitleMarginTop } = this.state
    return <View style={styles.container}>
      <Animated.Image source={require('../assets/images/logo.png')}
        style={{ ...styles.logo, opacity: staLogoOpacity }}>
      </Animated.Image>
      <Animated.Text style={{
        ...styles.title,
        marginTop: staTitleMarginTop
      }}>
        Share images to everyone
      </Animated.Text>
    </View>
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLOR_PINK_LIGHT
  },
  logo: {
    width: 130,
    height: 130,
    borderRadius: 130 / 2,
  },
  title: {
    color: COLOR_PINK_MEDIUM,
    marginTop: 10,
    textAlign: 'center',
    width: 400,
    fontSize: 21
  }
})