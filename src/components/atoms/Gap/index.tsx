import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const Gap = ({height}) => {
  return <View style={styles.gapVertical(height)} />;
};

export default Gap;

const styles = StyleSheet.create({
  gapVertical: height => ({
    height: height,
  }),
});
