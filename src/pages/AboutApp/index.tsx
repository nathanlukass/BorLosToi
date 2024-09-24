import React, { useState, useCallback } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Pressable, BackHandler} from 'react-native';
import {
  Padding,
  Border,
  Color,
  FontFamily,
  FontSize,
} from '../../../GlobalStyles';

import Icon from 'react-native-vector-icons/Ionicons'; // Install this if not available
import { useRoute, RouteProp, useFocusEffect } from '@react-navigation/native';

type ChangePasswordRouteProp = RouteProp<{ params: { source: string } }, 'params'>;

const AboutApp = ({ navigation }) => {

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
          <Pressable
            style={styles.iconArrowBack}
            onPress={handleBackPress}>
            <Image
              style={styles.icon}
              resizeMode="cover"
              source={require('../../../assets/-icon-arrow-back.png')}
            />
          </Pressable>
          <Text style={styles.headerTitle}>About App</Text>
        </View>

      {/* Content */}
      <View style={styles.content}>
        <Image 
          source={require('../../assets/images/LOGO.jpg')} // Replace with your actual image
          style={styles.logo}
        />
        <Text style={styles.title}>Samrat InapDikator: Data Akurat, Layanan Hebat</Text>
        <Text style={styles.version}>Versi 1.0.0</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  iconArrowBack: {
    width: 42,
    height: 25,
    zIndex: 0,
    marginStart: -15,
  },
  icon: {
    height: '100%',
    width: '100%',
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
    padding: 20,
  },
  headerTitle: {
    fontSize: 16,
    fontFamily: FontFamily.poppinsBold,
    color: Color.notSoBlack,
    marginStart: 'auto',
    marginEnd: 'auto',
    left: -10,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 100, // Adjust the size of your logo
    height: 100,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  title: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
  },
  version: {
    fontSize: 14,
    color: '#666',
  },
});

export default AboutApp;
