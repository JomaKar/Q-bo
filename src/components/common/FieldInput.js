import React from 'react';
import {StyleSheet, View, Text, TextInput} from 'react-native';


const styles = StyleSheet.create({
  container: {
    backgroundColor: "transparent",
    height: 60,
    width: '100%',
    position: 'relative',
    marginBottom: 15
  },
  labelTextMinimized: {
    color: 'black',
    fontSize: 15,
    fontWeight: '300',
    top: 2,
    left: 0
  },
  inputStyles: {
    width: '100%',
    height: 45,
    paddingLeft: 2,
    color: 'black',
    fontSize: 20,
    fontWeight: '100',
    borderBottomWidth: 2
  },
  fullInput: {
    borderColor: '#2CB5AD'
  },
  emptyInput: {
    borderColor: 'gray'
  }
});


const FieldInput = ({ label, value, placeholder, callback, hideText}) => {

  let withTextStyle = (value.length) ? 'fullInput' : 'emptyInput';

  return (
    <View style={styles.container}>
      <Text style={styles.labelTextMinimized}>
        {label}
      </Text>
      <TextInput 
          secureTextEntry={hideText}
          placeholder={placeholder}
          autoCorrect={false} 
          style={[styles.inputStyles, styles[withTextStyle]]} 
          onChangeText={callback} 
          value={value} />
    </View>
  );
};


export { FieldInput };