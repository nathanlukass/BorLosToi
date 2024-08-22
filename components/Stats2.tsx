import * as React from "react";
import { StyleSheet, View, Image, Text } from "react-native";
import { Border, Color, FontFamily, FontSize, Padding } from "../GlobalStyles";

const Stats2 = () => {
  return (
    <View style={styles.stats}>
      <View style={styles.statsChild} />
      <View style={styles.statsItem} />
      <Image
        style={[styles.statsInner, styles.statsChildLayout]}
        resizeMode="cover"
        source={require("../assets/rectangle-2.png")}
      />
      <Image
        style={[styles.rectangleIcon, styles.statsChildLayout]}
        resizeMode="cover"
        source={require("../assets/rectangle-3.png")}
      />
      <Image
        style={[styles.statsChild1, styles.statsChildLayout]}
        resizeMode="cover"
        source={require("../assets/rectangle-4.png")}
      />
      <Image
        style={[styles.statsChild2, styles.statsChildLayout]}
        resizeMode="cover"
        source={require("../assets/rectangle-5.png")}
      />
      <Image
        style={[styles.statsChild3, styles.statsChildLayout]}
        resizeMode="cover"
        source={require("../assets/rectangle-2414.png")}
      />
      <Text style={[styles.hari13Hari, styles.textTypo]}>{`60-85%
6-9 Hari
1-3 Hari
40-50 Kali
<20%
<45%`}</Text>
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
GDR`}</Text>
      <View style={[styles.ket, styles.ketPosition]}>
        <Text style={[styles.ket1, styles.ket1Typo]}>KET</Text>
      </View>
      <View style={[styles.standar, styles.ketPosition]}>
        <Text style={[styles.ket1, styles.ket1Typo]}>STANDAR</Text>
      </View>
      <View style={[styles.hasil, styles.ketPosition]}>
        <Text style={[styles.hasil1, styles.ket1Typo]}>HASIL</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  statsChildLayout: {
    maxHeight: "100%",
    overflow: "hidden",
    maxWidth: "100%",
    left: "80%",
    right: "8.78%",
    width: "11.22%",
    height: "8.74%",
    borderRadius: Border.br_3xs,
    position: "absolute",
  },
  textTypo: {
    textAlign: "center",
    color: Color.colorBlack,
    fontFamily: FontFamily.poppinsRegular,
    fontSize: FontSize.m3LabelLarge_size,
    height: "70.63%",
    top: "19.7%",
    position: "absolute",
  },
  text1Typo: {
    textAlign: "left",
    color: Color.colorBlack,
    fontSize: FontSize.m3LabelLarge_size,
    height: "70.63%",
    top: "19.7%",
    position: "absolute",
  },
  hasil1Typo: {
    fontFamily: FontFamily.poppinsSemiBold,
    fontWeight: "600",
  },
  ketPosition: {
    padding: Padding.p_3xs,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
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
    shadowColor: "rgba(0, 0, 0, 0.25)",
    bottom: "83.12%",
    top: "8.14%",
    height: "8.74%",
    position: "absolute",
  },
  ket1Typo: {
    color: Color.schemesOnPrimary,
    fontSize: FontSize.m3BodySmall_size,
    textAlign: "left",
  },
  statsChild: {
    height: "100%",
    top: "0%",
    bottom: "0%",
    backgroundColor: Color.schemesOnPrimary,
    borderRadius: Border.br_3xs,
    left: "0%",
    right: "0%",
    width: "100%",
    position: "absolute",
  },
  statsItem: {
    bottom: "71.56%",
    backgroundColor: Color.colorLimegreen,
    left: "80%",
    right: "8.78%",
    top: "19.7%",
    width: "11.22%",
    height: "8.74%",
    borderRadius: Border.br_3xs,
    position: "absolute",
  },
  statsInner: {
    top: "32.19%",
    bottom: "59.06%",
  },
  rectangleIcon: {
    top: "44.68%",
    bottom: "46.57%",
  },
  statsChild1: {
    top: "57.5%",
    bottom: "33.76%",
  },
  statsChild2: {
    top: "69.99%",
    bottom: "21.27%",
  },
  statsChild3: {
    top: "82.51%",
    bottom: "8.74%",
  },
  hari13Hari: {
    width: "27.5%",
    left: "47.5%",
  },
  text: {
    width: "5.56%",
    left: "36.94%",
  },
  text1: {
    width: "1.28%",
    left: "27.22%",
    fontFamily: FontFamily.poppinsMedium,
    fontWeight: "500",
  },
  borAvlosToi: {
    width: "13.53%",
    left: "9.17%",
    textAlign: "left",
    color: Color.colorBlack,
    fontSize: FontSize.m3LabelLarge_size,
    height: "70.63%",
    top: "19.7%",
    position: "absolute",
  },
  ket1: {
    fontFamily: FontFamily.poppinsMedium,
    fontWeight: "500",
  },
  ket: {
    right: "6.92%",
    left: "78.33%",
    width: "14.75%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
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
    shadowColor: "rgba(0, 0, 0, 0.25)",
    bottom: "83.12%",
    top: "8.14%",
  },
  standar: {
    width: "22.14%",
    right: "27.58%",
    left: "50.28%",
  },
  hasil1: {
    fontFamily: FontFamily.poppinsSemiBold,
    fontWeight: "600",
  },
  hasil: {
    right: "53.03%",
    left: "32.22%",
    width: "14.75%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
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
    shadowColor: "rgba(0, 0, 0, 0.25)",
    bottom: "83.12%",
    top: "8.14%",
  },
  stats: {
    height: "39.03%",
    top: "50%",
    bottom: "10.98%",
    left: "0%",
    right: "0%",
    width: "100%",
    position: "absolute",
  },
});

export default Stats2;
