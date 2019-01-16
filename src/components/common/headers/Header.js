import React from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

const Header = (props) => <View style={styles.viewStyles}><Text style={styles.textStyle}>{props.theTitle}</Text></View>;

const styles = StyleSheet.create({
  viewStyles: {
    width: WIDTH,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 15,
    backgroundColor: '#f8f8f8',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    elevation: 2,
    position: 'relative'
  },
  textStyle: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  }
});

export { Header };