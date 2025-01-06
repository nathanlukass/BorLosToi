import React, {useState, useRef, useEffect, useCallback} from 'react';
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
  Modal,
  BackHandler,
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
} from '../../../../GlobalStyles';
import LottieView from 'lottie-react-native';

// import SuccessPopup from '../../../components/SuccesPopup';

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
  const [showModal, setShowModal] = useState(false);

  const openModal = useCallback(() => {
    setShowModal(true);
  }, []);

  const closeModal = useCallback(() => {
    setShowModal(false);
  }, []);

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
          //Alert.alert('Login Successful!');
          openModal();

          setTimeout(() => {
            closeModal();
            navigation.navigate(
              userRole === 'nurse' ? 'HomeScreenNurse' : 'HomeScreenAdmin',
              {
                user: jsonResponse.user,
                resetLoginFields,
              },
            );
          }, 3000);
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
        message: 'Incorrect Username or Password',
        type: 'danger',
      });
    }
  };

  useEffect(() => {
    const backAction = () => {
      Alert.alert(
        'Konfirmasi',
        'Apakah Anda yakin ingin keluar dari aplikasi?',
        [
          {
            text: 'Batal',
            onPress: () => null,
            style: 'cancel',
          },
          {
            text: 'Keluar',
            onPress: () => BackHandler.exitApp(),
          },
        ],
      );
      return true; // Mencegah perilaku default tombol back
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove(); // Hapus listener ketika komponen unmount
  }, []);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'android' ? 'padding' : 'height'}
      keyboardVerticalOffset={scaleHeight(60)}>
      <Modal animationType="fade" transparent visible={showModal}>
        <View style={styles.popupContainer}>
          <View style={styles.popup}>
            <LottieView
              source={require('../../../../assets/raw/success.json')}
              autoPlay
              loop={false}
              style={styles.lottieAnimation}
              resizeMode="contain"
              onAnimationFinish={() => console.log('Animation Completed')}
            />
          </View>
        </View>
      </Modal>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.BackgroundScreen}>
          <FlashMessage position="top" />
          {/* Bagian untuk Gambar dan Teks Welcome */}
          <View style={[styles.welcomeWrapper]}>
            <Text style={[styles.title1]}>{'Welcome to\n(app name)'}</Text>
            <Image
              style={styles.samratIcon}
              resizeMode="cover"
              source={require('../../../../assets/samrat1.png')}
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
                  source={require('../../../../assets/arrow_drop_down.png')}
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
                      borderRadius: 10,
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
                        ? require('../../../../assets/icons8-invisible-48.png')
                        : require('../../../../assets/icons8-eye-48.png')
                    }
                    style={styles.icon2}
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
    color: 'black',
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
    marginTop: 20,
    alignSelf: 'center',
    width: '90%',
  },
  TextField: {
    width: '100%',
    height: 45,
    borderRadius: 10,
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
    top: 15,
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
    width: '80%',
    height: 50,
    // position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 20,
    backgroundColor: '#1E9DEC',
    // marginVertical:10,
    marginTop: 10,
    // top:90,
    shadowColor: '#000',
    shadowOffset: {width: 2, height: 4},
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 6,
  },
  BtnRoleLogin: {
    // top: 2,
    backgroundColor: '#21b557',
    borderRadius: 20,
    width: '80%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    // marginVertical:10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {width: 2, height: 4},
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 6,
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
  hoveredOption: {},
  arrowDownIcon: {
    width: 25,
    height: 25,
    right: 10,
    position: 'absolute',
  },
  samratIcon: {
    width: 180,
    height: 180,
    marginBottom: 20,
    marginTop: 20,
  },
  popupContainer: {
    width: -200,
    height: -200,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  popup: {
    // width: 200,
    // height: 200,
    backgroundColor: '#fff',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lottieAnimation: {
    width: 180,
    height: 150,
    justifyContent: 'center',
    transform: [{scale: 1.1}],
  },
  successText: {
    marginTop: 15,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'green',
  },
  icon2: {
    right: 8,
    width: 22,
    height: 22,
  },
});
export default LoginScreen;
