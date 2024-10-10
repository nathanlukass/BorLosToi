import React, {useState} from 'react';
import {Image, StyleSheet, Text, View, Pressable} from 'react-native';
import {DatePickerr, FilterCheckBox} from '../../../components';
import Stats1 from '../../../../components/Stats1';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation, ParamListBase} from '@react-navigation/native';
import {
  FontSize,
  FontFamily,
  Color,
  Padding,
  Border,
} from '../../../../GlobalStyles';
import {Gap} from '../../../../src/components';

const StatsICU = () => {
  const [isFilterChecked, setIsFilterChecked] = useState(false); // State to track checkbox status

  const datePickerStyle1 = {
    top: '27%',
  };

  const datePickerStyle2 = {
    top: '-35%',
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
      <Pressable
        style={[styles.okButton, styles.filterShadowBox]}
        onPress={() => console.log('OK Button Pressed')}>
        <Text style={[styles.okButtonText, styles.filterTypo]}>Lihat</Text>
      </Pressable>
      <Image
        style={[styles.vectorIcon, styles.vectorIconPosition]}
        resizeMode="cover"
        source={require('../../../../assets/vector.png')}
      />
      {/* Conditionally render the second DatePickerr based on checkbox state */}
      <DatePickerr style={datePickerStyle2} />
      <View style={[styles.barAtas, styles.filterShadowBox]}>
        <Pressable
          style={styles.backButton}
          onPress={() => navigation.navigate('BorlostoiRuangan')}>
          <Image
            style={styles.icon}
            resizeMode="cover"
            source={require('../../../../assets/-icon-arrow-back.png')}
          />
        </Pressable>

        <Text style={[styles.backToLogin, styles.vectorIconPosition]}>ICU</Text>
      </View>
      <View style={styles.stats}>
        <View style={styles.statsChild} />
        <Text style={[styles.hari13Hari]}>60-85%</Text>
        <Text style={[styles.hari13Hari2]}>6-9 Hari</Text>
        <Text style={[styles.hari13Hari3]}>1-3 Hari</Text>
        <Text style={[styles.hari13Hari4]}>40-50 Kali</Text>
        <Text style={[styles.hari13Hari5]}>{'< 20 ‰'}</Text>
        <Text style={[styles.hari13Hari6]}>{'< 45 ‰'}</Text>
        <Text style={[styles.text]}>0</Text>
        <Text style={[styles.text2]}>0</Text>
        <Text style={[styles.text3]}>0</Text>
        <Text style={[styles.text4]}>0</Text>
        <Text style={[styles.text5]}>0</Text>
        <Text style={[styles.text6]}>0</Text>
        <View style={styles.BorAvlosToiContainer}>
          <Text style={[styles.hasil1Typo]}>BOR :</Text>
          <Gap height={22} />
          <Text style={[styles.hasil1Typo]}>AVLOS :</Text>
          <Gap height={23} />
          <Text style={[styles.hasil1Typo]}>TOI :</Text>
          <Gap height={19} />
          <Text style={[styles.hasil1Typo]}>BTO :</Text>
          <Gap height={21} />
          <Text style={[styles.hasil1Typo]}>GDR :</Text>
          <Gap height={23} />
          <Text style={[styles.hasil1Typo]}>NDR :</Text>
        </View>
        <Pressable style={styles.buttonKet}>
          <Text style={styles.buttonKetText}>KET</Text>
        </Pressable>
        <Pressable style={styles.buttonStandar}>
          <Text style={styles.buttonStandarText}>STANDAR</Text>
        </Pressable>
        <Pressable style={styles.buttonHasil}>
          <Text style={styles.buttonHasilText}>HASIL</Text>
        </Pressable>
        <View style={styles.upArrow1Parent}>
          <Image
            style={styles.arrow1IconLayout}
            resizeMode="cover"
            source={require('../../../../assets/red.png')}
          />
          <Image
            style={[styles.downArrow1Icon, styles.arrow1IconLayout]}
            resizeMode="cover"
            source={require('../../../../assets/green.png')}
          />
          <Image
            style={[styles.downArrow1Icon, styles.arrow1IconLayout]}
            resizeMode="cover"
            source={require('../../../../assets/red.png')}
          />
          <Image
            style={[styles.downArrow1Icon, styles.arrow1IconLayout]}
            resizeMode="cover"
            source={require('../../../../assets/green.png')}
          />
          <Image
            style={[styles.downArrow1Icon, styles.arrow1IconLayout]}
            resizeMode="cover"
            source={require('../../../../assets/red.png')}
          />
          <Image
            style={[styles.downArrow1Icon, styles.arrow1IconLayout]}
            resizeMode="cover"
            source={require('../../../../assets/red.png')}
          />
        </View>
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
    left: '58%',
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
    left: '70%',
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
  buttonKet: {
    left: 277,
    top: 27,
    position: 'absolute',
    backgroundColor: Color.colorMediumaquamarine,
    borderTopRightRadius: Border.br_3xs,
    borderTopLeftRadius: Border.br_3xs,
    width: 60,
    height: 30,
  },
  buttonKetText: {
    // left: 15,
    alignSelf: 'center',
    top: 7,
    color: 'white',
  },
  buttonStandar: {
    left: 185,
    top: 27,
    position: 'absolute',
    backgroundColor: Color.colorMediumaquamarine,
    borderTopRightRadius: Border.br_3xs,
    borderTopLeftRadius: Border.br_3xs,
    width: 80,
    height: 30,
  },
  buttonStandarText: {
    // left: 15,
    alignSelf: 'center',
    top: 7,
    color: 'white',
  },
  buttonHasil: {
    left: 113,
    top: 27,
    position: 'absolute',
    backgroundColor: Color.colorMediumaquamarine,
    borderTopRightRadius: Border.br_3xs,
    borderTopLeftRadius: Border.br_3xs,
    width: 60,
    height: 30,
  },
  buttonHasilText: {
    // left: 15,
    alignSelf: 'center',
    top: 7,
    color: 'white',
  },
  BorAvlosToiContainer: {
    flexDirection: 'column',
    // alignItems: 'center',
    marginTop: '17%',
    marginLeft: '8%',
  },
  text1Typo: {
    textAlign: 'left',
    color: Color.colorBlack,
    fontSize: FontSize.m3LabelLarge_size,
    top: '19.7%',
    height: '70.63%',
    position: 'absolute',
  },
  hasil1Typo: {
    fontFamily: FontFamily.poppinsSemiBold,
    fontWeight: '600',
    color: 'black',
    marginBottom: -4,
  },
  ketPosition: {
    padding: Padding.p_base,
    backgroundColor: Color.colorMediumaquamarine,
    borderTopRightRadius: Border.br_3xs,
    borderTopLeftRadius: Border.br_3xs,
    shadowOpacity: 1,
    elevation: 8,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowColor: 'rgba(0, 0, 0, 0.25)',
    bottom: '83.13%',
    top: '8.13%',
    height: '8.75%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    position: 'absolute',
  },
  ket1Typo: {
    color: Color.schemesOnPrimary,
    fontSize: FontSize.m3BodySmall_size,
    textAlign: 'left',
  },
  arrow1IconLayout: {
    height: 20,
    width: 20,
  },
  statsChild: {
    height: '100%',
    width: '100%',
    top: '0%',
    right: '0%',
    bottom: '0%',
    left: '0%',
    borderRadius: Border.br_3xs,
    backgroundColor: Color.schemesOnPrimary,
    position: 'absolute',
  },
  hari13Hari: {
    width: '27.5%',
    left: '47.5%',
    textAlign: 'center',
    color: Color.colorBlack,
    fontFamily: FontFamily.poppinsRegular,
    fontSize: FontSize.m3LabelLarge_size,
    top: '19.69%',
    position: 'absolute',
  },
  hari13Hari2: {
    width: '27.5%',
    left: '47.5%',
    textAlign: 'center',
    color: Color.colorBlack,
    fontFamily: FontFamily.poppinsRegular,
    fontSize: FontSize.m3LabelLarge_size,
    top: '32.5%',
    position: 'absolute',
  },
  hari13Hari3: {
    width: '27.5%',
    left: '47.5%',
    textAlign: 'center',
    color: Color.colorBlack,
    fontFamily: FontFamily.poppinsRegular,
    fontSize: FontSize.m3LabelLarge_size,
    top: '45%',
    position: 'absolute',
  },
  hari13Hari4: {
    width: '27.5%',
    left: '47.5%',
    textAlign: 'center',
    color: Color.colorBlack,
    fontFamily: FontFamily.poppinsRegular,
    fontSize: FontSize.m3LabelLarge_size,
    top: '58%',
    position: 'absolute',
  },
  hari13Hari5: {
    width: '27.5%',
    left: '47.5%',
    textAlign: 'center',
    color: Color.colorBlack,
    fontFamily: FontFamily.poppinsRegular,
    fontSize: FontSize.m3LabelLarge_size,
    top: '70.5%',
    position: 'absolute',
  },
  hari13Hari6: {
    width: '27.5%',
    left: '47.5%',
    textAlign: 'center',
    color: Color.colorBlack,
    fontFamily: FontFamily.poppinsRegular,
    fontSize: FontSize.m3LabelLarge_size,
    top: '84%',
    position: 'absolute',
  },
  text: {
    left: '36.94%',
    width: '5.56%',
    textAlign: 'center',
    color: Color.colorBlack,
    fontFamily: FontFamily.poppinsRegular,
    fontSize: FontSize.m3LabelLarge_size,
    top: '19.69%',
    position: 'absolute',
  },
  text2: {
    left: '36.94%',
    width: '5.56%',
    textAlign: 'center',
    color: Color.colorBlack,
    fontFamily: FontFamily.poppinsRegular,
    fontSize: FontSize.m3LabelLarge_size,
    top: '32.5%',
    position: 'absolute',
  },
  text3: {
    left: '36.94%',
    width: '5.56%',
    textAlign: 'center',
    color: Color.colorBlack,
    fontFamily: FontFamily.poppinsRegular,
    fontSize: FontSize.m3LabelLarge_size,
    top: '45%',
    position: 'absolute',
  },
  text4: {
    left: '36.94%',
    width: '5.56%',
    textAlign: 'center',
    color: Color.colorBlack,
    fontFamily: FontFamily.poppinsRegular,
    fontSize: FontSize.m3LabelLarge_size,
    top: '58%',
    position: 'absolute',
  },
  text5: {
    left: '36.94%',
    width: '5.56%',
    textAlign: 'center',
    color: Color.colorBlack,
    fontFamily: FontFamily.poppinsRegular,
    fontSize: FontSize.m3LabelLarge_size,
    top: '70.5%',
    position: 'absolute',
  },
  text6: {
    left: '36.94%',
    width: '5.56%',
    textAlign: 'center',
    color: Color.colorBlack,
    fontFamily: FontFamily.poppinsRegular,
    fontSize: FontSize.m3LabelLarge_size,
    top: '84%',
    position: 'absolute',
  },
  text1: {
    width: '1.28%',
    left: '27.22%',
    fontFamily: FontFamily.poppinsMedium,
    fontWeight: '500',
  },
  borAvlosToi: {
    width: '63.53%',
    left: '9.17%',
    textAlign: 'left',
    color: Color.colorBlack,
    fontSize: FontSize.m3LabelLarge_size,
    top: '19.69%',
    position: 'absolute',
  },
  ket1: {
    fontFamily: FontFamily.poppinsMedium,
    fontWeight: '500',
  },
  ket: {
    right: '7.25%',
    left: '78%',
    width: '14.75%',
    backgroundColor: Color.colorMediumaquamarine,
    borderTopRightRadius: Border.br_3xs,
    borderTopLeftRadius: Border.br_3xs,
    shadowOpacity: 1,
    elevation: 8,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowColor: 'rgba(0, 0, 0, 0.25)',
    bottom: '83.13%',
    top: '8.13%',
    height: '8.75%',
  },
  standar: {
    width: '22.14%',
    right: '26.44%',
    left: '51.42%',
    backgroundColor: Color.colorMediumaquamarine,
    borderTopRightRadius: Border.br_3xs,
    borderTopLeftRadius: Border.br_3xs,
    shadowOpacity: 1,
    elevation: 8,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowColor: 'rgba(0, 0, 0, 0.25)',
    bottom: '83.13%',
    top: '8.13%',
    height: '8.75%',
  },
  hasil1: {
    fontFamily: FontFamily.poppinsSemiBold,
    fontWeight: '600',
  },
  hasil: {
    right: '53.03%',
    left: '32.22%',
    width: '14.75%',
    backgroundColor: Color.colorMediumaquamarine,
    borderTopRightRadius: Border.br_3xs,
    borderTopLeftRadius: Border.br_3xs,
    shadowOpacity: 1,
    elevation: 8,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowColor: 'rgba(0, 0, 0, 0.25)',
    bottom: '83.13%',
    top: '8.13%',
    height: '8.75%',
  },
  downArrow1Icon: {
    marginTop: 21,
  },
  upArrow1Parent: {
    height: '70.31%',
    right: '11.67%',
    bottom: '10%',
    left: '82.78%',
    justifyContent: 'center',
    alignItems: 'center',
    width: '5.56%',
    top: '19.69%',
    position: 'absolute',
  },
  stats: {
    width: 360,
    height: 320,
    top: -200,
    margin: 'auto',
    maxWidth: '100%',
    maxHeight: '100%',
  },
});

export default StatsICU;
