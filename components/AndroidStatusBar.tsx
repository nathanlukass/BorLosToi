import React, {useMemo} from 'react';
import {ImageSourcePropType, StyleSheet, View, Image, Text} from 'react-native';
import {Color, FontSize, FontFamily} from '../GlobalStyles';

export type AndroidStatusBarType = {
  battery?: ImageSourcePropType;

  /** Style props */
  androidStatusBarPosition?: string;
  androidStatusBarWidth?: number | string;
  androidStatusBarTop?: number | string;
  androidStatusBarRight?: number | string;
  androidStatusBarLeft?: number | string;
};

const getStyleValue = (key: string, value: string | number | undefined) => {
  if (value === undefined) {
    return;
  }
  return {[key]: value === 'unset' ? undefined : value};
};
const AndroidStatusBar = ({
  battery,
  androidStatusBarPosition,
  androidStatusBarWidth,
  androidStatusBarTop,
  androidStatusBarRight,
  androidStatusBarLeft,
}: AndroidStatusBarType) => {
  const androidStatusBarStyle = useMemo(() => {
    return {
      ...getStyleValue('position', androidStatusBarPosition),
      ...getStyleValue('width', androidStatusBarWidth),
      ...getStyleValue('top', androidStatusBarTop),
      ...getStyleValue('right', androidStatusBarRight),
      ...getStyleValue('left', androidStatusBarLeft),
    };
  }, [
    androidStatusBarPosition,
    androidStatusBarWidth,
    androidStatusBarTop,
    androidStatusBarRight,
    androidStatusBarLeft,
  ]);

  return (
    <View style={[styles.darkModefalse, androidStatusBarStyle]}>
      <View style={styles.background} />
      <View style={styles.icons}>
        <Image
          style={styles.cellularIcon}
          resizeMode="cover"
          source={require('../assets/cellular.png')}
        />
        <Image
          style={[styles.wifiIcon, styles.iconSpaceBlock]}
          resizeMode="cover"
          source={require('../assets/wifi.png')}
        />
        <Image
          style={[styles.batteryIcon, styles.iconSpaceBlock]}
          resizeMode="cover"
          source={battery}
        />
      </View>
      <Text style={styles.text}>12:30</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  iconSpaceBlock: {
    marginLeft: 6,
    height: 12,
  },
  background: {
    height: '100%',
    width: '100%',
    top: '0%',
    right: '0%',
    bottom: '0%',
    left: '0%',
    backgroundColor: Color.colorsBackgroundsLight,
    position: 'absolute',
  },
  cellularIcon: {
    width: 18,
    height: 12,
  },
  wifiIcon: {
    width: 16,
  },
  batteryIcon: {
    width: 24,
  },
  icons: {
    height: '50%',
    width: '19.44%',
    top: '25%',
    right: '3.33%',
    bottom: '25%',
    left: '77.22%',
    flexDirection: 'row',
    position: 'absolute',
  },
  text: {
    top: '16.67%',
    left: '3.33%',
    fontSize: FontSize.m3LabelLarge_size,
    fontWeight: '500',
    fontFamily: FontFamily.m3LabelLarge,
    color: Color.wireframesColorsTextLegibilityHighEmphasis,
    textAlign: 'left',
    position: 'absolute',
  },
  darkModefalse: {
    width: 360,
    height: 24,
  },
});

export default AndroidStatusBar;
