import { createAppContainer } from 'react-navigation'; // phai co "yarn add react-native-gesture-handler"
import { createStackNavigator } from 'react-navigation-stack';
import Splash from './components/Splash';
import Login from './components/Login';

const AppNavigator = createStackNavigator({
  //Screens   
  Splash: {
    screen: Splash
  },
  Login: {
    screen: Login
  },
}, {
  //settings
  initialRouteName: 'Splash'
})
export default createAppContainer(AppNavigator)
// HOC (Higher Order Component): bien AppNavigator thanh 1 container, trong do all states se -> props
// components/Splash.js: this.props.navigation.navigate("Login")