import * as React from 'react';
import { useState } from 'react';
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Pressable,
  Image,
  Alert,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation, ParamListBase } from '@react-navigation/core';
import { FontFamily, Color } from '../../../GlobalStyles';
import { Gap, DatePickerr } from '../../components';
import RealTimeClock from '../../components/atoms/Time';

const NurseInputPage = ({ route }) => {
  const { user } = route.params;
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  const [jumlahTempatTidur, setJumlahTempatTidur] = useState('22');
  const [pasienAwal, setPasienAwal] = useState('0');
  const [pasienMasuk, setPasienMasuk] = useState('0');
  const [pasienPindahan, setPasienPindahan] = useState('0');
  const [pasienDipindahkan, setPasienDipindahkan] = useState('0');
  const [pasienHidup, setPasienHidup] = useState('0');
  const [pasienRujuk, setPasienRujuk] = useState('0');
  const [pasienAps, setPasienAps] = useState('0');
  const [pasienLainLain, setPasienLainLain] = useState('0');

  const increment = (setter) => () => setter((prev) => (parseInt(prev, 10) + 1).toString());
  const decrement = (setter) => () =>
    setter((prev) => {
      const newValue = parseInt(prev, 10) - 1;
      return newValue >= 0 ? newValue.toString() : '0';
    });

  const handleSubmitButton2 = async () => {
    try {
      const response = await fetch(
        'https://samratindikator.online/borlostoi/public/insert/insert_nurse',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({
            Pasien_Awal: pasienAwal,
            Pasien_Masuk: pasienMasuk,
            Pasien_Pindahan: pasienPindahan,
            Pasien_Dipindahkan: pasienDipindahkan,
            Pasien_Hidup: pasienHidup,
            Pasien_Rujuk: pasienRujuk,
            Pasien_Aps: pasienAps,
            Pasien_lain_lain: pasienLainLain,
          }).toString(),
        }
      );

      const result = await response.json();
      if (result.status === 'success') {
        Alert.alert('Sukses', 'Data berhasil diinput');
        navigation.navigate('HomeScreenNurse', { user });
      } else {
        Alert.alert('Gagal', 'Data gagal diinput: ' + result.message);
      }
    } catch (error) {
      Alert.alert('Error', 'Terjadi kesalahan: ' + error.message);
    }
  };

  const renderInputField = (label, value, setValue) => (
    <View style={styles.fieldContainer}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputContainer}>
        <TouchableOpacity style={[styles.button, styles.decrementButton]} onPress={decrement(setValue)}>
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          value={String(value)}
          keyboardType="numeric"
          onChangeText={(text) => setValue(text.replace(/[^0-9]/g, ''))}
        />
        <TouchableOpacity style={[styles.button, styles.incrementButton]} onPress={increment(setValue)}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Header with title and time */}
        <View style={styles.header}>
          <Pressable
            style={styles.iconArrowBack}
            onPress={() => navigation.navigate('HomeScreenNurse', { user })}
          >
            <Image
              style={styles.icon}
              resizeMode="cover"
              source={require('../../../assets/-icon-arrow-back.png')}
            />
          </Pressable>
          <Text style={styles.headerTitle}>Mujair A</Text>
        </View>

        {/* Subtitle Text */}
        <View style={styles.timeInfoContainer}>
          <RealTimeClock/>
        </View>

        <DatePickerr style={{ top: -7, width: 370, left: -30 }} />

        {/* Fields with increment/decrement buttons */}
        <View style={styles.section}>
          <Text style={styles.label}>Jumlah tempat tidur:</Text>
          <Text style={styles.jumlahBed}>{jumlahTempatTidur}</Text>
        </View>

        {/* Pasien Awal Section */}
        <Text style={styles.sectionTitle}>Pasien Awal</Text>
        {renderInputField('Pasien awal', pasienAwal, setPasienAwal)}

        {/* Pasien Masuk Ruangan Section */}
        <Text style={styles.sectionTitle}>Pasien Masuk Ruangan</Text>
        {renderInputField('Pasien masuk', pasienMasuk, setPasienMasuk)}
        {renderInputField('Pasien pindahan', pasienPindahan, setPasienPindahan)}

        {/* Pasien Dipindahkan Section */}
        <Text style={styles.sectionTitle}>Pasien Dipindahkan</Text>
        {renderInputField('Pasien dipindahkan', pasienDipindahkan, setPasienDipindahkan)}

        {/* Pasien Keluar Ruangan Section */}
        <Text style={styles.sectionTitle}>Pasien Keluar Ruangan</Text>
        {renderInputField('Hidup', pasienHidup, setPasienHidup)}
        {renderInputField('Rujuk', pasienRujuk, setPasienRujuk)}
        {renderInputField('APS', pasienAps, setPasienAps)}
        {renderInputField('Lain-lain', pasienLainLain, setPasienLainLain)}

        {/* Submit Button */}
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmitButton2}>
          <Text style={styles.submitText}>Submit</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },
  scrollContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: FontFamily.poppinsBold,
    color: Color.notSoBlack,
    marginStart: 'auto',
    marginEnd: 'auto',
    left: -10,
  },
  timeInfoContainer: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  timeInfoText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: FontFamily.poppinsRegular,
  },
  section: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 8,
  },
  fieldContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 8,
  },
  jumlahBed: {
    fontSize: 15,
    fontFamily: FontFamily.poppinsRegular,
    color: Color.notSoBlack,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: Color.notSoBlack,
    marginBottom: 10,
    marginTop: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginLeft: 'auto',
  },
  button: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginHorizontal: 5,
  },
  decrementButton: {
    backgroundColor: '#D3D3D3',
  },
  incrementButton: {
    backgroundColor: '#007AFF',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  input: {
    width: 40,
    height: 35,
    textAlign: 'center',
    fontSize: 14,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 5,
    marginHorizontal: 5,
  },
  submitButton: {
    backgroundColor: '#28A745',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 15,
  },
  submitText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: FontFamily.poppinsBold,
  },
  iconArrowBack: {
    width: 42,
    height: 25,
    zIndex: 0,
    marginStart: -15,
  },
});

export default NurseInputPage;
