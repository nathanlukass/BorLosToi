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
      <Text style={styles.updatedText}>
        {/* Diperbaharui {formattedDate}, {formattedTime} WITA */}
        Diperbaharui 23 Sep 2024, 06:12 WITA
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  dashbordLayout: {
    height: 300,
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
    top: 190,
  },
  jumlahHariPerawatan: {
    top: 222,
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
    top: 92,
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
    top: 125,
  },
  pasienMasukRuangan: {
    width: 211,
    top: 60,
    height: 31,
    alignItems: "center",
    display: "flex",
    textAlign: "left",
    color: Color.notSoBlack,
    fontFamily: FontFamily.poppinsRegular,
    fontSize: FontSize.m3LabelLarge_size,
    marginLeft: -137,
  },
  //angka 0
  text: {
    top: 60,
  },
  text1: {
    top: 92,
  },
  text2: {
    top: 125,
  },
  text3: {
    top: 158,
  },
  text4: {
    top: 190,
  },
  text5: {
    top: 222,
  },
  dashbordIsianHariIniItem: {
    marginLeft: -130,
    top: 50,
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
    top: 16,
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
    top: 272,
    left:42,
  },
  updatedText: {
    fontFamily: FontFamily.poppinsRegular,
    color: Color.colorMediumaquamarine,
    textAlign: "center",
    marginTop: 8,
   // left: "50%",
    marginLeft: 45,
    fontSize:12,
    position: "absolute",
    bottom:10,  // Posisi di bagian bawah komponen
  },
});

export default DashbordIsianHariIni;
