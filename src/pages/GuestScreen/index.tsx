import * as React from 'react';
import {Image, StyleSheet, Text, View, Pressable} from 'react-native';
import {DatePickerr, FilterCheckBox} from '../../components';
import Stats1 from '../../../components/Stats1';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation, ParamListBase} from '@react-navigation/native';
import {
  FontSize,
  FontFamily,
  Color,
  Padding,
  Border,
} from '../../../GlobalStyles';

const ScreenGuest = () => {
  const datePickerStyle1 = {
    top: '25%',
  };
  const datePickerStyle2 = {
    top: '-40%',
  };

  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  return (
    <View style={styles.screenGuest}>
      <DatePickerr style={datePickerStyle1} />
      <View style={styles.groupParent}>
        <FilterCheckBox />
        {/* <Image
          style={styles.groupIcon}
          resizeMode="cover"
          source={require('../../../assets/group.png')}
        />
        <Text style={[styles.filterByPeriod, styles.filterTypo]}>
          Filter by Period
        </Text> */}
      </View>
      <Stats1 />
      <Pressable
        style={[styles.filter, styles.filterShadowBox]}
        onPress={() => navigation.navigate('BORAVLOSTOIBTONDRGDR')}>
      <Text style={[styles.filter1, styles.filterTypo]}>Filter by Indikator</Text>
      </Pressable>
      <Pressable
        style={[styles.filterRuangan, styles.filterShadowBox]}
        onPress={() => navigation.navigate('BorlostoiRuangan')}>
      <Text style={[styles.filter1Ruangan, styles.filterTypo]}>Filter by Ruangan</Text>
      </Pressable>
      <Image
        style={[styles.vectorIcon, styles.vectorIconPosition]}
        resizeMode="cover"
        source={require('../../../assets/vector.png')}
      />
      <DatePickerr style={datePickerStyle2} />
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
    </View>
  );
};

const styles = StyleSheet.create({
  datePickerStyle: {
    top: 10,
  },
  filterTypo: {
    // textAlign: 'center',
    fontSize: FontSize.m3BodyLarge_size,
    color: '#ffffff',
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
    alignSelf: 'center',
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
    top: 190,
    left: 31,
    alignItems: 'center',
    flexDirection: 'row',
    position: 'absolute',
  },
  filter1: {
    top: 8,
    left: 22,
    fontWeight: '500',
    fontFamily: FontFamily.poppinsMedium,
    color: Color.schemesOnPrimary,
    zIndex: 1000,
    position: 'absolute',
  },
  filter1Ruangan: {
    top: 8,
    left: 22,
    fontWeight: '500',
    fontFamily: FontFamily.poppinsMedium,
    color: Color.schemesOnPrimary,
    zIndex: 1000,
    position: 'absolute',
  },
  vectorIcon: {
    marginLeft: 19.5,
    top: 10,
    width: 15,
    height: 15,
  },
  filter: {
    top: 318,
    left: 207,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowRadius: 7,
    elevation: 7,
    borderRadius: 15,
    backgroundColor: Color.colorMediumaquamarine,
    width: 155,
    height: 35,
    justifyContent: 'flex-end',
    paddingLeft: Padding.p_xl,
    paddingTop: Padding.p_3xs,
    paddingRight: Padding.p_3xs,
    paddingBottom: Padding.p_3xs,
  },
  filterRuangan: {
    top: 368,
    left: 207,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowRadius: 7,
    elevation: 7,
    borderRadius: 15,
    backgroundColor: Color.colorMediumaquamarine,
    width: 155,
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
    marginLeft: -45,
    top: '50%',
    fontWeight: '700',
    fontFamily: FontFamily.poppinsBold,
    color: Color.notSoBlack,
    textAlign: 'center',
    fontSize: FontSize.m3BodyLarge_size,
    zIndex: 1,
    left: '50%',
    alignSelf: 'center',
  },
  barAtas: {
    top: 20,
    left: 17,
    shadowColor: 'rgba(0, 0, 0, 0.25)',
    shadowRadius: 4,
    elevation: 4,
    borderRadius: Border.br_8xs,
    width: 360,
    height: 45,
    justifyContent: 'space-between',
    backgroundColor: Color.schemesOnPrimary,
    alignSelf: 'center',
  },
  screenGuest: {
    // borderRadius: Border.br_xl,
    flex: 1,
    height: 900,
    // overflow: 'hidden',
    // width: '100%',
    backgroundColor: Color.schemesOnPrimary,
  },
});

export default ScreenGuest;
