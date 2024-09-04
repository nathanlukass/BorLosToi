// import * as React from 'react';
import React, {useMemo, useState, useRef, useEffect} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Image,
  Pressable,
  Animated,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import {Button} from 'react-native-paper';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation, ParamListBase, useFocusEffect} from '@react-navigation/native';
import SelectUserNurse from '../../../components/SelectUserNurse';
import { showMessage} from 'react-native-flash-message';
import FlashMessage from 'react-native-flash-message';
import UsernameField from '../../../components/UsernameField';
import PasswordField from '../../../components/PasswordField';
import {
  FontFamily,
  Color,
  Padding,
  Border,
  FontSize,
} from '../../../GlobalStyles';

const LoginScreen = ({route}) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState('');
  const fadeAnim = useRef(new Animated.Value(0)).current; // Ref untuk animasi fade
  const rotateAnim = useRef(new Animated.Value(0)).current; // Ref untuk animasi rotasi
  const [username, setUsername] = useState('');
  const [usernameIsFocused, usernameSetIsFocused] = useState(false);
  const [password, setpassword] = useState('');
  const [passwordIsFocused, passwordSetIsFocused] = useState(false);

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
        }),
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
        }),
      ]).start();
    }
  };

  const selectRole = (role: string) => {
    setSelectedRole(role);
    toggleDropdown(); // Menggunakan toggleDropdown untuk mengatur animasi penutupan
  };

  const rotateIcon = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'], // Rotasi dari 0 derajat ke 180 derajat
  });

  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  const handleLogin = () => {
    if (selectedRole == 'Nurse'){
      navigation.navigate('HomeScreenNurse')
    }
    else if (selectedRole == 'Admin'){
      navigation.navigate('HomeScreenAdmin')
    }
    else{
      showMessage({
        message: "select your role",
        type: "danger",
      })
    }
  }

  useFocusEffect(
    React.useCallback(() => {
      if (route.params?.loggedOut) {
        Alert.alert("Logged Out", "You have been logged out successfully.");
      }
    }, [route.params?.loggedOut]))

  return (
    <View style={styles.loginScreenAdmin}>
      <FlashMessage position="top" />
      <View style={[styles.loginToContinueWrapper, styles.lineParentLayout]}>
        <Text style={[styles.loginToContinue, styles.orTypo]}>
          Login to continue
        </Text>
      </View>
      <View
        style={[
          styles.pleaseSelectWhoYouAreWrapper,
          styles.loginFieldPosition,
        ]}>
        <Text style={[styles.pleaseSelectWho, styles.orTypo]}>
          Please select who you are
        </Text>
      </View>
      <View style={[styles.loginField, styles.loginFieldPosition]}>
        {/* Tambahkan komponen UsernameField di sini */}
        {/* <UsernameField /> */}
        {/* Tambahkan PasswordField di sini */}
        {/* <PasswordField /> */}
      </View>
      <View style={styles.loginButton}>
        <View style={[styles.lineParent, styles.lineParentLayout]}>
          <View style={[styles.groupChild, styles.groupLayout1]} />
          <View style={[styles.groupItem, styles.groupLayout1]} />
          <Text style={[styles.or, styles.orTypo]}>or</Text>
        </View>
        <Pressable
          style={[styles.groupParent, styles.groupLayout]}
          onPress={() => navigation.navigate('ScreenGuest')}>
          <View style={[styles.rectangleWrapper, styles.groupLayout]}>
            <View style={[styles.groupInner, styles.groupLayout]} />
          </View>
          <Text style={[styles.asAGuest, styles.loginPosition]}>
            As a guest
          </Text>
        </Pressable>
        <View style={[styles.groupContainer, styles.groupLayout]}>
          <Button
            style={styles.groupButton}
            mode="outlined"
            onPress={handleLogin}
            contentStyle={styles.groupButtonBtn}>
            <Text style={[styles.login, styles.loginPosition]}>Login</Text>
          </Button>
        </View>
      </View>
      <Image
        style={styles.samratIcon}
        resizeMode="cover"
        source={require('../../../assets/samrat1.png')}
      />
      <View
        style={[
          styles.welcomeToSamratIndikatorWrapper,
          styles.welcomePosition,
        ]}>
        <Text style={[styles.welcomeToSamratContainer, styles.welcomePosition]}>
          <Text style={styles.welcomeTo}>Welcome to</Text>
          <Text style={styles.text}>{' \n'}</Text>
          <Text style={styles.samrat}>Samrat</Text>
          <Text style={styles.text1}> </Text>
          <Text style={styles.indikator}>Indikator</Text>
          <Text style={styles.text}> </Text>
        </Text>
      </View>
      {/* <SelectUserNurse
        selectUserNursePosition="absolute"
        selectUserNurseTop={368}
        selectUserNurseLeft={27}
      /> */}
      <View style={styles.containerUsername}>
        <Text style={styles.labelUsername}>Username</Text>
        <TouchableOpacity
          style={[
            styles.inputContainerUsername,
            {
              borderColor: usernameIsFocused
                ? Color.colorMediumaquamarine
                : 'grey',
            },
          ]}
          activeOpacity={1}
          onPress={() => usernameSetIsFocused(true)}>
          <TextInput
            style={styles.inputUsername}
            value={username}
            onChangeText={setUsername}
            placeholder="Enter your username"
            onFocus={() => usernameSetIsFocused(true)}
            onBlur={() => usernameSetIsFocused(false)}
            placeholderTextColor={Color.colorDimgray}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.containerPassword}>
        <Text style={styles.labelPassword}>Password</Text>
        <TouchableOpacity
          style={[
            styles.inputContainerPassword,
            {
              borderColor: passwordIsFocused
                ? Color.colorMediumaquamarine
                : 'grey',
            },
          ]}
          activeOpacity={1}
          onPress={() => passwordSetIsFocused(true)}>
          <TextInput
            style={styles.inputPassword}
            value={password}
            onChangeText={setpassword}
            placeholder="Enter your password"
            onFocus={() => passwordSetIsFocused(true)}
            onBlur={() => passwordSetIsFocused(false)}
            placeholderTextColor={Color.colorDimgray}
          />
        </TouchableOpacity>
      </View>
      <View style={[styles.property1default]}>
        <TouchableOpacity
          style={[
            styles.usernameField,
            styles.usernameFlexBox,
            {
              borderColor: isDropdownOpen
                ? Color.colorMediumaquamarine
                : 'grey',
            },
          ]}
          onPress={toggleDropdown}>
          <Text style={styles.selectUserType}>
            {selectedRole || 'Select user type'}
          </Text>
          <Animated.Image
            style={[
              styles.doubleDownIcon,
              {transform: [{rotate: rotateIcon}]}, // Menggunakan animasi rotasi untuk ikon
            ]}
            resizeMode="cover"
            source={require('../../../assets/double-down.png')}
          />
        </TouchableOpacity>
        {isDropdownOpen && (
          <Animated.View
            style={[
              styles.usernameFieldParent,
              styles.usernameBg,
              {opacity: fadeAnim},
            ]}>
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
          </Animated.View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerPassword: {
    marginVertical: 10,
    width: '83%',
    top: 410,
    left: -5,
    alignSelf: 'center',
  },
  labelPassword: {
    fontSize: FontSize.m3LabelLarge_size,
    fontFamily: FontFamily.poppinsRegular,
    color: Color.colorDimgray,
    marginBottom: 5,
    left: 10,
  },
  inputContainerPassword: {
    left: 7.5,
    height: 45,
    borderRadius: Border.br_8xs,
    borderWidth: 1,
    backgroundColor: Color.schemesOnPrimary,
    paddingHorizontal: Padding.p_3xs,
    justifyContent: 'center',
  },
  inputPassword: {
    fontSize: FontSize.m3LabelLarge_size,
    fontFamily: FontFamily.poppinsRegular,
    color: Color.colorBlack,
  },
  containerUsername: {
    marginVertical: 10,
    width: '83%',
    top: 420,
    left: -5,
    alignSelf: 'center',
  },
  labelUsername: {
    fontSize: FontSize.m3LabelLarge_size,
    fontFamily: FontFamily.poppinsRegular,
    color: Color.colorDimgray,
    marginBottom: 5,
    left: 10,
  },
  inputContainerUsername: {
    // alignSelf: 'center',
    left: 7.5,
    height: 45,
    borderRadius: Border.br_8xs,
    borderWidth: 1,
    backgroundColor: Color.schemesOnPrimary,
    paddingHorizontal: Padding.p_3xs,
    justifyContent: 'center',
  },
  inputUsername: {
    fontSize: FontSize.m3LabelLarge_size,
    fontFamily: FontFamily.poppinsRegular,
    color: Color.colorBlack,
  },
  groupButtonBtn: {
    height: 45,
    width: 320,
  },
  lineParentLayout: {
    height: 24,
    position: 'absolute',
  },
  orTypo: {
    textAlign: 'center',
    fontFamily: FontFamily.poppinsRegular,
    color: Color.notSoBlack,
    top: 0,
    position: 'absolute',
  },
  loginFieldPosition: {
    left: 21,
    position: 'absolute',
  },
  fieldFlexBox: {
    padding: Padding.p_3xs,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    height: 30,
    width: 317,
    borderStyle: 'solid',
    borderRadius: Border.br_8xs,
    position: 'absolute',
  },
  groupLayout1: {
    height: 1,
    width: 142,
    borderTopWidth: 1,
    borderColor: Color.colorLightgray,
    top: 15,
    borderStyle: 'solid',
    position: 'absolute',
  },
  groupLayout: {
    width: 320,
    height: 45,
    position: 'absolute',
  },
  loginPosition: {
    color: Color.schemesOnPrimary,
    top: '50%',
    marginTop: -11.5,
    fontFamily: FontFamily.poppinsSemiBold,
    fontWeight: '600',
    left: '50%',
    textAlign: 'center',
    lineHeight: 24,
    fontSize: FontSize.m3BodyLarge_size,
    position: 'absolute',
  },
  welcomePosition: {
    width: 241,
    left: '50%',
    position: 'absolute',
  },
  loginToContinue: {
    lineHeight: 24,
    fontSize: FontSize.m3BodyLarge_size,
    fontFamily: FontFamily.poppinsRegular,
    alignSelf: 'center',
  },
  loginToContinueWrapper: {
    top: 284,
    alignSelf: 'center',
    width: 138,
  },
  pleaseSelectWho: {
    fontSize: FontSize.m3LabelLarge_size,
    left: 20,
  },
  pleaseSelectWhoYouAreWrapper: {
    top: 341,
    width: 181,
    height: 21,
  },
  passwordField: {
    top: 93,
    left: 13,
  },
  loginField: {
    top: 420,
    width: 319,
    height: 138,
  },
  groupChild: {
    left: 0,
  },
  groupItem: {
    left: 180,
  },
  or: {
    alignSelf: 'center',
    lineHeight: 24,
    fontSize: FontSize.m3BodyLarge_size,
    fontFamily: FontFamily.poppinsRegular,
  },
  lineParent: {
    top: 53,
    width: 321,
    left: 1,
  },
  groupInner: {
    shadowColor: 'rgba(0, 0, 0, 0.25)',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 9,
    elevation: 9,
    shadowOpacity: 1,
    backgroundColor: Color.colorCornflowerblue_100,
    borderRadius: Border.br_8xs,
    width: 320,
    left: 0,
    top: 0,
  },
  rectangleWrapper: {
    left: 2,
    top: 0,
  },
  asAGuest: {
    marginLeft: -39,
  },
  groupParent: {
    top: 85,
    left: 0,
  },
  groupButton: {
    left: 0,
    top: 2,
    position: 'absolute',
    backgroundColor: '#21b557',
  },
  login: {
    marginLeft: 22,
  },
  groupContainer: {
    left: 1,
    top: 0,
  },
  loginButton: {
    top: 620,
    left: 30,
    width: 322,
    height: 130,
    position: 'absolute',
  },
  samratIcon: {
    alignSelf: 'center',
    top: 129,
    width: 133,
    height: 142,
    position: 'absolute',
  },
  welcomeTo: {
    color: Color.notSoBlack,
  },
  text: {
    color: Color.colorBlack,
  },
  samrat: {
    color: Color.colorCrimson,
  },
  text1: {
    color: Color.colorMediumaquamarine,
  },
  indikator: {
    color: Color.colorCornflowerblue_200,
  },
  welcomeToSamratContainer: {
    marginLeft: -120.5,
    fontSize: FontSize.size_5xl,
    fontFamily: FontFamily.poppinsSemiBold,
    fontWeight: '600',
    width: 241,
    textAlign: 'center',
    top: 0,
  },
  welcomeToSamratIndikatorWrapper: {
    marginLeft: -123,
    top: 56,
    height: 72,
  },
  loginScreenAdmin: {
    // borderRadius: Border.br_xl,
    // alignSelf: 'center',
    // width: 385,
    // height: 800,
    flex: 1
    // overflow: 'hidden',

  },
  usernameFlexBox: {
    padding: Padding.p_3xs,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    left: 7,
  },
  usernameBg: {
    backgroundColor: Color.schemesOnPrimary,
    width: '100%',
    position: 'absolute',
    left: 7,
  },
  selectUserType: {
    marginTop: -7,
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
    top: 12,
    left: 280,
    width: 20,
    height: 20,
    zIndex: 1,
    position: 'absolute',
  },
  usernameField: {
    height: '31%',
    top: '-40%',
    right: '0.32%',
    bottom: '28.97%',
    left: '-0.32%',
    borderRadius: Border.br_8xs,
    borderStyle: 'solid',
    borderColor: 'blue',
    borderWidth: 1,
    backgroundColor: Color.schemesOnPrimary,
    width: '100%',
    position: 'absolute',
  },
  usernameField1: {
    height: 50,
  },
  usernameFieldParent: {
    alignSelf: 'center',
    height: '70%',
    top: -10,
    bottom: '0%',
    left: '0%',
    borderBottomRightRadius: Border.br_3xs,
    borderBottomLeftRadius: Border.br_3xs,
    paddingHorizontal: 0,
    paddingVertical: Padding.p_8xs,
  },
  property1default: {
    left: -5,
    width: 317,
    height: 145,
    top: 250,
    alignSelf: 'center',
  },
});

export default LoginScreen;
