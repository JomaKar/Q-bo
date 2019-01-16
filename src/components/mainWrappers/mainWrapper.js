import React, {Component} from 'react';

import firebase from "firebase";

import {Dimensions, StyleSheet, Text, View, Button } from 'react-native';

import InsideWrapper from './insideWrapper';
import OutsideWrapper from './outsideWrapper';


const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;


export default class MainWrapper extends Component{
  constructor(props){
    super(props);

    this.state = { loggedIn: false};
    this.screenRender = this.screenRender.bind(this);

  }
  componentWillMount(){
    var config = {
      apiKey: "AIzaSyCTiZOPa6tOzkJPEK4WeyO5ikoncbQQWgw",
      authDomain: "qbogallery.firebaseapp.com",
      databaseURL: "https://qbogallery.firebaseio.com",
      projectId: "qbogallery",
      storageBucket: "qbogallery.appspot.com",
      messagingSenderId: "16982529749"
    };

    firebase.initializeApp(config);

    firebase.auth().onAuthStateChanged(user => {
      console.log(user);
      (user) ? this.setState({loggedIn: true}) : this.setState({loggedIn: false});
    });
  }

  screenRender(){
    return (this.state.loggedIn) ? <InsideWrapper /> : <OutsideWrapper />;
  }

  render() {
    return (
      <View style={styles.container} >
        {this.screenRender()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FEA7AA',
    height: HEIGHT,
    width: WIDTH
  }
});
