import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native'
import { useState } from 'react';
import React from 'react'

const InputButton = ({top, left}) => {
    const [initialPatients, setInitialPatients] = useState(1);
  return (
    <View style={styles.plusButton(top, left)}>
      <TouchableOpacity
              style={styles.buttonMinus}
              onPress={() =>
                setInitialPatients(Math.max(0, initialPatients - 1))
              }>
              <Text style={styles.buttonTextMinus}>-</Text>
            </TouchableOpacity>
            <TextInput
              value={initialPatients.toString()}
              onChangeText={text => setInitialPatients(Number(text))}
              keyboardType="numeric"
              style={[styles.input]}
            />
            <TouchableOpacity
              style={styles.buttonPlus}
              onPress={() => setInitialPatients(initialPatients + 1)}>
              <Text style={styles.buttonTextPlus}>+</Text>
            </TouchableOpacity>
    </View>
  )
}

export default InputButton;

const styles = StyleSheet.create({
    plusButton: (top, left) => ({
        top: top,
        left: left,
    }),
    buttonMinus: {
        backgroundColor: '#007BFF',
        padding: 0,
        borderRadius: 5,
        flexDirection: 'row',
        left: 180,
        height: 30,
        width: 23,
        top: 15,
      },
      buttonPlus: {
        backgroundColor: '#007BFF',
        padding: 0,
        borderRadius: 5,
        flexDirection: 'row',
        left: 250,
        width: 23,
        top: -63,
        height: 31,
      },
    buttonTextPlus: {
        color: '#FFFFFF',
        fontSize: 20,
        flexDirection: 'row',
        alignSelf: 'center',
        marginLeft: 7,
      },
      buttonTextMinus: {
        color: '#FFFFFF',
        fontSize: 30,
        flexDirection: 'row',
        alignSelf: 'center',
        marginLeft: 8,
        top: -3,
      },
    input: {
        left: 220,
        top: -22,
    },
})