import * as React from 'react';
import {StyleSheet, View, Image, Text, Pressable} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation, ParamListBase} from '@react-navigation/native';
import {
  Color,
  FontFamily,
  FontSize,
  Padding,
  Gap,
  Border,
} from '../../../GlobalStyles';

const BTO = () => {
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  return (
    <View style={styles.avlos}>
      <View style={styles.barAtas}>
        <Pressable
          style={styles.backButton}
          onPress={() => navigation.navigate('LoginScreen')}>
          <Image
            style={styles.icon}
            resizeMode="cover"
            source={require('../../../assets/-icon-arrow-back.png')}
          />
        </Pressable>
        <Text style={[styles.avlos1, styles.text1FlexBox]}>BTO</Text>
      </View>
      <View style={styles.stats}>
        <Text style={[styles.text1, styles.textPosition]}>{`0
0
0
0
0
0
0
0
0`}</Text>
        <Text style={[styles.text2, styles.textTypo]}>{`:
:
:
:
:
:`}</Text>
        <Text style={[styles.text3, styles.textTypo]}>{`:
:
:


`}</Text>
        <Text style={[styles.mujairAMujair, styles.mujairTypo]}>{`MUJAIR A
MUJAIR B
MUJAIR C
NIKE
PAYANGKA
NEONATI
BOMBOYA
KARPER
ICU`}</Text>
        <View style={[styles.ket, styles.ketShadowBox]}>
          <Text style={[styles.ket1, styles.ket1Typo]}>KET</Text>
        </View>
        <View style={[styles.hasil, styles.ketShadowBox]}>
          <Text style={[styles.hasil1, styles.ket1Typo]}>HASIL</Text>
        </View>
        <View style={[styles.upArrow1Parent, styles.arrow1Position]}>
          <Image
            style={styles.upArrow1Icon}
            resizeMode="cover"
            source={require('../../../assets/up-arrow11.png')}
          />
          <Image
            style={styles.upArrow1Icon}
            resizeMode="cover"
            source={require('../../../assets/down-arrow12.png')}
          />
          <Image
            style={styles.upArrow1Icon}
            resizeMode="cover"
            source={require('../../../assets/up-arrow11.png')}
          />
          <Image
            style={styles.upArrow1Icon}
            resizeMode="cover"
            source={require('../../../assets/down-arrow11.png')}
          />
          <Image
            style={styles.upArrow1Icon}
            resizeMode="cover"
            source={require('../../../assets/up-arrow11.png')}
          />
          <Image
            style={styles.upArrow1Icon}
            resizeMode="cover"
            source={require('../../../assets/up-arrow11.png')}
          />
        </View>
        <View style={[styles.upArrow1Group, styles.arrow1Position]}>
          <Image
            style={styles.upArrow1Icon}
            resizeMode="cover"
            source={require('../../../assets/up-arrow11.png')}
          />
          <Image
            style={styles.upArrow1Icon}
            resizeMode="cover"
            source={require('../../../assets/down-arrow12.png')}
          />
          <Image
            style={styles.upArrow1Icon}
            resizeMode="cover"
            source={require('../../../assets/up-arrow11.png')}
          />
        </View>
      </View>
      <View style={[styles.standarBor, styles.ketShadowBox]}>
        <Text style={styles.standarAvlos}>STANDAR BTO : 6-9 Hari</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  text1FlexBox: {
    textAlign: 'center',
    color: Color.notSoBlack,
    position: 'absolute',
  },
  textPosition: {
    top: '9.43%',
    height: '57.57%',
  },
  textTypo: {
    color: Color.colorBlack,
    left: '31.63%',
    fontFamily: FontFamily.poppinsMedium,
    textAlign: 'left',
    fontWeight: '500',
    fontSize: FontSize.m3LabelLarge_size,
    position: 'absolute',
  },
  mujairTypo: {
    fontFamily: FontFamily.poppinsSemiBold,
    fontWeight: '600',
  },
  ketShadowBox: {
    padding: Padding.p_base,
    justifyContent: 'center',
    elevation: 8,
    shadowRadius: 8,
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowColor: 'rgba(0, 0, 0, 0.25)',
    position: 'absolute',
  },
  ket1Typo: {
    color: Color.schemesOnPrimary,
    fontSize: FontSize.m3BodySmall_size,
    textAlign: 'left',
  },
  arrow1Position: {
    gap: Gap.gap_xl,
    left: 224,
    width: 20,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
  background: {
    bottom: '0%',
    backgroundColor: Color.colorsBackgroundsLight,
    left: '0%',
    top: '0%',
    right: '0%',
    height: '100%',
    position: 'absolute',
    width: '100%',
  },
  cellularIcon: {
    width: 18,
    height: 12,
  },
  wifiIcon: {
    width: 16,
    height: 12,
  },
  batteryIcon: {
    width: 24,
    height: 12,
  },
  icons: {
    height: '50%',
    width: '19.44%',
    top: '25%',
    right: '3.33%',
    bottom: '25%',
    left: '77.22%',
    gap: Gap.gap_3xs,
    flexDirection: 'row',
    position: 'absolute',
  },
  text: {
    top: '16.67%',
    left: '3.33%',
    fontFamily: FontFamily.m3LabelLarge,
    color: Color.wireframesColorsTextLegibilityHighEmphasis,
    textAlign: 'left',
    fontWeight: '500',
    fontSize: FontSize.m3LabelLarge_size,
    position: 'absolute',
  },
  androidStatusBar: {
    top: 0,
    right: 0,
    height: 24,
    left: 0,
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
  avlos1: {
    marginTop: -12.5,
    marginLeft: -27,
    top: '50%',
    fontSize: FontSize.m3BodyLarge_size,
    zIndex: 1,
    fontFamily: FontFamily.poppinsBold,
    fontWeight: '700',
    left: '50%',
    textAlign: 'center',
  },
  barAtas: {
    top: 24,
    shadowRadius: 4,
    elevation: 4,
    borderRadius: Border.br_8xs,
    width: 360,
    height: 45,
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowColor: 'rgba(0, 0, 0, 0.25)',
    flexDirection: 'row',
    left: 0,
    position: 'absolute',
    backgroundColor: Color.schemesOnPrimary,
  },
  text1: {
    width: '7.81%',
    left: '45.29%',
    fontFamily: FontFamily.poppinsRegular,
    textAlign: 'center',
    color: Color.notSoBlack,
    position: 'absolute',
    fontSize: FontSize.m3LabelLarge_size,
    top: '9.43%',
    height: '57.57%',
  },
  text2: {
    width: '1.8%',
    top: '9.43%',
    height: '57.57%',
  },
  text3: {
    height: '26.37%',
    width: '1.95%',
    top: '73.26%',
  },
  mujairAMujair: {
    height: '90.6%',
    width: '30.85%',
    top: '9.4%',
    color: Color.notSoBlack,
    fontWeight: '600',
    textAlign: 'left',
    fontSize: FontSize.m3LabelLarge_size,
    left: '0%',
    position: 'absolute',
  },
  ket1: {
    fontFamily: FontFamily.poppinsMedium,
    color: Color.schemesOnPrimary,
    fontWeight: '500',
  },
  ket: {
    left: '79.27%',
    backgroundColor: Color.colorMediumseagreen,
    borderTopRightRadius: Border.br_3xs,
    borderTopLeftRadius: Border.br_3xs,
    bottom: '92.87%',
    width: '20.73%',
    height: '7.13%',
    padding: Padding.p_base,
    justifyContent: 'center',
    elevation: 8,
    shadowRadius: 8,
    alignItems: 'center',
    flexDirection: 'row',
    top: '0%',
    right: '0%',
  },
  hasil1: {
    fontFamily: FontFamily.poppinsSemiBold,
    fontWeight: '600',
  },
  hasil: {
    right: '40.61%',
    left: '38.66%',
    backgroundColor: Color.colorMediumseagreen,
    borderTopRightRadius: Border.br_3xs,
    borderTopLeftRadius: Border.br_3xs,
    bottom: '92.87%',
    width: '20.73%',
    height: '7.13%',
    padding: Padding.p_base,
    justifyContent: 'center',
    elevation: 8,
    shadowRadius: 8,
    alignItems: 'center',
    flexDirection: 'row',
    top: '0%',
  },
  upArrow1Icon: {
    height: 20,
    width: 20,
  },
  upArrow1Parent: {
    top: 34,
  },
  upArrow1Group: {
    top: 281,
  },
  stats: {
    height: '47.88%',
    width: '71.14%',
    top: '19.88%',
    right: '14.42%',
    bottom: '32.25%',
    left: '14.44%',
    position: 'absolute',
  },
  standarAvlos: {
    alignSelf: 'stretch',
    fontSize: FontSize.m3BodySmall_size,
    textAlign: 'center',
    color: Color.notSoBlack,
    fontFamily: FontFamily.poppinsBold,
    fontWeight: '700',
  },
  standarBor: {
    marginLeft: -163,
    top: 98,
    borderRadius: Border.br_3xs,
    width: 326,
    height: 44,
    padding: Padding.p_base,
    justifyContent: 'center',
    elevation: 8,
    shadowRadius: 8,
    left: '50%',
    backgroundColor: Color.schemesOnPrimary,
  },
  avlos: {
    borderRadius: Border.br_xl,
    flex: 1,
    height: 800,
    overflow: 'hidden',
    width: '100%',
    backgroundColor: Color.schemesOnPrimary,
  },
});

export default BTO;
