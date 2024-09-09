import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {
  SplashScreen,
  LoginScreen,
  HomeScreenNurse,
  NurseInputPage,
  ScreenGuest,
  ProfileScreenNurse,
  HomeScreenAdmin,
  ProfileScreenAdmin,
  EditScreenAdmin,
  PrintOutScreen,
  EditMujairA,
  EditMujairB,
  EditMujairC,
  EditNike,
  EditNeonati,
  EditPayangka,
  EditKarper,
  EditBomboya,
  EditIcu,
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
      <Stack.Screen
        name="HomeScreenAdmin"
        component={HomeScreenAdmin}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ProfileScreenAdmin"
        component={ProfileScreenAdmin}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="EditScreenAdmin"
        component={EditScreenAdmin}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="PrintOutScreen"
        component={PrintOutScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="EditMujairA"
        component={EditMujairA}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="EditMujairB"
        component={EditMujairB}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="EditMujairC"
        component={EditMujairC}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="EditNike"
        component={EditNike}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="EditNeonati"
        component={EditNeonati}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="EditPayangka"
        component={EditPayangka}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="EditKarper"
        component={EditKarper}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="EditBomboya"
        component={EditBomboya}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="EditIcu"
        component={EditIcu}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default index;
