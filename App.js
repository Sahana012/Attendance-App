import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';

import HomeScreen from './components/HomeScreen'
import SummaryScreen from './components/SummaryScreen'
import { createAppContainer, createSwitchNavigator} from 'react-navigation';

export default class App extends React.Component{
  render(){
    return(
      <View>
      <AppContainer/>
      </View>
    );
  }
}

var AppNavigator = createSwitchNavigator({
  HomeScreen:HomeScreen,
  SummaryScreen:SummaryScreen,
})

const AppContainer = createAppContainer(AppNavigator)