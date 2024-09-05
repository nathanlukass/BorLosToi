import React, { useState } from 'react';
import { TextInput, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Padding, Color, FontSize, FontFamily, Border } from '../GlobalStyles';

const UsernameField = () => {
  const [username, setUsername] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Username</Text>
      <TouchableOpacity 
        style={[
          styles.inputContainer, 
          { borderColor: isFocused ? Color.colorMediumaquamarine : 'grey' }
        ]}
        activeOpacity={1}
        onPress={() => setIsFocused(true)}
      >
        <TextInput
          style={styles.input}
          value={username}
          onChangeText={setUsername}
          placeholder="Enter your username"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholderTextColor={Color.colorDimgray}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    width: '100%',
  },
  label: {
    fontSize: FontSize.m3LabelLarge_size,
    fontFamily: FontFamily.poppinsRegular,
    color: Color.colorDimgray,
    marginBottom: 5,
    left: 10,
  },
  inputContainer: {
    left: 10,
    height: 45,
    borderRadius: Border.br_8xs,
    borderWidth: 1,
    backgroundColor: Color.schemesOnPrimary,
    paddingHorizontal: Padding.p_3xs,
    justifyContent: 'center',
  },
  input: {
    fontSize: FontSize.m3LabelLarge_size,
    fontFamily: FontFamily.poppinsRegular,
    color: Color.colorBlack,
  },
});

export default UsernameField;
