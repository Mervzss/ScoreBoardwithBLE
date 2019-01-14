import React, {Component} from 'react';

import Orientation from 'react-native-orientation'

import HomeView from './HomeView'

import TennisView from './src/Screens/TennisView'
import BasketBallView from './src/Screens/BasketBallView'
import VolleyBallView from './src/Screens/VolleyBallView'

import { createSwitchNavigator } from 'react-navigation'


export default class App extends Component{
  componentDidMount(){
    Orientation.lockToLandscape()
  }

  render() {
    return  <SwitchNav />
  }
}

const SwitchNav = createSwitchNavigator(
  {
    Home: HomeView,
    Tennis: TennisView,
    BasketBall: BasketBallView,
    VolleyBall: VolleyBallView
  },
  {
    initialRouteName:'Home'
  }
)


