import React from 'react';
import {Dimensions, StyleSheet, Text, View, TouchableHighlight, TouchableOpacity} from 'react-native';

const WIDTH = Dimensions.get('window').width;

const TheButton = (props) => {

  return (<TouchableOpacity style={[styles.button, props.extraStyle]} onPress={props.clicking}>
            <Text style={[styles.buttonText, props.extraTxtStyle]}>{props.children}</Text>
          </TouchableOpacity>);
}

const styles = StyleSheet.create({
 button: {
  height: 60,
  borderRadius: 7,
  justifyContent: 'center',
  alignItems: 'center',
  borderWidth: 2,
  fontSize: 20
 },
 buttonText: {  
  fontWeight: '600'
 }
});

export { TheButton };

