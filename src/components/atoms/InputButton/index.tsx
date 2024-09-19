import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import { useState } from 'react';
import React from 'react';

const InputButton = ({ top, left }: { top: number, left: number }) => {
  const [initialPatients, setInitialPatients] = useState<number>(1);

  const handleChange = (text: string) => {
    const numericValue = text.replace(/[^0-9]/g, ''); // Ensures only numeric input
    setInitialPatients(Number(numericValue));
  };

  return (
    <View style={styles.container}>
      <View style={styles.counterContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setInitialPatients(Math.max(0, initialPatients - 1))}
        >
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>
        
        <TextInput
          value={initialPatients.toString()}
          onChangeText={handleChange}
          keyboardType="numeric"
          style={styles.input}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={() => setInitialPatients(initialPatients + 1)}
        >
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default InputButton;

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    alignItems: 'center',
  },
  counterContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 200,
    borderRadius: 5,
    padding: 5,
  },
  button: {
    backgroundColor: '#007BFF',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 20,
  },
  input: {
    height: 40,
    width: 60,
    textAlign: 'center',
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 5,
    marginHorizontal: 10,
  },
});
