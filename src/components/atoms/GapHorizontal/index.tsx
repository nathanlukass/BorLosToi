import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const GapHorizontal = ({width}) => {
  return <View style={styles.gapHorizontal(width)} />;

};

export default GapHorizontal;

const styles = StyleSheet.create({
  gapHorizontal: width => ({
    width: width,
  }),
});
