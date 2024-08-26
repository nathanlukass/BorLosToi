import {StyleSheet, Text, View, Image} from 'react-native';
import React, {useEffect} from 'react';
import {Logo} from '../../assets/images';

const SplashScreen = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => navigation.replace('InputScreenPage'), 3000);
  }, []);

  return (
    <View style={styles.container}>
      <Image source={Logo} style={styles.logo} />
      <View style={styles.textContainer}>
        <Text style={styles.text}>Samrat</Text>
        <Text style={styles.text1}>Indikator</Text>
      </View>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 220,
    height: 220,
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  text: {
    color: '#ED1F33',
    fontWeight: 'bold',
    fontSize: 25,
    marginRight: 5,
  },
  text1: {
    color: '#1E9DEC',
    fontWeight: 'bold',
    fontSize: 25,
  },
});
