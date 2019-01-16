import React from 'react';
import {Dimensions, StyleSheet, Button, Text, View, TouchableHighlight, TextInput, Image} from 'react-native';

import { SideBarHeader } from '../common';

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

const RightSideBar = ({ toWhere, onClose, toExit }) => {


  return <View style={styles.viewStyles}>
          <View style={styles.blackBox}></View>
          <View style={styles.sideBar}>
            <SideBarHeader closing={onClose} extraStyle={styles.headerStyle} textVal="Perfil" />
            <Button title="Cerrar" onPress={toExit}/>
          </View>
        </View>;
}

const styles = StyleSheet.create({
  viewStyles: {
    width: WIDTH,
    height: HEIGHT,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    position: 'absolute',
    left: 0,
    top: 0,
    zIndex: 5
  },
  sideBar: {
    flex: 4,
    height: HEIGHT,
    backgroundColor: 'white',
    flexDirection: 'column'
  },
  blackBox: {
    flex: 1,
    height: HEIGHT,
    backgroundColor: 'black',
    opacity: 0.8
  },
  headerStyle: {
    right: 10
  }
});

export default RightSideBar;