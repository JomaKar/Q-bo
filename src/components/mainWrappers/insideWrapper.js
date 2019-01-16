import React, {Component} from 'react';

import firebase from "firebase";

import {Dimensions, ScrollView, TouchableHighlight, Image, StyleSheet, Text, View } from 'react-native';
import {TopHeader} from '../common';

import LeftSideBar from '../sidebars/leftSidebarMenu';
import RightSideBar from '../sidebars/rightSidebarMenu';
import CubeButton from '../general/cubeButton';
import CubeKitchen from '../cubeCooking/CubeKitchen';
import CubesGallery from '../gallery/CubesGallery';
import RotateCube from '../cube/viewCube';


const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

export default class InsideWrapper extends Component{
  constructor(props){
    super(props);

    this.state = {
      isRightOpen: false,
      isLeftOpen: false,
      isCubeView: false,
      cubes: [],
      lonelyCube: {},
      showLonelyCube: false
    };

    this.sideBarsRender = this.sideBarsRender.bind(this);
    this.showRighSideBar = this.showRighSideBar.bind(this);
    this.showLeftSideBar = this.showLeftSideBar.bind(this);
    this.toCreateCube = this.toCreateCube.bind(this);
    this.toCancelCube = this.toCancelCube.bind(this);
    this.savingACube = this.savingACube.bind(this);
    this.showTheCube = this.showTheCube.bind(this);
    this.hideTheCube = this.hideTheCube.bind(this);
    this.createCubeViewRender = this.createCubeViewRender.bind(this);
    this.exitApp = this.exitApp.bind(this);
  }

  exitApp(){
    firebase.auth().signOut();
  }

  toCreateCube(){
    this.setState({ isCubeView : true });
  }

  toCancelCube(){
    this.setState({ isCubeView : false });
  }

  savingACube(cubeObj){
    let theCubes = this.state.cubes;
    theCubes.push(cubeObj);
    this.setState({ cubes: theCubes });
  }

  showTheCube(cube){
    console.log('showTheCube', cube);
    this.setState({lonelyCube: cube, showLonelyCube: true});
  }

  hideTheCube(){
    this.setState({lonelyCube: {}, showLonelyCube: false});
  }

  solelyCubeRender(){
    return (this.state.showLonelyCube) ? 
              <View style={styles.lonelyCubeWrapper}>
                <TouchableHighlight style={styles.btnStyle} onPress={this.hideTheCube}>
                  <Image style={styles.btnImg} source={require('../../../assets/images/closeImgWhite.png')} resizeMode="cover"/>
                </TouchableHighlight>
                <RotateCube theFaces={this.state.lonelyCube} />
              </View>
              : null;
  }

  createCubeViewRender(){
    return (this.state.isCubeView) ? 
      <CubeKitchen saveCube={this.savingACube} cancelCreation={this.toCancelCube} /> 
      : 
      (!this.state.cubes.length ? 
          <View style={styles.mainView}>
              <Text style={{textAlign: 'center'}}>You are inside!</Text>
          </View> 
          : 
          <CubesGallery showOneCube={this.showTheCube} cubes={this.state.cubes} />);
  }

  sideBarsRender(){
    if(this.state.isLeftOpen){
      return <LeftSideBar onClose={() => this.setState({isLeftOpen: false})} />
    }else if(this.state.isRightOpen){
      return <RightSideBar onClose={() => this.setState({isRightOpen: false})} toExit={this.exitApp} />
    }

    return null;
  }

  showLeftSideBar(){
    this.setState({ isLeftOpen: true});
  }

  showRighSideBar(){
    this.setState({ isRightOpen: true});
  }
  
  render() {
    return (
      <View style={styles.container} >
        <TopHeader showLeft={this.showLeftSideBar} showRight={this.showRighSideBar} />
        {this.sideBarsRender()}
        {this.solelyCubeRender()}
        {this.createCubeViewRender()}
        <CubeButton onClick={this.toCreateCube} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5FCFF',
    height: HEIGHT,
    width: WIDTH,
    position: 'relative'
  },
  mainView: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignContent: 'center',
    zIndex: 2
  },
  lonelyCubeWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: HEIGHT,
    width: WIDTH,
    backgroundColor: 'black',
    zIndex: 22
  },
  btnStyle: {
    height: 40,
    width: 40,
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 15,
    left: 15
  },
  btnImg: {
    flex: 1,
    alignSelf: 'stretch',
    width: undefined,
    height: undefined
  },
});
