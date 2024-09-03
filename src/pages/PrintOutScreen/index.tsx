import * as React from "react";
import { StyleSheet, View, Image, Text, Pressable } from "react-native";
import { Border, Color, FontFamily, FontSize, Gap } from "../../../GlobalStyles";
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation, ParamListBase} from '@react-navigation/core';

const PrintOutScreen = () => {
    const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  return (
    <View style={styles.homeScreenAdmin}>
        <View style={[styles.barAtas, styles.barAtasPosition]}>
        <Pressable onPress={() => navigation.navigate('HomeScreenAdmin')}>
            <Image
              style={styles.iconArrowBack}
              resizeMode="cover"
              source={require('../../../assets/-icon-arrow-back.png')}
            />
          </Pressable>
          <Text style={[styles.inputHarian, styles.inputTypo]}>
           Menu Print Out 
          </Text>
        </View>
      <View style={[styles.pilihBulan, styles.pilihShadowBox]}>
        <View style={[styles.pilihBulanChild, styles.pilihChildPosition]} />
        <Text style={styles.pilihBulan1}>Pilih bulan</Text>
        <Image
          style={styles.doubleDownIcon}
          resizeMode="cover"
          source={require("../../../assets/double-down.png")}
        />
      </View>
      <View style={[styles.pilihRuangan, styles.pilihShadowBox]}>
        <View style={[styles.pilihRuanganChild, styles.pilihChildPosition]} />
        <Text style={styles.pilihBulan1}>Pilih ruangan</Text>
        <Image
          style={styles.doubleDownIcon}
          resizeMode="cover"
          source={require("../../../assets/double-down.png")}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    iconArrowBack: {
        width: 42,
        height: 25,
        zIndex: 0,
      },
      inputTypo: {
        fontFamily: FontFamily.poppinsBold,
        fontWeight: '700',
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
      barAtasPosition: {
        borderRadius: Border.br_8xs,
        alignSelf: 'center',
        position: 'absolute',
      },
      barAtas: {
        top: 24,
        width: 360,
        height: 45,
        justifyContent: 'space-between',
        elevation: 4,
        shadowRadius: 4,
        shadowOpacity: 1,
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowColor: 'rgba(0, 0, 0, 0.25)',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Color.schemesOnPrimary,
    },
    childShadowBox: {
    borderRadius: Border.br_xs,
    elevation: 9,
    shadowRadius: 9,
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowColor: "rgba(0, 0, 0, 0.25)",
    backgroundColor: Color.schemesOnPrimary,
  },
  barPosition: {
    left: 0,
    position: "absolute",
  },
  selamatDatangPosition: {
    height: 31,
    left: 75,
    alignItems: "center",
    display: "flex",
    textAlign: "left",
    color: Color.notSoBlack,
    position: "absolute",
  },
  textFlexBox: {
    textAlign: "left",
    position: "absolute",
  },
  pilihShadowBox: {
    height: 36,
    width: 328,
    shadowOpacity: 1,
    elevation: 4,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowColor: "rgba(0, 0, 0, 0.25)",
    left: "50%",
    marginLeft: -164,
    position: "absolute",
  },
  pilihChildPosition: {
    left: "0%",
    bottom: "0%",
    right: "0%",
    top: "0%",
    height: "100%",
    position: "absolute",
    width: "100%",
  },
  welcomeBarChild: {
    height: 148,
    left: 0,
    position: "absolute",
    top: 0,
    width: 328,
  },
  memojiIcon: {
    top: 4,
    borderRadius: Border.br_980xl,
    width: 55,
    height: 55,
    overflow: "hidden",
  },
  selamatDatang: {
    width: 264,
    fontFamily: FontFamily.poppinsRegular,
    height: 31,
    fontSize: FontSize.m3LabelLarge_size,
    left: 75,
    top: 0,
  },
  joshuaTengker: {
    top: 25,
    fontSize: FontSize.size_xl,
    fontWeight: "700",
    fontFamily: FontFamily.poppinsBold,
    width: 181,
    height: 31,
    left: 75,
  },
  memojiParent: {
    top: 9,
    left: 14,
    width: 332,
    height: 62,
    position: "absolute",
  },
  admin: {
    top: 92,
    left: 13,
    fontSize: FontSize.m3BodyLarge_size,
    fontWeight: "600",
    fontFamily: FontFamily.poppinsSemiBold,
    color: Color.colorMediumseagreen,
  },
  welcomeBar: {
    top: 44,
    height: 166,
    width: 328,
    shadowOpacity: 1,
    elevation: 4,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowColor: "rgba(0, 0, 0, 0.25)",
    left: "50%",
    marginLeft: -164,
    position: "absolute",
  },
  pilihBulanChild: {
    borderRadius: Border.br_xs,
    elevation: 9,
    shadowRadius: 9,
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowColor: "rgba(0, 0, 0, 0.25)",
    backgroundColor: Color.schemesOnPrimary,
  },
  pilihBulan1: {
    height: "86.11%",
    width: "94.51%",
    top: "8.33%",
    left: "5.49%",
    alignItems: "center",
    display: "flex",
    color: Color.notSoBlack,
    textAlign: "left",
    fontFamily: FontFamily.poppinsRegular,
    fontSize: FontSize.m3LabelLarge_size,
    position: "absolute",
  },
  doubleDownIcon: {
    height: "61.11%",
    width: "6.71%",
    top: "19.44%",
    right: "4.57%",
    bottom: "19.44%",
    left: "88.72%",
    maxWidth: "100%",
    maxHeight: "100%",
    position: "absolute",
    overflow: "hidden",
  },
  pilihBulan: {
    top: 190,
  },
  pilihRuanganChild: {
    borderRadius: Border.br_xs,
    elevation: 9,
    shadowRadius: 9,
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowColor: "rgba(0, 0, 0, 0.25)",
    backgroundColor: Color.schemesOnPrimary,
  },
  pilihRuangan: {
    top: 120,
  },
  background: {
    backgroundColor: Color.colorsBackgroundsLight,
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
    height: "50%",
    width: "19.44%",
    top: "25%",
    right: "3.33%",
    bottom: "25%",
    left: "77.22%",
    flexDirection: "row",
    gap: Gap.gap_3xs,
    position: "absolute",
  },
  text: {
    top: "16.67%",
    left: "3.33%",
    fontWeight: "500",
    fontFamily: FontFamily.m3LabelLarge,
    color: Color.wireframesColorsTextLegibilityHighEmphasis,
    fontSize: FontSize.m3LabelLarge_size,
    textAlign: "left",
  },
  androidStatusBar: {
    right: 0,
    height: 24,
    top: 0,
    left: 0,
  },
  homeScreenAdmin: {
    borderRadius: Border.br_xl,
    flex: 1,
    height: 800,
    overflow: "hidden",
    width: "100%",
    backgroundColor: Color.schemesOnPrimary,
  },
});

export default PrintOutScreen;