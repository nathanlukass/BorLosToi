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
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
} from 'react-native';
import {Button} from 'react-native-paper';
import {StackNavigationProp} from '@react-navigation/stack';
import {
  useNavigation,
  ParamListBase,
  useFocusEffect,
} from '@react-navigation/native';
import {showMessage} from 'react-native-flash-message';
import FlashMessage from 'react-native-flash-message';
import {
  FontFamily,
  Color,
  Padding,
  Border,
  FontSize,
} from '../../../GlobalStyles';

// Get screen dimensions
const {width: screenWidth, height: screenHeight} = Dimensions.get('window');
const scaleFactor = screenWidth / 375;
const scaleSize = size => scaleFactor * size; // 375 is an average base width
const scaleHeight = size => (screenHeight / 850) * size; // 812 is an average base height

const LoginScreen = ({route}) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState('');
  const fadeAnim = useRef(new Animated.Value(0)).current; // Ref untuk animasi fade
  const rotateAnim = useRef(new Animated.Value(0)).current; // Ref untuk animasi rotasi
  const [username, setUsername] = useState('');
  const [usernameIsFocused, usernameSetIsFocused] = useState(false);
  const [passwordIsFocused, passwordSetIsFocused] = useState(false);
  const [role, setRole] = useState('');
  const [data, setData] = useState([]);
  const [password, setPassword] = useState('');
  const [securePassword, setSecurePassword] = useState(true);
  const [hoveredOption, setHoveredOption] = useState(null);

  const resetLoginFields = () => {
    setUsername('');
    setPassword('');
    setSelectedRole('');
  };

  const togglePasswordVisibility = () => {
    setSecurePassword(!securePassword);
  };

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

  const handleLogin = async () => {
    if (!username || !password) {
      return showMessage({
        message: 'Please enter both username and password!',
        type: 'danger',
      });
    }

    if (!selectedRole) {
      return showMessage({message: 'Select your role!', type: 'danger'});
    }

    try {
      const formBody = new URLSearchParams({username, password}).toString();
      const response = await fetch(
        'https://samratindikator.online/borlostoi/public/login/authenticate',
        {
          method: 'POST',
          headers: {'Content-Type': 'application/x-www-form-urlencoded'},
          body: formBody,
        },
      );

      const jsonResponse = await response.json();
      if (response.ok && jsonResponse.user) {
        const userRole = jsonResponse.user.role.toLowerCase();
        if (userRole === selectedRole.toLowerCase()) {
          Alert.alert('Login Successful!');
          navigation.navigate(
            userRole === 'nurse' ? 'HomeScreenNurse' : 'HomeScreenAdmin',
            {
              user: jsonResponse.user, // Pass the entire user object to next page
              resetLoginFields,
            },
          );
        } else {
          showMessage({
            message: 'Role, Username, or Password mismatch!',
            type: 'danger',
          });
        }
      } else {
        showMessage({
          message: jsonResponse.message || 'Login failed!',
          type: 'danger',
        });
      }
    } catch (error) {
      console.error(error);
      showMessage({
        message: 'An error occurred. Please try again later.',
        type: 'danger',
      });
    }
  };

  // const getData = async () => {
  //   try {
  //     const response = await fetch('http://10.0.2.2:3000/users');
  //     const jsonData = await response.json();

  //     setData(jsonData.data);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  // useEffect(() => {
  //   getData();
  // }, []);

  // const user = data && data.length > 0 ? data[2] : null;

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'android' ? 'padding' : 'height'}
      keyboardVerticalOffset={scaleHeight(60)}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.BackgroundScreen}>
          <FlashMessage position="top" />
          {/* Bagian untuk Gambar dan Teks Welcome */}
          <View style={[styles.welcomeWrapper]}>
            <Text style={[styles.title1]}>{'Welcome to\n(app name)'}</Text>
            <Image
              style={styles.samratIcon}
              resizeMode="cover"
              source={require('../../../assets/samrat1.png')}
            />
          </View>
          <Text style={[styles.title2]}>Login to continue</Text>

          {/* select role wrapper */}
          <View style={[styles.fieldContainer]}>
            <View style={styles.jarakTextField}>
              <Text style={[styles.title3]}>Please select who you are</Text>
              <TouchableOpacity
                style={[
                  styles.TextField,
                  {
                    borderColor: isDropdownOpen
                      ? Color.colorMediumaquamarine
                      : 'grey',
                  },
                ]}
                onPress={toggleDropdown}>
                <Text style={styles.textGrey1}>
                  {selectedRole || 'Select user type'}
                </Text>
                <Animated.Image
                  style={[
                    styles.arrowDownIcon,
                    {transform: [{rotate: rotateIcon}]},
                  ]}
                  resizeMode="cover"
                  source={require('../../../assets/arrow_drop_down.png')}
                />
              </TouchableOpacity>
              {isDropdownOpen && (
                <Animated.View
                  style={[
                    styles.roleBg,
                    {
                      opacity: fadeAnim,
                      top: 70,
                      zIndex: 10,
                      height: 106,
                      width: '100%',
                    },
                  ]}>
                  <TouchableOpacity
                    style={[
                      styles.jarakRole,
                      hoveredOption === 'Nurse' && styles.hoveredOption, // Gaya saat di-hover
                    ]}
                    onPress={() => selectRole('Nurse')}
                    onPressIn={() => setHoveredOption('Nurse')} // Menandai opsi di-hover
                    onPressOut={() => setHoveredOption(null)} // Menghapus tanda hover saat disentuh selesai
                  >
                    <Text style={styles.textGrey1}>Nurse</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.jarakRole,
                      hoveredOption === 'Admin' && styles.hoveredOption, // Gaya saat di-hover
                    ]}
                    onPress={() => selectRole('Admin')}
                    onPressIn={() => setHoveredOption('Admin')} // Menandai opsi di-hover
                    onPressOut={() => setHoveredOption(null)} // Menghapus tanda hover saat disentuh selesai
                  >
                    <Text style={styles.textGrey1}>Admin</Text>
                  </TouchableOpacity>
                </Animated.View>
              )}
            </View>

            {/* username */}
            <View style={styles.jarakTextField}>
              <Text style={styles.title3}>Username</Text>
              <TouchableOpacity
                style={[
                  styles.TextField,
                  {
                    borderColor: usernameIsFocused
                      ? Color.colorMediumaquamarine
                      : 'grey',
                  },
                ]}
                activeOpacity={1}
                onPress={() => usernameSetIsFocused(true)}>
                <TextInput
                  value={username}
                  style={styles.textGrey2}
                  onChangeText={setUsername}
                  placeholder="Enter your username"
                  onFocus={() => usernameSetIsFocused(true)}
                  onBlur={() => usernameSetIsFocused(false)}
                  placeholderTextColor={Color.colorDimgray}
                />
              </TouchableOpacity>
            </View>

            {/* password */}
            <View style={styles.jarakTextField}>
              <Text style={styles.title3}>Password</Text>
              <View
                style={[
                  styles.TextField,
                  {
                    borderColor: passwordIsFocused
                      ? Color.colorMediumaquamarine
                      : 'grey',
                    flexDirection: 'row',
                    alignItems: 'center',
                  },
                ]}>
                <TextInput
                  style={[styles.textGrey2, {flex: 1}]}
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Enter your password"
                  onFocus={() => passwordSetIsFocused(true)}
                  onBlur={() => passwordSetIsFocused(false)}
                  placeholderTextColor={Color.colorDimgray}
                  secureTextEntry={securePassword}
                />
                <TouchableOpacity
                  onPress={() => setSecurePassword(!securePassword)}>
                  <Image
                    source={
                      securePassword
                        ? require('../../assets/images/Eye1.png')
                        : require('../../assets/images/Eye2.png')
                    }
                    style={{
                      width: 22,
                      height: 16,
                      right: 8,
                      tintColor: '#6A6A6A',
                    }}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={styles.BtnLoginWrapper}>
            {/* ROLE LOGIN BUTTON */}
            <Pressable style={styles.BtnRoleLogin} onPress={handleLogin}>
              <Text style={styles.loginPosition}>Login</Text>
            </Pressable>

            {/* OR Separator */}
            <View style={styles.lineWrapper}>
              <View style={styles.lineLeftRight} />
              <Text style={styles.orText}>or</Text>
              <View style={styles.lineLeftRight} />
            </View>

            {/* GUEST BUTTON */}
            <Pressable
              style={styles.BtnGuest}
              onPress={() => navigation.navigate('ScreenGuest')}>
              <Text style={[styles.loginPosition]}>As a guest</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  BackgroundScreen: {
    flex: 1,
  },
  // text styles
  title1: {
    fontSize: FontSize.size_5xl,
    fontFamily: FontFamily.poppinsSemiBold,
    fontWeight: '600',
    textAlign: 'center',
    color: Color.notSoBlack,
    marginBottom: 10,
  },
  title2: {
    lineHeight: 24,
    fontSize: FontSize.m3BodyLarge_size,
    fontFamily: FontFamily.poppinsRegular,
    alignSelf: 'center',
    color: Color.notSoBlack,
  },
  title3: {
    left: 4,
    fontSize: 15,
    fontFamily: FontFamily.poppinsRegular,
    color: '#000000',
  },
  textGrey1: {
    left: 16,
    fontSize: FontSize.m3LabelLarge_size,
    fontFamily: FontFamily.poppinsRegular,
    color: Color.colorDimgray,
    width: 100,
    height: 19,
    zIndex: 0,
    position: 'absolute',
  },
  textGrey2: {
    fontFamily: FontFamily.poppinsRegular,
    top: 3,
  },
  fieldContainer: {
    marginTop: 16,
    alignSelf: 'center',
    width: '90%',
  },
  TextField: {
    width: '100%',
    height: 45,
    borderRadius: Border.br_8xs,
    borderColor: '#21b557',
    borderWidth: 1,
    backgroundColor: Color.schemesOnPrimary,
    paddingHorizontal: Padding.p_3xs,
    justifyContent: 'center',
    marginBottom: 20,
  },
  loginPosition: {
    color: Color.schemesOnPrimary,
    top: '50%',
    marginTop: -11.5,
    fontFamily: FontFamily.poppinsSemiBold,
    fontWeight: '600',
    //left: '50%',
    textAlign: 'center',
    lineHeight: 24,
    fontSize: scaleSize(14),
    position: 'absolute',
  },
  jarakTextField: {
    marginBottom: -scaleHeight(10),
  },
  jarakRole: {
    height: 45,
    top: 16,
  },
  orText: {
    marginHorizontal: 8,
    fontSize: FontSize.m3BodyLarge_size,
    fontFamily: FontFamily.poppinsRegular,
    color: Color.notSoBlack,
    textAlign: 'center',
  },
  asAGuest: {
    marginLeft: -39,
  },

  //button
  BtnContainer: {
    alignSelf: 'center',
    width: '90%', // Matches TextField width in fieldContainer
    paddingVertical: 20,
  },
  BtnGuest: {
    width: '100%',
    height: 45,
    // position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: Border.br_8xs,
    backgroundColor: '#1E9DEC',
    // marginVertical:10,
    marginTop: 10,
    // top:90,
  },
  BtnRoleLogin: {
    // top: 2,
    backgroundColor: '#21b557',
    borderRadius: Border.br_8xs,
    width: '100%',
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    // marginVertical:10,
    marginBottom: 10,
  },
  BtnLoginWrapper: {
    alignSelf: 'center',
    width: '90%',
    paddingVertical: 20,
    marginTop: 10,
  },
  lineWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 0,
  },
  lineLeftRight: {
    flex: 1,
    height: 1,
    backgroundColor: Color.colorLightgray,
  },
  lineLeft: {
    left: 0,
  },
  lineRight: {
    left: 200,
  },
  welcomeWrapper: {
    alignItems: 'center',
    marginTop: 34,
  },
  roleBg: {
    backgroundColor: Color.schemesOnPrimary,
    width: '160%',
    position: 'absolute',
  },
  hoveredOption: {
    backgroundColor: '#4EC69E',
  },
  arrowDownIcon: {
    width: 25,
    height: 25,
    right: 10,
    position: 'absolute',
  },
  samratIcon: {
    width: 200,
    height: 200,
    marginBottom: 20,
    marginTop: 20,
  },
});
export default LoginScreen;
