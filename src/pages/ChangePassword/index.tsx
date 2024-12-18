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
} from 'react-native';
import {
  Padding,
  Border,
  Color,
  FontFamily,
  FontSize,
} from '../../../GlobalStyles';
import {Button} from 'react-native-elements';
import {useRoute, useFocusEffect} from '@react-navigation/native';

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
    if (user === 'nurse') {
      navigation.navigate('ProfilScreenNurse');
    } else if (user === 'admin') {
      navigation.navigate('ProfileScreenAdmin');
    } else {
      navigation.goBack(); // Fallback jika source tidak valid
    }
    return true;
  }, [navigation]);

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
          {text: 'OK', onPress: () => navigation.navigate('ProfilScreenNurse')},
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
      {/* Header */}
      <View style={styles.header}>
        <Pressable style={styles.iconArrowBack} onPress={handleBackPress}>
          <Image
            style={styles.icon}
            resizeMode="cover"
            source={require('../../../assets/-icon-arrow-back.png')}
          />
        </Pressable>
        <Text style={styles.headerTitle}>Change Password</Text>
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
                ? require('../../assets/images/Eye1.png')
                : require('../../assets/images/Eye2.png')
            }
            style={{width: 26, height: 20}}
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
                ? require('../../assets/images/Eye1.png')
                : require('../../assets/images/Eye2.png')
            }
            style={{width: 26, height: 20}}
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
  icon: {
    height: '100%',
    width: '100%',
  },
  iconShowPassword: {
    height: '50%',
    width: '50%',
  },
  iconArrowBack: {
    width: 42,
    height: 25,
    zIndex: 0,
    marginStart: -15,
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
    color: Color.colorDimgray,
    fontFamily: FontFamily.poppinsBold,
    marginTop: 20,
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
    fontSize: 16,
    paddingVertical: 10,
  },
  iconContainer: {
    padding: 10,
  },
  button: {
    backgroundColor: '#00C490',
    borderRadius: 5,
    paddingVertical: 15,
    marginTop: 20,
  },
});

export default ChangePassword;
