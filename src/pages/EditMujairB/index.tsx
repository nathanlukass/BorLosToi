import * as React from 'react';
import {
  Text,
  StyleSheet,
  View,
  Image,
  Pressable,
  ScrollView,
} from 'react-native';
import RincianPasien from '../../../components/RincianPasien';
import JumlahHariPerawatan from '../../../components/JumlahHariPerawatan';
import PasienMasukkeluarPadaHari from '../../../components/PasienMasukkeluarPadaHari';
import PasienDipindahkan from '../../../components/PasienDipindahkan';
import PasienKeluarRuangan from '../../../components/PasienKeluarRuangan';
import PasienMasukRuangan from '../../../components/PasienMasukRuangan';
import PasienAwal from '../../../components/PasienAwal';
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
import {DatePickerr} from '../../components';
// import {ScrollView} from 'react-native-gesture-handler';

const EditMujairB = () => {
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  const datePickerStyle1 = {
    top: '4%',
  };

  return (
    <ScrollView>
      <View style={styles.editMujairA}>
        <RincianPasien
          judulTop={1671}
          rincianPasienYangWidth={268}
          rincianPasienYangMasihDiRawat="Total hari perawatan per pasien"
          lineViewMarginLeft={-133.05}
          lineViewWidth={267}
          subJudulMarginLeft={-134.15}
        />
        <JumlahHariPerawatan propTop={1534} />
        <PasienMasukkeluarPadaHari propTop={1392} />
        <PasienDipindahkan
          propTop={1270}
          pasienDipindahkan="Lama perawatan"
          pasienDipindahkan1="Lama di rawat :"
        />
        <View style={styles.pasienYangMasihDiRawat}>
          <View style={styles.judul}>
            <Text style={[styles.pasienYangMasih, styles.jumlahBedFlexBox]}>
              Pasien yang masih di rawat
            </Text>
            <View style={styles.judulChild} />
          </View>
          <View style={styles.subJudul}>
            <View style={[styles.amountSetting, styles.amountSettingPosition]}>
              <Text style={[styles.amount, styles.amountTypo]}>1</Text>
            </View>
            <Text
              style={[styles.pasienYangMasih1, styles.pasienYangMasih1Typo]}>
              Pasien yang masih di rawat :
            </Text>
          </View>
        </View>
        <PasienKeluarRuangan jumlahTop={666} />
        <PasienDipindahkan
          propTop={544}
          pasienDipindahkan="Pasien dipindahkan"
          pasienDipindahkan1="Pasien dipindahkan :"
        />
        <PasienMasukRuangan propTop={350} />
        <PasienAwal propTop={237} />
        <View style={[styles.saveButton, styles.barAtasShadowBox]}>
          <Text style={[styles.save, styles.saveTypo]}>Save</Text>
        </View>
        <View style={[styles.jumlahBed, styles.jumlahBedFlexBox]}>
          <Text style={[styles.jumlahTempatTidur, styles.pasienYangMasih1Typo]}>
            Jumlah tempat tidur :
          </Text>
          <View style={[styles.amountSetting1, styles.mujairAPosition]}>
            <Text style={[styles.amount1, styles.amountTypo]}>22</Text>
          </View>
          <Image
            style={styles.editSquareIcon}
            resizeMode="cover"
            source={require('../../../assets/edit-square.png')}
          />
        </View>
        {/* <TextField
          inputText="08/17/2023"
          labelText="Date"
          showSupportingText
          supportingText="MM/DD/YYYY"
          propTop={93}
          propMarginLeft={-163}
          propLeft="50%"
          propWidth={327}
          propBackgroundColor="rgba(73, 69, 79, 0.12)"
        /> */}
        <Pressable
          style={[styles.barAtas, styles.barAtasShadowBox]}
          onPress={() => navigation.navigate('EditScreenAdmin')}>
          <Pressable
            style={styles.iconArrowBack}
            onPress={() => navigation.navigate('EditScreenAdmin')}>
            <Image
              style={styles.icon}
              resizeMode="cover"
              source={require('../../../assets/-icon-arrow-back.png')}
            />
          </Pressable>
          <Text style={[styles.mujairA, styles.mujairAPosition]}>Mujair A</Text>
        </Pressable>
        <DatePickerr style={datePickerStyle1} />
      </View>
      <Pressable
        style={[styles.submitButton, styles.barAtasFlexBox]}
        onPress={() => navigation.navigate('HomeScreenNurse1')}>
        <Text style={[styles.submit, styles.submitClr]}>Submit</Text>
      </Pressable>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  submitClr: {
    color: Color.schemesOnPrimary,
    textAlign: 'center',
  },
  submit: {
    fontSize: FontSize.m3BodyLarge_size,
    fontFamily: FontFamily.poppinsSemiBold,
    fontWeight: '600',
  },
  barAtasFlexBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  submitButton: {
    marginLeft: -54,
    bottom: 30,
    paddingHorizontal: 25,
    borderRadius: 19,
    paddingVertical: Padding.p_3xs,
    backgroundColor: Color.colorMediumaquamarine,
    justifyContent: 'center',
    position: 'absolute',
    left: '50%',
    shadowOpacity: 1,
    elevation: 8,
  },
  jumlahBedFlexBox: {
    justifyContent: 'center',
    left: '43.9%',
    marginTop: -10,
  },
  amountSettingPosition: {
    top: '0%',
    position: 'absolute',
  },
  amountTypo: {
    fontFamily: FontFamily.poppinsMedium,
    fontWeight: 'bold',
    left: '37.34%',
    top: '35%',
  },
  pasienYangMasih1Typo: {
    fontFamily: FontFamily.poppinsRegular,
    textAlign: 'left',
    fontSize: FontSize.m3BodySmall_size,
    color: Color.notSoBlack,
  },
  barAtasShadowBox: {
    flexDirection: 'row',
    alignItems: 'center',
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowColor: 'rgba(0, 0, 0, 0.25)',
    position: 'absolute',
  },
  saveTypo: {
    fontSize: FontSize.m3BodyLarge_size,
    textAlign: 'center',
  },
  mujairAPosition: {
    zIndex: 1,
    top: '50%',
    left: '50%',
    position: 'absolute',
  },
  pasienYangMasih: {
    height: '71.43%',
    marginLeft: -106.5,
    fontSize: FontSize.m3LabelLarge_size,
    display: 'flex',
    width: 214,
    textAlign: 'center',
    justifyContent: 'center',
    color: Color.notSoBlack,
    fontFamily: FontFamily.poppinsSemiBold,
    fontWeight: '600',
    top: '0%',
    alignItems: 'center',
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
    left: '50%',
    width: 267,
    position: 'absolute',
  },
  judul: {
    height: 28,
    width: 267,
  },
  amount: {
    marginTop: -11,
    width: '6.46%',
    textAlign: 'left',
    opacity: 0.7,
    color: Color.colorGray_100,
    fontFamily: FontFamily.poppinsMedium,
    fontWeight: '500',
    letterSpacing: 1,
    fontSize: FontSize.m3BodySmall_size,
    left: '46.34%',
    top: '50%',
  },
  amountSetting: {
    width: '30.71%',
    right: '0%',
    bottom: '0%',
    left: '69.29%',
    height: '100%',
    overflow: 'hidden',
  },
  pasienYangMasih1: {
    left: '0%',
    top: '0%',
    position: 'absolute',
  },
  subJudul: {
    height: 22,
    width: 267,
  },
  pasienYangMasihDiRawat: {
    top: 1148,
    left: 17,
    height: 110,
    paddingHorizontal: Padding.p_10xl,
    paddingVertical: Padding.p_2xl,
    gap: Gap.gap_md,
    alignItems: 'center',
    width: 326,
    borderRadius: Border.br_3xs,
    shadowOpacity: 1,
    elevation: 8,
    shadowRadius: 8,
    position: 'absolute',
    backgroundColor: Color.schemesOnPrimary,
  },
  save: {
    color: Color.schemesOnPrimary,
    fontSize: FontSize.m3BodyLarge_size,
    fontFamily: FontFamily.poppinsSemiBold,
    fontWeight: '600',
  },
  saveButton: {
    marginLeft: -60,
    top: 1900,
    backgroundColor: Color.colorMediumseagreen,
    paddingHorizontal: Padding.p_21xl,
    paddingVertical: Padding.p_3xs,
    justifyContent: 'center',
    left: '50%',
    elevation: 8,
    shadowRadius: 8,
    flexDirection: 'row',
    borderRadius: Border.br_xl,
  },
  jumlahTempatTidur: {
    alignSelf: 'stretch',
    zIndex: 1000,
    top: -19,
    height: 100,
    marginTop: 117,
    fontWeight: 'bold',
  },
  amountSetting1: {
    marginTop: -9,
    marginLeft: -40,
    width: 82,
    height: 22,
    overflow: 'hidden',
  },
  editSquareIcon: {
    top: 14,
    left: 292,
    width: 18,
    height: 18,
    zIndex: 1000,
    position: 'absolute',
  },
  jumlahBed: {
    marginLeft: -163,
    top: 183,
    height: 44,
    padding: Padding.p_base,
    gap: Gap.gap_lg,
    width: 326,
    borderRadius: Border.br_3xs,
    justifyContent: 'center',
    elevation: 8,
    shadowRadius: 8,
    position: 'absolute',
    backgroundColor: Color.schemesOnPrimary,
  },
  icon: {
    height: '100%',
    width: '100%',
  },
  iconArrowBack: {
    width: 42,
    height: 25,
    zIndex: 0,
  },
  mujairA: {
    marginTop: -11.5,
    marginLeft: -34,
    fontWeight: '700',
    fontFamily: FontFamily.poppinsBold,
    fontSize: FontSize.m3BodyLarge_size,
    textAlign: 'center',
    color: Color.notSoBlack,
    zIndex: 1,
  },
  barAtas: {
    top: 24,
    left: 0,
    shadowRadius: 4,
    elevation: 4,
    borderRadius: Border.br_8xs,
    width: 360,
    height: 45,
    justifyContent: 'space-between',
    backgroundColor: Color.schemesOnPrimary,
  },
  editMujairA: {
    flex: 1,
    height: 1980,
    alignSelf: 'center',
    alignItems: 'center',
  },
});

export default EditMujairB;
