import React from 'react';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import ExchangeScreen from '../screens/ExchangeScreen'
import HomeScreen from '../screens/HomeScreen';
import {createDrawerNavigator} from 'react-navigation-drawer';
import Sidebar from './assets/Sidebar'
import SettingsScreen from './assets/SettingsScreen'

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

const AppDrawNavigator = createDrawerNavigator({
   Home: {
     screen: AppTabNavigator
   },
   Settings: {
     screen: SettingsScreen
   }
  },
  {
    contentComponent: Sidebar
  },
  {
    initialRouteName: 'Home'
  })
