/* eslint-disable prettier/prettier */
import LoginScreen from './Auth/LoginScreen';
import SplashScreen from './Auth/SplashScreen';
import HomeScreenNurse from './NursePage/HomeScreen';
import ScreenGuest from './GuestPage/GuestScreen';
import NurseInputPage from './NursePage/InputScreen';
//import ProfileScreenNurse from './ProfilScreenNurse';
import HomeScreenAdmin from './AdminPage/HomeScreen';
//import ProfileScreenAdmin from './ProfileScreenAdmin';
//import EditScreenAdmin from './EditScreenAdmin';
import PrintOutScreen from './AdminPage/PrintOutScreen';
//import BORAVLOSTOIBTONDRGDR from './BorLosToiScreen';
import BOR from './GuestPage/Filter_Indikator/BorScreen';
import AVLOS from './GuestPage/Filter_Indikator/AvlosScreen';
import TOI from './GuestPage/Filter_Indikator/ToiScreen';
import BTO from './GuestPage/Filter_Indikator/BtoScreen';
import NDR from './GuestPage/Filter_Indikator/NdrScreen';
import GDR from './GuestPage/Filter_Indikator/GdrScreen';
import AboutApp from './shared/AboutApp';
import ChangePassword from './shared/ChangePassword';
//import BorlostoiRuangan from './BorlostoiRuangan';
import {
  EditMujairA,
  EditMujairB,
  EditMujairC,
  EditNike,
  EditNeonati,
  EditPayangka,
  EditKarper,
  EditBomboya,
  EditIcu,
} from '../../src/pages/AdminPage/EditScreens';
import {
  StatsMujairA,
  StatsMujairB,
  StatsMujairC,
  StatsNike,
  StatsNeonati,
  StatsPayangka,
  StatsKarper,
  StatsBomboya,
  StatsICU,
} from './GuestPage/FilterByRuangann';

export {
  LoginScreen,
  HomeScreenNurse,
  NurseInputPage,
  ScreenGuest,
  //ProfileScreenNurse,
  HomeScreenAdmin,
  //ProfileScreenAdmin,
 // EditScreenAdmin,
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
  //BORAVLOSTOIBTONDRGDR,
  BOR,
  AVLOS,
  TOI,
  BTO,
  NDR,
  GDR,
  AboutApp,
  ChangePassword,
  //BorlostoiRuangan,
  StatsMujairA,
  StatsMujairB,
  StatsMujairC,
  StatsNike,
  StatsNeonati,
  StatsPayangka,
  StatsKarper,
  StatsBomboya,
  StatsICU,
  SplashScreen,
};
