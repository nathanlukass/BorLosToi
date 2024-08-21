/* eslint-disable prettier/prettier */
import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
// import LogoUnklab from '../../assets/icon/logoUnklab.svg'
import Unklab from '../../assets/icon/Unklab.svg';

const SplashScreen = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => navigation.replace('Login'), 1000);
  }, []);

  return (
    <View>
      <Text style={styles.text}>BORLOSTOI</Text>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  text: {
    fontSize: 32,
    fontFamily: 'Poppins-Medium',
    color: 'black',
  },
});
