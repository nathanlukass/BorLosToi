import * as React from "react";
import { FontSize, FontFamily, Color, Border, Padding } from "../GlobalStyles";

const UsernameField = () => {
  return (
    <View style={styles.property1default}>
      <Text style={styles.username}>Username</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  username: {
    position: "absolute",
    top: 10,
    left: 10,
    fontSize: FontSize.m3LabelLarge_size,
    fontFamily: FontFamily.poppinsRegular,
    color: Color.colorDarkslategray_100,
    textAlign: "left",
    width: 119,
    height: 19,
    zIndex: 0,
  },
  property1default: {
    borderRadius: Border.br_3xs,
    backgroundColor: Color.schemesOnPrimary,
    borderStyle: "solid",
    borderColor: Color.colorDarkslategray_100,
    borderWidth: 1,
    width: 317,
    height: 39,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: Padding.p_3xs,
  },
});

export default UsernameField;
