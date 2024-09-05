import React, {useMemo} from 'react';
import {Text, StyleSheet, View, Image} from 'react-native';
import {Color, Border, FontSize, FontFamily, Padding} from '../GlobalStyles';

export type PasienAwalType = {
  /** Style props */
  propTop?: number | string;
};

const getStyleValue = (key: string, value: string | number | undefined) => {
  if (value === undefined) {
    return;
  }
  return {[key]: value === 'unset' ? undefined : value};
};
const PasienAwal = ({propTop}: PasienAwalType) => {
  const pasienAwalStyle = useMemo(() => {
    return {
      ...getStyleValue('top', propTop),
    };
  }, [propTop]);

  return (
    <View style={[styles.pasienAwal, pasienAwalStyle]}>
      <View style={[styles.judul, styles.judulPosition]}>
        <Text style={[styles.pasienAwal1, styles.pasienClr]}>Pasien awal</Text>
        <View style={[styles.judulChild, styles.judulPosition]} />
      </View>
      <View style={styles.subJudul}>
        <View style={styles.amountSetting}>
          <View style={[styles.iconMinus, styles.iconPosition]}>
            <View style={[styles.rectangle, styles.rectanglePosition]} />
            <Image
              style={[styles.pathIcon, styles.pathIconLayout]}
              resizeMode="cover"
              source={require('../assets/path2.png')}
            />
          </View>
          <View style={[styles.iconPlus, styles.iconPosition]}>
            <View style={[styles.rectangleCopy, styles.rectanglePosition]} />
            <Image
              style={[styles.pathIcon1, styles.pathIconLayout]}
              resizeMode="cover"
              source={require('../assets/path3.png')}
            />
          </View>
          <Text style={[styles.amount, styles.amountTypo]}>1</Text>
        </View>
        <Text style={[styles.pasienAwal2, styles.amountTypo]}>
          Pasien awal :
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  judulPosition: {
    width: 267,
    left: '50%',
    position: 'absolute',
  },
  pasienClr: {
    display: 'flex',
    color: Color.notSoBlack,
    alignItems: 'center',
  },
  iconPosition: {
    width: '28.29%',
    bottom: '0%',
    height: '100%',
    top: '0%',
    position: 'absolute',
  },
  rectanglePosition: {
    borderRadius: Border.br_5xs,
    width: '100%',
    left: '0%',
    bottom: '0%',
    right: '0%',
    height: '100%',
    top: '0%',
    position: 'absolute',
  },
  pathIconLayout: {
    maxHeight: '100%',
    maxWidth: '100%',
    left: '31.03%',
    right: '30.6%',
    width: '38.36%',
    overflow: 'hidden',
    position: 'absolute',
  },
  amountTypo: {
    textAlign: 'left',
    fontSize: FontSize.m3BodySmall_size,
    position: 'absolute',
  },
  pasienAwal1: {
    height: '70.21%',
    marginLeft: -43.5,
    fontSize: FontSize.m3LabelLarge_size,
    fontWeight: '600',
    fontFamily: FontFamily.poppinsSemiBold,
    textAlign: 'center',
    width: 86,
    top: '0%',
    display: 'flex',
    color: Color.notSoBlack,
    left: '50%',
    justifyContent: 'center',
    position: 'absolute',
  },
  judulChild: {
    marginLeft: -133.7,
    top: 28,
    borderStyle: 'solid',
    borderColor: Color.notSoBlack,
    borderTopWidth: 0.3,
    height: 0,
    opacity: 0.5,
  },
  judul: {
    height: '27.92%',
    marginLeft: -133,
    top: '19.6%',
    bottom: '52.48%',
    zIndex: 0,
  },
  rectangle: {
    backgroundColor: Color.colorBlueviolet,
    opacity: 0.1,
  },
  pathIcon: {
    height: '5.5%',
    top: '47.71%',
    bottom: '46.79%',
  },
  iconMinus: {
    right: '71.71%',
    left: '0%',
  },
  rectangleCopy: {
    backgroundColor: Color.colorCornflowerblue_100,
  },
  pathIcon1: {
    height: '38.53%',
    top: '30.73%',
    bottom: '30.73%',
  },
  iconPlus: {
    left: '71.71%',
    right: '0%',
    width: '28.29%',
  },
  amount: {
    marginTop: -10.9,
    width: '6.46%',
    top: '50%',
    left: '46.34%',
    letterSpacing: 1,
    fontWeight: '500',
    fontFamily: FontFamily.poppinsMedium,
    color: Color.colorGray_100,
    opacity: 0.7,
  },
  amountSetting: {
    width: '30.83%',
    left: '69.17%',
    overflow: 'hidden',
    bottom: '0%',
    height: '100%',
    right: '0%',
    top: '0%',
    position: 'absolute',
  },
  pasienAwal2: {
    height: '81.65%',
    width: '29.32%',
    top: '18.35%',
    fontFamily: FontFamily.poppinsRegular,
    left: '0%',
    display: 'flex',
    color: Color.notSoBlack,
    alignItems: 'center',
  },
  subJudul: {
    height: '21.58%',
    width: '81.6%',
    top: '61.78%',
    right: '9.2%',
    bottom: '16.63%',
    left: '9.2%',
    zIndex: 1,
    position: 'absolute',
  },
  pasienAwal: {
    top: 183,
    left: 17,
    shadowRadius: 9,
    elevation: 9,
    shadowOpacity: 1,
    borderRadius: Border.br_xs,
    backgroundColor: Color.schemesOnPrimary,
    width: 326,
    height: 101,
    padding: Padding.p_base,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
});

export default PasienAwal;
