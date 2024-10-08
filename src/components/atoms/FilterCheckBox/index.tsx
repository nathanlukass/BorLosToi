import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import CheckBox from '@react-native-community/checkbox';

const FilterCheckBox = ({isChecked, onChange}) => {
  return (
    <View style={styles.container}>
      <CheckBox
        value={isChecked}
        onValueChange={onChange}
        tintColors={{true: 'green', false: 'grey'}} // Adjust the tint color if desired
        style={styles.checkbox}
      />
      <Text style={styles.label}>Filter by Period</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    top:-55,
    left:-8,
    flexDirection: 'row', // Align CheckBox and Text horizontally
    alignItems: 'center', // Center the items vertically
  },
  textStyle: {
    top:0,
    marginLeft: 8, 
    fontSize: 16,   
    color: '#000', 
    fontStyle: 'italic',
  }
})

export default FilterCheckBox;
