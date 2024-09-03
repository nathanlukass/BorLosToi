import * as React from 'react';
import {Image, StyleSheet, Text, View, Pressable} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation, ParamListBase} from '@react-navigation/native';
import {
  FontFamily,
  FontSize,
  Border,
  Color,
  Padding,
} from '../../../GlobalStyles';

const ProfileScreenAdmin = () => {
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  return (
    <View style={styles.profileScreenNurse}>
      <Pressable
        style={styles.bottomNavigation}
        onPress={() => navigation.navigate('InputScreenNurse')}>
        <Pressable
          style={[styles.homeParent, styles.parentFlexBox]}
          onPress={() => navigation.navigate('HomeScreenAdmin')}>
          <Image
            style={[styles.homeIcon, styles.iconLayout]}
            resizeMode="cover"
            source={require('../../../assets/home.png')}
          />
          <Text style={[styles.home, styles.homeTypo]}>Home</Text>
        </Pressable>
        <Pressable
          style={styles.parentFlexBox}
          onPress={() => navigation.navigate('EditScreenAdmin')}>
          <Image
            style={[styles.homeIcon, styles.iconLayout]}
            resizeMode="cover"
            source={require('../../../assets/assignment.png')}
          />
          <Text style={[styles.riwayat, styles.homeTypo]}>Edit</Text>
        </Pressable>
        <View style={styles.parentFlexBox}>
          <Image
            style={[styles.homeIcon, styles.iconLayout]}
            resizeMode="cover"
            source={require('../../../assets/account-circle.png')}
          />
          <Text style={[styles.profil, styles.homeTypo]}>Profil</Text>
        </View>
      </Pressable>
      <View style={[styles.logoutButton, styles.aboutAppLayout]}>
        <Pressable
          style={[styles.logoutButtonChild, styles.childShadowBox]}
          onPress={() => navigation.navigate('HomeScreenNurse')}
        />
        <Text style={styles.logOut}>Log Out</Text>
      </View>
      <View style={[styles.aboutApp, styles.aboutAppLayout]}>
        <View style={[styles.aboutAppChild, styles.standbydonorChildLayout]} />
        <Text style={[styles.aboutApp1, styles.aboutApp1Typo]}>About App</Text>
        <Image
          style={styles.iconInfoEmpty}
          resizeMode="cover"
          source={require('../../../assets/-icon-info-empty.png')}
        />
      </View>
      <View style={[styles.standbydonor, styles.standbydonorChildLayout]}>
        <View
          style={[styles.standbydonorChild, styles.standbydonorChildLayout]}
        />
        <Text style={[styles.changePassword, styles.aboutApp1Typo]}>
          Change Password
        </Text>
        <Image
          style={[styles.settingsIcon, styles.iconLayout]}
          resizeMode="cover"
          source={require('../../../assets/settings1.png')}
        />
      </View>
      <View style={styles.profileScreenNurseChild} />
      <Image
        style={[styles.memojiIcon, styles.profilePosition]}
        resizeMode="cover"
        source={require('../../../assets/memoji.png')}
      />

      <Text style={[styles.joshuaTengker, styles.adminLayout]}>
        Joshua Tengker
      </Text>
      <Text style={[styles.admin, styles.adminLayout]}>Admin</Text>
      <Text style={[styles.profile, styles.profilePosition]}>Profile</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  parentFlexBox: {
    justifyContent: 'center',
    width: 44,
    alignItems: 'center',
  },
  iconLayout: {
    height: 24,
    width: 24,
  },
  homeTypo: {
    textAlign: 'center',
    fontFamily: FontFamily.iconText,
    fontWeight: '500',
    lineHeight: 20,
    fontSize: FontSize.iconText_size,
  },
  aboutAppLayout: {
    height: 42,
    position: 'absolute',
  },
  childShadowBox: {
    borderRadius: Border.br_xs,
    elevation: 9,
    shadowRadius: 9,
    shadowColor: 'rgba(0, 0, 0, 0.25)',
    top: 0,
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    backgroundColor: Color.schemesOnPrimary,
  },
  standbydonorChildLayout: {
    width: 324,
    height: 42,
    position: 'absolute',
  },
  aboutApp1Typo: {
    color: Color.notSoBlack,
    top: 6,
    textAlign: 'left',
    height: 31,
    display: 'flex',
    fontFamily: FontFamily.poppinsRegular,
    fontSize: FontSize.m3LabelLarge_size,
    alignItems: 'center',
    position: 'absolute',
  },
  profilePosition: {
    left: '50%',
    position: 'absolute',
  },
  adminLayout: {
    width: 181,
    left: '50%',
    color: Color.notSoBlack,
    height: 31,
    textAlign: 'center',
    position: 'absolute',
  },
  homeIcon: {
    overflow: 'hidden',
  },
  home: {
    color: Color.colorSilver_200,
  },
  homeParent: {
    backgroundColor: Color.schemesOnPrimary,
  },
  riwayat: {
    color: Color.colorSilver_100,
  },
  profil: {
    color: Color.colorMediumaquamarine,
  },
  bottomNavigation: {
    top: 744,
    shadowColor: 'rgba(67, 67, 67, 0.3)',
    shadowRadius: 8,
    elevation: 8,
    width: 360,
    height: 56,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: Padding.p_41xl,
    paddingVertical: Padding.p_9xs,
    alignSelf: 'center',
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    left: 22,
    position: 'absolute',
    backgroundColor: Color.schemesOnPrimary,
  },
  logoutButtonChild: {
    width: 325,
    left: 14,
    elevation: 9,
    shadowRadius: 9,
    shadowColor: 'rgba(0, 0, 0, 0.25)',
    top: 0,
    height: 42,
    position: 'absolute',
  },
  logOut: {
    top: 5,
    color: Color.colorIndianred_100,
    width: 332,
    opacity: 0.7,
    height: 31,
    display: 'flex',
    fontFamily: FontFamily.poppinsRegular,
    fontSize: FontSize.m3LabelLarge_size,
    left: 14,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
  logoutButton: {
    top: 649,
    left: 3,
    width: 329,
  },
  aboutAppChild: {
    borderRadius: Border.br_xs,
    elevation: 9,
    shadowRadius: 9,
    shadowColor: 'rgba(0, 0, 0, 0.25)',
    top: 0,
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    backgroundColor: Color.schemesOnPrimary,
    width: 324,
    left: 0,
  },
  aboutApp1: {
    left: 46,
    width: 278,
    textAlign: 'left',
  },
  iconInfoEmpty: {
    height: '42.86%',
    width: '5.22%',
    top: '28.57%',
    right: '90.99%',
    bottom: '28.57%',
    left: '3.79%',
    maxWidth: '100%',
    maxHeight: '100%',
    position: 'absolute',
    overflow: 'hidden',
  },
  aboutApp: {
    top: 577,
    width: 322,
    left: 22,
  },
  standbydonorChild: {
    borderRadius: Border.br_xs,
    elevation: 9,
    shadowRadius: 9,
    shadowColor: 'rgba(0, 0, 0, 0.25)',
    top: 0,
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    backgroundColor: Color.schemesOnPrimary,
    width: 324,
    left: 0,
  },
  changePassword: {
    left: 47,
    width: 306,
    textAlign: 'left',
  },
  settingsIcon: {
    top: 9,
    left: 12,
    position: 'absolute',
  },
  standbydonor: {
    top: 524,
    left: 22,
  },
  profileScreenNurseChild: {
    top: -2,
    backgroundColor: Color.colorMediumaquamarine,
    width: 364,
    height: 190,
    alignSelf: 'center',
  },
  memojiIcon: {
    marginLeft: -73,
    top: 93,
    borderRadius: Border.br_980xl,
    width: 148,
    height: 156,
    overflow: 'hidden',
  },
  joshuaTengker: {
    marginLeft: -89,
    top: 260,
    fontSize: FontSize.m3BodyLarge_size,
    fontFamily: FontFamily.interBold,
    fontWeight: '700',
  },
  admin: {
    marginLeft: -90,
    top: 285,
    fontSize: FontSize.m3LabelLarge_size,
    width: 181,
    fontFamily: FontFamily.iconText,
    fontWeight: '500',
  },
  profile: {
    marginLeft: -33,
    top: 45,
    fontSize: FontSize.size_xl,
    fontFamily: FontFamily.poppinsBold,
    color: Color.schemesOnPrimary,
    fontWeight: '700',
    textAlign: 'left',
  },
  profileScreenNurse: {
    borderRadius: Border.br_xl,
    flex: 1,
    width: '100%',
    height: 800,
    overflow: 'hidden',
    backgroundColor: Color.schemesOnPrimary,
    alignSelf: 'center',
  },
});

export default ProfileScreenAdmin;
