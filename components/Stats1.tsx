import * as React from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import {Color, FontFamily, FontSize, Padding, Border} from '../GlobalStyles';
import {Gap} from '../src/components';

const Stats1 = () => {
  return (
    <View style={[styles.stats, styles.statsPosition]}>
      <View style={[styles.statsChild, styles.statsPosition]} />
      {/* <Text style={[styles.hari13Hari, styles.textTypo]}>{`60-85%
6-9 Hari
1-3 Hari
40-50 Kali
<20 mil
<45 mil`}</Text>
      <Text style={[styles.text, styles.textTypo]}>{`0
0
0
0
0
0`}</Text>
      <Text style={[styles.text1, styles.text1Typo]}>{`:
:
:
:
:
:`}</Text>
      <Text style={[styles.borAvlosToi, styles.hasil1Typo]}>{`BOR
AVLOS
TOI
BTO
NDR
GDR`}</Text> */}
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
      <View style={[styles.ket, styles.ketPosition]}>
        <Text style={[styles.ket1, styles.ket1Typo]}>KET</Text>
      </View>
      <View style={[styles.standar, styles.ketPosition]}>
        <Text style={[styles.ket1, styles.ket1Typo]}>STANDAR</Text>
      </View>
      <View style={[styles.hasil, styles.ketPosition]}>
        <Text style={[styles.hasil1, styles.ket1Typo]}>HASIL</Text>
      </View>
      <View style={styles.upArrow1Parent}>
        <Image
          style={styles.arrow1IconLayout}
          resizeMode="cover"
          source={require('../assets/up-arrow1.png')}
        />
        <Image
          style={[styles.downArrow1Icon, styles.arrow1IconLayout]}
          resizeMode="cover"
          source={require('../assets/down-arrow1.png')}
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
  BorAvlosToiContainer: {
    flexDirection: 'column',
    // alignItems: 'center',
    marginTop: '11.5%',
    marginLeft: '8%',
  },
  statsPosition: {
    left: '0%',
    right: '0%',
    width: '100%',
    position: 'absolute',
  },
  textTypo: {
    textAlign: 'center',
    color: Color.colorBlack,
    fontFamily: FontFamily.poppinsRegular,
    fontSize: FontSize.m3LabelLarge_size,
    top: '19.7%',
    height: '70.63%',
    position: 'absolute',
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
    color: Color.colorBlack,
  },
  ketPosition: {
    padding: Padding.p_base,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
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
    bottom: '83.12%',
    top: '8.14%',
    height: '8.74%',
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
    top: '0%',
    bottom: '0%',
    borderRadius: Border.br_3xs,
    backgroundColor: Color.schemesOnPrimary,
  },
  hari13Hari: {
    color: Color.colorBlack,
    top: '20%',
    width: '27.5%',
    left: '55.5%',
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
  text1: {
    width: '1.28%',
    left: '27.22%',
    fontFamily: FontFamily.poppinsMedium,
    fontWeight: '500',
  },
  borAvlosToi: {
    width: '13.53%',
    left: '9.17%',
    textAlign: 'left',
    color: Color.colorBlack,
    fontSize: FontSize.m3LabelLarge_size,
    top: '19.7%',
    height: '70.63%',
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
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
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
    bottom: '83.12%',
    top: '8.14%',
    height: '8.74%',
  },
  standar: {
    width: '22.14%',
    right: '26.44%',
    left: '51.42%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
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
    bottom: '83.12%',
    top: '8.14%',
    height: '8.74%',
  },
  hasil1: {
    fontFamily: FontFamily.poppinsSemiBold,
    fontWeight: '600',
  },
  hasil: {
    right: '53.03%',
    left: '32.22%',
    width: '14.75%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
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
    bottom: '83.12%',
    top: '8.14%',
    height: '8.74%',
  },
  downArrow1Icon: {
    marginTop: 21,
  },
  upArrow1Parent: {
    top: 73,
    left: 343,
    width: 20,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
  stats: {
    height: '39.03%',
    top: '50%',
    bottom: '10.98%',
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
});

export default Stats1;
