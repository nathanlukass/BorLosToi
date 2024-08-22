import * as React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Color, FontFamily, FontSize, Border } from "../GlobalStyles";

const DashbordIsianHariIni = () => {
  return (
    <View style={[styles.dashbordIsianHariIni, styles.dashbordLayout]}>
      <View style={[styles.dashbordIsianHariIniChild, styles.dashbordLayout]} />
      <Text style={[styles.pasienYangMasih, styles.pasienTypo1]}>
        Pasien yang masih dirawat :
      </Text>
      <Text style={[styles.jumlahHariPerawatan, styles.pasienTypo1]}>
        Jumlah hari perawatan :
      </Text>
      <Text style={[styles.pasienKeluarTotal, styles.pasienTypo]}>
        Pasien keluar (total) :
      </Text>
      <Text style={[styles.pasienKeluarHidup, styles.pasienTypo1]}>
        Pasien keluar (hidup) :
      </Text>
      <Text style={[styles.pasienKeluarMati, styles.pasienTypo]}>
        Pasien keluar (mati) :
      </Text>
      <Text style={[styles.pasienMasukRuangan, styles.pasienTypo1]}>
        Pasien masuk ruangan :
      </Text>
      <Text style={[styles.text, styles.textPosition]}>0</Text>
      <Text style={[styles.text1, styles.textPosition]}>0</Text>
      <Text style={[styles.text2, styles.textPosition]}>0</Text>
      <Text style={[styles.text3, styles.textPosition]}>0</Text>
      <Text style={[styles.text4, styles.textPosition]}>0</Text>
      <Text style={[styles.text5, styles.textPosition]}>0</Text>
      <View style={styles.dashbordIsianHariIniItem} />
      <Text style={styles.hariIni}>Hari ini</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  dashbordLayout: {
    height: 280,
    width: 328,
    position: "absolute",
  },
  pasienTypo1: {
    height: 31,
    alignItems: "center",
    display: "flex",
    textAlign: "left",
    color: Color.notSoBlack,
    fontFamily: FontFamily.poppinsRegular,
    fontSize: FontSize.m3LabelLarge_size,
    marginLeft: -137,
    left: "50%",
    position: "absolute",
  },
  pasienTypo: {
    width: 153,
    height: 31,
    alignItems: "center",
    display: "flex",
    textAlign: "left",
    color: Color.notSoBlack,
    fontFamily: FontFamily.poppinsRegular,
    fontSize: FontSize.m3LabelLarge_size,
    left: "50%",
    marginLeft: -137,
    position: "absolute",
  },
  textPosition: {
    width: 39,
    marginLeft: 93,
    justifyContent: "center",
    textAlign: "center",
    height: 31,
    alignItems: "center",
    display: "flex",
    color: Color.notSoBlack,
    fontFamily: FontFamily.poppinsRegular,
    fontSize: FontSize.m3LabelLarge_size,
    left: "50%",
    position: "absolute",
  },
  dashbordIsianHariIniChild: {
    top: 0,
    left: 0,
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 9,
    elevation: 9,
    shadowOpacity: 1,
    borderRadius: Border.br_xs,
    backgroundColor: Color.schemesOnPrimary,
  },
  pasienYangMasih: {
    width: 204,
    height: 31,
    alignItems: "center",
    display: "flex",
    textAlign: "left",
    color: Color.notSoBlack,
    fontFamily: FontFamily.poppinsRegular,
    fontSize: FontSize.m3LabelLarge_size,
    marginLeft: -137,
    top: 196,
  },
  jumlahHariPerawatan: {
    top: 234,
    width: 204,
    height: 31,
    alignItems: "center",
    display: "flex",
    textAlign: "left",
    color: Color.notSoBlack,
    fontFamily: FontFamily.poppinsRegular,
    fontSize: FontSize.m3LabelLarge_size,
    marginLeft: -137,
  },
  pasienKeluarTotal: {
    top: 158,
  },
  pasienKeluarHidup: {
    width: 161,
    top: 82,
    height: 31,
    alignItems: "center",
    display: "flex",
    textAlign: "left",
    color: Color.notSoBlack,
    fontFamily: FontFamily.poppinsRegular,
    fontSize: FontSize.m3LabelLarge_size,
    marginLeft: -137,
  },
  pasienKeluarMati: {
    top: 120,
  },
  pasienMasukRuangan: {
    width: 211,
    top: 44,
    height: 31,
    alignItems: "center",
    display: "flex",
    textAlign: "left",
    color: Color.notSoBlack,
    fontFamily: FontFamily.poppinsRegular,
    fontSize: FontSize.m3LabelLarge_size,
    marginLeft: -137,
  },
  text: {
    top: 44,
  },
  text1: {
    top: 82,
  },
  text2: {
    top: 120,
  },
  text3: {
    top: 158,
  },
  text4: {
    top: 196,
  },
  text5: {
    top: 234,
  },
  dashbordIsianHariIniItem: {
    marginLeft: -132.1,
    top: 37,
    borderStyle: "solid",
    borderColor: Color.notSoBlack,
    borderTopWidth: 0.2,
    width: 264,
    height: 0,
    left: "50%",
    position: "absolute",
  },
  hariIni: {
    marginLeft: -53,
    top: 3,
    fontSize: FontSize.size_mini,
    fontWeight: "500",
    fontFamily: FontFamily.poppinsMedium,
    width: 105,
    height: 35,
    justifyContent: "center",
    textAlign: "center",
    alignItems: "center",
    display: "flex",
    color: Color.notSoBlack,
    left: "50%",
    position: "absolute",
  },
  dashbordIsianHariIni: {
    top: 263,
    left: 16,
  },
});

export default DashbordIsianHariIni;
