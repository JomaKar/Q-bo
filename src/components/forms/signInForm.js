import React, {Component} from 'react';

import firebase from "firebase";

import {Dimensions, StyleSheet, Text, View, Button, ImageBackground } from 'react-native';

import BasicInfoForm from './signInFormSections/basicInfoForm';
// import PhotoSelection from './profilePhotoSelection';
// import InterestSelection from './interestSelection';


const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;


export default class SignInForm extends Component{
  constructor(props){
    super(props);

    this.state = {
      actualFormView: 'basic',
      user: {email: '', password: ''},
      errorMsg: null
    };

    this.screenRender = this.screenRender.bind(this);
    this.fillingForm = this.fillingForm.bind(this);
    this.attemptToSignIn = this.attemptToSignIn.bind(this);
    this.renderError = this.renderError.bind(this);

  }

  fillingForm(data){
    this.setState({ user: data });
  }

  attemptToSignIn(){
    let { email, password} = this.state.user;

    if(!email || !password) return;
    if(!email.length || !password.length) return;

    firebase.auth().createUserWithEmailAndPassword(email, password)
        .catch((err) => {
          this.setState({errorMsg: err.message});
        });
  }

  renderError(){
    return (this.state.errorMsg) ? <Text>{this.state.errorMsg}</Text> : null;
  }


  screenRender(){
    let viewToRender;
    switch(this.state.actualFormView){
      case "basic": 
        viewToRender = (!this.state.user) ? null : <BasicInfoForm onFilling={this.fillingForm} account={this.state.user} />
        break;

      // case "photo": 
      //   viewToRender = <PhotoSelection />
      //   break;

      // case "interests":
      //   viewToRender = <InterestSelection />
      //   break;
    }
    
    return viewToRender;
  }
  
  render() {
    return (
      <View style={styles.container} >
        <View style={styles.topImageContainer}>
          <ImageBackground style={styles.topImageStyle} source={require('../../../assets/images/triangle.png')} resizeMode="cover">
            <Text style={styles.imageTex}>Registro</Text>
          </ImageBackground>
        </View>
        {this.screenRender()}
        {this.renderError()}
        <Button style={styles.buttonSignIn} onPress={this.attemptToSignIn} title='Regístrate' color='black' />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F2E8',
    height: HEIGHT,
    width: WIDTH
  },
  topImageContainer: {
    marginBottom: 15,
    height: '20%',
    width: '80%',
    alignSelf: 'center'
  },
  topImageStyle: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
    width: undefined,
    height: undefined
  },
  imageTex: {
    textAlign: 'center',
    alignSelf: 'center'
  },
  buttonSignIn: {
    width: '70%',
    fontSize: 15,
    paddingTop: 10,
    height: 60,
    backgroundColor: '#2FC0B5',
    borderColor: '#2FC0B5',
    color: 'white'
  }
});
