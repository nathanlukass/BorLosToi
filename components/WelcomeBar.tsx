import * as React from "react";
import { StyleSheet, View, Text } from "react-native";
import FrameComponent from "./FrameComponent";
import { FontSize, Border, Color, FontFamily } from "../GlobalStyles";

const WelcomeBar = () => {
  return (
    <View style={[styles.welcomeBar, styles.welcomeLayout]}>
      <View style={[styles.welcomeBarChild, styles.welcomeLayout]} />
      <Text style={[styles.mujair, styles.mujairTypo]}>Mujair</Text>
      <FrameComponent veronikaBedes="Veronika Bedes" />
      <Text style={[styles.ruangan, styles.mujairTypo]}>Ruangan :</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  welcomeLayout: {
    width: 328,
    position: "absolute",
  },
  mujairTypo: {
    textAlign: "left",
    fontSize: FontSize.m3BodyLarge_size,
    top: 92,
    position: "absolute",
  },
  welcomeBarChild: {
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
    height: 148,
  },
  mujair: {
    left: 104,
    fontFamily: FontFamily.poppinsRegular,
    color: Color.notSoBlack,
  },
  ruangan: {
    left: 13,
    fontWeight: "600",
    fontFamily: FontFamily.poppinsSemiBold,
    color: Color.colorMediumaquamarine,
  },
  welcomeBar: {
    marginLeft: -164,
    top: 44,
    left: "50%",
    height: 166,
  },
});

export default WelcomeBar;
