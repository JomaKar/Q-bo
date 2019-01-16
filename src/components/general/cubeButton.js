import React from 'react';
import {StyleSheet, View, Text, TouchableHighlight, Image } from 'react-native';

const CubeButton = ({ onClick }) => {
  return <View style={styles.wrapper}>
          <TouchableHighlight style={styles.btnStyle} onPress={onClick}>
            <Image style={styles.btnImg} source={require('../../../assets/images/buttonCube.png')} resizeMode="cover"/>
          </TouchableHighlight>
        </View>;
};

const styles = StyleSheet.create({
  wrapper:{
    position: 'absolute',
    bottom: 15,
    right: 15,
    height: 50,
    width: 50,
    zIndex: 3
  },
  btnStyle: {
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent'
  },
  btnImg: {
    flex: 1,
    alignSelf: 'stretch',
    width: undefined,
    height: undefined
  }
});

export default CubeButton;

