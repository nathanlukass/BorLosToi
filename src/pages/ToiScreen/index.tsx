import * as React from 'react';
import {StyleSheet, View, Image, Text, Pressable,TouchableOpacity} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation, ParamListBase} from '@react-navigation/native';
import {
  FontFamily,
  Color,
  FontSize,
  Padding,
  Border,
  Gap,
} from '../../../GlobalStyles';

const TOI = () => {
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  return (
    <View style={styles.bor}>
      <View style={styles.barAtas}>
        <Pressable
          style={styles.backButton}
          onPress={() => navigation.navigate('BORAVLOSTOIBTONDRGDR')}>
          <Image
            style={styles.icon}
            resizeMode="cover"
            source={require('../../../assets/-icon-arrow-back.png')}
          />
        </Pressable>
        <Text style={styles.bor1}>TOI</Text>
      </View>
      <View style={[styles.stats, styles.statsPosition]}>
        <View style={[styles.statsChild, styles.backgroundPosition]} />
        <Text style={[styles.text1, styles.textTypo3]}>{`0
0
0
0
0
0
0
0
0`}</Text>
        <Text style={[styles.text2, styles.textTypo1]}>{`:
:
:
:
:
:
:
:
:`}</Text>
        
        <Text style={[styles.mujairAMujair, styles.mujairTypo1]}>{`MUJAIR A
MUJAIR B
MUJAIR C
NIKE
PAYANGKA
NEONATI
BOMBOYA
KARPER
ICU`}</Text>
        <View style={[styles.ket, styles.ketPosition1]}>
          <Text style={[styles.ket1, styles.ket1Typo]}>KET</Text>
        </View>
        <View style={[styles.hasil, styles.hasilPosition]}>
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
          <Image
            style={styles.upArrow1Icon}
            resizeMode="cover"
            source={require('../../../assets/up-arrow11.png')}
          />
        </View>

      </View>
      <View style={[styles.standarToi, styles.ketShadowBox]}>
        <Text style={styles.standartoi}>{`STANDAR TOI : 1 - 3 HARI`}</Text>
      </View>
      <TouchableOpacity
      style={styles.buttonKet}>
      <Text style={styles.buttonKetText}>KET</Text>
      </TouchableOpacity>
      <TouchableOpacity
      style={styles.buttonHasil}>
      <Text style={styles.buttonHasilText}>HASIL</Text>
      </TouchableOpacity>
    
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundPosition: {
    left: '0%',
    bottom: '0%',
    position: 'absolute',
  },
  buttonKet: {
    left: 280,
    top: 180,
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
    left: 190,
    top: 180,
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
  },
  standartoi: {
    alignSelf: 'stretch',
    fontSize: 15,
    textAlign: 'center',
    color: Color.notSoBlack,
    fontFamily: FontFamily.poppinsBold,
    fontWeight: '700',
    height: 200,
    top: 93,
  },
  standarToi: {
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
  statsPosition: {
    left: '14.44%',
    right: '14.42%',
    top: '19.88%',
    width: '71.14%',
    position: 'absolute',
  },
  textTypo3: {
    fontFamily: FontFamily.poppinsRegular,
    left: '55%',
    width: '7.81%',
    textAlign: 'center',
  },
  textTypo1: {
    fontFamily: FontFamily.poppinsMedium,
    fontWeight: '500',
  },
  textTypo: {
    width: '1.95%',
    fontFamily: FontFamily.poppinsMedium,
    left: '31.63%',
    color: Color.colorBlack,
    textAlign: 'left',
    fontWeight: '500',
    fontSize: FontSize.m3LabelLarge_size,
    position: 'absolute',
  },
  mujairTypo1: {
    fontFamily: FontFamily.poppinsSemiBold,
    fontWeight: '600',
  },
  // ketPosition1: {
  //   padding: Padding.p_base,
  //   justifyContent: 'center',
  //   backgroundColor: Color.colorMediumaquamarine,
  //   borderTopRightRadius: Border.br_3xs,
  //   borderTopLeftRadius: Border.br_3xs,
  //   elevation: 8,
  //   shadowRadius: 8,
  //   bottom: '93.33%',
  //   width: '20.73%',
  //   height: '6.67%',
  //   alignItems: 'center',
  //   shadowOpacity: 1,
  //   shadowOffset: {
  //     width: 0,
  //     height: 4,
  //   },
  //   shadowColor: 'rgba(0, 0, 0, 0.25)',
  //   flexDirection: 'row',
  //   top: '0%',
  //   position: 'absolute',
  // },
  ket1Typo: {
    color: Color.schemesOnPrimary,
    fontSize: FontSize.m3BodySmall_size,
    textAlign: 'left',
  },
  hasilPosition: {
    left: '38.66%',
    right: '40.61%',
  },
  arrow1Position: {
    gap: Gap.gap_xl,
    left: 224,
    width: 20,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    lineHeight: 30,
    
  },
  textPosition: {
    top: '9.43%',
    height: '57.57%',
    fontSize: FontSize.m3LabelLarge_size,
    position: 'absolute',
  },
  mujairTypo: {
    top: '9.4%',
    height: '90.6%',
    fontFamily: FontFamily.poppinsSemiBold,
    fontWeight: '600',
    width: '30.85%',
    textAlign: 'left',
    fontSize: FontSize.m3LabelLarge_size,
    left: '0%',
    position: 'absolute',
  },
  ketPosition: {
    bottom: '92.87%',
    height: '7.13%',
    padding: Padding.p_base,
    justifyContent: 'center',
    backgroundColor: Color.colorMediumaquamarine,
    borderTopRightRadius: Border.br_3xs,
    borderTopLeftRadius: Border.br_3xs,
    elevation: 8,
    shadowRadius: 8,
    width: '20.73%',
    alignItems: 'center',
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowColor: 'rgba(0, 0, 0, 0.25)',
    flexDirection: 'row',
    top: '0%',
    position: 'absolute',
  },
  ket6Position: {
    backgroundColor: Color.colorMediumseagreen,
    bottom: '92.87%',
    height: '7.13%',
    padding: Padding.p_base,
    justifyContent: 'center',
    borderTopRightRadius: Border.br_3xs,
    borderTopLeftRadius: Border.br_3xs,
    elevation: 8,
    shadowRadius: 8,
    width: '20.73%',
    alignItems: 'center',
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowColor: 'rgba(0, 0, 0, 0.25)',
    flexDirection: 'row',
    top: '0%',
    position: 'absolute',
  },
  background: {
    backgroundColor: Color.colorsBackgroundsLight,
    right: '0%',
    top: '0%',
    left: '0%',
    bottom: '0%',
    height: '100%',
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
  bor1: {
    marginTop: -11.5,
    marginLeft: -17,
    top: '50%',
    left: '50%',
    fontSize: FontSize.m3BodyLarge_size,
    fontWeight: '700',
    fontFamily: FontFamily.poppinsBold,
    zIndex: 1,
    textAlign: 'center',
    color: Color.notSoBlack,
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
    backgroundColor: Color.schemesOnPrimary,
  },
  text1: {
    color: Color.colorBlack,
    top: '10.5%',
    height: '300%',
    fontSize: FontSize.m3LabelLarge_size,
    position: 'absolute',
    lineHeight: 64,
  },
  text2: {
    left: '31.63%',
    width: '1.8%',
    fontFamily: FontFamily.poppinsMedium,
    color: Color.colorBlack,
    textAlign: 'left',
    top: '10.5%',
    height: '300%',
    fontSize: FontSize.m3LabelLarge_size,
    position: 'absolute',
    lineHeight: 64,
  },
  text3: {
    height: '24.69%',
    top: '68.61%',
  },
  mujairAMujair: {
    height: '300%',
    top: '11%',
    width: '30.85%',
    fontWeight: '600',
    color: Color.colorBlack,
    textAlign: 'left',
    fontSize: FontSize.m3LabelLarge_size,
    left: '0%',
    position: 'absolute',
    lineHeight: 64,
  },
  ket1: {
    fontFamily: FontFamily.poppinsMedium,
    fontWeight: '500',
  },
  ket: {
    left: '79.27%',
    right: '0%',
  },
  hasil1: {
    fontFamily: FontFamily.poppinsSemiBold,
    fontWeight: '600',
  },
  upArrow1Icon: {
    height: 20,
    width: 20,
    top: 20,
    marginBottom: 10,
    left: 20
  },
  upArrow1Parent: {
    top: 40,
    lineHeight: 30,
    
  },
  upArrow1Group: {
    top: 281,
    lineHeight: 30,
  },
  stats: {
    height: '51.13%',
    bottom: '29%',
  },
  text4: {
    color: Color.colorBlack,
    fontFamily: FontFamily.poppinsRegular,
    left: '45.29%',
    width: '7.81%',
    textAlign: 'center',
  },
  text5: {
    fontFamily: FontFamily.poppinsMedium,
    fontWeight: '500',
    left: '31.63%',
    width: '1.8%',
    color: Color.colorBlack,
    textAlign: 'left',
  },
  text6: {
    height: '26.37%',
    top: '73.26%',
  },
  mujairAMujair1: {
    color: Color.colorBlack,
  },
  ket2: {
    left: '79.27%',
    right: '0%',
  },
  hasil2: {
    left: '38.66%',
    right: '40.61%',
  },
  stats1: {
    height: '47.88%',
    bottom: '32.25%',
  },
  ket4: {
    left: '79.27%',
    right: '0%',
  },
  hasil4: {
    left: '38.66%',
    right: '40.61%',
  },
  text10: {
    fontFamily: FontFamily.poppinsRegular,
    left: '45.29%',
    width: '7.81%',
    textAlign: 'center',
    color: Color.notSoBlack,
  },
  mujairAMujair3: {
    color: Color.notSoBlack,
  },
  ket6: {
    left: '79.27%',
    right: '0%',
  },
  hasil6: {
    left: '38.66%',
    right: '40.61%',
  },
  bor: {
    borderRadius: Border.br_xl,
    flex: 1,
    height: 800,
    overflow: 'hidden',
    width: '100%',
    backgroundColor: Color.schemesOnPrimary,
  },
});

export default TOI;
