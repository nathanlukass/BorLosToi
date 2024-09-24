import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Pressable} from 'react-native';
import {
  Padding,
  Border,
  Color,
  FontFamily,
  FontSize,
} from '../../../GlobalStyles';
import Icon from 'react-native-vector-icons/Ionicons'; // Install this if not available

const AboutApp = ({ navigation }) => {

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
          <Pressable
            style={styles.iconArrowBack}
            onPress={() => navigation.navigate('ProfilScreenNurse')}>
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
