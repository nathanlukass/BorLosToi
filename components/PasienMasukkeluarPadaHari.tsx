import React, {useMemo} from 'react';
import {Text, StyleSheet, View, Image} from 'react-native';
import {Border, FontSize, FontFamily, Color, Padding} from '../GlobalStyles';

export type PasienMasukkeluarPadaHariType = {
  /** Style props */
  propTop?: number | string;
};

const getStyleValue = (key: string, value: string | number | undefined) => {
  if (value === undefined) {
    return;
  }
  return {[key]: value === 'unset' ? undefined : value};
};
const PasienMasukkeluarPadaHari = ({
  propTop,
}: PasienMasukkeluarPadaHariType) => {
  const pasienMasukkeluarPadaHariStyle = useMemo(() => {
    return {
      ...getStyleValue('top', propTop),
    };
  }, [propTop]);

  return (
    <View
      style={[
        styles.pasienMasukkeluarPadaHari,
        pasienMasukkeluarPadaHariStyle,
      ]}>
      <View style={styles.judul}>
        <Text style={[styles.pasienMasukkeluarPada, styles.judulChildPosition]}>
          Pasien masuk/keluar pada hari yang sama
        </Text>
        <View style={[styles.judulChild, styles.judulChildPosition]} />
      </View>
      <View style={styles.subJudul}>
        <View style={styles.amountSetting}>
          <View style={[styles.iconMinus, styles.iconPosition]}>
            <View style={[styles.rectangle, styles.rectanglePosition]} />
            <Image
              style={[styles.pathIcon, styles.pathIconLayout]}
              resizeMode="cover"
              source={require('../assets/path.png')}
            />
          </View>
          <View style={[styles.iconPlus, styles.iconPosition]}>
            <View style={[styles.rectangleCopy, styles.rectanglePosition]} />
            <Image
              style={[styles.pathIcon1, styles.pathIconLayout]}
              resizeMode="cover"
              source={require('../assets/path1.png')}
            />
          </View>
          <Text style={[styles.amount, styles.amountTypo]}>1</Text>
        </View>
        <Text style={[styles.banyaPasien, styles.amountTypo]}>
          Banya pasien :
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  judulChildPosition: {
    left: '50%',
    position: 'absolute',
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
  pasienMasukkeluarPada: {
    height: '52.63%',
    fontWeight: '600',
    fontFamily: FontFamily.poppinsSemiBold,
    width: 298,
    color: Color.notSoBlack,
    top: '10%',
    marginLeft: -135,
  },
  judulChild: {
    marginLeft: -133.7,
    top: 38,
    borderStyle: 'solid',
    borderColor: Color.notSoBlack,
    borderTopWidth: 0.3,
    height: 0,
    opacity: 0.5,
    width: 267,
  },
  judul: {
    height: 38,
    width: 267,
  },
  rectangle: {
    backgroundColor: Color.colorBlueviolet,
    opacity: 0.1,
  },
  pathIcon: {
    height: '5.45%',
    top: '47.73%',
    bottom: '46.82%',
  },
  iconMinus: {
    right: '71.71%',
    left: '0%',
  },
  rectangleCopy: {
    backgroundColor: Color.colorCornflowerblue_100,
  },
  pathIcon1: {
    height: '38.64%',
    top: '30.91%',
    bottom: '30.45%',
  },
  iconPlus: {
    left: '71.71%',
    right: '0%',
    width: '28.29%',
  },
  amount: {
    marginTop: -11,
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
  banyaPasien: {
    top: '18.18%',
    fontFamily: FontFamily.poppinsRegular,
    left: '0%',
    color: Color.notSoBlack,
  },
  subJudul: {
    width: 266,
    height: 22,
    marginTop: 22,
  },
  pasienMasukkeluarPadaHari: {
    top: 1338,
    left: 17,
    shadowRadius: 8,
    elevation: 8,
    shadowOpacity: 1,
    borderRadius: Border.br_3xs,
    backgroundColor: Color.schemesOnPrimary,
    width: 326,
    height: 130,
    paddingHorizontal: Padding.p_10xl,
    paddingVertical: Padding.p_2xl,
    alignItems: 'center',
    position: 'absolute',
  },
});

export default PasienMasukkeluarPadaHari;
