// import * as React from 'react';
import React from 'react';
import { useCallback, useState } from 'react';
import {View, StyleSheet, Text, Image, Pressable, TouchableOpacity} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation, ParamListBase} from '@react-navigation/native';
import {Color, FontSize, FontFamily, Padding, Border} from '../GlobalStyles';
import {Gap} from '../src/components';

export type StatsType = {
  onClose?: () => void;
};

const Stats = ({onClose}: StatsType) => {
  const [lihatBORLOSVisible, setLihatBORLOSVisible] = useState(false);
  const closeLihatBORLOS = useCallback(() => {
    setLihatBORLOSVisible(false);
  }, []);
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
  return (
    <View style={styles.stats}>
      <View style={styles.statsChild} />
      {/* <Text style={styles.hari13Hari}>{`60-85%
6-9 Hari
1-3 Hari
40-50 Kali
<20%
<45%`}</Text> */}
      <Text style={[styles.hari13Hari]}>60-85%</Text>
      <Text style={[styles.hari13Hari2]}>6-9 Hari</Text>
      <Text style={[styles.hari13Hari3]}>1-3 Hari</Text>
      <Text style={[styles.hari13Hari4]}>40-50 Kali</Text>
      <Text style={[styles.hari13Hari5]}>{'< 20%'}</Text>
      <Text style={[styles.hari13Hari6]}>{'< 45%'}</Text>
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
      <TouchableOpacity
      style={styles.buttonKet}>
      <Text style={styles.buttonKetText}>KET</Text>
      </TouchableOpacity>
      <TouchableOpacity
      style={styles.buttonStandar}>
      <Text style={styles.buttonStandarText}>STANDAR</Text>
      </TouchableOpacity>
      <TouchableOpacity
      style={styles.buttonHasil}>
      <Text style={styles.buttonHasilText}>HASIL</Text>
      </TouchableOpacity>
      {/* <Pressable
        style={styles.backButton}
        onPress={closeLihatBORLOS}>
        <Image
          style={styles.vectorIcon}
          resizeMode="cover"
          source={require('../assets/vector2.png')}
        />
      </Pressable> */}
      <View style={styles.upArrow1Parent}>
        <Image
          style={styles.arrow1IconLayout}
          resizeMode="cover"
          source={require('../assets/up-arrow1.png')}
        />
        <Image
          style={[styles.downArrow1Icon, styles.arrow1IconLayout]}
          resizeMode="cover"
          source={require('../assets/down-arrow2.png')}
        />
        <Image
          style={[styles.downArrow1Icon, styles.arrow1IconLayout]}
          resizeMode="cover"
          source={require('../assets/up-arrow1.png')}
        />
        <Image
          style={[styles.downArrow1Icon, styles.arrow1IconLayout]}
          resizeMode="cover"
          source={require('../assets/down-arrow2.png')}
        />
        <Image
          style={[styles.downArrow1Icon, styles.arrow1IconLayout]}
          resizeMode="cover"
          source={require('../assets/up-arrow1.png')}
        />
        <Image
          style={[styles.downArrow1Icon, styles.arrow1IconLayout]}
          resizeMode="cover"
          source={require('../assets/up-arrow1.png')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
  buttonKetText:{
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
  buttonStandarText:{
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
  buttonHasilText:{
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
  vectorIcon: {
    width: 11,
    height: 16,
  },
  backButton: {
    height: '11.25%',
    width: '8.67%',
    top: '6.88%',
    right: '81.33%',
    bottom: '81.88%',
    left: '10%',
    padding: Padding.p_3xs,
    alignItems: 'center',
    flexDirection: 'row',
    position: 'absolute',
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
    maxWidth: '100%',
    maxHeight: '100%',
  },
});

export default Stats;
