import React, {Component} from 'react';

import firebase from "firebase";

import {Dimensions, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

import Carousel from '../cube/Carousel';

import { TheButton } from '../common';


const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

export default class GalleryCubeItm extends Component{
  constructor(props){
    super(props);
    console.log(props);
    this.state = {
      cubeFaces: props.data.item.faces,
      photos: props.data.item.images
    };
    this.showCube = this.showCube.bind(this);
  }

  showCube(){
    this.props.onShowCube(this.state.cubeFaces);
  }
  
  render() {
    return (
      <View style={styles.topView}>
        <Carousel images={this.state.photos} />
        <TouchableOpacity style={styles.changeViewBtn} onPress={this.showCube}>
          <Image style={styles.simpleImage} source={require('../../../assets/images/buttonCubeWhite.png')} />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  topView: {
    width: WIDTH - 20,
    height: 250,
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: '#4ED5D7', 
    position: 'relative',
    marginBottom: 20
  },
  simpleImage: {
    flex: 1,
    alignSelf: 'stretch',
    width: undefined,
    height: undefined
  },
  changeViewBtn: {
    width: 40,
    height: 40,
    position: 'absolute',
    bottom: 10,
    right: 10,
    borderRadius: 30,
    zIndex: 3
  }
});
