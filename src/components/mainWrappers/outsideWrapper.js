import React, {Component} from 'react';
import {Dimensions, StyleSheet, Text, View } from 'react-native';

import KickoffView from '../general/kickoffView';
import LogInForm from '../forms/loginForm';
import SignInForm from '../forms/signInForm';


const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;


export default class OutsideWrapper extends Component{
  constructor(props){
    super(props);

    this.isFirstTime = true;

    this.state = {
      actualView: 'firstTime'
    }

    this.screenRender = this.screenRender.bind(this);
    this.toSomewhere = this.toSomewhere.bind(this);

  }

  componentWillMount(){
    if(!this.isFirstTime) this.setState({ actualView: 'login' });
  }

  toSomewhere(destiny){
    this.setState({actualView: destiny});
  }

  screenRender(){
    let viewToRender;
    switch(this.state.actualView){
      case "firstTime": 
        viewToRender = <KickoffView toSignin={this.toSomewhere} toLogin={this.toSomewhere} />
        break;

      case "login": 
        viewToRender = <LogInForm toSignin={this.toSomewhere} />
        break;

      case "signin": 
        viewToRender = <SignInForm />
        break;
    }
    
    return viewToRender;
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
    backgroundColor: '#F5FCFF',
    height: HEIGHT,
    width: WIDTH
  }
});
