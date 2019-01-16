import React from 'react';
import {Dimensions, StyleSheet, Text, View, TouchableHighlight, TextInput, Image} from 'react-native';

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

const TopHeader = ({ showLeft, showRight }) => {
  const searching = (Text) => {
    console.log('from searchbar', Text);
  };


  return <View style={styles.viewStyles}>
          <View style={styles.btnWrapper}>
            <TouchableHighlight onPress={showLeft} style={[styles.buttonGral, styles.menuItm]}>
              <Image resizeMode="cover" style={styles.buttonImg} source={require('../../../../assets/images/menu.png')} />
            </TouchableHighlight>
          </View>
          <View style={styles.searchInputWrapper}>
            <TextInput style={styles.searchInput} placeholder="Buscar..." onChangeText={searching} />
          </View>
          <View style={styles.btnWrapper}>
            <TouchableHighlight onPress={showRight} style={styles.buttonGral}>
              <Image resizeMode="cover" style={styles.buttonImg} source={require('../../../../assets/images/avatar.png')} />
            </TouchableHighlight>
          </View>
        </View>;
}

const styles = StyleSheet.create({
  viewStyles: {
    width: WIDTH,
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#BCD5DE',
    position: 'relative'
  },
  searchInputWrapper: {
    flex: 4,
    height: 40,
    backgroundColor: '#DCEAEF',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  searchInput: {
    width: '100%',
    height: '100%',
    color: 'black',
    padding: 2,
    paddingLeft: 10,
    fontSize: 15,
    fontWeight: '300'    
  },
  btnWrapper: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10
  },
  buttonGral: {
    width: 45,
    height: 45,
    backgroundColor: 'transparent'
  },
  menuItm: {
    height: 40
  },
  buttonImg: {
    flex: 1,
    alignSelf: 'stretch',
    width: undefined,
    height: undefined
  }
});

export {TopHeader};