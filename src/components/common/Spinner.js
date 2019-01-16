import React from 'react';
import {StyleSheet, View, ActivityIndicator } from 'react-native';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  }
});

const Spinner = ({size}) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={size || 'large'} />
    </View>
  );
};


export {Spinner};