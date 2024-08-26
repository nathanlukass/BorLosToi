import React, { useMemo } from "react";
import { Image, StyleSheet, View, ImageSourcePropType } from "react-native";
import { Color, Padding, Border } from "../GlobalStyles";

export type TrailingIconType = {
  icon?: ImageSourcePropType;

  /** Style props */
  propBackgroundColor?: string;
};

const getStyleValue = (key: string, value: string | number | undefined) => {
  if (value === undefined) return;
  return { [key]: value === "unset" ? undefined : value };
};
const TrailingIcon = ({ icon, propBackgroundColor }: TrailingIconType) => {
  const stateLayerStyle = useMemo(() => {
    return {
      ...getStyleValue("backgroundColor", propBackgroundColor),
    };
  }, [propBackgroundColor]);

  return (
    <View style={styles.trailingIcon}>
      <View style={[styles.container, styles.containerFlexBox]}>
        <View
          style={[styles.stateLayer, styles.containerFlexBox, stateLayerStyle]}
        >
          <Image style={styles.icon} resizeMode="cover" source={icon} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerFlexBox: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    width: 24,
    height: 24,
  },
  stateLayer: {
    backgroundColor: Color.stateLayersOnSurfaceVariantOpacity12,
    padding: Padding.p_5xs,
  },
  container: {
    borderRadius: Border.br_81xl,
    overflow: "hidden",
  },
  trailingIcon: {
    width: 48,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default TrailingIcon;
