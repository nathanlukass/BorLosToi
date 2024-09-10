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

const TOI = () => {
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  return (
    <View style={styles.toi}>
      <View style={styles.androidStatusBar}>
        <View style={styles.background} />
        <View style={styles.icons}>
          <Image
            style={styles.cellularIcon}
            resizeMode="cover"
            source={require('../../../assets/cellular.png')}
          />
          <Image
            style={styles.wifiIcon}
            resizeMode="cover"
            source={require('../../../assets/wifi.png')}
          />
          <Image
            style={styles.batteryIcon}
            resizeMode="cover"
            source={require('../../../assets/battery1.png')}
          />
        </View>
        <Text style={styles.text}>12:30</Text>
      </View>
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
        <Text style={[styles.toi1, styles.toiFlexBox]}>TOI</Text>
      </View>
      <View style={styles.stats}>
        <View style={styles.statsChild} />
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
            source={require('../../../assets/down-arrow11.png')}
          />
          <Image
            style={styles.upArrow1Icon}
            resizeMode="cover"
            source={require('../../../assets/up-arrow11.png')}
          />
        </View>
      </View>
      <View style={[styles.standarBor, styles.ketShadowBox]}>
        <Text style={[styles.standarToi, styles.toiFlexBox]}>
          STANDAR TOI : 1-3 Hari
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  toiFlexBox: {
    textAlign: 'center',
    color: Color.notSoBlack,
  },
  textPosition: {
    top: '8.83%',
    height: '53.91%',
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
    backgroundColor: Color.colorsBackgroundsLight,
    left: '0%',
    bottom: '0%',
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
  toi1: {
    marginTop: -11.5,
    marginLeft: -13,
    top: '50%',
    fontSize: FontSize.m3BodyLarge_size,
    zIndex: 1,
    fontFamily: FontFamily.poppinsBold,
    fontWeight: '700',
    textAlign: 'center',
    left: '50%',
    position: 'absolute',
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
  statsChild: {
    height: '97.31%',
    width: '92.54%',
    top: '2.69%',
    right: '7.46%',
    borderRadius: Border.br_3xs,
    left: '0%',
    bottom: '0%',
    position: 'absolute',
    backgroundColor: Color.schemesOnPrimary,
  },
  text1: {
    width: '7.81%',
    left: '45.29%',
    fontFamily: FontFamily.poppinsRegular,
    textAlign: 'center',
    color: Color.notSoBlack,
    fontSize: FontSize.m3LabelLarge_size,
    position: 'absolute',
  },
  text2: {
    width: '1.8%',
    top: '8.83%',
    height: '53.91%',
  },
  text3: {
    height: '24.69%',
    width: '1.95%',
    top: '68.61%',
  },
  mujairAMujair: {
    height: '84.84%',
    width: '30.85%',
    top: '8.8%',
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
    fontSize: FontSize.m3BodySmall_size,
    fontWeight: '500',
  },
  ket: {
    left: '79.27%',
    backgroundColor: Color.colorMediumseagreen,
    borderTopRightRadius: Border.br_3xs,
    borderTopLeftRadius: Border.br_3xs,
    bottom: '93.33%',
    width: '20.73%',
    height: '6.67%',
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
    bottom: '93.33%',
    width: '20.73%',
    height: '6.67%',
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
    height: '51.13%',
    width: '71.14%',
    top: '19.88%',
    right: '14.42%',
    bottom: '29%',
    left: '14.44%',
    position: 'absolute',
  },
  standarToi: {
    alignSelf: 'stretch',
    fontFamily: FontFamily.poppinsBold,
    fontWeight: '700',
    textAlign: 'center',
    fontSize: FontSize.m3LabelLarge_size,
  },
  standarBor: {
    marginLeft: -163,
    top: 92,
    width: 326,
    height: 44,
    padding: Padding.p_base,
    justifyContent: 'center',
    elevation: 8,
    shadowRadius: 8,
    borderRadius: Border.br_3xs,
    left: '50%',
    backgroundColor: Color.schemesOnPrimary,
  },
  toi: {
    borderRadius: Border.br_xl,
    flex: 1,
    height: 800,
    overflow: 'hidden',
    width: '100%',
    backgroundColor: Color.schemesOnPrimary,
  },
});

export default TOI;
