# rn-expo-login-fb 🐳

![Stars](https://img.shields.io/github/stars/tquangdo/rn-expo-login-fb?color=f05340)
![Issues](https://img.shields.io/github/issues/tquangdo/rn-expo-login-fb?color=f05340)
![Forks](https://img.shields.io/github/forks/tquangdo/rn-expo-login-fb?color=f05340)
[![Report an issue](https://img.shields.io/badge/Support-Issues-green)](https://github.com/tquangdo/rn-expo-login-fb/issues/new)

## Usage
scan bar code on `expo go` appstore

## map with "developers.facebook.com"
### create "App ID"
1. access "https://developers.facebook.com/" > `My Apps`
2. click `Create App` (Ex: `RNFBLogin`)
3. Dashboard: copy `App ID`, paste to `components/Login.js`
### add SDK (just for react-native CLI )
1. access "https://developers.facebook.com/quickstarts" > `ios` > choose `RNFBLogin`
2. click "Download SDK"
### install package
- https://docs.expo.io/versions/latest/sdk/facebook/
- `$expo install expo-facebook`
- `components/Login.js: import * as Facebook from 'expo-facebook'`

## demos app
![demo](screenshots/demo.gif)
