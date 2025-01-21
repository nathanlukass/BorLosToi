import React, {useState, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  BackHandler,
  Dimensions,
} from 'react-native';
import {
  Padding,
  Border,
  Color,
  FontFamily,
  FontSize,
} from '../../../../GlobalStyles';
import {Button} from 'react-native-elements';
import {useRoute, useFocusEffect} from '@react-navigation/native';

const {width, height} = Dimensions.get('window');
const dynamicFontSize = size => (width / 375) * size; // 375 adalah lebar referensi
const dynamicPadding = padding => (height / 667) * padding; // 667 adalah tinggi referensi

const ChangePassword = ({navigation}) => {
  const route = useRoute();
  const {user} = route.params;
  const {username, role, ruangan, id_user, nama} = user;
  console.log('Route Params:', route.params); // Debugging
  console.log('User:', user);

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [securePassword, setSecurePassword] = useState(true);
  const [secureConfirmPassword, setSecureConfirmPassword] = useState(true);

  const API_URL =
    'https://samratindikator.online/borlostoi/public/insert/change_password';

  const togglePasswordVisibility = () => setSecurePassword(!securePassword);
  const toggleConfirmPasswordVisibility = () =>
    setSecureConfirmPassword(!secureConfirmPassword);

  const handleBackPress = useCallback(() => {
    if (user.role === 'nurse') {
      navigation.navigate('HomeScreenNurse', {user});
    } else if (user.role === 'admin') {
      navigation.navigate('HomeScreenAdmin', {user});
    } else {
      navigation.goBack(); // Fallback jika source tidak valid
    }
    return true;
  }, [navigation, user]);

  useFocusEffect(
    useCallback(() => {
      BackHandler.addEventListener('hardwareBackPress', handleBackPress);
      return () =>
        BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
    }, [handleBackPress]),
  );

  const handleChangePassword = async () => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: `username=${username}&role=${role}&ruangan=${ruangan}&new_password=${password}`,
      });

      const rawResponse = await response.text();
      console.log('Raw Response from Server:', rawResponse);

      // Ambil hanya JSON pertama yang valid dari respons
      const firstJSON = rawResponse.split('}{').join('}||{').split('||')[0]; // Memisahkan dua JSON yang bertabrakan
      let result;

      try {
        result = JSON.parse(firstJSON);
      } catch (err) {
        console.error('JSON Parse Error:', err.message);
        Alert.alert('Error', 'Respons server tidak valid.');
        return;
      }

      console.log('Server Response:', result);

      if (result.status === 'success') {
        Alert.alert('Sukses', 'Password berhasil diubah!', [
          {text: 'OK', onPress: () => navigation.navigate('HomeScreenNurse')},
        ]);
      } else {
        Alert.alert('Error', result.message || 'Gagal mengubah password.');
      }
    } catch (error) {
      console.error('Error:', error.message);
      Alert.alert('Error', 'Terjadi kesalahan. Coba lagi nanti.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.barAtas}>
        <Pressable style={styles.backButton} onPress={handleBackPress}>
          <Image
            style={styles.icon}
            resizeMode="cover"
            source={require('../../../../assets/-icon-arrow-back.png')}
          />
        </Pressable>
        <View style={styles.textContainer}>
          <Text style={styles.text}>Edit Password</Text>
        </View>
      </View>

      <Text style={styles.description}>Masukkan password baru anda</Text>

      {/* Password Input */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Password Baru"
          secureTextEntry={securePassword}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity
          onPress={togglePasswordVisibility}
          style={styles.iconContainer}>
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

      {/* Confirm Password Input */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          secureTextEntry={secureConfirmPassword}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        <TouchableOpacity
          onPress={toggleConfirmPasswordVisibility}
          style={styles.iconContainer}>
          <Image
            source={
              secureConfirmPassword
                ? require('../../../../assets/icons8-invisible-48.png')
                : require('../../../../assets/icons8-eye-48.png')
            }
            style={styles.icon2}
          />
        </TouchableOpacity>
      </View>

      {/* Update Button */}
      <Button
        title="Confirm"
        buttonStyle={styles.button}
        onPress={handleChangePassword}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  headerTitle: {
    fontSize: 16,
    fontFamily: FontFamily.poppinsBold,
    color: Color.notSoBlack,
    marginStart: 'auto',
    marginEnd: 'auto',
    left: -10,
  },

  iconShowPassword: {
    height: '50%',
    width: '50%',
  },
  icon2: {
    width: 25,
    height: 25,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  description: {
    fontSize: 14,
    color: Color.notSoBlack,
    fontFamily: FontFamily.poppinsSemiBold,
    marginTop: '20%',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    fontSize: dynamicFontSize(15),
    paddingVertical: 10,
    fontFamily: FontFamily.poppinsRegular,
  },
  iconContainer: {
    width: 50, // Lebar container yang cukup besar
    height: 50, // Tinggi container yang cukup besar
    justifyContent: 'center', // Agar ikon berada di tengah secara vertikal
    alignItems: 'center', // Agar ikon berada di tengah secara horizontal
    padding: 5, // Tambahkan padding jika diperlukan
  },
  button: {
    backgroundColor: '#21B557',
    borderRadius: 5,
    paddingVertical: 15,
    marginTop: 20,
  },
  barAtas: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    zIndex: 10,
  },
  icon: {
    width: 50,
    height: 25,
  },
  backButton: {
    position: 'absolute',
    width: 45,
    height: 45,
    justifyContent: 'center',
    zIndex: 20,
  },
  textContainer: {
    flex: 1,
    right: 'auto',
    top: '25%',
    transform: [{translateY: -12}],
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: FontFamily.poppinsBold,
    color: Color.notSoBlack,
    fontSize: dynamicFontSize(16),
    textAlign: 'center',
  },
});

export default ChangePassword;
