import React, { Component, PropTypes } from 'react';
import { Dimensions, PanResponder, View, Image, TouchableHighlight, FlatList  } from 'react-native';
import MatrixMath from 'react-native/Libraries/Utilities/MatrixMath';

import GalleryCubeItm from './GalleryCubeItm';


const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

const styles = {
  flatContainer: {
    padding: 20,
    alignItems: 'center',
    zIndex: 2,
    position: 'relative'
  }
}

export default class CubesGallery extends Component {
  constructor(props){
    super(props);
    console.log(props);
    this.renderItem = this.renderItem.bind(this);
  }

  renderItem(cube){
    return <GalleryCubeItm onShowCube={this.props.showOneCube} data={cube} />;
  }

  render() {
    return (
      <FlatList
        contentContainerStyle={styles.flatContainer} 
        data={this.props.cubes}
        renderItem={this.renderItem}
        keyExtractor={cubeEl => cubeEl.id.toString()}
        />
    );
  }
}
