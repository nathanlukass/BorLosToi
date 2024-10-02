import { StyleSheet, Text, View } from 'react-native'
import React, {useState, useEffect} from 'react'
import CheckBox from '@react-native-community/checkbox';
// import CheckBox from '@react-native-community/checkbox';
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