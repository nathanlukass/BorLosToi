import * as React from 'react';
import {Image, StyleSheet, Text, View, Pressable} from 'react-native';
import DockedInputDatePickerDesk from '../../../components/DockedInputDatePickerDesk';
import Stats2 from '../../../components/Stats2';
import Stats1 from '../../../components/Stats1';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation, ParamListBase} from '@react-navigation/native';
import AndroidStatusBar from '../../../components/AndroidStatusBar';
import {
  FontSize,
  FontFamily,
  Color,
  Padding,
  Border,
} from '../../../GlobalStyles';

const ScreenGuest = () => {
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  return (
    <View style={styles.screenGuest}>
      <DockedInputDatePickerDesk
        showClearButton
        propTop={95}
        propBackgroundColor="unset"
        propBackgroundColor="unset"
        propBackgroundColor="unset"
        propBackgroundColor="unset"
      />
      <DockedInputDatePickerDesk
        showClearButton
        propBackgroundColor="unset"
        propBackgroundColor="unset"
        propBackgroundColor="unset"
        propBackgroundColor="unset"
      />
      <View style={styles.groupParent}>
        <Image
          style={styles.groupIcon}
          resizeMode="cover"
          source={require('../../../assets/group.png')}
        />
        <Text style={[styles.filterByPeriod, styles.filterTypo]}>
          Filter by Period
        </Text>
      </View>
      <Stats1 />
      <View style={[styles.filter, styles.filterShadowBox]}>
        <Text style={[styles.filter1, styles.filterTypo]}>Filter</Text>
        <Image
          style={[styles.vectorIcon, styles.vectorIconPosition]}
          resizeMode="cover"
          source={require('../../../assets/vector.png')}
        />
      </View>
      <View style={[styles.barAtas, styles.filterShadowBox]}>
        <Pressable
          style={styles.backButton}
          onPress={() => navigation.navigate('LoginScreen')}>
          <Image
            style={styles.icon}
            resizeMode="cover"
            source={require('../../../assets/-icon-arrow-back.png')}
          />
        </Pressable>
        <Text style={[styles.backToLogin, styles.vectorIconPosition]}>
          Back to login page
        </Text>
      </View>
      <AndroidStatusBar
        battery={require('../../../assets/battery1.png')}
        androidStatusBarPosition="absolute"
        androidStatusBarWidth="unset"
        androidStatusBarTop={0}
        androidStatusBarRight={0}
        androidStatusBarLeft={0}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  filterTypo: {
    textAlign: 'left',
    fontSize: FontSize.m3BodyLarge_size,
  },
  filterShadowBox: {
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    alignItems: 'center',
    flexDirection: 'row',
    position: 'absolute',
  },
  vectorIconPosition: {
    zIndex: 1,
    left: '50%',
    position: 'absolute',
  },
  groupIcon: {
    width: 20,
    height: 20,
  },
  filterByPeriod: {
    fontStyle: 'italic',
    fontFamily: FontFamily.robotoItalic,
    color: 'rgba(0, 0, 0, 0.3)',
    marginLeft: 7,
  },
  groupParent: {
    top: 206,
    left: 31,
    alignItems: 'center',
    flexDirection: 'row',
    position: 'absolute',
  },
  filter1: {
    top: 5,
    left: 12,
    fontWeight: '500',
    fontFamily: FontFamily.poppinsMedium,
    color: Color.schemesOnPrimary,
    zIndex: 0,
    position: 'absolute',
    textAlign: 'left',
  },
  vectorIcon: {
    marginLeft: 19.5,
    top: 10,
    width: 15,
    height: 15,
  },
  filter: {
    top: 338,
    left: 237,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowRadius: 7,
    elevation: 7,
    borderRadius: 15,
    backgroundColor: Color.colorMediumaquamarine,
    width: 85,
    height: 35,
    justifyContent: 'flex-end',
    paddingLeft: Padding.p_xl,
    paddingTop: Padding.p_3xs,
    paddingRight: Padding.p_3xs,
    paddingBottom: Padding.p_3xs,
  },
  icon: {
    height: '100%',
    width: '100%',
  },
  backButton: {
    width: 42,
    height: 25,
    zIndex: 0,
  },
  backToLogin: {
    marginTop: -11.5,
    marginLeft: -76,
    top: '50%',
    fontWeight: '700',
    fontFamily: FontFamily.poppinsBold,
    color: Color.notSoBlack,
    textAlign: 'center',
    fontSize: FontSize.m3BodyLarge_size,
    zIndex: 1,
    left: '50%',
  },
  barAtas: {
    top: 24,
    left: 0,
    shadowColor: 'rgba(0, 0, 0, 0.25)',
    shadowRadius: 4,
    elevation: 4,
    borderRadius: Border.br_8xs,
    width: 360,
    height: 45,
    justifyContent: 'space-between',
    backgroundColor: Color.schemesOnPrimary,
  },
  screenGuest: {
    borderRadius: Border.br_xl,
    flex: 1,
    height: 800,
    overflow: 'hidden',
    width: '100%',
    backgroundColor: Color.schemesOnPrimary,
  },
});

export default ScreenGuest;
