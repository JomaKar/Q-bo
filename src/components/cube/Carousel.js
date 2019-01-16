import React, { Component, PropTypes } from 'react';
import { Dimensions, PanResponder, View, Image, TouchableHighlight } from 'react-native';
import MatrixMath from 'react-native/Libraries/Utilities/MatrixMath';


const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

const styles = {
  flatContainer: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 2,
    backgroundColor: 'gray'
  },
  wrapper: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  imgWrapper: {
    flex: 1
  },
  topImageStyle: {
    flex: 1,
    alignSelf: 'stretch',
    width: undefined,
    height: undefined
  },
  sliderBtnsCont: {
    height: '10%',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 25,
    left: 0
  },
  btnsWrapper: {
    height: 15,
    flexDirection: 'row',
    justifyContent: 'space-between', 
  },
  sliderBtn: {
    width: 15,
    height: 15,
    borderColor: 'gray',
    borderWidth: 1,
    backgroundColor: 'white',
    borderRadius: 5
  },
  activeSliderBtn: {
    backgroundColor: '#2FBEB4'
  }
}

export default class Carousel extends Component {
  constructor(props){
    super(props);

    this.state = {
      images: [],
      actualCarouselView: 0,
      buttonsContWidth: {}
    };

    this.renderButtons = this.renderButtons.bind(this);
    this.renderCarouselView = this.renderCarouselView.bind(this);
  }

  componentWillMount(){
    this.setState({
      images: this.props.images,
      buttonsContWidth: { width: (this.props.images.length * 15) + (10 * (this.props.images.length - 1))}
    })

    console.log('hellothere', this.state);
  }

  renderCarouselView(){
    console.log(this.state, this.state.images[this.state.actualCarouselView]);
    return <Image source={{uri: this.state.images[this.state.actualCarouselView]}} resizeMode='cover' style={styles.topImageStyle} />    
  }

  renderButtons(){
    return this.state.images.map((img, idx) => <TouchableHighlight key={idx + img} onPress={() => this.setState({ actualCarouselView: idx})} style={[styles.sliderBtn, (this.state.actualCarouselView == idx) ? styles.activeSliderBtn : {}]}><View /></TouchableHighlight>);
  }//

  render() {
    return (<View style={styles.flatContainer}>
              <View style={styles.wrapper}>
                <View style={styles.imgWrapper}>
                  {this.renderCarouselView()}
                </View>
                <View style={styles.sliderBtnsCont}>
                  <View style={[styles.btnsWrapper, this.state.buttonsContWidth]}>
                    {this.renderButtons()}
                  </View>
                </View>
              </View>
            </View>);
  }
}
