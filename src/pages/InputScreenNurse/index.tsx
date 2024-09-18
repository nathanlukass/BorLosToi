import * as React from 'react';
import {useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Image,
  Pressable,
  ScrollView,
  Button,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import LamaDirawat from '../../../components/LamaDirawat';
import {DatePickerr} from '../../components';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation, ParamListBase} from '@react-navigation/core';
// import {useNavigation, ParamListBase} from '@react-navigation/natiSve';
import {
  Padding,
  Border,
  Color,
  FontFamily,
  FontSize,
} from '../../../GlobalStyles';
// import {ScrollView} from 'react-native-gesture-handler';

const NurseInputPage = () => {
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
  // const [bedCount, setBedCount] = useState(22);
  const [initialPatients, setInitialPatients] = useState(1);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.containerScrollView}>
        <View style={styles.nurseInputPage}>
          <View style={[styles.rincianPasien, styles.rincianPasienShadowBox]}>
            <View style={styles.judul}>
              <Text style={[styles.totalHariPerawatan, styles.pasienFlexBox]}>
                Total hari perawatan per pasienn
              </Text>
              <View style={[styles.judulChild, styles.judulPosition]} />
            </View>
            <View style={styles.subJudul}>
              <View style={[styles.amountSetting, styles.amountPosition1]}>
                <View style={[styles.iconMinus, styles.iconPosition]}>
                  <View style={[styles.rectangle, styles.rectanglePosition]} />
                  <Image
                    style={[styles.pathIcon, styles.pathIconLayout]}
                    resizeMode="cover"
                    source={require('../../../assets/path.png')}
                  />
                </View>
                <View style={[styles.iconPlus, styles.iconPosition]}>
                  <View
                    style={[styles.rectangleCopy, styles.rectanglePosition]}
                  />
                  <Image
                    style={[styles.pathIcon1, styles.pathIconLayout]}
                    resizeMode="cover"
                    source={require('../../../assets/path1.png')}
                  />
                </View>
                <Text style={styles.amount}>1</Text>
              </View>
              <Text style={[styles.kelasI, styles.pasienTypo1]}>Kelas I</Text>
            </View>
            <View style={styles.subJudul}>
              <View style={[styles.amountSetting, styles.amountPosition1]}>
                <View style={[styles.iconMinus, styles.iconPosition]}>
                  <View style={[styles.rectangle, styles.rectanglePosition]} />
                  <Image
                    style={[styles.pathIcon, styles.pathIconLayout]}
                    resizeMode="cover"
                    source={require('../../../assets/path.png')}
                  />
                </View>
                <View style={[styles.iconPlus, styles.iconPosition]}>
                  <View
                    style={[styles.rectangleCopy, styles.rectanglePosition]}
                  />
                  <Image
                    style={[styles.pathIcon1, styles.pathIconLayout]}
                    resizeMode="cover"
                    source={require('../../../assets/path1.png')}
                  />
                </View>
                <Text style={styles.amount}>1</Text>
              </View>
              <Text style={[styles.kelasI, styles.pasienTypo1]}>Kelas II</Text>
            </View>
            <View style={styles.subJudul}>
              <View style={[styles.amountSetting, styles.amountPosition1]}>
                <View style={[styles.iconMinus, styles.iconPosition]}>
                  <View style={[styles.rectangle, styles.rectanglePosition]} />
                  <Image
                    style={[styles.pathIcon, styles.pathIconLayout]}
                    resizeMode="cover"
                    source={require('../../../assets/path.png')}
                  />
                </View>
                <View style={[styles.iconPlus, styles.iconPosition]}>
                  <View
                    style={[styles.rectangleCopy, styles.rectanglePosition]}
                  />
                  <Image
                    style={[styles.pathIcon1, styles.pathIconLayout]}
                    resizeMode="cover"
                    source={require('../../../assets/path1.png')}
                  />
                </View>
                <Text style={styles.amount}>1</Text>
              </View>
              <Text style={[styles.kelasI, styles.pasienTypo1]}>Kelas III</Text>
            </View>
          </View>
          <View
            style={[styles.jumlahHariPerawatan, styles.rincianPasienShadowBox]}>
            <View style={styles.judul1}>
              <Text style={styles.jumlahHariPerawatan1}>
                Jumlah hari perawatan
              </Text>
              <View style={[styles.judulItem, styles.judulPosition]} />
            </View>
            <View style={styles.subJudul3}>
              <View style={[styles.amountSetting, styles.amountPosition1]}>
                <View style={[styles.iconMinus, styles.iconPosition]}>
                  <View style={[styles.rectangle, styles.rectanglePosition]} />
                  <Image
                    style={[styles.pathIcon, styles.pathIconLayout]}
                    resizeMode="cover"
                    source={require('../../../assets/path.png')}
                  />
                </View>
                <View style={[styles.iconPlus, styles.iconPosition]}>
                  <View
                    style={[styles.rectangleCopy, styles.rectanglePosition]}
                  />
                  <Image
                    style={[styles.pathIcon1, styles.pathIconLayout]}
                    resizeMode="cover"
                    source={require('../../../assets/path1.png')}
                  />
                </View>
                <Text style={styles.amount}>1</Text>
              </View>
              <Text style={[styles.kelasI, styles.pasienTypo1]}>
                Jumlah hari
              </Text>
            </View>
          </View>
          <View
            style={[styles.pasienMasukkeluarPadaHari, styles.pasienShadowBox1]}>
            <View style={styles.judul2}>
              <Text
                style={[styles.pasienMasukkeluarPada, styles.pasienSpaceBlock]}>
                Pasien masuk/keluar pada hari yang sama
              </Text>
              <View style={[styles.judulInner, styles.judulPosition]} />
            </View>
            <View style={styles.subJudul4}>
              <View style={[styles.amountSetting, styles.amountPosition1]}>
                <View style={[styles.iconMinus, styles.iconPosition]}>
                  <View style={[styles.rectangle, styles.rectanglePosition]} />
                  <Image
                    style={[styles.pathIcon, styles.pathIconLayout]}
                    resizeMode="cover"
                    source={require('../../../assets/path.png')}
                  />
                </View>
                <View style={[styles.iconPlus, styles.iconPosition]}>
                  <View
                    style={[styles.rectangleCopy, styles.rectanglePosition]}
                  />
                  <Image
                    style={[styles.pathIcon1, styles.pathIconLayout]}
                    resizeMode="cover"
                    source={require('../../../assets/path1.png')}
                  />
                </View>
                <Text style={styles.amount}>1</Text>
              </View>
              <Text style={[styles.kelasI, styles.pasienTypo1]}>
                Banya pasien :
              </Text>
            </View>
          </View>
          <LamaDirawat
            lamaPerawatan="Lama perawatan"
            lamaDiRawat="Lama di rawat :"
            propTop={1356}
          />
          <View
            style={[styles.pasienYangMasihDiRawat, styles.pasienShadowBox1]}>
            <View style={styles.judul3}>
              <Text style={[styles.pasienYangMasih, styles.pasienTypo]}>
                Pasien yang masih di rawat
              </Text>
              <View style={[styles.lineView, styles.judulPosition]} />
            </View>
            <View style={styles.subJudul5}>
              <View style={[styles.amountSetting5, styles.amountPosition1]}>
                <Text style={styles.amount}>1</Text>
              </View>
              <Text style={[styles.pasienYangMasih1, styles.pasienTypo1]}>
                Pasien yang masih di rawat :
              </Text>
            </View>
          </View>
          <View style={[styles.pasienKeluarRuangan, styles.pasienShadowBox]}>
            <View style={styles.judul3}>
              <Text style={[styles.pasienKeluarRuangan1, styles.pasienTypo]}>
                Pasien keluar ruangan
              </Text>
              <View style={[styles.lineView, styles.judulPosition]} />
            </View>
            <View style={styles.hidup}>
              <Text
                style={[styles.pasienKeluarHidupContainer, styles.totalTypo]}>
                <Text style={styles.pasienKeluarHidupContainer1}>
                  <Text style={styles.pasienKeluar}>{'Pasien keluar '}</Text>
                  <Text style={styles.hidup1}>Hidup</Text>
                  <Text style={styles.pasienKeluar}> :</Text>
                </Text>
              </Text>
            </View>
            <View style={styles.subJudul6}>
              <View style={[styles.amountSetting6, styles.amountPosition1]}>
                <View style={[styles.iconMinus, styles.iconPosition]}>
                  <View style={[styles.rectangle, styles.rectanglePosition]} />
                  <Image
                    style={[styles.pathIcon, styles.pathIconLayout]}
                    resizeMode="cover"
                    source={require('../../../assets/path.png')}
                  />
                </View>
                <View style={[styles.iconPlus, styles.iconPosition]}>
                  <View
                    style={[styles.rectangleCopy, styles.rectanglePosition]}
                  />
                  <Image
                    style={[styles.pathIcon1, styles.pathIconLayout]}
                    resizeMode="cover"
                    source={require('../../../assets/path1.png')}
                  />
                </View>
                <Text style={styles.amount}>1</Text>
              </View>
              <Text style={[styles.kelasI, styles.pasienTypo1]}>Hidup</Text>
            </View>
            <View style={styles.subJudul6}>
              <View style={[styles.amountSetting6, styles.amountPosition1]}>
                <View style={[styles.iconMinus, styles.iconPosition]}>
                  <View style={[styles.rectangle, styles.rectanglePosition]} />
                  <Image
                    style={[styles.pathIcon, styles.pathIconLayout]}
                    resizeMode="cover"
                    source={require('../../../assets/path.png')}
                  />
                </View>
                <View style={[styles.iconPlus, styles.iconPosition]}>
                  <View
                    style={[styles.rectangleCopy, styles.rectanglePosition]}
                  />
                  <Image
                    style={[styles.pathIcon1, styles.pathIconLayout]}
                    resizeMode="cover"
                    source={require('../../../assets/path1.png')}
                  />
                </View>
                <Text style={styles.amount}>1</Text>
              </View>
              <Text style={[styles.kelasI, styles.pasienTypo1]}>Rujuk :</Text>
            </View>
            <View style={styles.subJudul6}>
              <View style={[styles.amountSetting6, styles.amountPosition1]}>
                <View style={[styles.iconMinus, styles.iconPosition]}>
                  <View style={[styles.rectangle, styles.rectanglePosition]} />
                  <Image
                    style={[styles.pathIcon, styles.pathIconLayout]}
                    resizeMode="cover"
                    source={require('../../../assets/path.png')}
                  />
                </View>
                <View style={[styles.iconPlus, styles.iconPosition]}>
                  <View
                    style={[styles.rectangleCopy, styles.rectanglePosition]}
                  />
                  <Image
                    style={[styles.pathIcon1, styles.pathIconLayout]}
                    resizeMode="cover"
                    source={require('../../../assets/path1.png')}
                  />
                </View>
                <Text style={styles.amount}>1</Text>
              </View>
              <Text style={[styles.kelasI, styles.pasienTypo1]}>APS</Text>
            </View>
            <View style={styles.subJudul6}>
              <View style={[styles.amountSetting6, styles.amountPosition1]}>
                <View style={[styles.iconMinus, styles.iconPosition]}>
                  <View style={[styles.rectangle, styles.rectanglePosition]} />
                  <Image
                    style={[styles.pathIcon, styles.pathIconLayout]}
                    resizeMode="cover"
                    source={require('../../../assets/path.png')}
                  />
                </View>
                <View style={[styles.iconPlus, styles.iconPosition]}>
                  <View
                    style={[styles.rectangleCopy, styles.rectanglePosition]}
                  />
                  <Image
                    style={[styles.pathIcon1, styles.pathIconLayout]}
                    resizeMode="cover"
                    source={require('../../../assets/path1.png')}
                  />
                </View>
                <Text style={styles.amount}>1</Text>
              </View>
              <Text style={[styles.kelasI, styles.pasienTypo1]}>Lain-lain</Text>
            </View>
            <View style={styles.subJudul6}>
              <View style={[styles.amountSetting6, styles.amountPosition1]}>
                <Text style={styles.amount}>1</Text>
              </View>
              <Text style={[styles.kelasI, styles.pasienTypo1]}>Jumlah</Text>
            </View>
            <View style={styles.hidup}>
              <Text
                style={[styles.pasienKeluarHidupContainer, styles.totalTypo]}>
                <Text style={styles.pasienKeluarHidupContainer1}>
                  <Text style={styles.pasienKeluar}>{'Pasien keluar '}</Text>
                  <Text style={styles.menginggal}>Meninggal</Text>
                  <Text style={styles.pasienKeluar}> :</Text>
                </Text>
              </Text>
            </View>
            <View style={styles.subJudul11}>
              <View style={[styles.amountSetting11, styles.amountPosition1]}>
                <View style={[styles.iconMinus, styles.iconPosition]}>
                  <View style={[styles.rectangle, styles.rectanglePosition]} />
                  <Image
                    style={[styles.pathIcon, styles.pathIconLayout]}
                    resizeMode="cover"
                    source={require('../../../assets/path.png')}
                  />
                </View>
                <View style={[styles.iconPlus, styles.iconPosition]}>
                  <View
                    style={[styles.rectangleCopy, styles.rectanglePosition]}
                  />
                  <Image
                    style={[styles.pathIcon1, styles.pathIconLayout]}
                    resizeMode="cover"
                    source={require('../../../assets/path1.png')}
                  />
                </View>
                <Text style={styles.amount}>1</Text>
              </View>
              <Text style={[styles.v, styles.vTypo]}>V</Text>
              <Text style={[styles.jam, styles.pasienTypo1]}>_ 48 jam</Text>
            </View>
            <View style={styles.subJudul11}>
              <View style={[styles.amountSetting11, styles.amountPosition1]}>
                <View style={[styles.iconMinus, styles.iconPosition]}>
                  <View style={[styles.rectangle, styles.rectanglePosition]} />
                  <Image
                    style={[styles.pathIcon, styles.pathIconLayout]}
                    resizeMode="cover"
                    source={require('../../../assets/path.png')}
                  />
                </View>
                <View style={[styles.iconPlus, styles.iconPosition]}>
                  <View
                    style={[styles.rectangleCopy, styles.rectanglePosition]}
                  />
                  <Image
                    style={[styles.pathIcon1, styles.pathIconLayout]}
                    resizeMode="cover"
                    source={require('../../../assets/path1.png')}
                  />
                </View>
                <Text style={styles.amount}>1</Text>
              </View>
              <Text style={[styles.v1, styles.vTypo]}>V</Text>
              <Text style={[styles.jam, styles.pasienTypo1]}>_ 48 jam</Text>
            </View>
            <View style={styles.subJudul6}>
              <View style={[styles.amountSetting6, styles.amountPosition1]}>
                <Text style={styles.amount}>1</Text>
              </View>
              <Text style={[styles.kelasI, styles.pasienTypo1]}>Jumlah</Text>
            </View>
            <View style={styles.subJudul14}>
              <View style={[styles.amountSetting, styles.amountPosition1]}>
                <Text style={styles.amount}>1</Text>
              </View>
              <Text style={[styles.total, styles.jamPosition]}>Total</Text>
            </View>
          </View>
          <LamaDirawat
            lamaPerawatan="Pasien dipindahkan"
            lamaDiRawat="Pasien dipindahkan :"
            propTop={630}
          />
          <View style={[styles.pasienMasukRuangan, styles.pasienShadowBox]}>
            <View style={styles.judul3}>
              <Text style={[styles.pasienKeluarRuangan1, styles.pasienTypo]}>
                Pasien masuk ruangan
              </Text>
              <Text style={[styles.kelasI, styles.pasienTypo1]}>
                Pasien masuk :
              </Text>
            </View>
            <View style={styles.subJudul}>
              <Text style={[styles.kelasI, styles.pasienTypo1]}>
                Pasien pindahan :
              </Text>
            </View>
            <View style={styles.subJudul}>
              <View style={[styles.amountSetting, styles.amountPosition1]} />
              <Text style={[styles.kelasI, styles.pasienTypo1]}>Jumlah :</Text>
            </View>
          </View>
          <View style={styles.pasienAwal}>
            <Text style={styles.label}>Pasien awal :</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() =>
                setInitialPatients(Math.max(0, initialPatients - 1))
              }>
              <Text style={styles.buttonText}>--</Text>
            </TouchableOpacity>
            <TextInput
              value={initialPatients.toString()}
              onChangeText={text => setInitialPatients(Number(text))}
              keyboardType="numeric"
              style={[styles.input, {marginHorizontal: 10}, {left: 88}]}
            />
            <TouchableOpacity
              style={styles.button}
              onPress={() => setInitialPatients(initialPatients + 1)}>
              <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.jumlahBed, styles.jumlahBedShadowBox]}>
            <Text style={[styles.jumlahTempatTidur, styles.mujairFlexBox]}>
              Jumlah tempat tidur :
            </Text>
            <View style={[styles.amountSetting19, styles.subJudul18Position]}>
              <Text style={[styles.amount19, styles.amountPosition]}>3</Text>
            </View>
          </View>
          <DatePickerr />
          <View style={[styles.namaRuangan, styles.jumlahBedShadowBox]}>
            <Text style={[styles.mujair, styles.inputTypo]}>Mujair</Text>
          </View>
          <Pressable
            style={[styles.submitButton, styles.barAtasFlexBox]}
            onPress={() => navigation.navigate('HomeScreenNurse1')}>
            <Text style={[styles.submit, styles.submitClr]}>Submit</Text>
          </Pressable>
          <View style={[styles.waktu, styles.waktuLayout]}>
            <View style={[styles.waktuChild, styles.barAtasPosition]} />
            <Text style={[styles.waktuInputHarian, styles.submitClr]}>
              Waktu input harian 12 : -- WITA
            </Text>
          </View>
          <View style={[styles.barAtas, styles.barAtasPosition]}>
            <Pressable onPress={() => navigation.navigate('HomeScreenNurse')}>
              <Image
                style={styles.iconArrowBack}
                resizeMode="cover"
                source={require('../../../assets/-icon-arrow-back.png')}
              />
            </Pressable>
            <Text style={[styles.inputHarian, styles.inputTypo]}>
              Input Harian
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  containerScrollView: {
    // paddingBottom: 56,
  },
  bottomNavigation: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    shadowColor: 'rgba(67, 67, 67, 0.3)',
    shadowRadius: 8,
    elevation: 8,
    height: 56,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 70, // Adjusted padding
    paddingVertical: 8, // Adjusted padding
    backgroundColor: '#ffffff',
    zIndex: 1000,
  },

  bottomNavigationShadowBox: {
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    left: 0,
    position: 'absolute',
    backgroundColor: Color.schemesOnPrimary,
  },
  homeTypo: {
    textAlign: 'center',
    fontFamily: FontFamily.iconText,
    fontWeight: '500',
    lineHeight: 20,
    fontSize: FontSize.iconText_size,
  },
  home: {
    color: Color.colorMediumaquamarine,
  },
  homeIcon: {
    width: 24,
    height: 24,
    overflow: 'hidden',
  },
  parentFlexBox: {
    justifyContent: 'center',
    width: 44,
    alignItems: 'center',
  },
  homeParent: {
    backgroundColor: Color.schemesOnPrimary,
  },
  riwayat: {
    color: Color.colorSilver_100,
  },
  datePickerContainer: {
    top: '9%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rincianPasienShadowBox: {
    paddingHorizontal: Padding.p_9xl,
    alignItems: 'center',
    width: 326,
    borderRadius: Border.br_3xs,
    shadowOpacity: 1,
    elevation: 8,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowColor: 'rgba(0, 0, 0, 0.25)',
    position: 'absolute',
    backgroundColor: Color.schemesOnPrimary,
    justifyContent: 'center',
    left: '50%',
    transform: [{translateX: -163}], // Half of the width to center it
  },
  pasienFlexBox: {
    alignSelf: 'center',
    justifyContent: 'center',
    position: 'absolute',
  },
  judulPosition: {
    opacity: 0.5,
    height: 0,
    borderTopWidth: 0.3,
    borderColor: Color.notSoBlack,
    borderStyle: 'solid',
    left: '50%',
    transform: [{translateX: -133.5}], // Half of the width to center it
    width: 267,
    position: 'absolute',
  },
  amountPosition1: {
    bottom: '0%',
    height: '100%',
    right: '0%',
    top: '0%',
    position: 'absolute',
    overflow: 'hidden',
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
    left: '0%',
    bottom: '0%',
    right: '0%',
    height: '100%',
    top: '0%',
    position: 'absolute',
    width: '100%',
  },
  pathIconLayout: {
    maxHeight: '100%',
    maxWidth: '100%',
    left: '31.03%',
    right: '30.6%',
    width: '38.36%',
    position: 'absolute',
    overflow: 'hidden',
  },
  pasienTypo1: {
    textAlign: 'left',
    fontSize: 14,
    top: 25,
  },
  pasienShadowBox1: {
    paddingVertical: Padding.p_2xl,
    paddingHorizontal: Padding.p_10xl,
    alignItems: 'center',
    width: 326,
    borderRadius: Border.br_3xs,
    shadowOpacity: 1,
    elevation: 8,
    shadowRadius: 8,

    shadowColor: 'rgba(0, 0, 0, 0.25)',
    left: 28,
    position: 'absolute',
    backgroundColor: Color.schemesOnPrimary,
  },
  pasienSpaceBlock: {
    marginLeft: -88.5,
    width: 178,
  },
  pasienTypo: {
    height: '71.43%',
    justifyContent: 'center',
    display: 'flex',
    textAlign: 'center',
    color: Color.notSoBlack,
    fontFamily: FontFamily.poppinsSemiBold,
    fontWeight: '900',
    fontSize: 15,
    left: '50%',
    top: '0%',
    alignItems: 'center',
    position: 'absolute',
  },
  pasienShadowBox: {
    paddingVertical: Padding.p_xl,
    paddingHorizontal: Padding.p_10xl,
    width: 326,
    borderRadius: Border.br_3xs,
    shadowOpacity: 1,
    elevation: 8,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowColor: 'rgba(0, 0, 0, 0.25)',
    left: 28,
    position: 'absolute',
    backgroundColor: Color.schemesOnPrimary,
  },
  totalTypo: {
    fontSize: FontSize.m3BodySmall_size,
    textAlign: 'left',
    left: '0%',
    fontFamily: FontFamily.poppinsSemiBold,
    fontWeight: '600',
  },
  vTypo: {
    transform: [
      {
        rotate: '90deg',
      },
    ],
    fontFamily: FontFamily.poppinsRegular,
    textAlign: 'left',
    fontSize: FontSize.m3BodySmall_size,
    color: Color.notSoBlack,
    position: 'absolute',
  },
  jamPosition: {
    top: '18.18%',
    color: Color.notSoBlack,
    position: 'absolute',
  },
  container: {
    flex: 1,
    // alignSelf: 'center',
  },
  subJudul18Position: {
    alignSelf: 'center',
    zIndex: 1,
    position: 'absolute',
  },
  amountPosition: {
    marginTop: -2,
    opacity: 0.7,
    color: Color.colorGray_100,
    fontFamily: FontFamily.poppinsMedium,
    fontWeight: 'bold',
    letterSpacing: 51,
    fontSize: FontSize.m3BodySmall_size,
    left: '46.34%',
    top: '50%',
    position: 'absolute',
  },
  jumlahBedShadowBox: {
    height: 44,
    padding: Padding.p_base,
    justifyContent: 'center',
    width: 326,
    borderRadius: Border.br_3xs,
    shadowOpacity: 1,
    elevation: 8,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowColor: 'rgba(0, 0, 0, 0.25)',
    left: 28,
    position: 'absolute',
    backgroundColor: Color.schemesOnPrimary,
  },
  mujairFlexBox: {
    alignSelf: 'stretch',
    color: Color.notSoBlack,
  },
  inputTypo: {
    fontFamily: FontFamily.poppinsBold,
    fontWeight: '700',
  },
  barAtasFlexBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  submitClr: {
    color: Color.schemesOnPrimary,
    textAlign: 'center',
  },
  waktuLayout: {
    height: 31,
    width: 321,
    left: '7.5%',
  },
  barAtasPosition: {
    borderRadius: Border.br_8xs,
    alignSelf: 'center',
    position: 'absolute',
  },
  totalHariPerawatan: {
    height: '54.05%',
    marginLeft: -120,
    width: 240,
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    color: Color.notSoBlack,
    fontFamily: FontFamily.poppinsSemiBold,
    fontWeight: '600',
    fontSize: FontSize.m3LabelLarge_size,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  judulChild: {
    top: 37,
  },
  judul: {
    height: 37,
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
    opacity: 0.7,
    color: Color.colorGray_100,
    fontFamily: FontFamily.poppinsMedium,
    fontWeight: '500',
    letterSpacing: 1,
    left: '46.34%',
    textAlign: 'left',
    fontSize: FontSize.m3BodySmall_size,
    top: '50%',
    width: '6.46%',
    position: 'absolute',
  },
  amountSetting: {
    width: '30.83%',
    left: '69.17%',
  },
  kelasI: {
    top: '18.18%',
    color: Color.notSoBlack,
    position: 'absolute',
    left: '0%',
  },
  subJudul: {
    marginTop: 16,
    height: 22,
    width: 266,
  },
  rincianPasien: {
    top: 1757,
    height: 200,
    paddingVertical: Padding.p_3xl,
  },
  jumlahHariPerawatan1: {
    height: '58.82%',
    marginLeft: -87.5,
    width: 178,
    justifyContent: 'center',
    display: 'flex',
    textAlign: 'center',
    color: Color.notSoBlack,
    fontFamily: FontFamily.poppinsSemiBold,
    fontWeight: '600',
    fontSize: FontSize.m3LabelLarge_size,
    left: '50%',
    top: '0%',
    alignItems: 'center',
    position: 'absolute',
  },
  judulItem: {
    top: 34,
  },
  judul1: {
    height: 34,
    width: 267,
  },
  subJudul3: {
    marginTop: 26,
    height: 22,
    width: 266,
  },
  jumlahHariPerawatan: {
    top: 1620,
    height: 125,
    paddingVertical: Padding.p_base,
  },
  pasienMasukkeluarPada: {
    height: '100%',
    justifyContent: 'center',
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    color: Color.notSoBlack,
    fontFamily: FontFamily.poppinsSemiBold,
    fontWeight: '600',
    fontSize: FontSize.m3LabelLarge_size,
    left: '50%',
    top: '-30%',
  },
  judulInner: {
    top: 38,
  },
  judul2: {
    height: 38,
    width: 267,
  },
  subJudul4: {
    marginTop: 22,
    height: 22,
    width: 266,
  },
  pasienMasukkeluarPadaHari: {
    top: 1478,
    height: 130,
  },
  pasienYangMasih: {
    marginLeft: -106.5,
    width: 214,
  },
  lineView: {
    top: 98,
  },
  judul3: {
    height: 28,
    width: 267,
  },
  amountSetting5: {
    width: '30.71%',
    left: '69.29%',
  },
  pasienYangMasih1: {
    left: '0%',
    color: Color.notSoBlack,
    top: '0%',
    position: 'absolute',
  },
  subJudul5: {
    marginTop: 15,
    height: 22,
    width: 267,
  },
  pasienYangMasihDiRawat: {
    top: 1234,
    height: 110,
  },
  pasienKeluarRuangan1: {
    marginLeft: -88.5,
    width: 178,
  },
  pasienKeluar: {
    color: Color.notSoBlack,
  },
  hidup1: {
    color: Color.colorMediumaquamarine,
  },
  pasienKeluarHidupContainer1: {
    width: '100%',
  },
  pasienKeluarHidupContainer: {
    textAlign: 'left',
    display: 'flex',
    alignItems: 'center',
    top: '0%',
    position: 'absolute',
    width: '100%',
  },
  hidup: {
    height: 18,
    marginTop: 15,
    width: 266,
  },
  amountSetting6: {
    width: '33.33%',
    left: '66.67%',
  },
  subJudul6: {
    width: 246,
    marginTop: 15,
    height: 22,
  },
  menginggal: {
    color: Color.colorIndianred_200,
  },
  amountSetting11: {
    width: '32.73%',
    left: '67.27%',
  },
  v: {
    top: '38.64%',
    left: '7.19%',
  },
  jam: {
    left: '1.8%',
    top: '18.18%',
    color: Color.notSoBlack,
    position: 'absolute',
  },
  subJudul11: {
    width: 251,
    marginTop: 15,
    height: 22,
  },
  v1: {
    top: '75%',
    left: '0%',
  },
  total: {
    textAlign: 'left',
    fontSize: FontSize.m3BodySmall_size,
    left: '0%',
    fontFamily: FontFamily.poppinsSemiBold,
    fontWeight: '600',
  },
  subJudul14: {
    marginTop: 15,
    height: 22,
    width: 266,
  },
  pasienKeluarRuangan: {
    top: 752,
    height: 470,
    alignItems: 'flex-end',
  },
  pasienMasukRuangan: {
    top: 436,
    height: 182,
  },
  pasienAwal1: {
    height: '100.21%',
    marginLeft: -43.5,
    width: 86,
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    color: Color.notSoBlack,
    fontFamily: FontFamily.poppinsSemiBold,
    fontWeight: '600',
    fontSize: FontSize.m3LabelLarge_size,
    justifyContent: 'center',
    left: '50%',
    top: '0%',
  },
  judul6: {
    height: '27.92%',
    marginLeft: -120,
    top: '19.6%',
    bottom: '52.48%',
    zIndex: 0,
    left: '60%',
    width: 26,
    position: 'absolute',
  },
  pathIcon26: {
    height: '5.5%',
    top: '47.71%',
    bottom: '46.79%',
  },
  pathIcon27: {
    height: '38.53%',
    top: '30.73%',
    bottom: '30.73%',
  },
  amount18: {
    textAlign: 'left',
    width: '6.46%',
    marginTop: -10.9,
  },
  pasienAwal2: {
    height: '220.65%',
    width: '89.32%',
    top: '120%',
    left: '0%',
    display: 'flex',
    alignItems: 'center',
    color: Color.notSoBlack,
    position: 'absolute',
  },
  subJudul18: {
    height: '21.58%',
    width: '81.6%',
    top: '61.78%',
    right: '9.2%',
    bottom: '16.63%',
    left: '9.2%',
  },
  pasienAwal: {
    top: 323,
    shadowRadius: 9,
    elevation: 9,
    borderRadius: Border.br_xs,
    height: 101,
    padding: Padding.p_base,
    justifyContent: 'center',
    alignItems: 'center',
    width: 326,
    shadowOpacity: 1,
    color: 'rgba(0, 0, 0, 0.25)',
    left: 28,
    position: 'absolute',
    backgroundColor: Color.schemesOnPrimary,
    flexDirection: 'row',
  },
  jumlahTempatTidur: {
    fontFamily: FontFamily.poppinsRegular,
    textAlign: 'left',
    fontSize: FontSize.m3BodySmall_size,
    marginTop: -3,
  },

  amount19: {
    width: '19.51%',
    textAlign: 'center',
  },
  amountSetting19: {
    marginTop: -12,
    marginLeft: -40,
    width: 82,
    top: '50%',
    zIndex: 1,
    left: '50%',
    height: 42,
    overflow: 'hidden',
  },
  jumlahBed: {
    top: 272,
  },
  mujair: {
    fontSize: FontSize.m3BodyLarge_size,
    alignSelf: 'center',
    color: Color.notSoBlack,
    textAlign: 'center',
    marginBottom: -10,
    top: -5,
  },
  namaRuangan: {
    top: 127,
  },
  submit: {
    fontSize: FontSize.m3BodyLarge_size,
    fontFamily: FontFamily.poppinsSemiBold,
    fontWeight: '600',
  },
  submitButton: {
    marginLeft: -54,
    top: 1990,
    paddingHorizontal: 25,
    paddingVertical: Padding.p_3xs,
    backgroundColor: Color.colorMediumaquamarine,
    justifyContent: 'center',
    position: 'absolute',
    left: '50%',
    shadowOpacity: 1,
    elevation: 8,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowColor: 'rgba(0, 0, 0, 0.25)',
    flexDirection: 'row',
    borderRadius: Border.br_xl,
  },
  waktuChild: {
    top: 0,
    height: 31,
    width: 321,
    backgroundColor: Color.colorMediumaquamarine,
  },
  waktuInputHarian: {
    top: 3,
    left: 27,
    width: 258,
    height: 24,
    fontFamily: FontFamily.poppinsBold,
    fontWeight: '700',
    justifyContent: 'center',
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    fontSize: FontSize.m3LabelLarge_size,
  },
  waktu: {
    top: 84,
    left: 19,
    elevation: 4,
    shadowRadius: 4,
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowColor: 'rgba(0, 0, 0, 0.25)',
    position: 'absolute',
  },
  iconArrowBack: {
    width: 42,
    height: 25,
    zIndex: 0,
  },
  inputHarian: {
    marginTop: -11.5,
    marginLeft: -35,
    fontSize: FontSize.m3BodyLarge_size,
    zIndex: 1,
    position: 'absolute',
    textAlign: 'left',
    top: '50%',
    left: '50%',
    color: Color.notSoBlack,
  },
  barAtas: {
    top: 24,
    width: 360,
    height: 45,
    justifyContent: 'space-between',
    elevation: 4,
    shadowRadius: 4,
    shadowOpacity: 1,
    shadowColor: 'rgba(0, 0, 0, 0.25)',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Color.schemesOnPrimary,
  },
  nurseInputPage: {
    // alignSelf: 'center',
    flex: 1,
    height: 2080,
    // overflow: 'hidden',
    // width: '100%',
    // backgroundColor: Color.schemesOnPrimary,
    // borderRadius: Border.br_xl,
  },
  label: {
    fontSize: 17,
    alignItems: 'center',
    flexDirection: 'row',
    marginLeft: -90,
    top: -1,
    fontFamily: FontFamily.poppinsRegular,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    flexDirection: 'row',
    left: 80,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 17,
    flexDirection: 'row',
  },
});

export default NurseInputPage;
