import React, { Component, PropTypes } from 'react';
import {
  Dimensions,
  PanResponder,
  View,
  Image
} from 'react-native';

import MatrixMath from 'react-native/Libraries/Utilities/MatrixMath';


const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

const styles = {
  container2: {
    position: 'absolute',
    left: WIDTH / 2 - 150,
    top: (HEIGHT * .5) / 2 - 150,
    width: 300,
    height: 300,
    backgroundColor: "transparent"
  },
  rectangle: {
    position: 'absolute',
    left: 75,
    top: 75,
    width: 150,
    height: 150,
    zIndex: 10
  },
  imageStyle: {
    flex: 1,
    alignSelf: 'stretch',
    width: undefined,
    height: undefined
  },
  face0: {
    backgroundColor: 'red'
  },
  face1: {
    backgroundColor: 'yellow'
  },
  face2: {
    backgroundColor: 'green'
  },
  face3: {
    backgroundColor: 'pink'
  },
  face4: {
    backgroundColor: 'blue'
  },
  face5: {
    backgroundColor: 'black'
  }
}

export default class CubePreview extends Component {
  constructor(props){
    super(props);

    this.state = {
      cubeFaces: props.faces || {}
    };
  }

  componentWillMount() {
    // console.log(this.props.faces);

    this.panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: this.handlePanResponderMove.bind(this)
    });
  }

  rotateXY(dx, dy){
    const radX = (Math.PI / 180) * dy;
    const cosX = Math.cos(radX);
    const sinX = Math.sin(radX);

    const radY = (Math.PI / 180) * -dx;
    const cosY= Math.cos(radY);
    const sinY = Math.sin(radY);

    return [
      cosY, sinX * sinY, cosX * sinY, 0,
      0, cosX, -sinX, 0,
      -sinY, cosY * sinX, cosX * cosY, 0,
      0, 0, 0, 1
    ];
  }


  rotateXZ(dx, dy){
    const radX = (Math.PI / 180) * dx;
    const cosX = Math.cos(radX);
    const sinX = Math.sin(radX);

    const radY = (Math.PI / 180) * dy;
    const cosY= Math.cos(radY);
    const sinY = Math.sin(radY);

    return [
      cosX, -cosY * sinX, sinX * sinY, 0,
      sinX, cosX * cosY, -sinY * cosX, 0,
      0, sinY, cosY, 0,
      0, 0, 0, 1
    ];
  }


  transformOrigin(matrix, origin){
    const { x, y, z } = origin;

    const translate = MatrixMath.createIdentityMatrix();
    MatrixMath.reuseTranslate3dCommand(translate, x, y, z);
    MatrixMath.multiplyInto(matrix, translate, matrix);

    const untranslate = MatrixMath.createIdentityMatrix();
    MatrixMath.reuseTranslate3dCommand(untranslate, -x, -y, -z);
    MatrixMath.multiplyInto(matrix, matrix, untranslate);
  }



  handlePanResponderMove (e, gestureState) {
    const { dx, dy } = gestureState;
    const origin = { x: 0, y: 0, z: -75 };
    let matrix0 = this.rotateXY(dx, dy);
    this.transformOrigin(matrix0, origin);
    this.refViewFront.setNativeProps({style: {transform: [{perspective: 1000}, {matrix: matrix0}]}});

    let matrix1 = this.rotateXY(dx + 180, dy);
    this.transformOrigin(matrix1, origin);
    this.refViewBack.setNativeProps({style: {transform: [{perspective: 1000}, {matrix: matrix1}]}});

    let matrix2 = this.rotateXY(dx + 90, dy);
    this.transformOrigin(matrix2, origin);
    this.refViewRight.setNativeProps({style: {transform: [{perspective: 1000}, {matrix: matrix2}]}});

    let matrix3 = this.rotateXY(dx - 90, dy);
    this.transformOrigin(matrix3, origin);
    this.refViewLeft.setNativeProps({style: {transform: [{perspective: 1000}, {matrix: matrix3}]}});

    let matrix4 = this.rotateXZ(dx, dy - 90);
    this.transformOrigin(matrix4, origin);
    this.refViewTop.setNativeProps({style: {transform: [{perspective: 1000}, {matrix: matrix4}]}});

    let matrix5 = this.rotateXZ(-dx, dy + 90);
    this.transformOrigin(matrix5, origin);
    this.refViewBottom.setNativeProps({style: {transform: [{perspective: 1000}, {matrix: matrix5}]}});
  }

  render() {
    return (
      <View style={styles.container2}>
        <View
            ref={component => this.refViewFront = component}
            style={[styles.rectangle, styles.face0]}
            {...this.panResponder.panHandlers}>
            {this.state.cubeFaces.front ? <Image source={{uri: this.state.cubeFaces.front}} resizeMode='cover' style={styles.imageStyle}/> : <Image source={require('../../../assets/images/face.png')} resizeMode='cover' style={styles.imageStyle}/>}
        </View>
        <View
            ref={component => this.refViewBack = component}
            style={[styles.rectangle, styles.face1]}
            {...this.panResponder.panHandlers}>
            {this.state.cubeFaces.back ? <Image source={{uri : this.state.cubeFaces.back}} resizeMode='cover' style={styles.imageStyle}/> : <Image source={require('../../../assets/images/face.png')} resizeMode='cover' style={styles.imageStyle}/>}
        </View>
        <View
            ref={component => this.refViewLeft = component}
            style={[styles.rectangle, styles.face2]}
            {...this.panResponder.panHandlers}>
            {this.state.cubeFaces.left ? <Image source={{uri : this.state.cubeFaces.left}} resizeMode='cover' style={styles.imageStyle}/> : <Image source={require('../../../assets/images/face.png')} resizeMode='cover' style={styles.imageStyle}/>}
        </View>
        <View
            ref={component => this.refViewRight = component}
            style={[styles.rectangle, styles.face3]}
            {...this.panResponder.panHandlers}>
            {this.state.cubeFaces.right ? <Image source={{uri : this.state.cubeFaces.right}} resizeMode='cover' style={styles.imageStyle}/> : <Image source={require('../../../assets/images/face.png')} resizeMode='cover' style={styles.imageStyle}/>}
        </View>
        <View
            ref={component => this.refViewTop = component}
            style={[styles.rectangle, styles.face4]}
            {...this.panResponder.panHandlers}>
            {this.state.cubeFaces.top ? <Image source={{uri : this.state.cubeFaces.top}} resizeMode='cover' style={styles.imageStyle}/> : <Image source={require('../../../assets/images/face.png')} resizeMode='cover' style={styles.imageStyle}/>}
        </View>
        <View
            ref={component => this.refViewBottom = component}
            style={[styles.rectangle, styles.face5]}
            {...this.panResponder.panHandlers}>
            {this.state.cubeFaces.bottom ? <Image source={{uri : this.state.cubeFaces.bottom}} resizeMode='cover' style={styles.imageStyle}/> : <Image source={require('../../../assets/images/face.png')} resizeMode='cover' style={styles.imageStyle}/>}
        </View>
      </View>
    );
  }
}
