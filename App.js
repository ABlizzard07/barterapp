import React from 'react';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import ExchangeScreen from '../screens/ExchangeScreen'
import HomeScreen from '../screens/HomeScreen';
import {createDrawerNavigator} from 'react-navigation-drawer';
import Sidebar from './assets/Sidebar'
import SettingsScreen from './assets/SettingsScreen'
import Barters from './screens/MyBarters'
import ReceiverDetails from './screens/ReceiverDetails'

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
   },
   MyBarters: {
     screen: Barters
   }
  },
  {
    contentComponent: Sidebar
  },
  {
    initialRouteName: 'Home'
  })

  const AppStackNavigator = createStackNavigator({
    ExchangeList : {
      screen : ExchangeScreen
    },
    ReceiverDetails : {
      screen : ReceiverDetails
    }
  },
    {
      initialRouteName: 'ExchangeList'
    }
  );
