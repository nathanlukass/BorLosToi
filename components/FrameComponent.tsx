import * as React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { Color, Border, FontSize, FontFamily } from "../GlobalStyles";

export type FrameComponentType = {
  veronikaBedes?: string;
};

const FrameComponent = ({ veronikaBedes }: FrameComponentType) => {
  return (
    <View style={styles.memojiParent}>
      <Image
        style={styles.memojiIcon}
        resizeMode="cover"
        source={require("../assets/memoji1.png")}
      />
      <Text
        style={[styles.selamatDatang, styles.selamatDatangFlexBox]}
      >{`Selamat Datang `}</Text>
      <Text style={[styles.veronikaBedes, styles.selamatDatangFlexBox]}>
        {veronikaBedes}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  selamatDatangFlexBox: {
    height: 31,
    alignItems: "center",
    display: "flex",
    textAlign: "left",
    color: Color.notSoBlack,
    left: 75,
    position: "absolute",
  },
  memojiIcon: {
    top: 4,
    left: 0,
    borderRadius: Border.br_980xl,
    width: 55,
    height: 55,
    overflow: "hidden",
    position: "absolute",
  },
  selamatDatang: {
    top: 0,
    fontSize: FontSize.m3LabelLarge_size,
    fontFamily: FontFamily.poppinsRegular,
    width: 264,
  },
  veronikaBedes: {
    top: 25,
    fontSize: FontSize.size_xl,
    fontWeight: "700",
    fontFamily: FontFamily.poppinsBold,
    width: 181,
  },
  memojiParent: {
    top: 9,
    left: 14,
    width: 332,
    height: 62,
    position: "absolute",
  },
});

export default FrameComponent;
