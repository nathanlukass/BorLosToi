import React, {useState, useCallback} from 'react';
import {Image, StyleSheet, View, Text, Pressable, Modal} from 'react-native';
import WelcomeBar from '../../../components/WelcomeBar';
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

const HomeScreenNurse = () => {
  const [lihatBORLOSVisible, setLihatBORLOSVisible] = useState(false);
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  const openLihatBORLOS = useCallback(() => {
    setLihatBORLOSVisible(true);
  }, []);

  const closeLihatBORLOS = useCallback(() => {
    setLihatBORLOSVisible(false);
  }, []);

  return (
    <>
      <View style={styles.homeScreenNurse}>
        <WelcomeBar />
        <Image
          style={styles.logoApp4}
          resizeMode="cover"
          source={require('../../../assets/logo-app-4.png')}
        />
        <DashbordIsianHariIni />
        <View style={[styles.lihatBorlostoi, styles.lihatLayout]}>
          <View
            style={[
              styles.lihatBorlostoiChild,
              styles.bottomNavigationShadowBox,
            ]}
          />
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
        {/* <AndroidStatusBar
          battery={require('../../../assets/battery1.png')}
          androidStatusBarPosition="absolute"
          androidStatusBarWidth="unset"
          androidStatusBarTop={0}
          androidStatusBarRight={0}
          androidStatusBarLeft={0}
        /> */}
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
            onPress={() => navigation.navigate('NurseInputPage')}>
            <Image
              style={styles.homeIcon}
              resizeMode="cover"
              source={require('../../../assets/assignment.png')}
            />
            <Text style={[styles.riwayat, styles.homeTypo]}>Input</Text>
          </Pressable>
          <Pressable
            style={styles.parentFlexBox}
            onPress={() => navigation.navigate('ProfilScreenNurse')}>
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
    left: 30,
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
});

export default HomeScreenNurse;
