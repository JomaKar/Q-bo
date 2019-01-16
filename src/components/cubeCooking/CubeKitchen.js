import React, {Component} from 'react';

import firebase from "firebase";

import {Dimensions, StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, CameraRoll, Button } from 'react-native';

import CubePreview from '../cube/CubePreview';
import Carousel from '../cube/Carousel';

import { TheButton } from '../common';


const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

export default class CubeKitchen extends Component{
  constructor(props){
    super(props);

    this.state = {
      cubeFaces: {
        top: '',
        bottom: '',
        left: '',
        right: '',
        front: '',
        back: ''
      },
      isGalery: true,
      cubeView: true,
      isPostingView: false,
      isSavingPossible: false,
      lastCallPageInfo: {},
      photos: [],
      selectedPhotos: []
    };

    this.screenRender = this.screenRender.bind(this);
    this.renderPhotos = this.renderPhotos.bind(this);
    this.renderCubeViewBtn = this.renderCubeViewBtn.bind(this);
    this.addPhotoToCube = this.addPhotoToCube.bind(this);
    this.renderTopContent = this.renderTopContent.bind(this);
    this.toPost = this.toPost.bind(this);
    this.saveCube = this.saveCube.bind(this);
    this.getRandomInt = this.getRandomInt.bind(this);

  }

  componentWillMount(){

    CameraRoll.getPhotos({
      first: 25,
      assetType: 'Photos'
    }).then(r => {
       this.setState({ photos: r.edges });
     })
     .catch((err) => {
        console.log(err);
     });
  }

  addPhotoToCube(photo){
    if(this.state.selectedPhotos.length >= 6 && this.state.selectedPhotos.indexOf(photo) == -1) return;
    let thePhotos = [...this.state.selectedPhotos];
    let theCubeFaces = this.state.cubeFaces;

    for (let face in theCubeFaces) {
      if(theCubeFaces[face] === ''){
        theCubeFaces[face] = photo;
        break;
      }else if(theCubeFaces[face] == photo){
        theCubeFaces[face] = '';
        break;
      }
    }

    (thePhotos.indexOf(photo) !== -1) ? thePhotos.splice(thePhotos.indexOf(photo), 1) : thePhotos.push(photo);
    this.setState({ selectedPhotos: thePhotos, cubeFaces: theCubeFaces, cubeView: true, isSavingPossible: thePhotos.length == 6 ? true : false });
    // setTimeout(() => {this.setState({ cubeView: !this.state.cubeView });}, 2);
  }

  screenRender(){
    return null;
  }

  renderPhotos(){
    return this.state.photos.map((ph, i) => <TouchableOpacity key={ph.node.image.uri + i} onPress={() => this.addPhotoToCube(ph.node.image.uri)} style={[styles.photoGalleryBtn, this.state.selectedPhotos.indexOf(ph.node.image.uri) !== -1 ? styles.activePhoto : {}]}><Image style={styles.simpleImage} source={{ uri: ph.node.image.uri }} /></TouchableOpacity>);
  }//

  toPost(){
    this.setState({ isPostingView: true });
  }

  renderTopContent(){
    let imgs = this.state.selectedPhotos;
    // console.log(imgs);
    return (this.state.cubeView) ? <CubePreview faces={this.state.cubeFaces} /> : <Carousel images={imgs} />;
  }

  renderCubeViewBtn(){
    return (this.state.selectedPhotos.length) ? 
        (this.state.cubeView ? 
            <TouchableOpacity style={styles.changeViewBtn} onPress={ () => this.setState({ cubeView : false }) }>
              <Image style={styles.simpleImage} source={require('../../../assets/images/img.png')} />
            </TouchableOpacity> 
            : 
            <TouchableOpacity style={styles.changeViewBtn} onPress={ () => this.setState({ cubeView : true }) }>
              <Image style={styles.simpleImage} source={require('../../../assets/images/buttonCubeWhite.png')} />
            </TouchableOpacity>) 
        : null;
  }//

  saveCube(){
    // console.log('here');
    if(this.state.selectedPhotos.length < 6) return;
    this.props.saveCube({faces: this.state.cubeFaces, images: this.state.selectedPhotos, id: this.getRandomInt()});
    this.props.cancelCreation();
  }

  getRandomInt() {
    return Math.floor(Math.random() * Math.floor(10000));
  }
  
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Button title="Cancelar" color="black" onPress={this.props.cancelCreation} />
          <Text>{this.state.isGalery ? 'Galería' : 'Cámara'}</Text>
          <Button title="Siguiente" color="#2EBAAF" onPress={this.toPost} />
        </View>
        <View style={styles.topView}>
          {this.renderTopContent()}
          {this.renderCubeViewBtn()}
          <View style={styles.footer}>
            <TheButton clicking={this.saveCube} extraStyle={styles.postingBtn} extraTxtStyle={styles.postingBtnTxt}>Publicar</TheButton>
          </View>
        </View>
        <ScrollView contentContainerStyle={styles.bottomView}>
          {this.renderPhotos()}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5FCFF',
    height: HEIGHT,
    width: WIDTH,
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 21,
    flexDirection: 'column'
  },
  header: {
    height: '10%',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: '#DDEDF2'
  },
  topView: {
    width: '100%',
    height: '50%',
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: '#4ED5D7', 
    position: 'relative'
  },
  bottomView: {
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    paddingLeft: 15,
    paddingRight: 15
  },
  photoGalleryBtn: {
    width: 65,
    height: 65,
    margin: 2
  },
  activePhoto: {
    borderWidth: 2,
    borderColor: '#2FBEB5'
  },
  simpleImage: {
    flex: 1,
    alignSelf: 'stretch',
    width: undefined,
    height: undefined
  },
  changeViewBtn: {
    width: 60,
    height: 60,
    position: 'absolute',
    bottom: 10,
    right: 10,
    borderRadius: 30,
    zIndex: 3
  },
  changeViewBtnText: {
    color: 'black',
    fontSize: 15
  },
  footer: {
    height: '10%',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingTop: 15,
    backgroundColor: 'transparent',
    position: 'absolute',
    left: 10,
    bottom: 40
  },
  postingBtn: {
    width: 100, 
    height: 45,
    borderRadius: 23,
    backgroundColor: 'white', 
    borderColor: 'black',
    marginBottom: 15,
    position: 'relative'
  },
  postingBtnTxt: {
    color: 'black',
    fontSize: 12
  },
});
