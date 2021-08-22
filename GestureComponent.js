import React, { Component } from 'react';
import {
    Animated,
    PanResponder, StyleSheet, View
} from 'react-native';
export default class GestureComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            staPan: new Animated.ValueXY(),//staPan is a Vector, (x,y) = coordinators 
            staScale: new Animated.Value(1)
        };
    }
    UNSAFE_componentWillMount() {
        const { staPan, staScale } = this.state
        this._panResponder = PanResponder.create({
            //Enable staPan gesture
            onMoveShouldSetResponderCapture: () => true,
            onMoveShouldSetPanResponderCapture: () => true,
            onPanResponderGrant: (evt, gestureState) => {
                //Start moving
                staPan.setOffset({
                    x: staPan.x._value,
                    y: staPan.y._value
                });
                //staPan is a Vector. (x, y) = vector's coordinate
                staPan.setValue({ x: 0, y: 0 });
                Animated.spring(
                    staScale,
                    {
                        toValue: 2.3, friction: 3, useNativeDriver: false,
                    }
                ).start();
            },
            onPanResponderMove: Animated.event([
                //Moving
                null, // raw event arg ignored
                { dx: staPan.x, dy: staPan.y },//dx, dy is gestureState             
            ],
                { useNativeDriver: false }),
            onPanResponderRelease: (evt, gestureState) => {
                //Call when stop moving = "release your finger"
                //Merges the offset value into the base value and resets the offset to zero
                staPan.flattenOffset();
                Animated.spring(
                    staScale,
                    {
                        toValue: 1, friction: 3, useNativeDriver: false,
                    }
                ).start();
            }
        });
    }
    render() {
        const { staPan, staScale } = this.state
        return (<View style={styles.container}>
            <Animated.View style={[styles.animatedView,
            {
                transform: [
                    { translateX: staPan.x },
                    { translateY: staPan.y },
                    { scale: staScale },
                ]
            }]}
                {...this._panResponder.panHandlers}
            >
            </Animated.View >
        </View>)
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginVertical: 40
    },
    animatedView: {
        height: 50,
        width: 50,
        borderRadius: 50,
        position: 'absolute',
        backgroundColor: 'steelblue',
    }
});