import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
import { Padding, Color, FontSize, FontFamily, Border } from '../GlobalStyles';

const PasswordField = () => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={!showPassword}
        mode="outlined"
        theme={{
          fonts: {
            regular: { fontFamily: FontFamily.poppinsRegular },
          },
          colors: { text: '#6a6a6a' },
        }}
        right={
          <TextInput.Icon
            icon={showPassword ? "eye-off" : "eye"}
            onPress={togglePasswordVisibility}
            color="#6a6a6a"
          />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  input: {
    height: 55,
    width: '90%',
    backgroundColor: Color.schemesOnPrimary,
    borderRadius: Border.br_8xs,
    padding: Padding.p_3xs,
  },
});

export default PasswordField;
