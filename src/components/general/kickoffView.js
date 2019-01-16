import React, {Component} from 'react';
import {Dimensions, StyleSheet, Text, View, Button, Image, TouchableHighlight } from 'react-native';

import { TheButton } from '../common';

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

export default class KickoffView extends Component{
  constructor(props){
    super(props);


    this.state = { actualMessageView: 0};
    this.handleLogin = this.handleLogin.bind(this);
    this.handleSignin = this.handleSignin.bind(this);
    this.renderMessage = this.renderMessage.bind(this);
  }


  handleLogin(){
    this.props.toLogin('login');
  }

  handleSignin(){
    this.props.toSignin('signin');
  }

  renderMessage(){
    let viewToRender;

    switch(this.state.actualMessageView){
      case 0:
        viewToRender = <View style={styles.innerScrollableView}>
                        <View style={styles.topImageContainer}>
                          <Image style={styles.topImageStyle} source={require('../../../assets/images/odd.png')} resizeMode='cover'/>
                        </View>
                        <View style={styles.textWrapper}>
                          <Text style={styles.mainTextStyle}>
                            Crea tu cubo y <Text style={{fontWeight: 'bold'}}>comparte tus momentos</Text> más importantes
                          </Text>
                        </View>
                      </View>;
        break;
      case 1:
        viewToRender = <View style={styles.innerScrollableView}>
                        <View style={styles.topImageContainer}>
                          <Image style={styles.topImageStyle} source={require('../../../assets/images/noun.png')} resizeMode='cover'/>
                        </View>
                        <View style={styles.textWrapper}>
                          <Text style={styles.mainTextStyle}>
                            <Text style={{fontWeight: 'bold'}}>Regala momentos</Text> inolvidables a los que más quieres enviándoles un <Text style={{fontWeight: 'bold'}}>recuerdo interactivo</Text>
                          </Text>
                        </View>
                      </View>;
        break;
      case 2:
        viewToRender = <View style={styles.innerScrollableView}>
                        <View style={styles.topImageContainer}>
                          <Image style={styles.topImageStyle} source={require('../../../assets/images/odd.png')} resizeMode='cover'/>
                        </View>
                        <View style={styles.textWrapper}>
                          <Text style={styles.mainTextStyle}>
                            <Text style={{fontWeight: 'bold'}}>Q-bo</Text>, una nueva forma de <Text style={{fontWeight: 'bold'}}>ver y compartir las cosas</Text>
                          </Text>
                        </View>
                      </View>;
        break;
    }

    return viewToRender;

  }
  
  render() {
    return (
      <View style={styles.container} >
        <View style={styles.mainContent}>
          {this.renderMessage()}
          <View style={styles.sliderBtnsCont}>
            <TouchableHighlight onPress={() => this.setState({ actualMessageView: 0})} style={[styles.sliderBtn, (this.state.actualMessageView == 0) ? styles.activeSliderBtn : {}]}><View /></TouchableHighlight>
            <TouchableHighlight onPress={() => this.setState({ actualMessageView: 1})} style={[styles.sliderBtn, (this.state.actualMessageView == 1) ? styles.activeSliderBtn : {}]}><View /></TouchableHighlight>
            <TouchableHighlight onPress={() => this.setState({ actualMessageView: 2})} style={[styles.sliderBtn, (this.state.actualMessageView == 2) ? styles.activeSliderBtn : {}]}><View /></TouchableHighlight>
          </View>
        </View>
        <View style={styles.buttonsContainer}>
          <TheButton clicking={this.handleLogin} extraStyle={styles.loginBtn} extraTxtStyle={styles.loginBtnTxt}>Iniciar Sesión</TheButton>
          <TheButton clicking={this.handleSignin} extraStyle={styles.signinBtn} extraTxtStyle={styles.signinBtnTxt}>Registrarme</TheButton>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    height: HEIGHT,
    width: WIDTH,
    padding: 15,
    position: 'relative'
  },
  mainContent:{
    flex: 7,
    width: WIDTH
  },
  innerScrollableView: {
    width: WIDTH,
    height: '90%'
  },
  topImageContainer: {
    marginBottom: 15,
    height: '80%',
    width: '100%'
  },
  topImageStyle: {
    flex: 1,
    alignSelf: 'stretch',
    width: undefined,
    height: undefined
  },
  textWrapper: {
    width: WIDTH,
    height: '20%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  mainTextStyle: {
    fontWeight: '300',
    fontSize: 17,
    textAlign: 'center',
    color: 'black'
  },
  sliderBtnsCont: {
    height: '10%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: '42%',
    paddingRight: '42%',
    alignItems: 'center',
  },
  sliderBtn: {
    width: 10,
    height: 10,
    borderColor: 'gray',
    borderWidth: 1,
    backgroundColor: 'gray',
    borderRadius: 5
  },
  activeSliderBtn: {
    backgroundColor: '#2FBEB4'
  },
  buttonsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 65,
    width: WIDTH,
    padding: 10,
    paddingLeft: 15,
    paddingRight: 15
  },
  loginBtn: {
    width: '45%',
    height: 45,
    backgroundColor: '#33DBD2',
    borderColor: '#33DBD2',
    borderRadius: 23
  },
  loginBtnTxt: {
    fontSize: 16,
    color: 'white'
  },
  signinBtn: {
    width: '45%',
    height: 45, 
    backgroundColor: 'transparent', 
    borderColor: 'black', 
    borderRadius: 23
  },
  signinBtnTxt: {
    fontSize: 16,
    color: 'black'
  }
});
