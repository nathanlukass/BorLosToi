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
  BORAVLOSTOIBTONDRGDR,
  BOR,
  AVLOS,
  TOI,
  BTO,
  NDR,
  GDR,
  AboutApp,
  ChangePassword,
  BorlostoiRuangan,
  StatsMujairA,
  StatsMujairB,
  StatsMujairC,
  StatsNike,
  StatsPayangka,
  StatsNeonati,
  StatsBomboya,
  StatsKarper,
  StatsICU,
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
      <Stack.Screen
        name="BORAVLOSTOIBTONDRGDR"
        component={BORAVLOSTOIBTONDRGDR}
        options={{headerShown: false}}
      />
      <Stack.Screen name="BOR" component={BOR} options={{headerShown: false}} />
      <Stack.Screen
        name="AVLOS"
        component={AVLOS}
        options={{headerShown: false}}
      />

      <Stack.Screen name="TOI" component={TOI} options={{headerShown: false}} />
      <Stack.Screen name="BTO" component={BTO} options={{headerShown: false}} />
      <Stack.Screen name="NDR" component={NDR} options={{headerShown: false}} />
      <Stack.Screen name="GDR" component={GDR} options={{headerShown: false}} />
      <Stack.Screen
        name="AboutApp"
        component={AboutApp}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ChangePassword"
        component={ChangePassword}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="BorlostoiRuangan"
        component={BorlostoiRuangan}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="StatsMujairA"
        component={StatsMujairA}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="StatsMujairB"
        component={StatsMujairB}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="StatsMujairC"
        component={StatsMujairC}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="StatsNike"
        component={StatsNike}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="StatsPayangka"
        component={StatsPayangka}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="StatsNeonati"
        component={StatsNeonati}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="StatsBomboya"
        component={StatsBomboya}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="StatsKarper"
        component={StatsKarper}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="StatsICU"
        component={StatsICU}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default index;
