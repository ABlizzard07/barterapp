import React from 'react';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import ExchangeScreen from '../screens/ExchangeScreen'
import HomeScreen from '../screens/HomeScreen';



export const AppTabNavigator = createBottomTabNavigator({
  Home : {
    screen: HomeScreen,
    navigationOptions :{
      tabBarLabel : "Home",
    }
  },
  Exchange: {
    screen: ExchangeScreen,
    navigationOptions :{
      tabBarLabel : "Exchange",
    }
  }
});
