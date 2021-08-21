import React, { Component } from 'react';
import { Animated, StyleSheet, View } from 'react-native';

export default class StaggerComponent extends Component {
  constructor(props) {
    super(props);
    let tmpAnimatedValues = [];
    for (let i = 0; i < 1000; i++) {
      tmpAnimatedValues.push(new Animated.Value(0));//We will have 1000 views for animations
    }
    this.state = {
      staAnimatedValues: tmpAnimatedValues
    };
  }
  componentDidMount() {
    this._staggerAnimate();
  }
  _staggerAnimate = () => {
    const tmpAnimations = this.state.staAnimatedValues.map((item_animated_value) => {
      //Convert item_animated_value to Animate.timing
      return Animated.timing(
        item_animated_value,
        {
          toValue: 1,
          duration: 500,
          useNativeDriver: false,
        }
      )
    });
    Animated.stagger(10, tmpAnimations).start();//Animation1 start, after 10ms, Animation2 start, ...
  }
  render() {
    const tmpAnimatedViews = this.state.staAnimatedValues.map((item_animated_value, index) => {
      return <Animated.View
        key={index}
        style={[styles.animatedView, {
          opacity: item_animated_value,
          backgroundColor: index % 2 === 0 ? 'skyblue' : 'steelblue'
        }]}
      />
    });
    return (
      <View style={styles.container}>
        {tmpAnimatedViews}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',   //This automatically wrap next line of "circle's views"
    marginVertical: 40
  },
  animatedView: {
    height: 12,
    width: 12,
    borderRadius: 6,
    margin: 3
  }
})