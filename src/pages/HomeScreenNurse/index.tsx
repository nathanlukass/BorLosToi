import React, {useState, useCallback} from 'react';
import {Image, StyleSheet, Text, View, Pressable, Modal} from 'react-native';
import WelcomeBar from '../../../components/WelcomeBar';
import FrameComponent from '../../../components/FrameComponent';
import {Gap} from '../../../src/components';
import DashbordIsianHariIni from '../../../components/DashbordIsianHariIni';
import Stats from '../../../components/Stats';
// import AndroidStatusBar from '../../../components/AndroidStatusBar';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation, ParamListBase} from '@react-navigation/native';
import {
  Color,
  FontFamily,
  FontSize,
  Border,
  Padding,
} from '../../../GlobalStyles';
import {Picker} from '@react-native-picker/picker'; // Correct import

const HomeScreenNurse = ({route}) => {
  const {user} = route.params;
  const {username, role, ruangan, id_user, nama} = user; // Access all relevant fields
  console.log('Route params:', route.params);

  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);

  const currentYear = new Date().getFullYear();
  const yearOptions = [currentYear, currentYear - 1, currentYear - 2];
  const monthOptions = Array.from({length: 12}, (_, index) => index + 1);

  const openLihatBORLOS = () => {
    console.log('Navigating to Lihat BOR LOS with', {
      selectedYear,
      selectedMonth,
    });
    // Implement the logic to navigate or open the relevant screen
  };

  const [lihatBORLOSVisible, setLihatBORLOSVisible] = useState(false);
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  const closeLihatBORLOS = useCallback(() => {
    setLihatBORLOSVisible(false);
  }, []);

  return (
    <>
      <View style={styles.homeScreenNurse}>
        {/* <WelcomeBar /> */}
        <View style={[styles.welcomeBar, styles.welcomeLayout]}>
          <View style={[styles.welcomeBarChild, styles.welcomeLayout]} />
          <Text style={[styles.mujair, styles.mujairTypo]}>{ruangan}</Text>
          <FrameComponent veronikaBedes={nama} />
          <Gap height={100} />
          <Text style={[styles.ruangan, styles.mujairTypo]}>Ruangan :</Text>
        </View>
        <Image
          style={styles.logoApp4}
          resizeMode="cover"
          source={require('../../../assets/logo-app-4.png')}
        />
        <DashbordIsianHariIni />
        {/* <View style={[styles.lihatBorlostoi, styles.lihatLayout]}>
          <View
            style={[
              styles.lihatBorlostoiChild,
              styles.bottomNavigationShadowBox,
            ]}
          />
          <View style={styles.container1}>
            <Pressable
              style={styles.lihatBorLosContainer}
              onPress={openLihatBORLOS}>
              <Text style={styles.text}>
                <Text style={styles.lihatBorLosContainer1}>
                  <Text style={styles.lihat}>
                    <Text style={styles.lihat1}>Lihat</Text>
                  </Text>
                  <Text style={styles.borLosToiBtoGdrNdr}>
                    <Text style={styles.lihat}>{'  '}</Text>
                    <Text style={styles.borLosToi}>
                      {'BOR LOS TOI BTO GDR & NDR'}
                    </Text>
                  </Text>
                </Text>
              </Text>
            </Pressable>
          </View>
        </View> */}
        <View
          style={[styles.bottomNavigation, styles.bottomNavigationShadowBox]}>
          <View style={[styles.homeParent, styles.parentFlexBox]}>
            <Image
              style={styles.homeIcon}
              resizeMode="cover"
              source={require('../../../assets/home1.png')}
            />
            <Text style={[styles.home, styles.homeTypo]}>Home</Text>
          </View>
          <Pressable
            style={styles.parentFlexBox}
            onPress={() => navigation.navigate('NurseInputPage', {user})}>
            <Image
              style={styles.homeIcon}
              resizeMode="cover"
              source={require('../../../assets/assignment.png')}
            />
            <Text style={[styles.riwayat, styles.homeTypo]}>Input</Text>
          </Pressable>
          <Pressable
            style={styles.parentFlexBox}
            onPress={() => navigation.navigate('ProfilScreenNurse', {user})}>
            <Image
              style={styles.homeIcon}
              resizeMode="cover"
              source={require('../../../assets/account-circle1.png')}
            />
            <Text style={[styles.riwayat, styles.homeTypo]}>Profil</Text>
          </Pressable>
        </View>
      </View>

      <Modal animationType="fade" transparent visible={lihatBORLOSVisible}>
        <View style={styles.lihatBORLOSOverlay}>
          <Pressable style={styles.lihatBORLOSBg} onPress={closeLihatBORLOS} />
          <Stats onClose={closeLihatBORLOS} />
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  lihatLayout: {
    height: 46,
    width: 328,
    alignSelf: 'center',
  },
  bottomNavigationShadowBox: {
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    left: 0,
    position: 'absolute',
    backgroundColor: Color.schemesOnPrimary,
  },
  parentFlexBox: {
    justifyContent: 'center',
    width: 44,
    alignItems: 'center',
  },
  homeTypo: {
    textAlign: 'center',
    fontFamily: FontFamily.iconText,
    fontWeight: '500',
    lineHeight: 20,
    fontSize: FontSize.iconText_size,
  },
  logoApp4: {
    marginLeft: -221,
    top: 230,
    left: '50%',
    width: 442,
    height: 397,
    display: 'none',
    position: 'absolute',
  },
  lihatBorlostoiChild: {
    top: 0,
    shadowColor: 'rgba(0, 0, 0, 0.25)',
    shadowRadius: 9,
    elevation: 9,
    borderRadius: Border.br_xs,
    height: 46,
    width: 328,
  },
  lihatBORLOSOverlay: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(113, 113, 113, 0.3)',
  },
  lihatBORLOSBg: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    left: 0,
    top: 0,
  },
  lihat1: {
    color: Color.colorMediumaquamarine,
  },
  lihat: {
    fontFamily: FontFamily.poppinsRegular,
  },
  borLosToi: {
    fontWeight: '600',
    fontFamily: FontFamily.poppinsSemiBold,
  },
  borLosToiBtoGdrNdr: {
    color: Color.notSoBlack,
  },
  lihatBorLosContainer1: {
    width: '100%',
  },
  text: {
    fontSize: FontSize.m3LabelLarge_size,
    textAlign: 'left',
    display: 'flex',
    width: 310,
    height: 40,
    alignItems: 'center',
  },
  lihatBorLosContainer: {
    left: 18,
    top: 10,
    position: 'absolute',
  },
  lihatBorlostoi: {
    top: 210,
    position: 'absolute',
  },
  homeIcon: {
    width: 24,
    height: 24,
    overflow: 'hidden',
  },
  home: {
    color: Color.colorMediumaquamarine,
  },
  homeParent: {
    backgroundColor: Color.schemesOnPrimary,
  },
  riwayat: {
    color: Color.colorSilver_100,
  },
  bottomNavigation: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    shadowColor: 'rgba(67, 67, 67, 0.3)',
    shadowRadius: 8,
    elevation: 8,
    height: 56,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 70, // Adjusted padding
    paddingVertical: 8, // Adjusted padding
    backgroundColor: '#ffffff',
    zIndex: 1000,
  },
  homeScreenNurse: {
    // borderRadius: Border.br_xl,
    flex: 1,
    // height: 800,
    // overflow: 'hidden',
    // width: '100%',
    // backgroundColor: Color.schemesOnPrimary,
    // alignSelf: 'center',
  },
  welcomeLayout: {
    width: 328,
    position: 'absolute',
  },
  mujairTypo: {
    textAlign: 'left',
    fontSize: FontSize.m3BodyLarge_size,
    top: 92,
    position: 'absolute',
  },
  welcomeBarChild: {
    top: 0,
    left: 0,
    shadowColor: 'rgba(0, 0, 0, 0.25)',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 9,
    elevation: 9,
    shadowOpacity: 1,
    borderRadius: Border.br_xs,
    backgroundColor: Color.schemesOnPrimary,
    height: 148,
  },
  mujair: {
    left: 104,
    fontFamily: FontFamily.poppinsRegular,
    color: Color.notSoBlack,
  },
  ruangan: {
    left: 13,
    fontWeight: '600',
    fontFamily: FontFamily.poppinsSemiBold,
    color: Color.colorMediumaquamarine,
  },
  welcomeBar: {
    marginLeft: -164,
    top: 44,
    left: '50%',
    height: 166,
  },
container1: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  pickerContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  picker: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingLeft: 10,
  },
  lihatBorLosContainer: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  lihatBorLosContainer1: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  lihat: {
    fontSize: 16,
    color: '#fff',
  },
  borLosToiBtoGdrNdr: {
    fontSize: 16,
    color: '#fff',
  },
  borLosToi: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  lihat1: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HomeScreenNurse;
