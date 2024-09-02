import { StyleSheet, Text, View } from 'react-native'
import React, {useState, useEffect} from 'react'
import CheckBox from '@react-native-community/checkbox';
import DatePickerr from '../DatePickerr';



const FilterCheckBox = () => {

    const [checked, setChecked] = useState(false)

  return (
    <View style={styles.container}>
    <CheckBox
        disabled={false}
        value={checked}
        tintColors={{true: 'black', false: 'gray'}}
        onValueChange={(newValue) => setChecked(newValue)}
        />
      <Text style={[styles.textStyle,{ color: checked ? 'black' : 'gray' }]}>Filter by Period</Text>
    </View>
  )
}

export default FilterCheckBox

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', // Align CheckBox and Text horizontally
    alignItems: 'center', // Center the items vertically
  },
  textStyle: {
    marginLeft: 8, // Add some space between the CheckBox and the Text
    fontSize: 16,   // Adjust the text size
    color: '#000',  // Text color
    fontStyle: 'italic',
  }
})