import React, { useState, useCallback } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Pressable, Image, BackHandler } from 'react-native';
import {
  Padding,
  Border,
  Color,
  FontFamily,
  FontSize,
} from '../../../GlobalStyles';

import Icon from 'react-native-vector-icons/Ionicons'; // Assuming Ionicons is installed
import { Button } from 'react-native-elements'; // Assuming react-native-elements is installed
import { useRoute, RouteProp, useFocusEffect } from '@react-navigation/native';

type ChangePasswordRouteProp = RouteProp<{params: {source: string}}, 'params'>;

const ChangePassword = ({navigation}) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [securePassword, setSecurePassword] = useState(true);
  const [secureConfirmPassword, setSecureConfirmPassword] = useState(true);

  const togglePasswordVisibility = () => {
    setSecurePassword(!securePassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setSecureConfirmPassword(!secureConfirmPassword);
  };

  const goBack = () => {
    navigation.goBack();
  };

  // Use the defined type for route
  const route = useRoute<ChangePasswordRouteProp>();
  const sourceScreen = route.params?.source;

  const handleBackPress = useCallback(() => {
    if (sourceScreen === 'nurse') {
      navigation.navigate('ProfilScreenNurse'); // Navigate to nurse home screen
    } else if (sourceScreen === 'admin') {
      navigation.navigate('ProfileScreenAdmin'); // Navigate to admin home screen
    }
    return true;
  }, [navigation, sourceScreen]);

  useFocusEffect(
    useCallback(() => {
      BackHandler.addEventListener('hardwareBackPress', handleBackPress);
      return () => BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
    }, [handleBackPress])
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable style={styles.iconArrowBack} onPress={handleBackPress}>
          <Image
            style={styles.icon}
            resizeMode="cover"
            source={require('../../../assets/-icon-arrow-back.png')}
          />
        </Pressable>
        <Text style={styles.headerTitle}>Change Password</Text>
      </View>

      <Text style={styles.description}>Masukkan password baru anda</Text>

      {/* Password Input */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Password Baru"
          secureTextEntry={securePassword}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity
          onPress={togglePasswordVisibility}
          style={styles.iconContainer}>
          <Image
            source={
              securePassword
                ? require('../../assets/images/Eye1.png')
                : require('../../assets/images/Eye2.png')
            }
            style={{width: 26, height: 20}}
          />
        </TouchableOpacity>
      </View>

      {/* Confirm Password Input */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          secureTextEntry={secureConfirmPassword}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        <TouchableOpacity onPress={toggleConfirmPasswordVisibility} style={styles.iconContainer}>
        <Image
            source={
              secureConfirmPassword
                ? require('../../assets/images/Eye1.png')
                : require('../../assets/images/Eye2.png')
            }
            style={{width: 26, height: 20}}
          />
        </TouchableOpacity>
      </View>

      {/* Update Button */}
      <Button
        title="Confirm"
        buttonStyle={styles.button}
        onPress={() => {
          // Handle password update
          console.log('Password Updated');
        }}
      />
    </View>
  );
};



const styles = StyleSheet.create({
  headerTitle: {
    fontSize: 16,
    fontFamily: FontFamily.poppinsBold,
    color: Color.notSoBlack,
    marginStart: 'auto',
    marginEnd: 'auto',
    left: -10,
  },
  icon: {
    height: '100%',
    width: '100%',
  },
  iconShowPassword: {
    height: '50%',
    width: '50%',
  },
  iconArrowBack: {
    width: 42,
    height: 25,
    zIndex: 0,
    marginStart: -15,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  description: {
    fontSize: 14,
    color: Color.colorDimgray,
    fontFamily: FontFamily.poppinsBold,
    marginTop: 20,
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 10,
  },
  iconContainer: {
    padding: 10,
  },
  button: {
    backgroundColor: '#00C490',
    borderRadius: 5,
    paddingVertical: 15,
    marginTop: 20,
  },
});

export default ChangePassword;
