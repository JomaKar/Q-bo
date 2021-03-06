import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import MainWrapper from './components/mainWrappers/mainWrapper.js';

export default class App extends Component{
  render() {
    return (
      <View style={styles.container} >
        <MainWrapper />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'green',
  }
});
