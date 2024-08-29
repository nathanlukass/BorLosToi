import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {
  SplashScreen,
  LoginScreen,
  HomeScreenNurse,
  NurseInputPage,
  ScreenGuest,
  ProfileScreenNurse,
} from '../pages';

const Stack = createNativeStackNavigator();
const index = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SplashScreen"
        component={SplashScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="HomeScreenNurse"
        component={HomeScreenNurse}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="NurseInputPage"
        component={NurseInputPage}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ProfilScreenNurse"
        component={ProfileScreenNurse}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ScreenGuest"
        component={ScreenGuest}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default index;
