import React, { useMemo } from "react";
import { Text, StyleSheet, View, Image, Pressable } from "react-native";
import { Padding, Color, FontSize, FontFamily, Border } from "../GlobalStyles";

export type SelectUserNurseType = {
  /** Style props */
  selectUserNursePosition?: string;
  selectUserNurseTop?: number | string;
  selectUserNurseLeft?: number | string;
};

const getStyleValue = (key: string, value: string | number | undefined) => {
  if (value === undefined) return;
  return { [key]: value === "unset" ? undefined : value };
};
const SelectUserNurse = ({
  selectUserNursePosition,
  selectUserNurseTop,
  selectUserNurseLeft,
}: SelectUserNurseType) => {
  const selectUserNurseStyle = useMemo(() => {
    return {
      ...getStyleValue("position", selectUserNursePosition),
      ...getStyleValue("top", selectUserNurseTop),
      ...getStyleValue("left", selectUserNurseLeft),
    };
  }, [selectUserNursePosition, selectUserNurseTop, selectUserNurseLeft]);

  return (
    <View style={[styles.property1default, selectUserNurseStyle]}>
      <View style={[styles.usernameField, styles.usernameFlexBox]}>
        <Text style={styles.selectUserType}>Select user </Text>
        <Image
          style={styles.doubleDownIcon}
          resizeMode="cover"
          source={require("../assets/double-down.png")}
        />
      </View>
      <View style={[styles.usernameFieldParent, styles.usernameBg]}>
        <View style={[styles.usernameField1, styles.usernameFlexBox]}>
          <Text style={styles.selectUserType}>Nurse</Text>
        </View>
        <View style={[styles.usernameField1, styles.usernameFlexBox]}>
          <Text style={styles.selectUserType}>Admin</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  usernameFlexBox: {
    padding: Padding.p_3xs,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    left: 10,
  },
  usernameBg: {
    backgroundColor: Color.schemesOnPrimary,
    width: "100%",
    position: "absolute",
  },
  selectUserType: {
    marginTop: -9.5,
    top: "80%",
    left: 12,
    fontSize: FontSize.m3LabelLarge_size,
    fontFamily: FontFamily.poppinsRegular,
    color: Color.colorDimgray,
    textAlign: "left",
    width: 119,
    height: 19,
    zIndex: 0,
    position: "absolute",
  },
  doubleDownIcon: {
    top: 13,
    left: 280,
    width: 22,
    height: 22,
    zIndex: 1,
    position: "absolute",
  },
  usernameField: {
    height: "31.03%",
    top: "0%",
    right: "0.32%",
    bottom: "28.97%",
    left: "-0.32%",
    borderRadius: Border.br_8xs,
    borderStyle: "solid",
    borderColor: Color.colorMediumaquamarine,
    borderWidth: 1,
    backgroundColor: Color.schemesOnPrimary,
    width: "100%",
    position: "absolute",
  },
  usernameField1: {
    alignSelf: "stretch",
    height: 45,
  },
  usernameFieldParent: {
    height: "68.97%",
    top: "31.03%",
    right: "0%",
    bottom: "0%",
    left: "0%",
    borderBottomRightRadius: Border.br_3xs,
    borderBottomLeftRadius: Border.br_3xs,
    paddingHorizontal: 0,
    paddingVertical: Padding.p_8xs,
    display: "none",
  },
  property1default: {
    width: 317,
    height: 145,
  },
});

export default SelectUserNurse;
