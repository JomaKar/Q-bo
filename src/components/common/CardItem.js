import React from 'react';
import {StyleSheet, View} from 'react-native';

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    backgroundColor: "#fff",
    borderColor: '#ddd',
    padding: 5,
    justifyContent: 'flex-start',
    flexDirection: 'row',
    position: 'relative'
  }
});

const CardItem = (props) => {
  return (
    <View style={styles.container}>
      {props.children}
    </View>
  );
};


export {CardItem};