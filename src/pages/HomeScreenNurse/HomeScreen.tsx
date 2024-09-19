import React, { useState, useCallback } from 'react';
import { Image, StyleSheet, View, Text, Pressable, Modal, ScrollView } from 'react-native';
import WelcomeBar from '../../../components/WelcomeBar';
import DashbordIsianHariIni from '../../../components/DashbordIsianHariIni';
import Stats from '../../../components/Stats';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation, ParamListBase } from '@react-navigation/native';
import { Color, FontFamily, FontSize, Border, Padding } from '../../../GlobalStyles';

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
        {/* Wrap main content in ScrollView to allow scrolling if content exceeds screen height */}
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <WelcomeBar />
          <DashbordIsianHariIni />
          <View style={[styles.lihatBorlostoi, styles.lihatLayout]}>
            <View style={[styles.lihatBorlostoiChild, styles.bottomNavigationShadowBox]} />
            <Pressable style={styles.lihatBorLosContainer} onPress={openLihatBORLOS}>
              <Text style={styles.text}>
                <Text style={styles.lihatBorLosContainer1}>
                  <Text style={styles.lihat}>
                    <Text style={styles.lihat1}>Lihat</Text>
                  </Text>
                  <Text style={styles.borLosToiBtoGdrNdr}>
                    <Text style={styles.lihat}>{'  '}</Text>
                    <Text style={styles.borLosToi}>BOR LOS TOI BTO GDR & NDR</Text>
                  </Text>
                </Text>
              </Text>
            </Pressable>
          </View>
        </ScrollView>

        {/* Static Bottom Navigation Bar */}
        <View style={[styles.bottomNavigation, styles.bottomNavigationShadowBox]}>
          <View style={styles.navItemContainer}>
            <Image style={styles.navIcon} resizeMode="cover" source={require('../../../assets/home1.png')} />
            <Text style={[styles.navText, styles.homeActive]}>Home</Text>
          </View>
          <Pressable style={styles.navItemContainer} onPress={() => navigation.navigate('NurseInputPage')}>
            <Image style={styles.navIcon} resizeMode="cover" source={require('../../../assets/assignment.png')} />
            <Text style={styles.navText}>Input</Text>
          </Pressable>
          <Pressable style={styles.navItemContainer} onPress={() => navigation.navigate('ProfilScreenNurse')}>
            <Image style={styles.navIcon} resizeMode="cover" source={require('../../../assets/account-circle1.png')} />
            <Text style={styles.navText}>Profil</Text>
          </Pressable>
        </View>
      </View>

      {/* Modal for BOR LOS */}
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
  contentContainer: {
    paddingBottom: 80, // Ensure content doesn't overlap the navigation bar
  },
  homeScreenNurse: {
    flex: 1,
    backgroundColor: Color.schemesOnPrimary,
  },
  lihatLayout: {
    height: 46,
    width: 328,
  },
  bottomNavigationShadowBox: {
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    backgroundColor: Color.schemesOnPrimary,
  },
  lihatBorlostoiChild: {
    top: 0,
    shadowColor: 'rgba(0, 0, 0, 0.25)',
    shadowRadius: 9,
    elevation:15,
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
  bottomNavigation: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 56,
    backgroundColor: Color.schemesOnPrimary,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    shadowColor: 'rgba(67, 67, 67, 0.3)',
    shadowRadius: 8,
    elevation: 8,
  },
  navItemContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  navIcon: {
    width: 24,
    height: 24,
  },
  navText: {
    fontFamily: FontFamily.poppinsRegular,
    fontWeight: '500',
    lineHeight: 20,
    fontSize: FontSize.iconText_size,
    textAlign: 'center',
    color: Color.colorSilver_100,
  },
  homeActive: {
    color: Color.colorMediumaquamarine,
  },
});

export default HomeScreenNurse;
