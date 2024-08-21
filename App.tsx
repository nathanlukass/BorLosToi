<<<<<<< HEAD
/* eslint-disable prettier/prettier */
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import Router from './src/router/';
=======
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Router from './src/Router';
>>>>>>> 7fa20ef08590d67dcb7dcb0fc03be6b751471bf7

const App = () => {
  return (
    <NavigationContainer>
      <Router />
    </NavigationContainer>
  );
};

export default App;
