import React from 'react';
import {StyleSheet, Text, View, TouchableHighlight, Image } from 'react-native';

const SideBarHeader = ({extraStyle, closing, textVal }) => {
  return <View style={styles.viewStyles}>
    <TouchableHighlight style={[styles.btnStyle, extraStyle]} onPress={closing}>
      <Image style={styles.btnImg} source={require('../../../../assets/images/closeImg.png')} resizeMode="cover"/>
    </TouchableHighlight>
    <Text style={styles.textStyle}>{textVal}</Text>
  </View>;
};

const styles = StyleSheet.create({
  viewStyles: {
    height: 60,
    maxHeight: 60,
    padding: 10,
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F0F2E8',
    position: 'relative'
  },
  btnStyle: {
    height: 40,
    width: 40,
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 10
  },
  btnImg: {
    flex: 1,
    alignSelf: 'stretch',
    width: undefined,
    height: undefined
  },
  textStyle: {
    fontSize: 20,
    textAlign: 'center',
    alignSelf: 'center',
    margin: 10
  }
});

export { SideBarHeader };