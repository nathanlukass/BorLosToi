import React, {useMemo, useState} from 'react';
import {Text, StyleSheet, View, Image, TouchableOpacity} from 'react-native';
import {Padding, Color, FontSize, FontFamily, Border} from '../GlobalStyles';

export type SelectUserNurseType = {
  /** Style props */
  selectUserNursePosition?: string;
  selectUserNurseTop?: number | string;
  selectUserNurseLeft?: number | string;
};

const getStyleValue = (key: string, value: string | number | undefined) => {
  if (value === undefined) {
    return;
  }
  return {[key]: value === 'unset' ? undefined : value};
};

const SelectUserNurse = ({
  selectUserNursePosition,
  selectUserNurseTop,
  selectUserNurseLeft,
}: SelectUserNurseType) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false); // State untuk mengelola dropdown terbuka atau tidak
  const [selectedRole, setSelectedRole] = useState(''); // State untuk menyimpan role yang dipilih

  const toggleDropdown = () => setDropdownOpen(!isDropdownOpen); // Fungsi untuk toggle dropdown

  const selectRole = (role: string) => {
    setSelectedRole(role);
    setDropdownOpen(false); // Menutup dropdown setelah memilih
  };

  const selectUserNurseStyle = useMemo(() => {
    return {
      ...getStyleValue('position', selectUserNursePosition),
      ...getStyleValue('top', selectUserNurseTop),
      ...getStyleValue('left', selectUserNurseLeft),
    };
  }, [selectUserNursePosition, selectUserNurseTop, selectUserNurseLeft]);

  return (
    <View style={[styles.property1default, selectUserNurseStyle]}>
      <TouchableOpacity
        style={[
          styles.usernameField,
          styles.usernameFlexBox,
          {borderColor: isDropdownOpen ? Color.colorMediumaquamarine : 'black'},
        ]}
        onPress={toggleDropdown}>
        <Text style={styles.selectUserType}>
          {selectedRole || 'Select user type'}
        </Text>
        <Image
          style={[
            styles.doubleDownIcon,
            {transform: [{rotate: isDropdownOpen ? '180deg' : '0deg'}]}, // Rotasi icon saat dropdown dibuka
          ]}
          resizeMode="cover"
          source={require('../assets/double-down.png')}
        />
      </TouchableOpacity>
      {isDropdownOpen && (
        <View style={[styles.usernameFieldParent, styles.usernameBg]}>
          <TouchableOpacity
            style={[styles.usernameField1, styles.usernameFlexBox]}
            onPress={() => selectRole('Nurse')}>
            <Text style={styles.selectUserType}>Nurse</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.usernameField1, styles.usernameFlexBox]}
            onPress={() => selectRole('Admin')}>
            <Text style={styles.selectUserType}>Admin</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  usernameFlexBox: {
    padding: Padding.p_3xs,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    left: 10,
  },
  usernameBg: {
    backgroundColor: Color.schemesOnPrimary,
    width: '100%',
    position: 'absolute',
  },
  selectUserType: {
    marginTop: -9.5,
    top: '80%',
    left: 12,
    fontSize: FontSize.m3LabelLarge_size,
    fontFamily: FontFamily.poppinsRegular,
    color: Color.colorDimgray,
    textAlign: 'left',
    width: 119,
    height: 19,
    zIndex: 0,
    position: 'absolute',
  },
  doubleDownIcon: {
    top: 13,
    left: 280,
    width: 22,
    height: 22,
    zIndex: 1,
    position: 'absolute',
  },
  usernameField: {
    height: '31.03%',
    top: '0%',
    right: '0.32%',
    bottom: '28.97%',
    left: '-0.32%',
    borderRadius: Border.br_8xs,
    borderStyle: 'solid',
    borderColor: 'black', // Default border color hitam
    borderWidth: 1,
    backgroundColor: Color.schemesOnPrimary,
    width: '100%',
    position: 'absolute',
  },
  usernameField1: {
    alignSelf: 'stretch',
    height: 45,
  },
  usernameFieldParent: {
    height: 'auto',
    top: '31.03%',
    right: '0%',
    bottom: '0%',
    left: '0%',
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
