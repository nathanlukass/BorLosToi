import * as React from 'react';
import {StyleSheet, View, Text, Image, Pressable} from 'react-native';
import FrameComponent from '../../../components/FrameComponent';
import AndroidStatusBar from '../../../components/AndroidStatusBar';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation, ParamListBase} from '@react-navigation/native';
import {
  Border,
  Color,
  FontSize,
  FontFamily,
  Padding,
} from '../../../GlobalStyles';

const HomeScreenAdmin = () => {
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  return (
    <View style={styles.homeScreenAdmin}>
      <View style={[styles.welcomeBar, styles.welcomeLayout]}>
        <View style={[styles.welcomeBarChild, styles.childShadowBox]} />
        <FrameComponent veronikaBedes="Joshua " />
        <Text style={styles.admin}>{'Admin '}</Text>
      </View>
      <Pressable onPress={() => navigation.navigate('PrintOutScreen')}>
        <View style={[styles.lihatBorlostoi, styles.lihatLayout]}>
          <View style={[styles.lihatBorlostoiChild, styles.lihatLayout]} />
          <Text style={[styles.printOutHasil, styles.printOutHasilFlexBox]}>
            {'Print out hasil '}
          </Text>
        </View>
      </Pressable>
      <View style={[styles.lihatBorlostoi1, styles.lihatBorlostoi1FlexBox]}>
        <View style={[styles.lihatBorlostoiItem, styles.lihatLayout]} />
        <Text
          style={[styles.lihatBorLosContainer, styles.printOutHasilFlexBox]}>
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
      </View>
      <View style={[styles.bottomNavigation, styles.lihatBorlostoi1FlexBox]}>
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
          onPress={() => navigation.navigate('EditScreenAdmin')}>
          <Image
            style={styles.homeIcon}
            resizeMode="cover"
            source={require('../../../assets/assignment.png')}
          />
          <Text style={[styles.riwayat, styles.homeTypo]}>Edit</Text>
        </Pressable>
        <Pressable
          style={styles.parentFlexBox}
          onPress={() => navigation.navigate('ProfileScreenAdmin')}>
          <Image
            style={styles.homeIcon}
            resizeMode="cover"
            source={require('../../../assets/account-circle1.png')}
          />
          <Text style={[styles.riwayat, styles.homeTypo]}>Profil</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  welcomeLayout: {
    width: 328,
    shadowColor: 'rgba(0, 0, 0, 0.25)',
  },
  childShadowBox: {
    borderRadius: Border.br_xs,
    elevation: 9,
    shadowRadius: 9,
    top: 0,
    left: 0,
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    position: 'absolute',
    backgroundColor: Color.schemesOnPrimary,
  },
  lihatLayout: {
    height: 36,
    width: 328,
    shadowColor: 'rgba(0, 0, 0, 0.25)',
  },
  printOutHasilFlexBox: {
    height: 31,
    alignItems: 'center',
    display: 'flex',
    fontSize: FontSize.m3LabelLarge_size,
    top: '50%',
    textAlign: 'left',
    position: 'absolute',
  },
  lihatBorlostoi1FlexBox: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    position: 'absolute',
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
  welcomeBarChild: {
    height: 148,
    width: 328,
    shadowColor: 'rgba(0, 0, 0, 0.25)',
  },
  admin: {
    top: 92,
    left: 13,
    fontSize: FontSize.m3BodyLarge_size,
    textAlign: 'left',
    color: Color.colorMediumaquamarine,
    fontFamily: FontFamily.poppinsSemiBold,
    fontWeight: '600',
    position: 'absolute',
  },
  welcomeBar: {
    top: 44,
    height: 166,
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    position: 'absolute',
    elevation: 4,
    shadowRadius: 4,
    left: '50%',
    marginLeft: -164,
    width: 328,
    shadowColor: 'rgba(0, 0, 0, 0.25)',
  },
  lihatBorlostoiChild: {
    borderRadius: Border.br_xs,
    elevation: 9,
    shadowRadius: 9,
    top: 0,
    left: 0,
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    position: 'absolute',
    backgroundColor: Color.schemesOnPrimary,
  },
  printOutHasil: {
    marginTop: -15,
    left: 18,
    width: 310,
    color: Color.notSoBlack,
    fontFamily: FontFamily.poppinsRegular,
  },
  lihatBorlostoi: {
    top: 262,
    left: 16,
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    position: 'absolute',
    elevation: 4,
    shadowRadius: 4,
    height: 36,
  },
  lihatBorlostoiItem: {
    zIndex: 0,
    borderRadius: Border.br_xs,
    elevation: 9,
    shadowRadius: 9,
    top: 0,
    left: 0,
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    position: 'absolute',
    backgroundColor: Color.schemesOnPrimary,
  },
  lihat1: {
    color: Color.colorMediumaquamarine,
  },
  lihat: {
    fontFamily: FontFamily.poppinsRegular,
  },
  borLosToi: {
    fontFamily: FontFamily.poppinsSemiBold,
    fontWeight: '600',
  },
  borLosToiBtoGdrNdr: {
    color: Color.notSoBlack,
  },
  lihatBorLosContainer1: {
    width: '100%',
  },
  lihatBorLosContainer: {
    marginTop: -16,
    marginLeft: -144,
    width: 308,
    zIndex: 1,
    left: '50%',
  },
  lihatBorlostoi1: {
    top: 210,
    paddingHorizontal: 0,
    paddingVertical: 2,
    height: 36,
    width: 328,
    shadowColor: 'rgba(0, 0, 0, 0.25)',
    justifyContent: 'space-between',
    flexDirection: 'row',
    elevation: 4,
    shadowRadius: 4,
    left: '50%',
    marginLeft: -164,
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
    top: 744,
    shadowColor: 'rgba(67, 67, 67, 0.3)',
    shadowRadius: 8,
    elevation: 8,
    width: 360,
    height: 56,
    paddingHorizontal: Padding.p_41xl,
    paddingVertical: Padding.p_9xs,
    left: 0,
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: Color.schemesOnPrimary,
  },
  homeScreenAdmin: {
    borderRadius: Border.br_xl,
    flex: 1,
    height: 800,
    overflow: 'hidden',
    width: '100%',
    backgroundColor: Color.schemesOnPrimary,
  },
});

export default HomeScreenAdmin;
