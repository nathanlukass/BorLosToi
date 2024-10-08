import React, {useState} from 'react';
import {Image, StyleSheet, Text, View, Pressable} from 'react-native';
import {DatePickerr, FilterCheckBox} from '../../components';
import Stats from '../../../components/Stats';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation, ParamListBase } from '@react-navigation/native';
import {
  FontSize,
  FontFamily,
  Color,
  Padding,
  Border,
} from '../../../GlobalStyles';

const ScreenGuest = () => {
  const [isFilterChecked, setIsFilterChecked] = useState(false); // State to track checkbox status

  const datePickerStyle1 = {
    top: '16%',
  };

  const datePickerStyle2 = {
    top: '-58%',
    display: isFilterChecked ? 'flex' : 'none', // Show or hide based on checkbox state
  };

  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  return (
    <View style={styles.screenGuest}>
      <DatePickerr style={datePickerStyle1} />
      <View style={styles.groupParent}>
        <FilterCheckBox
          isChecked={isFilterChecked}
          onChange={() => setIsFilterChecked(!isFilterChecked)}
        />
      </View>
      <Stats />
      
      <Pressable
        style={[styles.okButton, styles.filterShadowBox]} 
        onPress={() => console.log('OK Button Pressed')}>
        <Text style={[styles.okButtonText, styles.filterTypo]}>Lihat</Text>
      </Pressable>

      <Pressable
        style={[styles.filter, styles.filterShadowBox]}
        onPress={() => navigation.navigate('BORAVLOSTOIBTONDRGDR')}>
        <Text style={[styles.filter1, styles.filterTypo]}>
          Filter by Indikator
        </Text>
      </Pressable>
      <Pressable
        style={[styles.filterRuangan, styles.filterShadowBox]}
        onPress={() => navigation.navigate('BorlostoiRuangan')}>
        <Text style={[styles.filter1Ruangan, styles.filterTypo]}>
          Filter by Ruangan
        </Text>
      </Pressable>
      <Image
        style={[styles.vectorIcon, styles.vectorIconPosition]}
        resizeMode="cover"
        source={require('../../../assets/vector.png')}
      />
      {/* Conditionally render the second DatePickerr based on checkbox state */}
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
    top: 20,
  },
  filterTypo: {
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
  groupParent: {
    top: 190,
    left: 31,
    alignItems: 'center',
    flexDirection: 'row',
    position: 'absolute',
  },
  filter1: {
    top: 8,
    left: 20,
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
    top: 620,
    left: 207,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowRadius: 7,
    elevation: 7,
    borderRadius: 20,
    backgroundColor: Color.colorMediumaquamarine,
    width: 180,
    height: 40,
    justifyContent: 'flex-end',
    paddingLeft: Padding.p_xl,
    paddingTop: Padding.p_3xs,
    paddingRight: Padding.p_3xs,
    paddingBottom: Padding.p_3xs,
  },
  filterRuangan: {
    top: 670,
    left: 207,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowRadius: 7,
    elevation: 7,
    borderRadius: 20,
    backgroundColor: Color.colorMediumaquamarine,
    width: 180,
    height: 40,
    justifyContent: 'flex-end',
    paddingLeft: Padding.p_xl,
    paddingTop: Padding.p_3xs,
    paddingRight: Padding.p_3xs,
    paddingBottom: Padding.p_3xs,
  },
  
  // New OK button styles
  okButton: {
    top: 250, // Position it above the other buttons
    left: 282,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowRadius: 7,
    elevation: 7,
    borderRadius: 20,
    backgroundColor: Color.colorMediumaquamarine,
    width: 100,
    height: 40,
    justifyContent: 'flex-end',
    paddingLeft: Padding.p_xl,
    paddingTop: Padding.p_3xs,
    paddingRight: Padding.p_3xs,
    paddingBottom: Padding.p_3xs,
  },
  okButtonText: {
    top: 8,
    left: 30,
    fontWeight: '500',
    fontFamily: FontFamily.poppinsMedium,
    color: Color.schemesOnPrimary,
    zIndex: 1000,
    position: 'absolute',
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
    marginLeft: -72,
    top: '50%',
    fontFamily: FontFamily.poppinsBold,
    color: Color.notSoBlack,
    textAlign: 'center',
    fontSize: 16,
    zIndex: 1,
    left: '50%',
    alignSelf: 'center',
  },
  barAtas: {
    shadowRadius: 4,
    elevation: 4,
    borderRadius: Border.br_8xs,
    width: 410,
    height: 60,
    justifyContent: 'space-between',
    backgroundColor: Color.schemesOnPrimary,
    alignSelf: 'center',
  },
  screenGuest: {
    flex: 1,
    height: 900,
    backgroundColor: Color.schemesOnPrimary,
  },
});

export default ScreenGuest;
