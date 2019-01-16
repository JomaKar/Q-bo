import React, {Component} from 'react';

import firebase from "firebase";

import {Dimensions, StyleSheet, Text, View, Button, Image } from 'react-native';

import SimpleLoginForm from './loginFormSections/SimpleLoginForm';
import AccountsView from './loginFormSections/AccountsView';

import { TheButton } from '../common';


const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;


export default class LogInForm extends Component{
  constructor(props){
    super(props);

    this.state = {
      onStarting: true,
      registeredAccounts: [{
        email: 'chema@multiplica.com',
        password: 'chema123',
        name: 'Chema',
        keyId: 'wejkñk2l3j4'
      }],
      user: {email: '', password: '', name: ''},
      selectedAccount: {email: '', password: '', name: ''},
      errorMsg: null
    }

    this.screenRender = this.screenRender.bind(this);
    this.buttonsRender = this.buttonsRender.bind(this);
    this.selectingAccount = this.selectingAccount.bind(this);
    this.fillingForm = this.fillingForm.bind(this);
    this.attemptLogIn = this.attemptLogIn.bind(this);
    this.renderError = this.renderError.bind(this);

  }


  screenRender(){
    return (this.state.onStarting) ? 
        <AccountsView accounts={this.state.registeredAccounts} onSelection={this.selectingAccount} />
        : 
        <SimpleLoginForm account={this.state.selectedAccount} onFilling={this.fillingForm} />;
    // 
  }

  selectingAccount(account){
    this.setState({ onStarting: false, selectedAccount: account, user: account });
  }

  fillingForm(data){
    this.setState({ user: data, selectedAccount: data });
  }

  attemptLogIn(){
    let { email, password} = this.state.user;

    if(!email|| !password) return;
    if(!email.length || !password.length) return;

    firebase.auth().signInWithEmailAndPassword(email, password)
      .catch((authErr) => this.setState({errorMsg: authErr.message}) );
  }

  renderError(){
    return (this.state.errorMsg) ? <Text>{this.state.errorMsg}</Text> : null;//
  }

  buttonsRender(){
    // console.log('buttonsRender', this.state.onStarting);
    return (this.state.onStarting) ? 
        <View style={styles.oneButtonWrapper}>
          <TheButton clicking={() => this.props.toSignin('signin')} extraStyle={styles.signinBtnCont} extraTxtStyle={styles.signinBtnTxt}>Registrarme</TheButton>
        </View>
        : 
        <View style={styles.twoButtonWrapper}>
          <TheButton clicking={this.attemptLogIn} extraStyle={styles.loginBtnCont} extraTxtStyle={styles.loginBtnTxt}>Iniciar Sesión</TheButton>
          <TheButton clicking={() => this.props.toSignin('signin')} extraStyle={styles.signinBtnCont} extraTxtStyle={styles.signinBtnTxt}>Registrarme</TheButton>
        </View>;//
  }
  
  render() {
    return (
      <View style={styles.container} >
        <View style={styles.topImageContainer}>
          <Image source={require('../../../assets/images/headerImg.png')} resizeMode="cover" style={styles.topImageStyle}/>
        </View>
        <View style={styles.middleContentWrapper}>
          {this.screenRender()}
          {this.renderError()}
        </View>
        {this.buttonsRender()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: '#F0F2E8',
    height: HEIGHT,
    width: WIDTH
  },
  topImageContainer: {
    width: WIDTH,
    flex: 4,
    marginBottom: 20
  },
  topImageStyle: {
    flex: 1,
    alignSelf: 'stretch',
    width: undefined,
    height: undefined
  },
  middleContentWrapper: {
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 15,
    width: WIDTH
  },
  oneButtonWrapper: {
    width: WIDTH,
    alignItems: 'center'
  },
  twoButtonWrapper: {
    width: WIDTH,
    flexDirection: 'column',
    alignItems: 'center'
  },
  loginBtnCont: {
    width: 213, 
    height: 45,
    borderRadius: 23,
    backgroundColor: '#2FBEB4', 
    borderColor: '#2FBEB4', 
    marginBottom: 15 
  },
  loginBtnTxt: {
    color: 'white',
    fontSize: 16
  },
  signinBtnCont: {
    width: 213, 
    height: 45,
    borderRadius: 23,
    backgroundColor: 'transparent', 
    borderColor: 'transparent',
    marginBottom: 15
  },
  signinBtnTxt: {
    color: 'black',
    fontSize: 16
  }
});
