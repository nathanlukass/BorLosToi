import React, { useMemo } from "react";
import { Text, StyleSheet, Image, View } from "react-native";
import TrailingIcon from "./TrailingIcon";
import { Border, FontSize, FontFamily, Color, Padding } from "../GlobalStyles";

export type TextFieldType = {
  inputText?: string;
  labelText?: string;
  supportingText?: string;
  showSupportingText?: boolean;
  propBackgroundColor?: string;

  /** Style props */
  propTop?: number | string;
  propMarginLeft?: number | string;
  propLeft?: number | string;
  propWidth?: number | string;
  propFlex?: number | string;
  propFlex1?: number | string;
  propFlex2?: number | string;
};

const getStyleValue = (key: string, value: string | number | undefined) => {
  if (value === undefined) return;
  return { [key]: value === "unset" ? undefined : value };
};
const TextField = ({
  inputText = "08/17/2023",
  labelText = "Date",
  supportingText = "MM/DD/YYYY",
  showSupportingText = true,
  propTop,
  propMarginLeft,
  propLeft,
  propWidth,
  propFlex,
  propFlex1,
  propFlex2,
  propBackgroundColor,
}: TextFieldType) => {
  const textFieldStyle = useMemo(() => {
    return {
      ...getStyleValue("top", propTop),
      ...getStyleValue("marginLeft", propMarginLeft),
      ...getStyleValue("left", propLeft),
      ...getStyleValue("width", propWidth),
    };
  }, [propTop, propMarginLeft, propLeft, propWidth]);

  const textField1Style = useMemo(() => {
    return {
      ...getStyleValue("flex", propFlex),
    };
  }, [propFlex]);

  const stateLayer1Style = useMemo(() => {
    return {
      ...getStyleValue("flex", propFlex1),
    };
  }, [propFlex1]);

  const contentStyle = useMemo(() => {
    return {
      ...getStyleValue("flex", propFlex2),
    };
  }, [propFlex2]);

  return (
    <View style={[styles.textField, styles.textFieldPosition, textFieldStyle]}>
      <View
        style={[styles.textField1, styles.textField1FlexBox, textField1Style]}
      >
        <View
          style={[
            styles.stateLayer,
            styles.textField1FlexBox,
            stateLayer1Style,
          ]}
        >
          <View style={[styles.content, contentStyle]}>
            <View style={styles.inputText}>
              <Text style={styles.inputText1}>{inputText}</Text>
              <Image
                style={styles.caretIcon}
                resizeMode="cover"
                source={require("../assets/caret.png")}
              />
            </View>
            <View style={[styles.labelText, styles.textPosition]}>
              <Text style={[styles.labelText1, styles.textTypo]}>
                {labelText}
              </Text>
            </View>
          </View>
          <TrailingIcon
            icon={require("../assets/icon.png")}
            propBackgroundColor={propBackgroundColor}
          />
        </View>
      </View>
      {showSupportingText && (
        <View style={[styles.supportingText, styles.textPosition]}>
          <Text style={[styles.supportingText1, styles.textTypo]}>
            {supportingText}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  textFieldPosition: {
    borderTopRightRadius: Border.br_9xs,
    borderTopLeftRadius: Border.br_9xs,
  },
  textField1FlexBox: {
    alignSelf: "stretch",
    flex: 1,
  },
  textPosition: {
    zIndex: 1,
    flexDirection: "row",
    position: "absolute",
  },
  textTypo: {
    lineHeight: 16,
    letterSpacing: 0,
    fontSize: FontSize.m3BodySmall_size,
    textAlign: "left",
    fontFamily: FontFamily.m3BodySmall,
  },
  inputText1: {
    fontSize: FontSize.m3BodyLarge_size,
    letterSpacing: 1,
    lineHeight: 24,
    color: Color.schemesOnSurface,
    textAlign: "left",
    fontFamily: FontFamily.m3BodySmall,
  },
  caretIcon: {
    width: 0,
    height: 16,
    display: "none",
  },
  inputText: {
    alignItems: "center",
    flexDirection: "row",
    zIndex: 0,
  },
  labelText1: {
    color: Color.schemesPrimary,
  },
  labelText: {
    top: -12,
    left: -4,
    backgroundColor: Color.schemesSurface,
    paddingHorizontal: Padding.p_9xs,
    paddingVertical: 0,
    alignItems: "center",
  },
  content: {
    height: 48,
    justifyContent: "center",
    paddingHorizontal: 0,
    paddingVertical: Padding.p_9xs,
    flex: 1,
  },
  stateLayer: {
    paddingLeft: Padding.p_base,
    paddingBottom: Padding.p_9xs,
    paddingTop: Padding.p_9xs,
    flexDirection: "row",
    flex: 1,
    borderTopRightRadius: Border.br_9xs,
    borderTopLeftRadius: Border.br_9xs,
  },
  textField1: {
    borderRadius: Border.br_9xs,
    borderStyle: "solid",
    borderColor: Color.schemesPrimary,
    borderWidth: 3,
    zIndex: 0,
    flex: 1,
  },
  supportingText1: {
    color: Color.schemesOnSurfaceVariant,
    flex: 1,
  },
  supportingText: {
    right: 0,
    bottom: -20,
    left: 0,
    height: 20,
    paddingHorizontal: Padding.p_base,
    paddingTop: Padding.p_9xs,
  },
  textField: {
    marginLeft: -163,
    top: 93,
    left: "50%",
    width: 327,
    height: 56,
    position: "absolute",
    borderTopRightRadius: Border.br_9xs,
    borderTopLeftRadius: Border.br_9xs,
  },
});

export default TextField;
