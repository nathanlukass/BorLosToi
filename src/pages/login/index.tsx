import * as React from 'react';
import {TextInput} from 'react-native-paper';
import {StyleSheet} from 'react-native';
import {Border, Color} from '../../../GlobalStyles';

const LoginScreen = () => {
  return (
    <TextInput
      style={styles.loginScreen}
      label="Please select who you are"
      placeholder="Login to continue"
      mode="flat"
      placeholderTextColor="#464646"
      theme={{
        fonts: {regular: {fontFamily: 'Poppins', fontWeight: 'Regular'}},
        colors: {text: '#464646'},
      }}
    />
  );
};

const styles = StyleSheet.create({
  loginScreen: {
    borderRadius: Border.br_xl,
    backgroundColor: Color.schemesOnPrimary,
    flex: 1,
    width: '100%',
    height: 800,
    overflow: 'hidden',
  },
});

export default LoginScreen;
