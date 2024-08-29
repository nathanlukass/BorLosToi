import React, { useMemo, useState, useRef } from "react";
import { Text, StyleSheet, View, Image, TouchableOpacity, Animated } from "react-native";
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
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState('');
  const fadeAnim = useRef(new Animated.Value(0)).current; // Ref untuk animasi fade
  const rotateAnim = useRef(new Animated.Value(0)).current; // Ref untuk animasi rotasi

  const toggleDropdown = () => {
    if (isDropdownOpen) {
      // Animasi fade out dan rotasi ketika menutup dropdown
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(rotateAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        })
      ]).start(() => setDropdownOpen(false));
    } else {
      setDropdownOpen(true);
      // Animasi fade in dan rotasi ketika membuka dropdown
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        })
      ]).start();
    }
  };

  const selectRole = (role: string) => {
    setSelectedRole(role);
    toggleDropdown(); // Menggunakan toggleDropdown untuk mengatur animasi penutupan
  };

  const selectUserNurseStyle = useMemo(() => {
    return {
      ...getStyleValue("position", selectUserNursePosition),
      ...getStyleValue("top", selectUserNurseTop),
      ...getStyleValue("left", selectUserNurseLeft),
    };
  }, [selectUserNursePosition, selectUserNurseTop, selectUserNurseLeft]);

  // Interpolasi untuk animasi rotasi ikon
  const rotateIcon = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"], // Rotasi dari 0 derajat ke 180 derajat
  });

  return (
    <View style={[styles.property1default, selectUserNurseStyle]}>
      <TouchableOpacity 
        style={[
          styles.usernameField, 
          styles.usernameFlexBox, 
          { borderColor: isDropdownOpen ? Color.colorMediumaquamarine : "grey" }
        ]} 
        onPress={toggleDropdown}
      >
        <Text style={styles.selectUserType}>{selectedRole || "Select user type"}</Text>
        <Animated.Image
          style={[
            styles.doubleDownIcon,
            { transform: [{ rotate: rotateIcon }] } // Menggunakan animasi rotasi untuk ikon
          ]}
          resizeMode="cover"
          source={require("../assets/double-down.png")}
        />
      </TouchableOpacity>
      {isDropdownOpen && (
        <Animated.View style={[styles.usernameFieldParent, styles.usernameBg, { opacity: fadeAnim }]}>
          <TouchableOpacity style={[styles.usernameField1, styles.usernameFlexBox]} onPress={() => selectRole('Nurse')}>
            <Text style={styles.selectUserType}>Nurse</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.usernameField1, styles.usernameFlexBox]} onPress={() => selectRole('Admin')}>
            <Text style={styles.selectUserType}>Admin</Text>
          </TouchableOpacity>
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  usernameFlexBox: {
    padding: Padding.p_3xs,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    left: 7,
  },
  usernameBg: {
    backgroundColor: Color.schemesOnPrimary,
    width: "100%",
    position: "absolute",
    left: 7,
  },
  selectUserType: {
    marginTop: -7,
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
    top: 12,
    left: 280,
    width: 20,
    height: 20,
    zIndex: 1,
    position: "absolute",
  },
  usernameField: {
    height: "31%",
    top: "0%",
    right: "0.32%",
    bottom: "28.97%",
    left: "-0.32%",
    borderRadius: Border.br_8xs,
    borderStyle: "solid",
    borderColor: "blue",
    borderWidth: 1,
    backgroundColor: Color.schemesOnPrimary,
    width: "100%",
    position: "absolute",
  },
  usernameField1: {
    height: 45,
  },
  usernameFieldParent: {
    alignSelf: 'center',
    height: "auto",
    top: "31.03%",
    bottom: "0%",
    left: "0%",
    borderBottomRightRadius: Border.br_3xs,
    borderBottomLeftRadius: Border.br_3xs,
    paddingHorizontal: 0,
    paddingVertical: Padding.p_8xs,
  },
  property1default: {
    width: 317,
    height: 145,
  },
});

export default SelectUserNurse;
