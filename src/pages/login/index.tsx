/* eslint-disable prettier/prettier */
import React from 'react';
import {ScrollView, StyleSheet, View, Text, Image} from 'react-native';
import {Button, Gap, PageHeader, TextInput} from '../../components';
import Unklab from '../../assets/images/Unklab.png';
// import { Image } from 'react-native-svg';

const Login = ({navigation}) => {
  return (
    <ScrollView style={styles.container}>
      <View>
        <Text>Login</Text>
      </View>
    </ScrollView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#A109C7',
    flex: 1,
  },
  contentWrapper: {
    backgroundColor: '#A109C7',
    flex: 1,
    paddingHorizontal: 24,
  },
  title: {
    fontFamily: 'Poppins',
    color: '#FFFFFF',
    fontWeight: '700',
    textAlign: 'center',
    lineHeight: 52,
    fontSize: 35,
    marginTop: 33,
  },
  head: {
    fontFamily: 'Poppins',
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 13,
    fontWeight: '500',
    marginTop: 12,
  },
  imageStyle: {
    width: 60,
    height: 50,
    resizeMode: 'stretch',
    alignItems: 'center',
    marginBottom: 50,
    marginTop: 100,
  },
  buttonStyle: {
    width: 150,
    marginLeft: 85,
  },
});
